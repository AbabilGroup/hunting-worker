"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import NoSelector from "@/components/common/Noselector";

interface BannerProps {
  text: string;
  className?: string;
  textClassName?: string;
  withMargin?: boolean;
}

const Banner = ({ text, className, textClassName, withMargin = true }: BannerProps) => {
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
        className="bg-primary w-screen relative left-[50%] right-[50%] mx-[-50vw] py-16 sm:py-20 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <NoSelector>
            <div className="flex flex-col items-center justify-center text-center">
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
                      "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                      "font-bold text-white max-w-4xl",
                      "perspective-1000",
                      textClassName
                    )}
                  >
                    {text}
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