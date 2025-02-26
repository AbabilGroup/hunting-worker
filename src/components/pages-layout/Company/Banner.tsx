"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import NoSelector from "@/components/common/Noselector";

interface BannerProps {
  text: string;
  subtitle?: string;
  className?: string;
  textClassName?: string;
  withMargin?: boolean;
}

const Banner = ({ text, subtitle, className, textClassName, withMargin = true }: BannerProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    amount: 0.5 
  });

  useEffect(() => {
    if (isInView && !isFlipped) {
      setIsFlipped(true);
    }
  }, [isInView, isFlipped]);

  return (
    <section className={cn(
      withMargin && "mt-20 mb-20 ",
      className
    )}>
      <div 
        ref={ref} 
        className="bg-primary w-screen relative left-[50%] right-[50%] mx-[-50vw] py-12 sm:py-16 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <NoSelector>
            <div className={cn(
              "flex gap-4",
              subtitle ? "flex-col md:flex-row justify-between items-start md:items-center" : "flex-col items-center justify-center text-center"
            )}>
              <AnimatePresence mode="wait">
                {isInView && (
                  <motion.div
                    key="banner-text"
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className={cn(
                      "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
                      "font-bold text-white leading-tight",
                      subtitle ? "max-w-lg" : "max-w-4xl",
                      textClassName
                    )}
                  >
                    {text}
                  </motion.div>
                )}
                {subtitle && isInView && (
                  <motion.div
                    key="banner-subtitle"
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                      ease: "easeOut",
                    }}
                    className={cn(
                      "text-base sm:text-lg",
                      "text-white/90 leading-snug",
                      "max-w-sm md:max-w-md lg:max-w-lg",
                      "whitespace-pre-wrap break-words"
                    )}
                  >
                    {subtitle}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </NoSelector>
        </div>
      </div>
    </section>
  );
};

export default Banner;