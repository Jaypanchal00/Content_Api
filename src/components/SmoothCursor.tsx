"use client";

import { motion, useSpring } from "framer-motion";
import { FC, JSX, useEffect, useRef, useState } from "react";

// Utility function 'cn' (classnames) - implemented directly to resolve import error
function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}

interface Position {
  x: number;
  y: number;
}

export interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  restDelta: number;
}

export interface SmoothCursorProps {
  cursor?: JSX.Element;
  springConfig?: SpringConfig;
  className?: string;
  size?: number;
  color?: string;
  hideOnLeave?: boolean;
  trailLength?: number;
  showTrail?: boolean;
  rotateOnMove?: boolean;
  scaleOnClick?: boolean;
  glowEffect?: boolean;
  magneticDistance?: number;
  magneticElements?: string;
  onCursorMove?: (position: Position) => void;
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
  disabled?: boolean;
  dynamicColor?: boolean;
  colorSampleSize?: number;
}

// Convert hex to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Convert RGB to hex
const rgbToHex = (r: number, g: number, b: number) => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

// Invert RGB color values
const invertColor = (r: number, g: number, b: number) => {
  return {
    r: 255 - r,
    g: 255 - g,
    b: 255 - b,
  };
};

// Enhanced background color detection with inversion
const getInvertedBackgroundColor = (x: number, y: number): string => {
  console.log("Sampling color at:", x, y);

  try {
    // Get the element at the cursor position
    const element = document.elementFromPoint(x, y) as HTMLElement;
    if (!element) {
      console.log("No element found, using inverted white (black)");
      return "#000000"; // inverted white
    }

    console.log("Element found:", element.tagName, element.className);

    // Walk up the DOM tree to find a visible background
    let currentElement: HTMLElement | null = element;
    let attempts = 0;
    const maxAttempts = 20;

    while (currentElement && attempts < maxAttempts) {
      const computedStyle = window.getComputedStyle(currentElement);
      const bgColor = computedStyle.backgroundColor;
      const bgImage = computedStyle.backgroundImage;

      console.log(
        "Checking element:",
        currentElement.tagName,
        "bgColor:",
        bgColor,
        "bgImage:",
        bgImage
      );

      // Check for background image first
      if (bgImage && bgImage !== "none") {
        console.log("Found background image, using inverted mid-gray");
        return "#808080"; // Assume mid-gray background, invert to mid-gray
      }

      // Parse background color
      if (
        bgColor &&
        bgColor !== "rgba(0, 0, 0, 0)" &&
        bgColor !== "transparent"
      ) {
        // Handle different color formats
        let r = 255,
          g = 255,
          b = 255; // default to white

        if (bgColor.startsWith("rgb(")) {
          const matches = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (matches) {
            r = parseInt(matches[1]);
            g = parseInt(matches[2]);
            b = parseInt(matches[3]);
          }
        } else if (bgColor.startsWith("rgba(")) {
          const matches = bgColor.match(
            /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/
          );
          if (matches) {
            const alpha = parseFloat(matches[4]);
            if (alpha > 0.5) {
              // Only use if not too transparent
              r = parseInt(matches[1]);
              g = parseInt(matches[2]);
              b = parseInt(matches[3]);
            }
          }
        } else if (bgColor.startsWith("#")) {
          const hex = hexToRgb(bgColor);
          if (hex) {
            r = hex.r;
            g = hex.g;
            b = hex.b;
          }
        }

        // Invert the color
        const inverted = invertColor(r, g, b);
        const invertedHex = rgbToHex(inverted.r, inverted.g, inverted.b);

        console.log(
          "Found background color:",
          bgColor,
          "RGB:",
          r,
          g,
          b,
          "Inverted:",
          invertedHex
        );
        return invertedHex;
      }

      currentElement = currentElement.parentElement;
      attempts++;
    }

    // Check body and html as fallbacks
    const bodyStyle = window.getComputedStyle(document.body);
    const bodyBg = bodyStyle.backgroundColor;
    console.log("Body background:", bodyBg);

    if (bodyBg && bodyBg !== "rgba(0, 0, 0, 0)" && bodyBg !== "transparent") {
      const matches = bodyBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (matches) {
        const r = parseInt(matches[1]);
        const g = parseInt(matches[2]);
        const b = parseInt(matches[3]);
        const inverted = invertColor(r, g, b);
        const invertedHex = rgbToHex(inverted.r, inverted.g, inverted.b);

        console.log(
          "Using body color - RGB:",
          r,
          g,
          b,
          "Inverted:",
          invertedHex
        );
        return invertedHex;
      }
    }

    // Ultimate fallback - check if we have a dark or light theme
    const htmlStyle = window.getComputedStyle(document.documentElement);
    const colorScheme = htmlStyle.colorScheme;
    console.log("Color scheme:", colorScheme);

    if (colorScheme === "dark") {
      // Dark theme typically has dark backgrounds, so invert to light
      return "#ffffff"; // inverted black
    }

    // Final fallback - assume white background, invert to black
    console.log("Using final fallback: inverted white (black)");
    return "#000000";
  } catch (error) {
    console.error("Error detecting background color:", error);
    return "#000000";
  }
};

