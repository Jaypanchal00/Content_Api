"use client";
import { motion } from "motion/react";
import CurvedLoop from "./CurvedLoop";
import SmoothCursor from "./SmoothCursor";
import ScrollReveal from "./ScrollReveal";
import ScrollFloat from "./ScrollReveal";
import ScrollVelocity from "./ScrollVelocity";
import { useEffect, useState } from "react";
import {
  ArrowBigLeft,
  ArrowBigLeftDash,
  ArrowDown01Icon,
  ArrowRight,
  ArrowUp10Icon,
  SendHorizonalIcon,
  SendHorizontal,
  TextCursor,
  TextCursorInput,
} from "lucide-react";

const IntroSection = () => {
  const [cursorStatus, setCursorStatus] = useState(true);
  const toggleCustomCursor = () => {
    setCursorStatus(!cursorStatus);
  };
  const name = "Rahul Panchal"; // Placeholder Name
  const role = "Jr. Software Developer";
  const provision =
    "I design and build beautiful, scalable, and user-friendly web applications from concept to completion.";
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
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white py-20">
      {/* <CurvedLoop

                marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"

                speed={3}

                curveAmount={1700}

                direction="right"

                interactive={true}

                className="custom-text-style absolute  w-screen"

              /> */}
      <div className="max-w-4xl mx-auto px-8 text-center">
        <button
          className="fixed top-10 cursor-pointer rotate-[-90deg] p-1 z-999 rounded-full right-10 bg-black text-white"
          onClick={toggleCustomCursor}
        >
          {cursorStatus ? (
            <ArrowRight size={15} />
          ) : (
            <SendHorizontal size={15} />
          )}
        </button>
        {cursorStatus && (
          <SmoothCursor
            size={25}
            // color="white"
            showTrail={false}
            magneticDistance={60}
            magneticElements="[data-magnetic]"
            springConfig={{
              damping: 90,
              stiffness: 450,
              mass: 0.9,
              restDelta: 0.001,
            }}
          />
        )}
        {/* <ScrollVelocity
          texts={[
            `React.js Next.js Framer ${!isMobile ? "GSAP " : ""} `,
            `Node.js Express.js  ${!isMobile ? "MongoDB" : ""}`,
            "TypeScript JavaScript",
          ]}
          // velocity={velocity}

          className="custom-scroll-text w-[100vw]"
        /> */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={15}
          blurStrength={10}
        >
          So..... what I actually do with these Tools & Tech?
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IntroSection;
