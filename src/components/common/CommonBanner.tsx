"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface CommonBannerProps {
  title: string;
  subtitle?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const CommonBanner = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  className,
}: CommonBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [200, 0]); 
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]); 

  return (
    <div className="flex justify-center w-full py-14 md:py-28 " ref={containerRef}>
      <motion.div
        style={{ 
          opacity, 
          y,
          scale,
          transformOrigin: "center bottom"
        }}
        transition={{ 
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1] 
        }}
        className={cn(
          "relative w-[90%] bg-primary overflow-hidden", 
          "rounded-xl",
          "min-h-[35vh]", 
          "flex items-center",
          "transform-gpu", 
          "perspective-1000", 
          className
        )}
      >
        <div className="w-full px-8 py-12 sm:px-10 sm:py-16 md:py-20"> {/* Increased internal padding */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-10">
            
            <div className="w-full sm:w-2/3 space-y-3">
              <h1 className={cn(
                "font-bold text-white",
                "text-lg sm:text-2xl md:text-3xl lg:text-4xl",
                "leading-tight"
              )}>
                {title}
              </h1>
              {subtitle && (
                <div className={cn(
                  "text-white/90",
                  "text-sm sm:text-base md:text-lg",
                  "leading-relaxed"
                )}>
                  {subtitle}
                </div>
              )}
            </div>

            {/* Button Container  */}
            {buttonText && (
              <div className="w-full sm:w-auto shrink-0">
                <button
                  onClick={onButtonClick}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={cn(
                    "w-full sm:w-auto",
                    "px-6 sm:px-8",
                    "py-3 sm:py-4",
                    "rounded-lg",
                    "bg-white text-primary font-medium",
                    "transform transition-all duration-200",
                    "hover:bg-white/90",
                    "text-sm sm:text-base",
                    "whitespace-nowrap",
                    "shadow-sm hover:shadow-md",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  <span>{buttonText}</span>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: isHovered ? "auto" : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CommonBanner;
