import { useState, useEffect } from "react";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import "./Navbar.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SnippetFolderOutlinedIcon from "@mui/icons-material/SnippetFolderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

export default function Navbar({ sx }) {
  const location = useLocation();

  const [toggle, setToggle] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const MenuArr = [
    {
      id: "home",
      name: "Home",
      icon: <HomeOutlinedIcon />,
      submenu: [],
      supportedParams: ["home"],
    },
    {
      id: "students",
      name: "Students",
      icon: <PeopleOutlinedIcon />,
      submenu: [
        {
          id: "student-list",
          name: "Student list",
        },
        {
          id: "reserve-list",
          name: "Reserve list",
        },
      ],
      supportedParams: ["student-list", "reserve-list", "student-detail"],
    },
    {
      id: "syllabus",
      name: "Syllabus",
      icon: <ImportContactsIcon />,
      submenu: [
        {
          id: "view-syllabus",
          name: "View syllabus",
        },
        {
          id: "create-syllabus",
          name: "Create syllabus",
        },
      ],
      supportedParams: ["view-syllabus", "create-syllabus"],
    },
    {
      id: "training-program",
      name: "Training Program",
      icon: <BiotechOutlinedIcon />,
      submenu: [
        {
          id: "view-program",
          name: "View program",
        },
        {
          id: "create-program",
          name: "Create program",
        },
      ],
      supportedParams: ["view-program", "create-program"],
    },
    {
      id: "class",
      name: "Class",
      icon: <SchoolOutlinedIcon />,
      submenu: [
        {
          id: "view-class",
          name: "View class",
        },
        {
          id: "create-class",
          name: "Create class",
        },
      ],
      supportedParams: ["view-class", "create-class"],
    },
    {
      id: "training-calendar",
      name: "Training calendar",
      icon: <CalendarTodayOutlinedIcon />,
      submenu: [],
      supportedParams: ["training-calendar"],
    },
    {
      id: "user-management",
      name: "User management",
      icon: <GroupOutlinedIcon />,
      submenu: [
        {
          id: "user-list",
          name: "User list",
        },
        {
          id: "user-permission",
          name: "User permission",
        },
      ],
      supportedParams: ["user-list", "user-permission"],
    },
    {
      id: "learning-materials",
      name: "Learning materials",
      icon: <SnippetFolderOutlinedIcon />,
      submenu: [],
    },
    {
      id: "setting",
      name: "Setting",
      icon: <SettingsOutlinedIcon />,
      submenu: [
        {
          id: "calendar-setting",
          name: "Calendar",
        },
        {
          id: "email-template",
          name: "Email-Template",
        },
      ],
      supportedParams: ["calendar-settings", "email-template"],
    },
  ];

  const getPath = () => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split("/");
    return pathSegments[1];
  };

  const getIdByPath = (path) => {
    for (const menu of MenuArr) {
      if (menu.supportedParams && menu.supportedParams.includes(path)) {
        return menu.id;
      }
    }
  };

  const changeMenuHeight = () => {
    let windowHeight = window.innerHeight;
    let halfWindowHeight = windowHeight - 135;

    setNavbarHeight(halfWindowHeight);
  };

  const [menuList, setMenuList] = useState(MenuArr);

  const handleClickMenu = (id) => {
    let menu = menuList.filter((m) => m.id == id)[0];
    if (menu == null || menu.expanded == null) return;

    menu.expanded = !menu.expanded;
    setMenuList([...menuList]);
  };

  const handleToggleMenu = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    menuList.forEach((menu) => {
      menu.expanded = false;
    });

    changeMenuHeight();

    window.addEventListener("resize", (e) => {
      changeMenuHeight();
    });
  }, []);

  useEffect(() => {}, [menuList]);

  const MenuButton = ({ menu }) => {
    return (
      <ListItemButton
        onClick={() => handleClickMenu(menu.id)}
        className={`navbar--menu-btn ${
          getIdByPath(getPath()) == menu.id && "navbar--menu-btn-selected"
        }`}
      >
        <ListItemIcon
          className="navbar--menu-icon"
          onClick={(e) => {
            if (!toggle) {
              setToggle(true);
            }
          }}
        >
          {menu.icon}
        </ListItemIcon>
        {toggle && (
          <>
            <ListItemText primary={menu.name} />
            {menu.submenu != null &&
              menu.submenu.length > 0 &&
              (menu.expanded ? <ExpandLess /> : <ExpandMore />)}
          </>
        )}
      </ListItemButton>
    );
  };

  return (
    <Box
      id="navbar"
      className={`navbar--box ${!toggle ? "navbar--box-hidden" : ""}`}
      sx={sx}
    >
      <List component="nav" aria-label="main mailbox folders">
        <Box>
          <ListItemButton
            className="navbar--menu-close"
            onClick={handleToggleMenu}
          >
            <ListItemIcon>
              {toggle ? <CloseIcon /> : <MenuOutlinedIcon />}
            </ListItemIcon>
          </ListItemButton>
        </Box>
        <Box
          className="navbar--menu-items"
          sx={{ maxHeight: `${navbarHeight}px` }}
        >
          {menuList.map((menu) => (
            <Box key={menu.id}>
              {menu.submenu == null || menu.submenu.length == 0 ? (
                <Link
                  to={`/${menu.id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <MenuButton menu={menu}></MenuButton>
                </Link>
              ) : (
                <MenuButton menu={menu}></MenuButton>
              )}

              {toggle && (
                <Collapse
                  in={menu.expanded}
                  timeout="auto"
                  unmountOnExit
                  className={`${
                    getIdByPath(getPath()) == menu.id &&
                    "navbar--menu-btn-selected"
                  }`}
                >
                  <List component="div" disablePadding>
                    {menu.submenu != null &&
                      menu.submenu.length > 0 &&
                      menu.submenu.map((submenu) => (
                        <Link
                          to={`/${submenu.id}`}
                          style={{ textDecoration: "none", color: "#000" }}
                        >
                          <ListItemButton className="navbar--menu-sub-btn">
                            <ListItemText primary={submenu.name} />
                          </ListItemButton>
                        </Link>
                      ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </Box>
      </List>
    </Box>
  );
}
