import React, { useState } from "react";
import { Grid, Box, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import {Outlet} from "react-router-dom"
import Logo from '../assets/logo.png';
import Header from "./Header";
import Footer from "./Footer";


const Sidebar = () => {
  const [openLeftDrawer, setOpenLeftDrawer] = useState(true);

  const toggleLeftDrawer = () => {
    setOpenLeftDrawer(!openLeftDrawer);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Grid Layout */}
      <Grid container spacing={2}>
        {/* Sidebar - Grid 3 */}
        <Grid item xs={2}>
         
            {/* Sidebar Content */}
            <Box sx={{ padding: 2 }}>
              <img src={Logo} alt="Logo" style={{ width: '100%', marginBottom: 20 }} />
              <List>
                <ListItem button>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Cruises" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Settings" />
                </ListItem>
              </List>
            </Box>
      
        </Grid>

        {/* Main Content - Grid 9 */}
        <Grid item xs={10}>
          <Header />
          <Box
            component="main"
            sx={{
              bgcolor: '#e0e0e0',  // Main content background color
              padding: 2,
              height: '100vh',
            }}
          >
            <Typography variant="h4">Main Content</Typography>
            <Typography variant="body1">
              This is the main content area.
              <Outlet/>
            </Typography>
          </Box>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sidebar;
