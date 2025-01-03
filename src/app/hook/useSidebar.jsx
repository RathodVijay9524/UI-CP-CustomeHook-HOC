import { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, } from "react-icons/bi";


const routes = [
  { path: "/admin/home", name: "Home", icon: <FaHome /> },
  { path: "/user", name: "Users", icon: <FaUser /> },
  { path: "/admin/dashboard", name: "Dashboard", icon: <MdMessage /> },
  { path: "/admin/active-users", name: "Analytics", icon: <BiAnalyse /> },
];

const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
    routes,
    inputAnimation,
    showAnimation,
  };
};

export default useSidebar;