const DefaultCursorSVG: FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ size = 25, color = "black", className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * 2}
      height={size * 2.16}
      viewBox="0 0 50 54"
      fill="none"
      className={cn("pointer-events-none", className)}
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill={color}
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export function SmoothCursor({
  cursor,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
  className,
  size = 25,
  color = "black",
  hideOnLeave = true,
  trailLength = 5,
  showTrail = false,
  rotateOnMove = true,
  scaleOnClick = true,
  glowEffect = false,
  magneticDistance = 50,
  magneticElements = "[data-magnetic]",
  onCursorMove,
  onCursorEnter,
  onCursorLeave,
  disabled = false,
  dynamicColor = false,
  colorSampleSize = 1,
}: SmoothCursorProps) {
  const [isMoving, setIsMoving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<Position[]>([]);
  const [currentColor, setCurrentColor] = useState(color);

  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const colorUpdateThrottle = useRef<number>(0);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  });

  // Initialize color on mount
  useEffect(() => {
    if (dynamicColor) {
      console.log("Initializing dynamic inverted color...");
      // Sample center of screen initially
      const initialColor = getInvertedBackgroundColor(
        window.innerWidth / 2,
        window.innerHeight / 2
      );
      console.log("Initial inverted color set to:", initialColor);
      setCurrentColor(initialColor);
    } else {
      setCurrentColor(color);
    }
  }, [dynamicColor, color]);

  useEffect(() => {
    if (disabled) return;

    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }

      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const updateTrail = (pos: Position) => {
      if (!showTrail) return;

      setTrail(function (prev) {
        var newTrail = [pos].concat(prev.slice(0, trailLength - 1));
        return newTrail;
      });
    };

    const updateDynamicColor = (x: number, y: number) => {
      if (!dynamicColor) return;

      const now = Date.now();
      // Throttle color updates to every 100ms for better performance
      if (now - colorUpdateThrottle.current < 100) return;

      colorUpdateThrottle.current = now;
      const newColor = getInvertedBackgroundColor(x, y);

      if (newColor !== currentColor) {
        console.log(
          "🎨 Inverted color changed from",
          currentColor,
          "to",
          newColor
        );
        setCurrentColor(newColor);
      }
    };

    const findMagneticElement = (x: number, y: number) => {
      const elements = document.querySelectorAll(magneticElements);

      for (const element of Array.from(elements)) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );

        if (distance < magneticDistance) {
          return { x: centerX, y: centerY, distance };
        }
      }
      return null;
    };

    const smoothMouseMove = (e: MouseEvent) => {
      let currentPos = { x: e.clientX, y: e.clientY };

      // Update dynamic color FIRST
      updateDynamicColor(currentPos.x, currentPos.y);

      // Check for magnetic elements
      const magneticTarget = findMagneticElement(currentPos.x, currentPos.y);
      if (magneticTarget) {
        const strength = 1 - magneticTarget.distance / magneticDistance;
        currentPos = {
          x: currentPos.x + (magneticTarget.x - currentPos.x) * strength * 0.3,
          y: currentPos.y + (magneticTarget.y - currentPos.y) * strength * 0.3,
        };
      }

      updateVelocity(currentPos);
      updateTrail(currentPos);

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      );

      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      onCursorMove?.(currentPos);

      if (speed > 0.1 && rotateOnMove) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
          90;

        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        scale.set(0.95);
        setIsMoving(true);

        const timeout = setTimeout(function () {
          scale.set(1);
          setIsMoving(false);
        }, 150);

        return function () {
          return clearTimeout(timeout);
        };
      }
    };

    const handleMouseEnter = function () {
      setIsVisible(true);
      onCursorEnter?.();
    };

    const handleMouseLeave = function () {
      if (hideOnLeave) {
        setIsVisible(false);
      }
      onCursorLeave?.();
    };

    const handleMouseDown = function () {
      if (scaleOnClick) {
        setIsClicking(true);
        scale.set(0.8);
      }
    };

    const handleMouseUp = function () {
      if (scaleOnClick) {
        setIsClicking(false);
        scale.set(1);
      }
    };

    let rafId: number;
    const throttledMouseMove = function (e: MouseEvent) {
      if (rafId) return;

      rafId = requestAnimationFrame(function () {
        smoothMouseMove(e);
        rafId = 0;
      });
    };

    document.body.style.cursor = "none";
    window?.addEventListener("mousemove", throttledMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return function () {
      window?.removeEventListener("mousemove", throttledMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "auto";
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    cursorX,
    cursorY,
    rotation,
    scale,
    disabled,
    showTrail,
    trailLength,
    rotateOnMove,
    scaleOnClick,
    hideOnLeave,
    magneticDistance,
    magneticElements,
    onCursorMove,
    onCursorEnter,
    onCursorLeave,
    dynamicColor,
    colorSampleSize,
    currentColor,
  ]);

  if (disabled || !isVisible) return null;

  //   console.log("Rendering cursor with inverted color:", currentColor);

  return (
    <>
      {/* Trail Effect */}
      {showTrail &&
        trail.map(function (pos, index) {
          return (
            <motion.div
              key={index}
              style={{
                position: "fixed",
                left: pos.x,
                top: pos.y,
                translateX: "-50%",
                translateY: "-50%",
                zIndex: 99 - index,
                pointerEvents: "none",
                opacity: ((trailLength - index) / trailLength) * 0.5,
                scale: ((trailLength - index) / trailLength) * 0.8,
                backgroundColor: currentColor,
              }}
              className="w-2 h-2 rounded-full"
            />
          );
        })}

      {/* Main Cursor */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotateOnMove ? rotation : 0,
          scale: scale,
          zIndex: 100,
          pointerEvents: "none",
          willChange: "transform",
          filter: glowEffect
            ? "drop-shadow(0 0 10px " + currentColor + "40)"
            : "none",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className={cn("select-none", className)}
      >
        <DefaultCursorSVG size={size} color={currentColor} />
      </motion.div>
    </>
  );
}

export default SmoothCursor;
