

// import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'
import React, { useEffect, useState } from "react";
import AnimatedText from "./AnimatedText";
import "./styles.css";
import { motion } from 'framer-motion'


export default function Incoming() {
    const [replay, setReplay] = useState(true);
    // Placeholder text data, as if from API
    const placeholderText = [
        { type: "heading1", text: "INCOMING" },
    ];

    const container = {
        visible: {
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    // Quick and dirt for the example
    const handleReplay = () => {
        setReplay(!replay);
        setTimeout(() => {
            setReplay(true);
        }, 600);
    };

    useEffect(() => {

        let loop  = setInterval(() => {
            handleReplay()
        }, 5000);

        return () => clearInterval(loop)

    },[])


    return (
        <motion.div
            initial="hidden"
            // animate="visible"
            animate={replay ? "visible" : "hidden"}
            variants={container}
        >
            <div>
                {placeholderText.map((item, index) => {
                    return <AnimatedText {...item} key={index} />;
                })}
            </div>

        </motion.div>

    )
}
