import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NoSelectorProps {
  children: ReactNode;
  className?: string;
}

const NoSelector = ({ children, className }: NoSelectorProps) => {
  return (
    <div
      className={cn(
        "select-none pointer-events-auto",
        "-webkit-user-select: none",
        "-moz-user-select: none",
        "-ms-user-select: none",
        className
      )}
    >
      {children}
    </div>
  );
};

export default NoSelector;