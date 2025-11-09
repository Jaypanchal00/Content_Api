"use client";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import DarkVeil from "./wail";
import { ArrowRight, SendHorizonalIcon } from "lucide-react";

// Rounded Falling Columns Animation for Hero Section
const FallingColumnsAnimation = () => {
  const { scrollYProgress } = useScroll();

  // Create transforms that hold at 0 until user starts scrolling
  // Then quickly animate to full height
  const column1Height = useTransform(
    scrollYProgress,
    [0, 0.08, 0.16],
    ["0vh", "0vh", "260vh"]
  );
  const column2Height = useTransform(
    scrollYProgress,
    [0, 0.09, 0.18],
    ["0vh", "0vh", "300vh"]
  );
  const column3Height = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2],
    ["0vh", "0vh", "280vh"]
  );
  const column4Height = useTransform(
    scrollYProgress,
    [0, 0.11, 0.22],
    ["0vh", "0vh", "290vh"]
  );

  return (
    <div className="absolute inset-0 w-full h-[300vh] overflow-visible">
      {/* Column 1 - Dark Background/Shadows */}
      <div className="absolute left-0 top-0 w-[25vw] flex justify-center">
        {/* Grid overlay for texture */}

        <motion.div
          className="w-[20vw] rounded-[50px]"
          style={{
            height: column1Height,
            background:
              "linear-gradient(to bottom, #1D232C, rgba(29, 35, 44, 0.7), rgba(29, 35, 44, 0.9))",
            borderTopLeftRadius: "100px",
            borderTopRightRadius: "100px",
            boxShadow: "0 0 20px rgba(29, 35, 44, 0.3)",
          }}
        />

        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
          repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
        `,
          }}
        />
      </div>

      {/* Column 2 - Warm Brown */}
      <div className="absolute left-[25vw] top-0 w-[25vw] flex justify-center">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
          repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
        `,
          }}
        />
        <motion.div
          className="w-[20vw] rounded-[50px]"
          style={{
            height: column2Height,
            background:
              "linear-gradient(to bottom, #6B442A, rgba(107, 68, 42, 0.7), rgba(107, 68, 42, 0.9))",
            borderTopLeftRadius: "100px",
            borderTopRightRadius: "100px",
            boxShadow: "0 0 20px rgba(107, 68, 42, 0.3)",
          }}
        />
      </div>

      {/* Column 3 - Muted Green */}
      <div className="absolute left-[50vw] top-0 w-[25vw] flex justify-center">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
          repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
        `,
          }}
        />
        <motion.div
          className="w-[20vw] rounded-[50px]"
          style={{
            height: column3Height,
            background:
              "linear-gradient(to bottom, #A5B67B, rgba(165, 182, 123, 0.7), rgba(165, 182, 123, 0.9))",
            borderTopLeftRadius: "100px",
            borderTopRightRadius: "100px",
            boxShadow: "0 0 20px rgba(165, 182, 123, 0.3)",
          }}
        />
      </div>

      {/* Column 4 - Orange/Yellow */}
      <div className="absolute left-[75vw] top-0 w-[25vw] flex justify-center">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
          repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
        `,
          }}
        />
        <motion.div
          className="w-[20vw] rounded-[50px]"
          style={{
            height: column4Height,
            background:
              "linear-gradient(to bottom, #D59B55, rgba(213, 155, 85, 0.7), rgba(213, 155, 85, 0.9))",
            borderTopLeftRadius: "100px",
            borderTopRightRadius: "100px",
            boxShadow: "0 0 20px rgba(213, 155, 85, 0.3)",
          }}
        />
      </div>
    </div>
  );
};

