
import {Outlet} from "react-router-dom"
import React, { useState } from "react";
import { Grid, Box, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from '../assets/Holiday.png';
import Header from "./Header";
import Footer from "./Footer";

const Dashboard = () => {
  const [openLeftDrawer, setOpenLeftDrawer] = useState(true);

  const toggleLeftDrawer = () => {
    setOpenLeftDrawer(!openLeftDrawer);
  };
  return (
    <>
   <Box sx={{ display: 'flex' }}>
      {/* Grid Layout */}
      <Grid container spacing={2}>
        {/* Sidebar - Grid 3 */}
        <Grid item xs={2}>
         
            {/* Sidebar Content */}
            <Box sx={{ padding: 2 }}>
              <img src={Logo} alt="Logo" style={{ width: '100%', marginBottom: 20 }} />
              <List>
              <Link to="/dashboard/cruisesDash" className="cruiess_page">Dashboard</Link>
                <ListItem button>
                  <ListItemText primary="" />
                </ListItem>
                <ListItem button>
                <Link to="/dashboard/cruises" className="cruiess_page">Cruises</Link>
                 
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
           
              <Outlet/>
           
          </Box>
          <Footer />
        </Grid>
      </Grid>
    </Box>

    </>
      

  );
};

export default Dashboard;
