import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSvgIconProps {
  iconSrc: string;
  className?: string;
}

const AnimatedSvgIcon: React.FC<AnimatedSvgIconProps> = ({
  iconSrc,
  className,
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(iconSrc);
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.statusText}`);
        }

        let svg = await response.text();
        if (!svg.includes("<svg")) {
          throw new Error("Invalid SVG content");
        }

        // Enhanced SVG cleanup
        svg = svg
          // Remove existing styles
          .replace(/<style.*?<\/style>/gs, "")
          .replace(/style=".*?"/g, "")
          // Remove existing classes
          .replace(/class=".*?"/g, "")
          // Remove fill attributes
          .replace(/fill=".*?"/g, "")
          // Remove stroke attributes
          .replace(/stroke=".*?"/g, "")
          .replace(/stroke-width=".*?"/g, "")
          // Add vector-effect to prevent scaling issues
          .replace(
            /(<(?:path|circle|line|polyline|rect).*?)(\/?>)/g,
            '$1 vector-effect="non-scaling-stroke"$2'
          );

        setSvgContent(svg);
        setIsLoaded(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load SVG");
      }
    };

    setIsLoaded(false);
    fetchSvg();
  }, [iconSrc]);

  if (error) {
    console.error("SVG loading error:", error);
    return null;
  }

  if (!svgContent) {
    return null;
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        dangerouslySetInnerHTML={{
          __html: svgContent.replace(
            /<svg/,
            '<svg class="w-full h-full" style="stroke: hsl(var(--primary)); stroke-width: 1.25;"'
          ),
        }}
      />
      <style jsx>{`
        :global(path),
        :global(circle),
        :global(line),
        :global(polyline),
        :global(rect) {
          stroke-dasharray: 1000;
          stroke-dashoffset: ${isLoaded ? 1000 : 0};
          fill: none;
          animation: ${isLoaded ? "draw 2s ease-in-out forwards" : "none"};
        }

        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        :global(svg) {
          isolation: isolate;
        }

        :global(svg *) {
          stroke-width: 1.25;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      `}</style>
    </div>
  );
};

export default AnimatedSvgIcon;
