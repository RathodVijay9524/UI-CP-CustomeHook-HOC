import { useState } from "react";

const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!false);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: { duration: 0.2 },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: { duration: 0.2 },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.5 },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: { duration: 0.5 },
    },
  };

  return {
    isOpen,
    toggle,
    inputAnimation,
    showAnimation,
  };
};

export default useSidebar;
