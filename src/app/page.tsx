"use client";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";
// import ProjectsSection from "@/components/ProjectsSection";

import ScrollingCar from "@/components/ScrollingCar";
import ScrollLockSection from "@/components/ScrollLockSection";
import StaggeredMenu from "@/components/Menu";
import Dock from "@/components/Menu";
import AnimatedList from "@/components/ScrollStack";
import ImageReveal from "@/components/ImageReveal";
import GooeyNav from "@/components/gooeyNav/GooeyNav";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Linkedin } from "lucide-react";
// import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

export default function Home() {
  const dockItems = [
    {
      icon: <>Home</>,

      label: "Home",

      onClick: () => console.log("Home clicked"),
    },

    {
      icon: <>srttings</>,

      label: "Settings",

      onClick: () => console.log("Settings clicked"),
    },

    {
      icon: <>mail</>,

      label: "Messages",

      onClick: () => console.log("Messages clicked"),
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="relative overflow-x-clip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* <div style={{ height: "100vh", background: "#1a1a1a" }}> */}
        {/* <Dock
        items={dockItems}
        position="bottom"
        magnification={70}
        baseItemSize={50}
      /> */}
        {/* </div> */}
        <ScrollingCar />

        <HeroSection />
        {/* <IntroSection /> */}
        <ScrollLockSection />
        {/* About Section */}
        {/* <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-4xl px-8 text-center">
          <h2 className="text-5xl font-bold mb-8 text-gray-800">About Me</h2>
          <p className="text-lg text-gray-600 mb-8">
            I am a passionate software developer specializing in modern web
            technologies. With expertise in React, Next.js, and the MERN stack,
            I build scalable applications that deliver exceptional user
            experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Frontend</h3>
              <p className="text-gray-600">
                React, Next.js, TypeScript, Tailwind CSS
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Backend</h3>
              <p className="text-gray-600">
                Node.js, Express, MongoDB, PostgreSQL
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Tools</h3>
              <p className="text-gray-600">Git, Docker, AWS, Vercel</p>
            </div>
          </div>
        </div>
      </section> */}

        {/* <div className=""> */}

        {/* </div> */}

        {/* <AnimatedList
        className="w-screen"
        // items={items}
        onItemSelect={(item, index) => console.log(item, index)}
        showGradients={true}
        enableArrowNavigation={true}
        displayScrollbar={true}
      /> */}
        <ProjectsSection />

        {/* Blog Section */}
        <section className="min-h-screen flex items-center justify-center bg-white text-black">
          <div className="max-w-4xl px-8 text-center">
            <h2 className="text-5xl font-bold mb-8">Latest Blog Posts</h2>
            <p className="text-xl mb-8">
              Read my thoughts on web development, technology, and software
              engineering.
            </p>
            <a
              href="/blog"
              className="inline-block bg-white text-purple-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Read Blog
            </a>
          </div>
        </section>

        <ContactForm />
        <footer className="flex flex-col justify-center items-center bg-white text-black py-8">
          <p className="text-sm">
            © {new Date().getFullYear()} Rahul Panchal. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://in.linkedin.com/in/rahul-panchal-05610824a">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/rahulpanchal0106">
              <Github size={20} />
            </a>
            <a href="https://www.instagram.com/rahulpanchal_._/">
              <Instagram size={20} />
            </a>
          </div>
        </footer>
        {/* <ImageReveal /> */}

        {/* Projects Section */}
        {/* <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-teal-900 text-white">
        <div className="max-w-6xl px-8">
          <h2 className="text-5xl font-bold mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">SaaS Dashboard</h3>
              <p className="mb-6">
                A comprehensive dashboard built with Next.js, featuring
                real-time analytics, user management, and payment integration.
              </p>
              <div className="flex gap-2 mb-4">
                <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                  Next.js
                </span>
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                  MongoDB
                </span>
                <span className="bg-purple-500 px-3 py-1 rounded-full text-sm">
                  Stripe
                </span>
              </div>
              <button className="bg-white text-green-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                View Project
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                E-commerce Platform
              </h3>
              <p className="mb-6">
                Full-stack e-commerce solution with React frontend, Node.js
                backend, and integrated payment processing.
              </p>
              <div className="flex gap-2 mb-4">
                <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                  React
                </span>
                <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm">
                  Node.js
                </span>
                <span className="bg-red-500 px-3 py-1 rounded-full text-sm">
                  PostgreSQL
                </span>
              </div>
              <button className="bg-white text-green-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                View Project
              </button>
            </div>
          </div>
        </div>
      </section> */}
      </motion.div>
    </AnimatePresence>
  );
}
