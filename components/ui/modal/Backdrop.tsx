import React from "react";
const { motion, AnimatePresence } = require("framer-motion");

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const Backdrop = ({ children, onClick }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      }}
      className={
        "absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex flex-wrap items-center justify-center"
      }
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