// Skills component
const Skills = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {[
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Framer Motion",
        "MongoDB",
      ].map((skill, i) => (
        <motion.span
          key={skill}
          className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  );
};

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  // Hold content at initial state until scrolling begins
  const scale = useTransform(scrollYProgress, [0, 0.01, 0.5], [1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.01, 0.7], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.01, 0.5], [0, 0, -30]);
  // Use useMotionValue and useTransform to animate letterSpacing as a string with "px" unit
  // import { useMotionValue, useTransform } from "framer-motion";
  // ...
  const letterSpacingRaw = useMotionValue(1);
  const spacing = useTransform(letterSpacingRaw, (v) => `${v * 2.8}px`);
  const spacing2 = useTransform(letterSpacingRaw, (v) => `${v * 10}px`);
  const spacing3 = useTransform(letterSpacingRaw, (v) => `${v * 1.9}px`);
  // Animate letterSpacingRaw based on scrollYProgress
  useTransform(scrollYProgress, [0, 1], [1, 100]).onChange((v) =>
    letterSpacingRaw.set(v)
  );
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // setIsClient(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const titles = [
    "FULL STACK DEVELOPER",
    "SOFTWARE DEVELOPER",
    "ENGINEER",
    "REACT DEVELOPER",
    "MEAN STACK DEVELOPER",
    "FRONTEND DEVELOPER",
    "BACKEND DEVELOPER",
  ];

  function AnimatedTitleLoop() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length);
      }, 2000); // Change word every 2 seconds
      return () => clearTimeout(timeout);
    }, [index]);

    return (
      <span className="inline-block relative min-h-[1.5em]">
        <AnimatePresence mode="wait">
          <motion.span
            key={titles[index]}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="block"
            style={{
              wordBreak: "break-word",
              hyphens: "none",
            }}
          >
            {titles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }

  return (
    <section className="relative min-h-[110vh] bg-black text-white overflow-hidden">
      {/* Simple Falling Columns Animation */}
      {/* <FallingColumnsAnimation /> */}
      <div
        style={{
          width: "100%",
          height: "600px",
          position: "absolute",
          // background: "white",
        }}
      >
        <DarkVeil />
      </div>

      {/* <div className="w-full flex justify-center">
        <div className="hero-container absolute top-30 w-[70vw] h-[65vh] rounded-lg justify-center ">
          <Image
            src="/hero.png"
            alt="my work space"
            fill
            style={{
              objectFit: isMobile ? "cover" : "none",
              objectPosition: "",
              borderRadius: "10px",
            }}
          />
        </div>
      </div> */}

      {/* Content container - sticky to stay visible while scrolling */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          className="relative z-20 max-w-4xl mx-auto px-6 text-center "
          style={{ scale, opacity, y }}
        >
          {/* Main heading with gradient */}
          {/* <h2
            className={`font-extrabold mb-4 ${
              isMobile ? "pt-[50vh]" : "pt-[10vh]"
            }`}
            // style={{ letterSpacing: spacing2 }}
          >
            I AM
          </h2> */}
          {/* <motion.div className="w-[80vw] h-[40vh] bg-red-500 mx-auto "></motion.div> */}
          {/* <div className="flex justify-start flex-row"> */}
          <h1
            className="text-6xl  m-0 md:text-8xl lg:text-9xl font-extrabold mb-4 "
            style={
              {
                // backgroundImage:
                //   "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                // backgroundSize: "cover",
                // backgroundClip: "text",
                // WebkitBackgroundClip: "text",
                // color: "transparent",
                // backgroundColor: "white",
                // backgroundBlendMode: "revert-layer",
                // letterSpacing: spacing,
                // textShadow: "0 0 40px rgba(139, 92, 246, 0.3)",
              }
            }
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 1 }}
            // transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            RAHUL
          </h1>
          <h1
            className="text-6xl m-0 md:text-8xl lg:text-9xl font-extrabold mb-4 "
            style={
              {
                // backgroundImage:
                //   "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                // backgroundSize: "cover",
                // backgroundClip: "text",
                // WebkitBackgroundClip: "text",
                // color: "transparent",
                // backgroundColor: "white",
                // backgroundBlendMode: "revert-layer",
                // letterSpacing: spacing,
                // textShadow: "0 0 40px rgba(139, 92, 246, 0.3)",
              }
            }
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 1 }}
            // transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            PANCHAL
          </h1>
          {/* </div> */}
          {/* <motion.h2 className="mt-[0vh]" style={{ letterSpacing: spacing2 }}>
            A FULL STACK DEVELOPER
          </motion.h2> */}
          <h2
            className="mt-[0vh] transition-all duration-300 ease-out text-center"
            style={{
              wordBreak: "break-word",
              hyphens: "none",
            }}
          >
            <AnimatedTitleLoop />
          </h2>
          {/* {window?.innerWidth < 600 && <div className="h-[60vh] "></div>} */}
          {/* <h1
            className={`text-3xl ${
              isMobile ? "mt-[30vh]" : "mt-[80vh]"
            } md:text-6xl lg:text-8xl font-extrabold mb-4 w-full text-center `}
            style={{
              // backgroundImage:
              //   "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
              backgroundSize: "cover",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundColor: "white",
              backgroundBlendMode: "revert-layer",
              // textShadow: "0 0 40px rgba(139, 92, 246, 0.3)",
            }}
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 1 }}
            // transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            Engineer with a passion for creative web development
          </h1> */}

          {/* Profession with typing animation
          <motion.h2
            className="text-xl md:text-2xl font-light mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Full Stack Developer
          </motion.h2> */}

          {/* Short bio */}
          {/* {(() => {
            // The sentence to animate
            const sentence =
              "I build modern web applications with cutting-edge technologies, focusing on performance, accessibility, and beautiful user experiences.";

            // Split sentence into words
            const words = sentence.split(" ");

            // Animate the reveal based on scrollYProgress
            // Assume scrollYProgress is available in scope (0 to 1)
            // We'll reveal the paragraph when scrollYProgress > 0.15, and animate height from 0 to auto
            // We'll also slide up each word with a staggered effect

            // Set the reveal start and end points
            const revealStart = 0.15;
            const revealEnd = 0.3;

            // Map scrollYProgress to a value between 0 and 1 for the reveal
            const revealProgress = useTransform(
              scrollYProgress,
              [revealStart, revealEnd],
              [0, 7]
            );

            // Animate the container's height from 0 to "auto" (using maxHeight for smoothness)
            const maxHeight = useTransform(
              revealProgress,
              [0, 1],
              [0, 200] // 500px is a safe max for this paragraph
            );

            // Animate opacity of the container
            const containerOpacity = useTransform(
              revealProgress,
              [0, 0.1, 1],
              [0, 0.2, 1]
            );

            // For each word, animate its y and opacity with a stagger based on revealProgress
            // We'll use a simple stagger: each word appears as revealProgress increases
            return (
              <motion.div
                style={{
                  overflow: "hidden",
                  maxHeight,
                  opacity: containerOpacity,
                  transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
                className="mb-6"
              >
                <p className="text-lg md:text-xl text-white max-w-2xl mx-auto backdrop-blur-sm bg-black/10 p-4 rounded-lg flex flex-wrap gap-x-1 gap-y-2">
                  {words.map((word, i) => {
                    // Each word's reveal point is staggered
                    const wordStart = (i / words.length) * 0.7; // 0.7 so last words don't wait for 1
                    const wordEnd = wordStart + 0.2; // Each word animates over 0.2 of the progress

                    const wordProgress = useTransform(
                      revealProgress,
                      [wordStart, wordEnd],
                      [0, 1]
                    );

                    return (
                      <motion.span
                        key={i}
                        style={{
                          display: "inline-block",
                          opacity: wordProgress,
                          y: useTransform(wordProgress, [0, 1], [20, 0]),
                          transition: "opacity 0.3s, transform 0.3s",
                        }}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </p>
              </motion.div>
            );
          })()} */}

          {/* Skills tags */}
          <Skills />

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-900 rounded-full font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
            >
              View Projects
            </a>
            <a
              href="/blog"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-900 rounded-full font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
            >
              View Blog
            </a>
            <a
              href="#contact"
              className="px-8 flex flex-row items-center justify-evenly py-3 bg-transparent border border-white/30 backdrop-blur-sm rounded-full font-medium hover:bg-white/10 transition-all duration-300"
            >
              Drop A Quick Message{" "}
              <SendHorizonalIcon className="ml-2" size={20} />
            </a>
          </motion.div>

          {/* Scroll indicator */}
          {/* <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
              <motion.div
                className="w-1.5 h-3 bg-white rounded-full mt-2"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
