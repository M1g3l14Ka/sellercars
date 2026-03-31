'use client';

import { motion } from "framer-motion";

export default function Header() {

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <h1 className="text-2xl font-bold bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  MILLION CARS
                </h1>
                <nav className="hidden md:flex items-center gap-8">
                  <a href="#inventory" className="text-zinc-400 hover:text-white transition-colors">Inventory</a>
                  <a href="#about" className="text-zinc-400 hover:text-white transition-colors">About</a>
                  <a href="#contact" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
                </nav>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                  Get Started
                </button>
              </div>
            </div>
        </motion.header>
    )
}

