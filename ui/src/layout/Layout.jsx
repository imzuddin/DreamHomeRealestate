import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material"

const drawerWidth = 240; 

export default function Layout() {
    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Dream Home Realestate
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar/>
                <Box sx={{ overflow: "auto"}}>
                    <List>
                        <ListItemButton component={Link} to="/">
                            <ListItemText primary="Home"/>
                        </ListItemButton>
                        <ListItemButton component={Link} to="/staff">
                            <ListItemText primary="Staff"/>
                        </ListItemButton>
                        <ListItemButton component={Link} to="/client">
                            <ListItemText primary="Clients"/>
                        </ListItemButton>
                        <ListItemButton component={Link} to="/branch">
                            <ListItemText primary="Branches"/>
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: 3,
                    width: `calc(100% - ${drawerWidth}px)`
                }}
            >
                <Toolbar /> 
                <Outlet />
            </Box>
        </Box>
    )
}