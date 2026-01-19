"use client";

import { useEffect } from "react";
import { NavbarNew as Navbar } from "@/components/layout/NavbarNew";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
// import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <Hero />
        {/* About Section */}
        <About />
        {/* Skills Section */}
        <Skills />
        {/* Projects Section */}
        <Projects />
        {/* Experience Section */}
        <Experience />
        {/* Testimonials Section - Commented out for now */}
        {/* <Testimonials /> */}
        {/* Contact Section */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}