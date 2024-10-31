import React from "react";
// import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'
import { motion } from 'framer-motion'
import { Typography } from "@mui/material";
// Word wrapper
const Wrapper = (props) => {
    // We'll do this to prevent wrapping of words using CSS
    return <Typography color='white' variant="h3" className="word-wrapper">{props.children}</Typography>;
};

// Map API "type" vaules to JSX tag names
const tagMap = {

    heading1: "div"

};
const AnimatedCharacters = (props) => {
    // Framer Motion variant object, for controlling animation
    const item = {
        hidden: {
            y: "200%",

            transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 }
        },
        visible: {
            y: 0,

            transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 }
        }
    };

    //  Split each word of props.text into an array
    const splitWords = props.text.split(" ");

    // Create storage array
    const words = [];

    // Push each word into words array
    for (const [, item] of splitWords.entries()) {
        words.push(item.split(""));
    }

    // Add a space ("\u00A0") to the end of each word
    words.map((word) => {
        return word.push("\u00A0");
    });

    // Get the tag name from tagMap
    const Tag = tagMap[props.type];

    return (
        <Tag>
            {words.map((word, index) => {
                return (
                    // Wrap each word in the Wrapper component
                    <Wrapper key={index}>
                        {words[index].flat().map((element, index) => {
                            return (
                                <span
                                    style={{
                                        overflow: "hidden",
                                        display: "inline-block"
                                    }}
                                    key={index}
                                >
                                    <motion.span
                                        style={{ display: "inline-block" }}
                                        variants={item}
                                    >
                                        {element}
                                    </motion.span>
                                </span>
                            );
                        })}
                    </Wrapper>
                );
            })}
            {/* {} */}
        </Tag>
    );
};

export default AnimatedCharacters;
