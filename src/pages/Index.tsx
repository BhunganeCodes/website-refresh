import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Wrench, Shield, Truck, Settings, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/LoadingScreen";
import ContactForm from "@/components/ContactForm";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const services = [
    "Supply and repair of gear boxes, differentials, steering boxes and prop shafts",
    "Free technical advice, strip and quote on work done",
    "Remove and replace six months warranty",
    "Unit prices subject to strip and quote",
    "Choice of exchange unit or reconditioning",
    "Clutch installations",
    "Prop shaft reconditioning",
    "30 day account after 3 COD payments",
    "48hr turnaround time (dependent on availability of spares)",
    "Prompt collection and delivery",
    "Call out service",
    "Free testing of vehicles",
  ];

  const features = [
    {
      icon: Clock,
      title: "48hr Turnaround",
      description: "Fast service to minimize your fleet downtime",
    },
    {
      icon: Shield,
      title: "6 Month Warranty",
      description: "Quality assurance on all our work",
    },
    {
      icon: Truck,
      title: "Collection & Delivery",
      description: "We come to you across Southern Africa",
    },
    {
      icon: Settings,
      title: "10+ Years Experience",
      description: "Experts in transmission repair",
    },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <div className={`min-h-screen bg-background ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="font-heading text-primary-foreground font-bold text-xl">D</span>
            </div>
            <div>
              <span className="font-heading text-xl tracking-wide">
                <span className="text-primary">DNR</span>
                <span className="text-foreground"> Transmissions</span>
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("about")} className="text-muted-foreground hover:text-primary transition-colors font-medium">
              About
            </button>
            <button onClick={() => scrollToSection("services")} className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Contact
            </button>
            <Button variant="hero" size="sm" onClick={() => scrollToSection("contact")}>
              Get Quote
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <span className="text-primary font-heading uppercase tracking-widest text-sm border border-primary/30 px-4 py-2 rounded-full">
                Transmission Specialists
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <span className="text-foreground">Expert</span>{" "}
              <span className="text-primary">Transmission</span>
              <br />
              <span className="text-foreground">Repairs</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              Over 10 years of experience servicing all makes of trucks across Southern Africa. 
              Quality workmanship, competitive prices, and reliable service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button variant="hero" size="xl" onClick={() => scrollToSection("contact")}>
                <Phone className="mr-2 h-5 w-5" />
                Get Free Quote
              </Button>
              <Button variant="outline" size="xl" onClick={() => scrollToSection("services")}>
                Our Services
              </Button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-heading uppercase tracking-widest text-sm">About Us</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
                DNR Transmissions
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  DNR Transmissions is an owner-driven company with beyond 10 years experience 
                  in the drive-line components, service, repairs and sales in the transmission industry.
                </p>
                <p>
                  The driving force behind the company is single-mindedness, focusing on customer satisfaction. 
                  We believe in supplying a quality product at a price we can be proud of.
                </p>
                <p>
                  We pride ourselves with superior speedy, efficient service across Southern Africa 
                  and its neighboring states to ensure that we get every vehicle back on the road 
                  timeously as fleet downtime is costly.
                </p>
              </div>
              <div className="mt-8 p-6 bg-card rounded-lg border-l-4 border-primary">
                <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Social Responsibility
                </h4>
                <p className="text-muted-foreground text-sm">
                  We recognise our responsibility towards the community and strive to make a 
                  positive impact. Our staff members are committed to serving the community 
                  both on and off duty.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary rounded-2xl p-8 flex items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 border-4 border-primary/30 rounded-full animate-gear-rotate flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-primary rounded-full flex items-center justify-center">
                      <Wrench className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
                <div className="font-heading text-4xl font-bold">10+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-heading uppercase tracking-widest text-sm">What We Offer</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4 text-foreground">
              Our Services
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Comprehensive transmission services with industry-leading warranty and turnaround times
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
              >
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{service}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="hero" size="lg" onClick={() => scrollToSection("contact")}>
              Request a Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-heading uppercase tracking-widest text-sm">Get In Touch</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4 text-foreground">
              Contact Us
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Fill out the form below or contact us directly. We'll get back to you within 24-48 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-card p-8 rounded-xl border border-border">
              <h3 className="font-heading text-2xl font-semibold mb-6 text-foreground">
                Send Us a Message
              </h3>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <a
                href="tel:0113962846"
                className="flex items-start gap-4 bg-card p-6 rounded-xl border border-border hover:border-primary transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">Phone</h3>
                  <div className="space-y-1 text-muted-foreground">
                    <p>011 396 2846</p>
                    <p>083 404 8326</p>
                    <p>063 535 5804</p>
                  </div>
                </div>
              </a>

              <a
                href="mailto:dini@dnrtransmissions.co.za"
                className="flex items-start gap-4 bg-card p-6 rounded-xl border border-border hover:border-primary transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">Email</h3>
                  <p className="text-muted-foreground">dini@dnrtransmissions.co.za</p>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=Unit+7,+21+Sim+Road,+Pomona,+Kempton+Park,+1619"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-card p-6 rounded-xl border border-border hover:border-primary transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">Location</h3>
                  <p className="text-muted-foreground">
                    Unit 7, 21 Sim Road,<br />
                    Pomona, Kempton Park, 1619
                  </p>
                </div>
              </a>

              <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
                <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">Business Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 7:30 AM - 5:00 PM<br />
                  Saturday: 8:00 AM - 1:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="font-heading text-primary-foreground font-bold">D</span>
              </div>
              <span className="font-heading text-lg">
                <span className="text-primary">DNR</span> Transmissions
              </span>
            </div>
            <p className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()} DNR Transmissions. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Index;
