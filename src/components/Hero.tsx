'use client';

import { motion } from "framer-motion";

export default function Hero() {

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{duration:0.8, ease:"easeIn"}}
        >
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-orange-900/20 via-black to-red-900/20" />

              <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Premium Cars from
                  <span className="block bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    South Korea
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-3xl mx-auto">
                  Discover the best deals on quality used cars. Direct from ENCAR - Korea&apos;s largest automotive marketplace.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="#inventory"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
                  >
                    Browse Inventory
                  </a>
                  <a 
                    href="#contact"
                    className="border border-zinc-700 hover:border-zinc-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
                  >
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
              </div>
            </div>
        </motion.div>
    )
}
