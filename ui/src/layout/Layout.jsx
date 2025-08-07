import React, {useState} from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    IconButton,
    Divider,
    Button,
    Grid,
} from "@mui/material"
import MenuIcon       from "@mui/icons-material/Menu";
import HomeIcon       from "@mui/icons-material/Home";
import GroupsIcon     from "@mui/icons-material/Groups";
import PeopleIcon       from "@mui/icons-material/People";
import HomeWorkIcon   from "@mui/icons-material/HomeWork";

const drawerWidth = 240; 
const miniWidth = 72;

export default function Layout() {
    const [open, setOpen] = useState(true);
    const { role, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    console.log(location.pathname)
    
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", backgroundImage: "url(/background.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
            <AppBar
                position="fixed"
                sx={{ zIndex: theme => theme.zIndex.drawer + 1, height: "70px", backgroundColor: "#1F7D53", borderRadius: "0px 0px 10px 10px"}}
            >
                <Toolbar>
                    <Grid container>
                        <Grid item>
                            <IconButton color="inherit" edge="start" onClick={() => setOpen(!open)} sx={{ mr : 2 }}>
                                <MenuIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" noWrap>
                                Dream Home Real Estate
                            </Typography>
                        </Grid>
                        <Grid item sx={{ ml: 'auto' }}>
                            <Button color="inherit" edge="end" onClick={logout}>
                                Logout 
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                open={open}
                anchor="left"
                sx={{
                    width: open ? drawerWidth : miniWidth,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    boxSizing: "border-box",
                    "& .MuiDrawer-paper": {
                        width: open ? drawerWidth : miniWidth,
                        borderRadius: "10px",
                        overflowX: "hidden",
                        boxSizing: "border-box",
                        transition: (theme) =>
                            theme.transitions.create("width", {
                            easing: theme.transitions.easing.sharp,
                            duration: open
                                ? theme.transitions.duration.enteringScreen
                                : theme.transitions.duration.leavingScreen,
                            }),
                    },
                }}
            >
                <Toolbar/>
                <Divider />
                <Box sx={{ overflow: "auto", justifyContent: "center", px: open ? 2 : 0 }}>
                    <List>
                        <ListItemButton component={Link} to="/" selected={isActive("/")}>
                            {open ? <ListItemText primary="Home" primaryTypographyProps={{ align: "left" }}/> : <IconButton> <HomeIcon/> </IconButton>}
                        </ListItemButton>
                        { role === "admin" && (
                            <ListItemButton component={Link} to="/staff" selected={isActive("/staff")}>
                                {open ? <ListItemText primary="Staff"  primaryTypographyProps={{ align: "left" }}/> : <IconButton> <GroupsIcon/> </IconButton>}
                            </ListItemButton>
                        )}
                        <ListItemButton component={Link} to="/client" selected={isActive("/client")} >
                            {open ? <ListItemText primary="Clients"  primaryTypographyProps={{ align: "left" }}/> : <IconButton> <PeopleIcon/> </IconButton>}
                        </ListItemButton>
                        <ListItemButton component={Link} to="/branch" selected={isActive("/branch")}>
                            {open ? <ListItemText primary="Branches"  primaryTypographyProps={{ align: "left" }}/> : <IconButton> <HomeWorkIcon/> </IconButton>}
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: 3,
                    width: `calc(100% - ${drawerWidth}px)`,
                }}
            >
                <Toolbar /> 
                <Outlet />
            </Box>
        </Box>
    )
}