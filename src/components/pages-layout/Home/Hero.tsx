import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ImageFrameBorder } from "@/animation/imageframeborder";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex items-center overflow-hidden py-0 lg:py-0">
      <div className="container mx-auto px-4 pt-0 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
          {/* Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={cn(
              "relative w-full",
              "max-w-[200px] xs:max-w-[280px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[600px]",
              "aspect-square",
              "mx-auto",
              "order-1 lg:order-2",
              "-mt-14 sm:mt-0 mb-8 sm:mb-0"
            )}
          >
            <ImageFrameBorder />
          </motion.div>

          {/* Content - Left Side */}
          <div className="order-2 lg:order-1 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="space-y-4"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-800"
              >
                We connect the right workers with the right employers.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl"
              >
                Find the perfect match for your business needs or career goals
                with our comprehensive platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-2 sm:pt-4"
              >
                <motion.button
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-white font-semibold",
                    "bg-gradient-to-r from-red-500 to-red-600",
                    "transform transition-all duration-200",
                    "text-xs sm:text-sm lg:text-base"
                  )}
                >
                  Looking for Workers
                </motion.button>
                <motion.button
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg font-semibold",
                    "bg-white text-gray-800",
                    "border border-gray-200",
                    "transform transition-all duration-200",
                    "text-xs sm:text-sm lg:text-base"
                  )}
                >
                  Looking for an Employer
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
