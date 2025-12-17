import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [rpm, setRpm] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const maxRpm = 7000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for realistic rev feel
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentRpm = Math.floor(eased * maxRpm);
      
      setRpm(currentRpm);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onLoadingComplete, 500);
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  }, [onLoadingComplete]);

  // Calculate needle rotation (from -135deg to +135deg for 0-8000 RPM range)
  const needleRotation = -135 + (rpm / 8000) * 270;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Rev Counter */}
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-steel bg-secondary shadow-2xl" />
        
        {/* Tick marks and numbers */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          {/* Background arc */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="hsl(220 10% 20%)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="400"
            strokeDashoffset="133"
            transform="rotate(135 100 100)"
          />
          
          {/* Progress arc */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="hsl(0 75% 45%)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="400"
            strokeDashoffset={400 - (rpm / 8000) * 267}
            transform="rotate(135 100 100)"
            className="transition-all duration-100"
            style={{
              filter: "drop-shadow(0 0 10px hsl(0 75% 45% / 0.5))",
            }}
          />

          {/* Major tick marks */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
            const angle = -135 + num * (270 / 8);
            const rad = (angle * Math.PI) / 180;
            const innerR = 65;
            const outerR = 75;
            const x1 = 100 + innerR * Math.cos(rad);
            const y1 = 100 + innerR * Math.sin(rad);
            const x2 = 100 + outerR * Math.cos(rad);
            const y2 = 100 + outerR * Math.sin(rad);
            const textR = 55;
            const tx = 100 + textR * Math.cos(rad);
            const ty = 100 + textR * Math.sin(rad);

            return (
              <g key={num}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={num >= 6 ? "hsl(0 75% 45%)" : "hsl(0 0% 70%)"}
                  strokeWidth="2"
                />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={num >= 6 ? "hsl(0 75% 45%)" : "hsl(0 0% 70%)"}
                  fontSize="12"
                  fontWeight="bold"
                  className="font-heading"
                >
                  {num}
                </text>
              </g>
            );
          })}

          {/* Minor tick marks */}
          {Array.from({ length: 40 }).map((_, i) => {
            if (i % 5 === 0) return null;
            const angle = -135 + i * (270 / 40);
            const rad = (angle * Math.PI) / 180;
            const innerR = 70;
            const outerR = 75;
            const x1 = 100 + innerR * Math.cos(rad);
            const y1 = 100 + innerR * Math.sin(rad);
            const x2 = 100 + outerR * Math.cos(rad);
            const y2 = 100 + outerR * Math.sin(rad);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(220 10% 40%)"
                strokeWidth="1"
              />
            );
          })}

          {/* Center cap */}
          <circle cx="100" cy="100" r="12" fill="hsl(220 10% 25%)" />
          <circle cx="100" cy="100" r="8" fill="hsl(0 75% 45%)" />
        </svg>

        {/* Needle */}
        <div
          className="absolute top-1/2 left-1/2 w-1 h-24 md:h-28 origin-bottom transition-transform duration-100"
          style={{
            transform: `translate(-50%, -100%) rotate(${needleRotation}deg)`,
          }}
        >
          <div
            className="w-full h-full bg-gradient-to-t from-primary via-primary to-transparent"
            style={{
              clipPath: "polygon(30% 100%, 70% 100%, 50% 0%)",
              filter: "drop-shadow(0 0 8px hsl(0 75% 45% / 0.6))",
            }}
          />
        </div>

        {/* RPM Display */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
          <div className="font-heading text-2xl md:text-3xl font-bold text-foreground tabular-nums">
            {rpm.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest">
            RPM
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className="mt-8 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-pulse">
          <span className="font-heading text-primary-foreground font-bold">D</span>
        </div>
        <span className="font-heading text-xl tracking-wide">
          <span className="text-primary">DNR</span>
          <span className="text-foreground"> Transmissions</span>
        </span>
      </div>

      {/* Loading text */}
      <p className="mt-4 text-muted-foreground text-sm animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default LoadingScreen;
