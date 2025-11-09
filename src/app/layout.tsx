import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rahul Panchal | Portfolio",
  other: {
    "google-site-verification": "BUoneEo9olOEoAJEdbAlaeLzoXO5EUz5DOgz7Sc",
  },
  // description:
  //   "Professional portfolio showcasing modern web development projects built with React, Next.js, and MERN stack. Specializing in scalable SaaS applications and e-commerce solutions.",
  description:
    "I am a full stack developer with a passion for building scalable and user-friendly web applications. I build websites and web applications using React, Next.js, and MERN stack. Contact me if you want to work with me.",
  keywords:
    "Full-Stack Developer, React Developer, Next.js, MERN Stack, JavaScript, TypeScript, Web Development, SaaS, Portfolio, Rahul Panchal",
  authors: [{ name: "Rahul Panchal" }],
  openGraph: {
    title: "Rahul Panchal | Portfolio",
    description:
      "I am a full stack developer with a passion for building scalable and user-friendly web applications. I build websites and web applications using React, Next.js, and MERN stack. Contact me if you want to work with me.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Navigation /> */}
        {/* <div className="pt-16"> */}
        {children}
        {/* </div> */}
      </body>
    </html>
  );
}
