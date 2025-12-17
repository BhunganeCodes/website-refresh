import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, vehicleType, message }: ContactFormRequest = await req.json();

    console.log("Received contact form submission:", { name, email, phone, vehicleType });

    // Validate inputs
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send notification email to DNR Transmissions
    const notificationEmail = await resend.emails.send({
      from: "DNR Transmissions <onboarding@resend.dev>",
      to: ["dini@dnrtransmissions.co.za"],
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #b91c1c; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 30px; background: #1a1a1a; color: #e5e5e5;">
            <h2 style="color: #b91c1c; margin-top: 0;">Customer Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #333; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #333; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #333;"><a href="mailto:${email}" style="color: #b91c1c;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #333; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #333;"><a href="tel:${phone}" style="color: #b91c1c;">${phone || 'Not provided'}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #333; font-weight: bold;">Vehicle Type:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #333;">${vehicleType || 'Not specified'}</td>
              </tr>
            </table>
            <h2 style="color: #b91c1c; margin-top: 30px;">Message</h2>
            <p style="background: #262626; padding: 15px; border-radius: 8px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="background: #262626; padding: 15px; text-align: center; color: #888; font-size: 12px;">
            <p>This email was sent from the DNR Transmissions website contact form.</p>
          </div>
        </div>
      `,
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to customer
    const confirmationEmail = await resend.emails.send({
      from: "DNR Transmissions <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting DNR Transmissions",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #b91c1c; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">DNR Transmissions</h1>
          </div>
          <div style="padding: 30px; background: #f5f5f5; color: #333;">
            <h2 style="color: #b91c1c;">Thank you for your enquiry, ${name}!</h2>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p>Our team typically responds within 24-48 hours during business days.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <h3 style="color: #b91c1c;">Your Message:</h3>
            <p style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #b91c1c;">${message.replace(/\n/g, '<br>')}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <h3 style="color: #b91c1c;">Contact Us:</h3>
            <p>
              📞 011 396 2846 | 083 404 8326 | 063 535 5804<br>
              📧 dini@dnrtransmissions.co.za<br>
              📍 Unit 7, 21 Sim Road, Pomona, Kempton Park, 1619
            </p>
          </div>
          <div style="background: #1a1a1a; padding: 15px; text-align: center; color: #888; font-size: 12px;">
            <p>© ${new Date().getFullYear()} DNR Transmissions. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmail);

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
