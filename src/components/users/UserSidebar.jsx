import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { selectCurrentUser } from "../../features/user/userSlice.js";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {
  Drawer,
  Tabs,
  Tab,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { store } from "../../store/store.js";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Person_Avatar from "../../images/Person_Avatar.png";
import UserAccountModal from "../modals/UserAccountModal.jsx";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import UserAppBar from "./UserAppBar.jsx";
import Copyright from "../utilities/Copyright.jsx";
import logo from "../../assets/NRFSiteIcon.png";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import MemoryIcon from "@mui/icons-material/Memory";
import TopicIcon from "@mui/icons-material/Topic";
import TranslateIcon from "@mui/icons-material/Translate";
const pages = [
  {
    label: "Dashboard",
    icon: <DashboardCustomizeOutlinedIcon sx={{ mr: 2 }} fontSize="small" />,
    value: "dashboard",
  },
  {
    label: "SRS Uploads",
    icon: <DriveFolderUploadIcon sx={{ mr: 2 }} fontSize="small" />,
    value: "uploads",
  },
  {
    label: "Topic Modelling",
    icon: <MemoryIcon sx={{ mr: 2 }} fontSize="small" />,
    value: "preprocessing",
  },
  {
    label: "LDA Analysis",
    icon: <TopicIcon sx={{ mr: 2 }} fontSize="small" />,
    value: "lda-analysis",
  },
  {
    label: "LSA Analysis",
    icon: <TranslateIcon sx={{ mr: 2 }} fontSize="small" />,
    value: "lsa-analysis",
  },
];
const UserSideBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openUserAccountModal, setOpenUserAccountModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [open, setState] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameArray = location.pathname.split("/");
  //   const user = useSelector(selectCurrentUser);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserAccount = () => {
    setAnchorElUser(null);
    setOpenUserAccountModal(true);
  };

  const closeUserAccountModal = () => {
    setOpenUserAccountModal(false);
  };

  const logOut = () => {
    return {
      type: "USER_LOGOUT",
    };
  };
  const handleLogOut = () => {
    store.dispatch(logOut());
  };

  useEffect(() => {
    if (pathnameArray[2] === undefined || pathnameArray[2] === "dashboard") {
      setSelectedTab("dashboard");
    } else {
      setSelectedTab(pathnameArray[2]);
    }
  }, [pathnameArray]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* DISPLAY SIDE BAR ON LARGE AND MEDIUM SCREENS */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            backgroundColor: "#295FAB",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        open
      >
        <Toolbar
          sx={{
            backgroundColor: "#fff",
            p: 3,
          }}
        >
          <Box
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            component={Link}
            to={"/user/dashboard"}
          >
            <img
              alt="nrf-logo"
              src={logo}
              style={{
                height: "60px",
                marginRight: "20px",
              }}
            />
          </Box>
        </Toolbar>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleChange}
            TabIndicatorProps={{ hidden: true }}
            sx={{
              "& button": {
                justifyContent: "flex-start",
                color: "white",
                fontSize: "1rem",
                textTransform: "none",
                padding: 3,
                paddingLeft: 2,
              },
              "& button.Mui-selected": {
                color: "white",
                border: "1px solid white",
                borderRadius: "5px",
                margin: 2,
              },
              "& .MuiTab-wrapper": {
                display: "flex",
                alignItems: "center",
                textAlign: "left",
              },
            }}
          >
            {pages.map((page) => {
              return (
                <Tab
                  key={page.value}
                  value={page.value}
                  onClick={() => navigate(`${page.value}`)}
                  label={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "nowrap",
                        width: "100%",
                      }}
                    >
                      {page.icon || null}
                      <Typography>{page.label}</Typography>
                    </div>
                  }
                />
              );
            })}
          </Tabs>
        </Box>
        <Toolbar
          sx={{
            backgroundColor: "#fff",
            maxHeight: 20,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Tooltip title="Log Out">
              <IconButton onClick={handleLogOut} sx={{ color: "black", p: 0 }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="My Profile">
              <IconButton
                onClick={handleUserAccount}
                sx={{ color: "black", p: 0 }}
              >
                <Person2OutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Drawer>
      {/* DISPLAY HAMBURGER MENU ON SMALL SCREENS */}
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", md: "none" },
          backgroundColor: "#295FAB",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: 2,
          }}
        >
          <Box>
            <IconButton
              size="large"
              aria-label="open drawer"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer
            anchor="top"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <List
              onChange={handleChange}
              onClick={toggleDrawer(false)}
              sx={{
                backgroundColor: "primary.main",
              }}
            >
              {pages.map((page) => (
                <ListItem
                  key={page.value}
                  value={page.value}
                  onClick={() => navigate(`${page.value}`)}
                  sx={{ color: "white" }}
                  disablePadding
                >
                  <ListItemButton color={"white"}>
                    <ListItemIcon>{page.icon || null}</ListItemIcon>
                    <ListItemText>{page.label}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Box
            component={Link}
            to={"/user/dashboard"}
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <img
              alt="nrf-logo"
              src={logo}
              style={{
                // width: "150px",
                height: "60px",
                justify: "center",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="My Profile">
              <IconButton onClick={handleUserAccount}>
                <Avatar alt="S-Admin" src={Person_Avatar} />
              </IconButton>
            </Tooltip>
            <Box sx={{ mr: 1, textAlign: "right" }}>
              <Typography
                sx={{ fontSize: "0.9rem", fontWeight: 400, color: "white" }}
              >
                Administrator
              </Typography>
              <Typography
                sx={{ fontSize: "0.7rem", fontWeight: 200, color: "white" }}
              >
                SEC ANALYST
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <UserAccountModal
        openUserAccountModal={openUserAccountModal}
        closeUserAccountModal={closeUserAccountModal}
      />
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexGrow: 1,
          flexDirection: "column",
          width: { md: `calc(100% - 240px)` },
          ml: { md: "240px" },
        }}
      >
        <UserAppBar />
        <Box sx={{ mt: 13, flexGrow: 1 }}>
          <Outlet />
          <Copyright />
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          p: 1,
          mt: 1,
          ml: -2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default UserSideBar;
