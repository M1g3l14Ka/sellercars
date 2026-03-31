'use client';

import { motion } from "motion/react"; 


export default function ContactUsModal() {

    return (
        <motion.div
            initial={{y:50, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{duration:0.7, ease:"easeOut"}}
            className="min-h-screen w-auto flex flex-col justify-center items-center p-4 gap-4"            
        >
            <div className="w-full">
                <div className="pl-24">
                    <div className="border-orange-600 border-l-2 h-36 flex w-full p-6 items-center justify-start">
                        <h1 className="text-transparent bg-linear-to-r bg-clip-text from-orange-600 to-red-500 font-bold text-2xl ">Ask an expert</h1>
                    </div>
                </div>
            </div>
            <div className="text-center w-full m-2 mb-16">
                <p>
                    Our goal is to become a reliable partner for every client, to 
                    be available every day and at any time to address any questions 
                    that arise and to respond swiftly to any changes.
                </p>
            </div>

            <form action="" className="flex justify-center items-center flex-col">
                <div className="flex flex-col items-center gap-2 mb-6">
                    <label htmlFor="partnering">Are you a company interested in partnering?</label>
                    <input 
                        id="partnering"
                        type="text"
                        placeholder="Company*"
                    />
                </div>
                <div className="flex flex-col items-center gap-6 p-2">
                    <input 
                        type="text" 
                        id="name"
                        placeholder="Name*"
                        required
                        className=""                    
                    />

                    <input 
                        type="text" 
                        id="name"
                        placeholder="Phone*"
                        required
                        className=""                    
                    />

                    <input 
                        type="text" 
                        id="name"
                        placeholder="Topic*"
                        required
                        className=""                    
                    />
                </div>

                <div className="">
                    <label htmlFor="1"></label>
                    <input id="1" type="checkbox" placeholder="" />
                </div>

                <div>
                    <input 
                        type="text" 
                        id="name"
                        placeholder="Brand"
                        className=""                    
                    />

                    <input 
                        type="text" 
                        id="name"
                        placeholder="Model"
                        className=""                    
                    />
                </div>
            </form>
        </motion.div>
    )
}