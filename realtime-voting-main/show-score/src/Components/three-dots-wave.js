// import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'
import React from "react";
import { motion } from 'framer-motion'

const LoadingDot = {
    display: "block",
    width: "1rem",
    height: "1rem",
    backgroundColor: "#31383E",
    borderRadius: "50%"
};

const LoadingContainer = {
    width: "5rem",
    height: "2rem",
    display: "flex",
    justifyContent: "space-around"
};

const ContainerVariants = {
    initial: {
        scale : 0,
        transition: {
            staggerChildren: 0.2
        }
    },
    animate: {
        scale : 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const DotVariants = {
    initial: {
        y: "0%"
    },
    animate: {
        y: "60%"
    }
};



export default function ThreeDotsWave() {
    return (
        <div

            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                style={LoadingContainer}
                variants={ContainerVariants}
                initial="initial"
                animate="animate"


            >
                <motion.span
                    style={LoadingDot}
                    variants={DotVariants}
                    // transition={DotTransition}
                    transition={{ duration: 1, repeat: Infinity , repeatType : 'mirror'  }}

                />
                <motion.span
                    style={LoadingDot}
                    variants={DotVariants}
                    // transition={DotTransition}
                    transition={{ duration: 1, repeat: Infinity , repeatType : 'mirror' }}

                />
                <motion.span
                    style={LoadingDot}
                    variants={DotVariants}
                    // transition={DotTransition}
                    transition={{ duration: 1, repeat: Infinity , repeatType : 'mirror' }}

                />

            </motion.div>

        </div>
    );
}
