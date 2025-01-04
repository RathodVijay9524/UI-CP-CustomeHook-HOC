import useSidebar from '../../../hook/useSidebar';
import PropTypes from 'prop-types';
import { FaBars, FaTachometerAlt, FaTasks, FaUser } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const SuperUserSideBar = ({ children }) => {
  const { isOpen, toggle, inputAnimation, showAnimation } = useSidebar();

  const routes = [
    { path: "/user/dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/user/tasks", name: "Tasks", icon: <FaTasks /> },
    { path: "/user/profile", name: "Profile", icon: <FaUser /> },
  ];

  return (
    <div className="main-container">
      <motion.div animate={{ width: isOpen ? "200px" : "45px", transition: { duration: 0.5, type: "spring", damping: 10 } }} className="sidebar">
        <div className="top_section">
          <AnimatePresence>
            {isOpen && (
              <motion.h1 variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="logo">Super User</motion.h1>
            )}
          </AnimatePresence>

          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="search">
          <div className="search_icon">
            <BiSearch />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.input initial="hidden" animate="show" exit="hidden" variants={inputAnimation} type="text" placeholder="Search" />
            )}
          </AnimatePresence>
        </div>

        <section className="routes">
          {routes.map((route, index) => (
            <NavLink to={route.path} key={index} className="link" activeClassName="active">
              <div className="icon">{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="link_text">{route.name}</motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
      </motion.div>

      <main>{children}</main>
    </div>
  );
};

SuperUserSideBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SuperUserSideBar;