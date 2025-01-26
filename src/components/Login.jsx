import React, { useState } from 'react';
import { Container, Grid, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Holiday.png';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // To navigate after login

  // Hardcoded username and password for authentication
  const hardcodedUsername = 'admin';
  const hardcodedPassword = 'admin123';

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === hardcodedUsername && password === hardcodedPassword) {
      // Store authToken in localStorage when login is successful
      localStorage.setItem('authToken', 'your-token'); // You can replace 'your-token' with an actual token or use a unique string

      navigate('/dashboard'); // Redirect to dashboard on success
    } else {
      setError('Invalid username or password'); // Show error if credentials are incorrect
    }
  };

  return (
    <Container maxWidth="sm" style={{marginTop: '200px'}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box textAlign="center">
          <img src={Logo} alt="Logo" style={{ width: '300px' }} />
          </Box>
        </Grid>

        {/* Username Input */}
        <Grid item xs={12}>
          <Box sx={{ width: 500, maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
        </Grid>

        {/* Password Input */}
        <Grid item xs={12}>
          <Box sx={{ width: 500, maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
        </Grid>

        {/* Login Button */}
        <Grid item xs={12}>
          <Box className="login_btn">
            <Button
              variant="outlined"
              size="large"
              sx={{ width: 500, maxWidth: '100%' }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Grid>

        {/* Error message */}
        {error && (
          <Grid item xs={12}>
            <Box textAlign="center">
              <p style={{ color: 'red' }}>{error}</p>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Login;
