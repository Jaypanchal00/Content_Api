"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface IProject {
  name: string;
  tech: string;
  type: string;
  href: string;
}

export default function ProjectsSection() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("professional");
  const handleProjectClick = (project: IProject) => {
    router.push(project.href);
  };

  const creativeProjects: IProject[] = [
    {
      name: "Rahul Panchal",
      type: "Animated Portfolio",
      tech: "Next.js + Framer Motion + GSAP",
      href: "#",
    },
    {
      name: "Monkee",
      type: "Landing Page Concept",
      tech: "Three.js",
      href: "https://monkee.onrender.com",
    },
    // { name: "Creative Agency Site", tech: "Next.js + CSS Animations", href:"" },
    // { name: "Brand Experience", tech: "WebGL + Canvas" },
    // { name: "Art Installation Web", tech: "P5.js + WebAudio" },
  ];

  const professionalProjects = [
    {
      name: "Hiretrack",
      tech: "Next.js + React.js + MongoDB ",
      href: "https://upforce.hiretrack.in",
      type: "AI powered Multi-Tenent B2B SAAS ",
    },
    {
      name: "Socio",
      tech: "React + Node.js + MongoDB + Express.js",
      href: "https://socio-alpha.vercel.app",
      type: "Social Media Platform",
    },
    {
      name: "Foxus AI",
      tech: "React + Node.js + MongoDB + Express.js",
      href: "https://foxus-ai.onrender.com",
      type: "Educational Course Generator",
    },
    {
      name: "Celestial",
      tech: "React Native + Node.js + MongoDB",
      href: "https://celestial.vercel.app",
      type: "YouTube to MP3 Conversion &  Music Streaming",
    },
    // { name: "CRM Dashboard", tech: "Vue.js + Express + PostgreSQL" },
    // { name: "Inventory System", tech: "Angular + Spring Boot + MySQL" },
    // { name: "Analytics Platform", tech: "React + Python + Chart.js" },
  ];

  const categories = [
    {
      id: "creative",
      label: "Creative",
      description: "Interactive experiences & Visual storytelling",
    },
    {
      id: "professional",
      label: "Professional",
      description: "Business solutions & Enterprise systems",
    },
  ];

  const currentProjects =
    activeCategory === "creative" ? creativeProjects : professionalProjects;

  return (
    <>
      <div className="max-h-[50vh] min-h-[20vh] bg-white text-black text-[10vw] flex flex-col items-center justify- w-full">
        <p className="text-xs text-green-500 w-[50%] flex justify-end items-center">
          the cool stuff
        </p>
        <div className="flex justify-start items-start pb-20" id="projects">
          PROJECTS
        </div>
      </div>
      <div className=" bg-white text-black flex flex-col items-center w-full px-8 mt-[-10px]">
        {/* Toggle Navigation */}
        <div className="w-full max-w-4xl mb-12">
          <div className="relative bg-gray-100 rounded-full p-2 mb-8">
            <motion.div
              className="absolute top-2 bottom-2 bg-black rounded-full"
              initial={false}
              animate={{
                x: activeCategory === "creative" ? 0 : "100%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: "49%" }}
            />

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative z-10 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 w-1/2 ${
                  activeCategory === category.id
                    ? "text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Category Description */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-gray-600 text-lg">
              {categories.find((cat) => cat.id === activeCategory)?.description}
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="w-full max-w-6xl mb-12">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={`${activeCategory}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                onClick={() => handleProjectClick(project)}
              >
                {/* Project Card Content */}
                <div className="relative z-10">
                  <div className="flex flex-row items-center justify-start gap-4">
                    {/* <div
                      className={`w-12 h-12 rounded-xl mb-4 ${
                        activeCategory === "creative"
                          ? "bg-gradient-to-br from-purple-500 to-pink-500"
                          : "bg-gradient-to-br from-blue-500 to-green-500"
                      }`}
                    /> */}

                    <h3 className="text-xl font-bold mb-2 group-hover:text-gray-800 transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm ">{project.type}</p>
                  <p className=" text-[9px] mb-4  ">{project.tech}</p>

                  <div className="flex items-center justify-between">
                    {/* <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        activeCategory === "creative"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {activeCategory === "creative"
                        ? "Creative"
                        : "Professional"}
                    </span> */}

                    <p className="text-gray-400">{project.href}</p>

                    <motion.div
                      className="w-6 h-6 flex items-center justify-center"
                      whileHover={{ x: 5 }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Hover Effect Background */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                    activeCategory === "creative"
                      ? "bg-gradient-to-br from-purple-500 to-pink-500"
                      : "bg-gradient-to-br from-blue-500 to-green-500"
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View All Button */}
        {/* <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mt-12 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
            activeCategory === "creative"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
              : "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg hover:scale-105"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All {activeCategory === "creative" ? "Creative" : "Professional"}{" "}
          Projects
        </motion.button> */}
      </div>
    </>
  );
}
