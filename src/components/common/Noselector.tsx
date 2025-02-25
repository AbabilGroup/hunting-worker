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
        "select-none",
        className
      )}
    >
      {children}
    </div>
  );
};

export default NoSelector;