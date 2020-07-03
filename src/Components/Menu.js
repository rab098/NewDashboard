import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import PersonIcon from "@material-ui/icons/Person";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import "../ComponentsCss/Menu.css";
import { Link } from "react-router-dom";
import image from "../assets/images/app_icon_without_bg.png";
import { makeStyles } from "@material-ui/core/styles";
import { grayColor, whiteColor } from "../assets/jss/material-dashboard-react";
import { teal } from "@material-ui/core/colors";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

let store = require("store");
const styles = {
  menuList: {
    marginLeft: "10px",
    marginTop: "20px",
  },
  menuNames: {
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  // focus: {
  //     borderRadius: "50px",
  //     color: whiteColor,
  //     padding:'0 0 0 8px',
  //
  //     '&:focus': {
  //         backgroundColor:'#f3f3f3',
  //         color:'#008081',
  //     }
  //     },

  focus: {
    borderRadius: "50px",
    color: whiteColor,
    padding: "0 24px 0 8px",
  },

  focusNew: {
    backgroundColor: "#f3f3f3",
    borderRadius: "50px",
    color: "#008081",
    padding: "0 24px 0 8px",
  },

  menuIcon: {
    color: whiteColor,
  },
  paper: {
    background:
      "linear-gradient(109.6deg,rgba(5, 85, 84, 1) 11.2%,rgba(64, 224, 208, 1) 91.1%)",
  },
  drawerPaper: {
    background: "none",
    borderRight: "none",
    paddingTop: "110px",
    width: "maxContent",
  },
};

const useStyles = makeStyles(styles);

function Menu(props) {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 900);
  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
  const [userData, setUserData] = useState({});

  const [buttonColor, setButtonColor] = useState(false);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 900);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  useEffect(() => {
    setUserData(store.get("userData"));
  }, []);

  const headers = {
    "Content-Type": "application/json",
    "x-access-token": userData.accessToken,
  };

  const handleFocus = () => {
    if (buttonColor === true) setButtonColor(false);
    else if (buttonColor === false) setButtonColor(true);
  };

  const handleDrawerToggle = () => {
    setShowDrawerMenu(!showDrawerMenu);
  };

  const handleLogout = (event) => {
    event.preventDefault();

    axios
      .post(
        `https://m2r31169.herokuapp.com/api/logout`,
        {},
        {
          headers: headers,
        }
      )
      .then((res) => {
        store.set("logoutEvent", "logout" + Math.random());
        console.log(res.data);
        store.remove("userData");
        store.clearAll();
        setUserData({});
        window.location = "/";
      })
      .catch((err) => {
        console.error(err);
        console.log("not working man");
      });
  };

  const showDrawer = () => {
    setShowDrawerMenu(true);
  };

  const classes = useStyles();

  const drawer = (
    <MenuList className={classes.menuList}>
      <Link to={"/dashboard/home"}>
        <MenuItem
          className={buttonColor ? classes.focusNew : classes.focus}
          autoFocus
          onClick={handleFocus}
        >
          <HomeRoundedIcon className={classes.menuNames} fontSize="small" />
          <p>Home</p>
        </MenuItem>
      </Link>
      <Link to={"/dashboard/complaints"}>
        <MenuItem className={classes.focus}>
          <AssignmentRoundedIcon
            className={classes.menuNames}
            fontSize="small"
          />
          <p>Complaints</p>
        </MenuItem>
      </Link>
      {props.role === "ADMIN" && (
        <Link to={"/dashboard/supervisors"}>
          <MenuItem className={classes.focus}>
            <SupervisorAccountRoundedIcon
              className={classes.menuNames}
              fontSize="small"
            />
            <p>Supervisors</p>
          </MenuItem>
        </Link>
      )}
      {props.role == "SUPERVISOR" && (
        <Link to={"/dashboard/employees"}>
          <MenuItem className={classes.focus}>
            <SupervisorAccountRoundedIcon
              className={classes.menuNames}
              fontSize="small"
            />
            <p>Employees</p>
          </MenuItem>
        </Link>
      )}
      <Link to={"/dashboard/reports"}>
        <MenuItem className={classes.focus}>
          <LibraryBooksIcon className={classes.menuNames} fontSize="small" />
          <p>Reports</p>
        </MenuItem>
      </Link>
      <Link to={"/dashboard/profile"}>
        <MenuItem className={classes.focus}>
          <PersonIcon className={classes.menuNames} fontSize="small" />
          <p>Profile</p>
        </MenuItem>
      </Link>
      {props.role === "ADMIN" && (
        <Link to={"/dashboard/manage"}>
          <MenuItem className={classes.focus}>
            <SettingsIcon className={classes.menuNames} fontSize="small" />
            <p>Manage Complaints</p>
          </MenuItem>
        </Link>
      )}
      <MenuItem onClick={handleLogout} className={classes.focus}>
        <ExitToAppRoundedIcon className={classes.menuNames} fontSize="small" />
        <p>Logout</p>
      </MenuItem>
    </MenuList>
  );

  return (
    //new menu layout
    // <div className="menu-grid">
    //     <div className="logo">
    //         <img alt='' className="logo-image" src={image}/>
    //         <p className="logo-title">Complaint Management System</p>
    //     </div>
    //
    //     <div className="menu-list">
    //         <p>Home</p>
    //         <p>Home</p>
    //         <p>Home</p>
    //         <p>Home</p>
    //         <p>Home</p>
    //
    //     </div>
    // </div>

    //old menu layout

    <div className="menu">
      {isDesktop ? (
        <div className={"menu-div"}>
          <img alt="" className={"logo"} src={image} />
          <p className={"menu-heading-main"}>Sindh</p>
        </div>
      ) : (
        <IconButton color="inherit" onClick={showDrawer}>
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
      )}

      <div>
        {isDesktop ? (
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            open={showDrawerMenu}
            classes={{ paper: classes.paper }}
            onClose={handleDrawerToggle}
          >
            <div className={"menu-div"}>
              <img alt="" className={"logo"} src={image} />
              <p className={"menu-heading-main"}>
                Sindh Solid Waste Management
              </p>
            </div>
            <Divider />
            {drawer}
          </Drawer>
        )}
      </div>
    </div>

    // for drawer
  );
}

export default Menu;
