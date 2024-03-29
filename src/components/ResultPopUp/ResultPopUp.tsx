// import React from 'react'
import { motion } from "framer-motion";
import { FormContext } from "../../context/FormContext";
import { useContext } from "react";
// import htmlToImage from "html-to-image";

function ResultPopUp() {
  const { handleDownload } = useContext(FormContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="popup-container"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="popup"
      >
        <svg
          width="80"
          height="80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="40" fill="url(#a)" />
          <path
            id="animatedPath"
            d="M28 39.92 36.08 48l16-16"
            stroke="#fff"
            stroke-width="3"
            stroke-dasharray="66.3"
            stroke-dashoffset="66.3"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="66.3"
              to="0"
              dur="1s"
              begin="0s"
              fill="freeze"
            />
          </path>
          <defs>
            <linearGradient
              id="a"
              x1="-23.014"
              y1="11.507"
              x2="0"
              y2="91.507"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#6348FE" />
              <stop offset="1" stop-color="#610595" />
            </linearGradient>
          </defs>
        </svg>
        <h2>thank you!</h2>
        <h3>We've added your card details. You can download it.</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="download-btn"
          onClick={handleDownload}
        >
          Download
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default ResultPopUp;
