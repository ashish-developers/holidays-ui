import React from 'react';
import { Container, Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
      <Container maxWidth="lg">
       
        <Box textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()}{" "}
            <Link href="#" target="_blank" rel="noopener">
            Dashboard
            </Link>
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
