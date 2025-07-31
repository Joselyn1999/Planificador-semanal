import React from "react";
import Header from "../components/Landing/Header";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import Footer from "../components/Landing/Footer";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;
