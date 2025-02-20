"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ContainerScroll = ({
  titleComponent,
  className,
}: {
  titleComponent: string | React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Adjusted animation values for smoother transition
  const y = useTransform(scrollYProgress, [0, 0.5], [75, 0]); // Increased range and offset
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]); // Slower fade in

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden min-h-[15vh]",
        "flex items-center justify-center",
        className
      )}
    >
      <motion.div
        style={{
          y,
          opacity,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }} // Added smooth transition
        className="max-w-5xl mx-auto py-4 sm:py-6"
      >
        {titleComponent}
      </motion.div>
    </div>
  );
};
