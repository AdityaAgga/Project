import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  IconButton,
  Stack,
  Container,
  Grid,
  useTheme,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
//import { useNotification } from '../context/NotificationContext';

// Updated email regex to be more strict
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// More strict email validation
const isValidEmail = (email) => {
  // Check for basic email format
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // Additional checks
  const [localPart, domain] = email.split('@');
  
  // Check local part (before @)
  if (localPart.length < 1 || localPart.length > 64) {
    return false;
  }
  
  // Check domain part
  if (domain.length < 1 || domain.length > 255) {
    return false;
  }
  
  // Check for consecutive dots
  if (email.includes('..')) {
    return false;
  }
  
  // Check for valid TLD (top-level domain)
  const tld = domain.split('.').pop();
  if (tld.length < 2) {
    return false;
  }
  
  return true;
};

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      const userType = localStorage.getItem('userType');
      navigate(userType === 'wholesaler' ? '/wholesaler/dashboard' : '/retailer/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100%',
      mx: 'auto',
      background: isDarkMode
        ? 'linear-gradient(135deg, rgba(26, 35, 126, 0.1) 0%, rgba(18, 18, 18, 0.05) 50%, rgba(49, 27, 146, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(232, 234, 246, 0.6) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(237, 231, 246, 0.6) 100%)',
    }}>
      {/* Decorative Circles */}
      <Box sx={{
        position: 'absolute',
        top: -120,
        left: -120,
        width: 320,
        height: 320,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 60%, ${theme.palette.primary.light} 100%)`,
        opacity: isDarkMode ? 0.15 : 0.2,
        borderRadius: '50%',
        zIndex: 0,
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -100,
        right: -100,
        width: 260,
        height: 260,
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 60%, ${theme.palette.primary.main} 100%)`,
        opacity: isDarkMode ? 0.1 : 0.15,
        borderRadius: '50%',
        zIndex: 0,
      }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
              <Typography 
                variant="h3" 
                fontWeight={800} 
                sx={{ 
                  mb: 2,
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #82b1ff 0%, #ffffff 50%, #b388ff 100%)'
                    : 'linear-gradient(135deg, #1a237e 0%, #000000 50%, #311b92 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Sign in to access your account and manage your business
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Don't have an account?{' '}
                <Button 
                  variant="text" 
                  onClick={() => navigate('/register')}
                  sx={{ 
                    color: 'primary.main',
                    textTransform: 'none',
                    fontWeight: 600,
                    p: 0,
                    '&:hover': {
                      background: 'transparent',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Register
                </Button>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 4,
                borderRadius: 4,
                background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
              }}
            >
        <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  
                  <TextField
                    label="Email"
                    name="email"
              type="email"
                    value={formData.email}
                    onChange={handleChange}
              required
                    fullWidth
                    variant="outlined"
                  />
                  
                  <TextField
                    label="Password"
                    name="password"
              type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
              required
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <Button
            type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      py: 2,
                      borderRadius: 3,
                      background: theme.palette.primary.main,
                      '&:hover': {
                        background: theme.palette.primary.dark,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Sign In'}
                  </Button>
                </Stack>
        </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignIn;
