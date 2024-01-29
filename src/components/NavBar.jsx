import React, { useState } from "react";

import {
  faBars,
  faBook,
  faBriefcase,
  faCalendarAlt,
  faChalkboardTeacher,
  faChevronDown,
  faCog,
  faFileAlt,
  faHome,
  faTimes,
  faUsers,
  faPersonChalkboard,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";

import "./css/style.css";

export default function Navbar({ isSidebarOpen, toggleSidebar }) {
  const [activeSubMenu, setActiveSubMenu] = useState(null);



  const toggleSubMenu = (menuName) => {
    setActiveSubMenu(activeSubMenu === menuName ? null : menuName);
  };

  const [color, setColor] = useState(null);

  function handleChange(e) {
    setColor(e);
  }

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>
      <ul className="navlist">
        <NavLink
          to="/home"
          activeClassName="active-link"
          onClick={() => handleChange("home")}
        >
          <li>
            <span style={color === "home" ? { color: "#f37022" } : {}}>
              <FontAwesomeIcon icon={faHome} /> Home
            </span>
          </li>
        </NavLink>

        <li onClick={() => toggleSubMenu("student")}>
          <span>
          <FontAwesomeIcon icon={faPersonChalkboard} /> Students
            <span
              className={`menu-icon ${activeSubMenu === "student" ? "open" : ""
                }`}
            ></span>{" "}
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
          {(activeSubMenu === "student" ||
            color === "student-list" ||
            color === "reserve-list") && (
              <ul className="sub-menu">
                <Link
                  to="/studentlist"
                  activeClassName="active-link"
                  onClick={() => handleChange("student-list")}
                >
                  <li style={color === "student-list" ? { color: "#f37022" } : {}}>
                  Student List
                  </li>
                </Link>
                  <Link
                    to="/reservelist"
                    activeClassName="active-link"
                    onClick={() => handleChange("reserve-list")}
                  >
                    <li
                      style={
                        color === "reserve-list" ? { color: "#f37022" } : {}
                      }
                    >
                      Reserve List
                    </li>
                  </Link>

              </ul>
            )}
        </li>

        <li onClick={() => toggleSubMenu("syllabus")}>
          <span>
            <FontAwesomeIcon icon={faBook} /> Syllabus
            <span
              className={`menu-icon ${activeSubMenu === "syllabus" ? "open" : ""
                }`}
            ></span>{" "}
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
          {(activeSubMenu === "syllabus" ||
            color === "view-syllabus" ||
            color === "create-syllabus") && (
              <ul className="sub-menu">
                <Link
                  to="/viewsyllabus"
                  activeClassName="active-link"
                  onClick={() => handleChange("view-syllabus")}
                >
                  <li style={color === "view-syllabus" ? { color: "#f37022" } : {}}>
                  View syllabus
                  </li>
                </Link>
                  <Link
                    to="/createsyllabus"
                    activeClassName="active-link"
                    onClick={() => handleChange("create-syllabus")}
                  >
                    <li
                      style={
                        color === "create-syllabus" ? { color: "#f37022" } : {}
                      }
                    >
                      Create syllabus
                    </li>
                  </Link>

              </ul>
            )}
        </li>

          <li onClick={() => toggleSubMenu("trainingProgram")}>
            <span>
              <FontAwesomeIcon icon={faBriefcase} /> Training Program
              <span
                className={`menu-icon ${activeSubMenu === "trainingProgram" ? "open" : ""
                  }`}
              ></span>{" "}
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
            {(activeSubMenu === "trainingProgram" ||
              color === "view-program" ||
              color === "create-program") && (
                <ul className="sub-menu">
                  <Link
                    to="/viewprogram"
                    activeClassName="active-link"
                    onClick={() => handleChange("view-program")}
                  >
                    <li
                      style={color === "view-program" ? { color: "#f37022" } : {}}
                    >
                      View Training Program
                    </li>
                  </Link>

                    <Link
                    to="/createprogram"
                    activeClassName="active-link"
                    onClick={() => handleChange("create-program")}
                  >
                    <li
                      style={color === "creat-program" ? { color: "#f37022" } : {}}
                    >
                      Create Program
                    </li>
                  </Link>
                </ul>
              )}  
          </li>
        
          <li onClick={() => toggleSubMenu("class")}>
            <span>
              <FontAwesomeIcon icon={faChalkboardTeacher} /> Class
              <span
                className={`menu-icon ${activeSubMenu === "class" ? "open" : ""
                  }`}
              ></span>{" "}
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
            {(activeSubMenu === "class" ||
              color === "view-class" ||
              color === "create-class") && (
                <ul className="sub-menu">
                  <NavLink
                    to="/viewclass"
                    activeClassName="active-link"
                    onClick={() => handleChange("view-class")}
                  >
                    <li
                      style={color === "view-class" ? { color: "#f37022" } : {}}
                    >
                      View Class
                    </li>
                  </NavLink>
                    <NavLink
                    to="/createclass"
                    activeClassName="active-link"
                    onClick={() => handleChange("create-class")}
                  >
                    <li
                      style={color === "create-class" ? { color: "#f37022" } : {}}
                    >
                     Create Class
                    </li>
                  </NavLink>
                
              </ul>
              )}
          </li>
        <NavLink to="/training" onClick={() => handleChange("training")}>
          <li style={color === "training" ? { color: "#f37022" } : {}}>
            <FontAwesomeIcon icon={faCalendarAlt} /> Training calendar
          </li>
        </NavLink>
          <li onClick={() => toggleSubMenu("userManagement")}>
            <span>
              <FontAwesomeIcon icon={faUsers} /> User Management
              <span
                className={`menu-icon ${activeSubMenu === "userManagement" ? "open" : ""
                  }`}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </span>
            {(activeSubMenu === "userManagement" ||
              color === "userList" ||
              color === "userPermission") && (
                <ul className="sub-menu">
                  <NavLink
                    to="/userlist"
                    activeClassName="active-link"
                    onClick={() => handleChange("userList")}
                  >
                    <li style={color === "userList" ? { color: "#f37022" } : {}}>
                      User List
                    </li>
                  </NavLink>
                  <NavLink
                    to="/userpermission"
                    activeClassName="active-link"
                    onClick={() => handleChange("userPermission")}
                  >
                    <li
                      style={
                        color === "userPermission" ? { color: "#f37022" } : {}
                      }
                    >
                      User Permission
                    </li>
                  </NavLink>
                </ul>
              )}
          </li>

          <NavLink
            to="/learning"
            activeClassName="active-link"
            onClick={() => handleChange("learning")}
          >
            <li style={color === "learning" ? { color: "#f37022" } : {}}>
              <FontAwesomeIcon icon={faFileAlt} /> Learn Material
            </li>
          </NavLink>

        <li onClick={() => toggleSubMenu("setting")}>
          <span>
            <FontAwesomeIcon icon={faCog} /> Setting
            <span
              className={`menu-icon ${activeSubMenu === "setting" ? "open" : ""
                }`}
            ></span>
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
          {(activeSubMenu === "setting" ||
            color === "account-setting" ||
            color === "general-setting") && (
              <ul className="sub-menu">
                <NavLink
                  to="/accsetting"
                  activeClassName="active-link"
                  onClick={() => handleChange("account-setting")}
                >
                  <li
                    style={
                      color === "account-setting" ? { color: "#f37022" } : {}
                    }
                  >
                    Acc setting
                  </li>
                </NavLink>
                <NavLink
                  to="/gensetting"
                  activeClassName="active-link"
                  onClick={() => handleChange("general-setting")}
                >
                  <li
                    style={
                      color === "general-setting" ? { color: "#f37022" } : {}
                    }
                  >
                    General setting
                  </li>
                </NavLink>
              </ul>
            )}
        </li>
      </ul>
    </div>
  );
}