"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CustomBannerProps {
  text?: string;
  subtitle?: string;
  variant?: "primary" | "white";
  className?: string;
  withMargin?: boolean;
}

const CustomBanner = ({ 
  text, 
  subtitle, 
  variant = "white", 
  className,
  withMargin = true 
}: CustomBannerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true,
    amount: 0.3 
  });
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isInView && !isFlipped) {
      setIsFlipped(true);
    }
  }, [isInView, isFlipped]);

  return (
    <section className={cn(
      withMargin && "mt-8 mb-8", 
      className
    )}>
      <div 
        ref={ref}
        className={cn(
          "w-screen relative left-[50%] right-[50%] mx-[-50vw] py-16 sm:py-20 lg:py-24 overflow-hidden", 
          variant === "primary" ? "bg-primary" : "bg-white"
        )}>
        <div className="container mx-auto px-4">
          <div className={cn(
            "flex gap-6", // Increased gap
            subtitle ? "flex-col md:flex-row justify-between items-start md:items-center" : "flex-col items-center justify-center text-center"
          )}>
            {text && isInView && (
              <motion.div
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className={cn(
                  "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight", 
                  variant === "primary" ? "text-white" : "text-gray-900",
                  subtitle ? "max-w-lg" : "max-w-4xl"
                )}>
                {text}
              </motion.div>
            )}
            
            {subtitle && isInView && (
              <motion.div
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: "easeOut",
                }}
                className={cn(
                  "text-base sm:text-lg leading-relaxed",
                  variant === "primary" ? "text-white/90" : "text-gray-600",
                  "max-w-xl"
                )}>
                {subtitle}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomBanner;