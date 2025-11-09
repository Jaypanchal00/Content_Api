"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const HighlightSection = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window?.innerWidth);
    const handleResize = () => setWindowWidth(window?.innerWidth);
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  // Animate the highlight in the second half of the scroll
  const scaleX = useTransform(scrollYProgress, [0.1, 1], [0.1, 1.9]);

  const wave1Progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const wave2Progress = useTransform(scrollYProgress, [0.3, 0.9], [0, 1]);
  const sparkleOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.8],
    [0, 1, 0]
  );
  const sparkleScale = useTransform(scrollYProgress, [0.6, 0.7], [0.5, 1.2]);

  const text = `I build ${windowWidth < 600 ? "cool" : "2222222222"} stuff`;

  // console.log("WAVW1: ", wave1Progress);

  return (
    <div className="w-[10vw] h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      <div className="relative text-center max-w-4xl mx-auto px-4">
        <motion.div
          style={{ scaleX }}
          className="absolute rounded-lg inset-0 bg-gradient-to-r from-red-500 to-blue-500 origin-left z-10"
        />

        <svg
          className="absolute inset-0 w-full h-full z-15"
          viewBox="0 0 400 200"
          style={{ pointerEvents: "none" }}
        >
          {/* First wavy line */}
          <motion.path
            d="M50,100 Q100,50 150,100 T250,100 T350,100"
            stroke="url(#gradient1)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            style={{
              pathLength: wave1Progress,
              filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
            }}
          />

          {/* Second wavy line */}
          <motion.path
            d="M50,120 Q120,80 180,120 T280,120 T380,120"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            style={{
              pathLength: wave2Progress,
              filter: "drop-shadow(0 0 6px rgba(255,255,255,0.4))",
            }}
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#4ecdc4" />
              <stop offset="100%" stopColor="#45b7d1" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#96ceb4" />
              <stop offset="50%" stopColor="#feca57" />
              <stop offset="100%" stopColor="#ff9ff3" />
            </linearGradient>
          </defs>
        </svg>

        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ opacity: sparkleOpacity }}
        >
          {/* Sparkle elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${20 + i * 7}%`,
                top: `${30 + (i % 3) * 20}%`,
                scale: sparkleScale,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Shining light effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            style={{ scale: sparkleScale }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Text with mix-blend-mode for color inversion */}
        <p
          className=" font-bold text-black-500 relative z-30 leading-tight uppercase  flex justify-start "
          // style={{ mixBlendMode: "difference" }}
          style={{
            marginLeft: windowWidth < 600 ? "30px" : "",
            fontSize: windowWidth < 600 ? "1.1em" : "4em",
            width: windowWidth < 600 ? "54vw" : "200vw",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default HighlightSection;
