import React, { useState } from "react";
import NewMenuItemCard from "./NewMenuItemCard";
import NewMenuItemButton from "./NewMenuItemButton";
import { AnimatePresence } from "framer-motion";
const { motion } = require("framer-motion");

const dropIn = {
  hidden: {
    y: -40,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "tween",
      stiffness: 100,
    },
  },
  exit: {
    y: -100,
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const NewMenuItem = () => {
  const [addingMenuItem, setAddingMenuItem] = useState(false);

  return (
    <div>
      {!addingMenuItem ? (
        <NewMenuItemButton onClick={() => setAddingMenuItem(true)} />
      ) : (
        <AnimatePresence>
          <motion.div
            animate="visible"
            initial="hidden"
            exit="exit"
            variants={dropIn}
            key={addingMenuItem}
          >
            <h1
              className={
                "py-2 text-gray-400 font-proxima font-semibold text-sm uppercase tracking-wider"
              }
            >
              ADDING A NEW MEAL
            </h1>
            <NewMenuItemCard onAdd={() => setAddingMenuItem(false)} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default NewMenuItem;
