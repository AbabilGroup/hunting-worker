import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface CursorDotProps {
  $isCursorHovering: boolean;
  $cursorStyle: "default" | "pointer" | "text" | "drag";
}

const CursorDot = styled.div<CursorDotProps>`
  width: 8px;
  height: 8px;
  background-color: #404040;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  transform: ${(props) =>
    props.$cursorStyle === "pointer"
      ? "scale(1.5)"
      : props.$cursorStyle === "text"
      ? "scale(0.8)"
      : "scale(1)"};
`;

// Update the CursorCircle styled component
const CursorCircle = styled.div<CursorDotProps>`
  width: 40px;
  height: 40px;
  border: 2px solid #404044;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transition: all 0.2s ease-out;
  transform: ${(props) =>
    props.$cursorStyle === "pointer"
      ? "scale(1.5)"
      : props.$cursorStyle === "text"
      ? "scale(1.8)"
      : props.$cursorStyle === "drag"
      ? "scale(2)" // Reduced scale for drag
      : "scale(1)"};
  opacity: ${(props) =>
    props.$cursorStyle === "pointer"
      ? "0.5"
      : props.$cursorStyle === "text"
      ? "0.4"
      : props.$cursorStyle === "drag"
      ? "0.15" // Reduced opacity for drag
      : "0.2"};
  background-color: ${(props) =>
    props.$cursorStyle === "drag" ? "hsl(var(--primary))" : "transparent"};
  border-color: ${(props) =>
    props.$cursorStyle === "drag" ? "hsl(var(--primary))" : "#404044"};

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 8px;
    height: 2px;
    background-color: hsl(var(--primary));
    display: ${(props) => (props.$cursorStyle === "drag" ? "block" : "none")};
  }

  &::before {
    left: 4px;
    transform: translateY(-50%) rotate(135deg);
  }

  &::after {
    right: 4px;
    transform: translateY(-50%) rotate(-135deg);
  }
`;

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const [cursorStyle, setCursorStyle] = React.useState<
    "default" | "pointer" | "text" | "drag"
  >("default");

  useEffect(() => {
    // Check if device is touch-enabled
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          "msMaxTouchPoints" in navigator
      );
    };

    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);

    // Only add mouse event listeners if not a touch device
    if (!isTouchDevice) {
      const moveCursor = (e: MouseEvent) => {
        if (dotRef.current && circleRef.current) {
          dotRef.current.style.left = `${e.clientX - 4}px`;
          dotRef.current.style.top = `${e.clientY - 4}px`;

          requestAnimationFrame(() => {
            if (circleRef.current) {
              circleRef.current.style.left = `${e.clientX - 20}px`;
              circleRef.current.style.top = `${e.clientY - 20}px`;
            }
          });
        }
      };

      // Update the handleMouseOver function in the useEffect
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (
          target.closest(".carousel-card") ||
          target.closest(".embla__container")
        ) {
          setCursorStyle("drag");
        } else if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.getAttribute("contenteditable") === "true" ||
          target.tagName === "P" ||
          /^H[1-6]$/.test(target.tagName) ||
          target.closest('[contenteditable="true"]') ||
          target.classList.contains("cursor-text")
        ) {
          setCursorStyle("text");
        } else if (
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("cursor-pointer") ||
          target.role === "button"
        ) {
          setCursorStyle("pointer");
        } else {
          setCursorStyle("default");
        }
      };

      document.addEventListener("mousemove", moveCursor);
      document.addEventListener("mouseover", handleMouseOver);

      return () => {
        document.removeEventListener("mousemove", moveCursor);
        document.removeEventListener("mouseover", handleMouseOver);
        window.removeEventListener("resize", checkTouchDevice);
      };
    }
  }, [isTouchDevice]);

  // Don't render custom cursor on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      <CursorDot
        ref={dotRef}
        $isCursorHovering={false}
        $cursorStyle={cursorStyle}
      />
      <CursorCircle
        ref={circleRef}
        $isCursorHovering={false}
        $cursorStyle={cursorStyle}
      />
    </>
  );
};

export default CustomCursor;
