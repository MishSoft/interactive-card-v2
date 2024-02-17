// import React from 'react'
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";

function SelectCards() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "string", stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="select-container"
    >
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="choosedBtn"
      >
        Choose Card <FaAngleDown />
      </motion.div>
      <motion.div
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        className="choosed-list"
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.div variants={itemVariants}>BitCamp</motion.div>
        <motion.div variants={itemVariants}>King Tamar</motion.div>
        <motion.div variants={itemVariants}>Colliseum</motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SelectCards;
