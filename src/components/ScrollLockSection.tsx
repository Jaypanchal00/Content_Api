"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import Shuffle from "@/shuffle/Shuffle";
// import HighlightSection from "./HighlightSection";

const MissionText = () => {
  // const missionText = "I build B2B SAAS web apps using Next.js";
  // const words = missionText.split(" ");

  // This scrollYProgress is local to the MissionText component's parent
  const { scrollYProgress } = useScroll();
  // const wordsToHighlight = useTransform(
  //   scrollYProgress,
  //   [0, 0.5], // Animate words in the first half of the scroll
  //   [0, words.length]
  // );
  const scaleX = useTransform(scrollYProgress, [0.1, 0.6], [0, 2.9]);

  return (
    <div className="max-w-5xl px-8 text-center">
      {/* <h2 className="text-7xl font-bold mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        My Mission
      </h2> */}
      <div className="text-3xl leading-relaxed font-light">
        <motion.div
          style={{ scaleX }}
          className="absolute rounded-xl h-[100vh] inset-0 bg-white origin-left z-10"
        />
        {/* {words.map((word, index) => {
          const isHighlighted = index < wordsToHighlight.get();
          return (
            <span
              key={index}
              className={`inline-block mr-3 transition-colors duration-200 ${
                isHighlighted ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              {word}
            </span>
          );
        })} */}
      </div>
    </div>
  );
};

const HighlightSection = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  // State to track if the component is running in the browser
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This code runs only in the browser
    setIsClient(true);
  }, []);

  useEffect(() => {
    // setIsClient(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animate the highlight in the second half of the scroll
  const scaleX = useTransform(scrollYProgress, [0, 1.2], [0, 1.7]);

  // Conditionally determine the text based on window width
  // const text = isClient
  //   ? `I build ${window.innerWidth < 600 ? "cool" : "Cool"} stuff`
  //   : "I build cool stuff"; // Fallback text for server-side rendering

  // Calculate total work experience dynamically from a given start date
  const workStartDate = new Date("2021-06-01"); // YYYY-MM-DD format for reliability
  const now = new Date();
  // Calculate the difference in milliseconds
  const diffMs = now.getTime() - workStartDate.getTime();
  // Convert milliseconds to years, months, days
  const diffDate = new Date(diffMs);
  // Calculate years and months manually for accuracy
  let years = now.getFullYear() - workStartDate.getFullYear();
  let months = now.getMonth() - workStartDate.getMonth();
  let days = now.getDate() - workStartDate.getDate();
  if (days < 0) {
    months -= 1;
    // Get days in previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const text = `Exploring tech for ${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""} & ${days} day${days !== 1 ? "s" : ""}`;
  const wave1Progress = useTransform(scrollYProgress, [0, 5], [0, 1.6]);
  const wave2Progress = useTransform(scrollYProgress, [0, 2.5], [0, 1.8]);
  const sparkleOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.8],
    [0, 1, 0]
  );
  const sparkleScale = useTransform(scrollYProgress, [0.6, 0.7], [0.5, 1.2]);

  return (
    <>
      {/* <p className="text-black z-9999 fixed top-2 left-10 bg-white border">
        {String(wave1Progress)}
      </p> */}
      {
        <svg
          className="absolute inset-0 w-[250vw] h-full z-15"
          viewBox="0 0 2000 1000"
          preserveAspectRatio="xMidYMid slice"
          style={{ pointerEvents: "none", zIndex: 50 }}
        >
          <motion.path
            d="M100,700 Q500,300 800,500 T1400,500 T1900,500"
            stroke="#71f1a1"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            style={{
              pathLength: wave2Progress,
              strokeDasharray: wave2Progress, // New: Makes the dash equal to the path length
              strokeDashoffset: wave2Progress, // New: Initially offsets the dash to hide it
              // filter: "drop-shadow(0 0 15px rgb(255, 0, 0))",
            }}
          />
        </svg>
      }
      <svg
        className="absolute inset-0 w-[250vw] h-full z-15"
        viewBox="0 0 2000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{ pointerEvents: "none", zIndex: 10 }}
      >
        {/* First wavy line - much larger scale */}
        {/* <motion.path
          d="M100,700 Q400,200 700,400 T1300,400 T1900,400 T2500,400 T3100,400 T3700,400"
          stroke="#71f1a1"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          style={{
            pathLength: wave1Progress,
            filter: "drop-shadow(0 0 20px rgba(255,255,255,0.8))",
            zIndex: 50,
          }}
        /> */}

        {/* Third wavy line for more dynamic effect */}
        {/* <motion.path
          d="M100,600 Q350,450 650,600 T1150,600 T1900,600"
          stroke="black"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          style={{
            pathLength: wave2Progress,
            filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))",
          }}
        /> */}
        <motion.path
          d="M100,700 Q250,450 550,600 T1150,600 T1900,600 T2500,600 T3100,600 T3700,600"
          stroke="#71f1a1"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          style={{
            pathLength: wave2Progress,
            filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))",
          }}
        />
        <motion.path
          d="M100,700 Q250,550 550,600 T1150,600 T1900,700 T1900,700"
          stroke="#71f1a1"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          style={{
            pathLength: wave2Progress,
            filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))",
          }}
        />
        {/* Gradient definitions */}
        <defs>
          {/* Lime green gradients for gradient1 and gradient2 */}
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#bfff00" /> {/* light lime green */}
            <stop offset="50%" stopColor="#32cd32" /> {/* lime green */}
            <stop offset="100%" stopColor="#228B22" /> {/* forest green */}
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#adff2f" /> {/* green yellow */}
            <stop offset="50%" stopColor="#7CFC00" /> {/* lawn green */}
            <stop offset="100%" stopColor="#32cd32" /> {/* lime green */}
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a8e6cf" />
            <stop offset="50%" stopColor="#ff8b94" />
            <stop offset="100%" stopColor="#b4a7d6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="w-[10vw] h-screen flex items-center justify-center bg-black text-white relative">
        <div className="relative text-center max-w-4xl mx-auto px-4">
          {/* Background highlight that scales */}
          <motion.div
            style={{
              scaleX,
              // background: "white",
            }}
            className="absolute rounded-lg inset-0 origin-left z-10"
          />

          {/* Text with mix-blend-mode for color inversion */}
          {/* <p
            className="font-bold text-black-500 relative z-20 leading-tight uppercase flex justify-start"
            style={{
              marginLeft: isClient && window.innerWidth < 600 ? "30px" : "",
              fontSize: isClient && window.innerWidth < 600 ? "1.1em" : "4em",
              width: isClient && window.innerWidth < 600 ? "54vw" : "200vw",
            }}
          >
           {text}
          </p> */}
          <div
            className="font-bold text-black relative z-20 leading-tight uppercase flex items-center justify-start "
            style={{
              paddingBottom: isMobile ? "4px" : "10px",
              marginLeft: isClient && window.innerWidth < 600 ? "30px" : "",
              fontSize: isClient && window.innerWidth < 600 ? "2em" : "4em",
              width: isClient && window.innerWidth < 600 ? "150vw" : "200vw",
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </>
  );
};

export default function ScrollLockSection() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // This controls the horizontal scroll of the entire carousel
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black text-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {/* Section 1: Mission Text */}
          <div className="w-screen h-screen flex items-center justify-center">
            <MissionText />
          </div>
          {/* Section 2: Highlight Animation */}
          <HighlightSection scrollYProgress={scrollYProgress} />
          {/* Section 2: Highlight Animation */}
          {/* <div className="w-screen h-screen flex items-center justify-center">
            <MissionText />
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
