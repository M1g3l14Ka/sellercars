'use client';

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
 

export default function Home() {

  return (
    <div className="min-h-screen bg-black text-white">

      <Header/>

      <Hero/>

      <Main/>

      <Footer/>
    </div>
  );
}
