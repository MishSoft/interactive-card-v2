import { MouseEvent, useState } from "react";
import { motion, Variants } from "framer-motion";
import "animate.css";
import { FaAngleUp } from "react-icons/fa";

function SelectCards() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [choosedCard, setChoosedCard] = useState<string>("BitCamp");

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const caughtCardName = (e: MouseEvent<HTMLDivElement>) => {
    setChoosedCard((e.target as HTMLDivElement).innerHTML);
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
        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {choosedCard}
        </motion.div>
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="box"
          animate={{ rotate: `${!isOpen ? "180deg" : "0deg"}` }}
          transition={{ type: "spring" }}
        >
          <FaAngleUp />
        </motion.div>
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
        <motion.div onClick={caughtCardName} variants={itemVariants}>
          BitCamp
        </motion.div>
        <motion.div onClick={caughtCardName} variants={itemVariants}>
          King Tamar
        </motion.div>
        <motion.div onClick={caughtCardName} variants={itemVariants}>
          Colliseum
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SelectCards;
