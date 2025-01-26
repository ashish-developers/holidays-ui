import React, { useState } from 'react';
import { Container, Box, Typography, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom'; // For navigation to login page

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);  // State for menu anchor
  const navigate = useNavigate();  // Hook to navigate programmatically

  // Open the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle Logout
  const handleLogout = () => {
    // Clear any session or token here (e.g., localStorage)
    localStorage.removeItem('authToken');  // Example: Remove auth token
    sessionStorage.removeItem('authToken');  // Example: Remove session token

    // Redirect to login page
    navigate('/');  // Navigate to the login page
    handleClose();  // Close the menu after logout
  };

  return (
    <header style={{ backgroundColor: '#1a333b', padding: '15px 0' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {/* Settings Icon with click handler */}
        <SettingsIcon
          className="icon_c"
          onClick={handleClick}  // When clicked, open the menu
          sx={{ cursor: 'pointer', color: '#fff' }}
        />
      </Container>

      {/* Menu with Logout Option */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}  // Menu is open if anchorEl is not null
        onClose={handleClose}  // Close menu when clicked outside or onClose
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
