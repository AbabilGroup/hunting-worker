import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  return (
    <div
      className={cn(
        "relative w-screen bg-primary overflow-hidden", // Changed w-full to w-screen
        "py-8 sm:py-12 md:py-16 lg:py-20", // Fixed lg:py typo and added value
        "-mx-[calc((100vw-100%)/2)]", // Compensate for any scrollbar width
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={cn(
            "mx-auto",
            buttonText
              ? "flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8"
              : "text-center max-w-[95%] sm:max-w-2xl lg:max-w-3xl"
          )}
        >
          <div
            className={cn(
              "space-y-4 sm:space-y-6",
              buttonText ? "flex-1 w-full sm:w-auto" : "mx-auto",
              "text-center sm:text-left"
            )}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "font-bold text-white",
                "text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                "leading-tight",
                buttonText ? "mb-2 sm:mb-0" : ""
              )}
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={cn(
                  "text-white/90",
                  "text-xs xs:text-sm sm:text-base md:text-lg",
                  "leading-relaxed",
                  "max-w-full sm:max-w-[90%]",
                  "mt-2 sm:mt-3"
                )}
              >
                {subtitle}
              </motion.div>
            )}
          </div>

          {buttonText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="shrink-0 w-full sm:w-auto mt-6 sm:mt-0"
            >
              <button
                onClick={onButtonClick}
                className={cn(
                  "w-full sm:w-auto",
                  "px-4 sm:px-6 lg:px-8",
                  "py-2.5 sm:py-3 lg:py-4",
                  "rounded-lg",
                  "bg-white text-primary font-medium",
                  "transform transition-all duration-200",
                  "hover:bg-white/90 hover:scale-105",
                  "text-sm sm:text-base",
                  "whitespace-nowrap",
                  "shadow-sm hover:shadow-md"
                )}
              >
                {buttonText}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
