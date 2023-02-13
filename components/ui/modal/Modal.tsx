import React from "react";
import Backdrop from "./Backdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import { useSteps } from "../../../context/StepContext";
const { motion } = require("framer-motion");

type Props = {
  handleClose: () => void;
  children: React.ReactNode;
};

const dropIn = {
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.05,
      ease: "easeIn",
    },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.05,
      ease: "easeOut",
    },
  },
};

const Modal = ({ handleClose, children }: Props) => {
  const { getCurrentStep } = useSteps();

  //TODO: Icon inside modalcontent maybe?
  return (
    <AnimatePresence>
      <Backdrop onClick={handleClose}>
        <motion.div
          key={getCurrentStep}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropIn}
          className={
            "2xl:w-1/3 w-1/2 h-auto bg-white rounded-xl mx-auto my-auto px-2 border-gray-600 border-2 relative transition-all duration-500 ease-in-out"
          }
          onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
        >
          <div
            onClick={handleClose}
            className={
              "absolute top-7 right-7 w-3 h-3 cursor-pointer text-gray-400 hover:text-gray-600 transition-all duration-100 ease-in-out"
            }
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <div className={"p-6 max-h-full"}>{children}</div>
        </motion.div>
      </Backdrop>
    </AnimatePresence>
  );
};

export default Modal;
