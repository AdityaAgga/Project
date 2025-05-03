import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  useTheme,
  CircularProgress,
  Alert,
  Stack,
  InputAdornment,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

// Validation functions
const isValidEmail = (email) => {
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

const isValidPassword = (password) => {
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return passwordRegex.test(password);
};

const isValidGSTIN = (gstin) => {
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessName: '',
    address: '',
    businessType: '',
    gstin: ''
  });
  const [userType, setUserType] = useState('retailer');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate the field
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleUserTypeChange = (event, newUserType) => {
    if (newUserType !== null) {
      setUserType(newUserType);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    // Additional validation for businessType
    if (userType === 'wholesaler' && !formData.businessType) {
      newErrors.businessType = 'Business type is required for wholesalers';
    }
    
    // setErrors(newErrors);
    
    // if (Object.keys(newErrors).length > 0) {
    //   setError('Please fix the errors in the form');
    //   return;
    // }

    setError('');
    setLoading(true);

    try {
      await register({ ...formData }, userType);
      localStorage.setItem('tempPassword', formData.password);
      // After successful registration, redirect to OTP verification
      navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}&type=${userType}`);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return isValidEmail(value) ? '' : 'Please enter a valid email address';
      case 'phone':
        return isValidPhone(value) ? '' : 'Please enter a valid 10-digit mobile number';
      case 'password':
        return isValidPassword(value) ? '' : 'Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character';
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match';
      case 'gstin':
        return isValidGSTIN(value) ? '' : 'Please enter a valid GSTIN';
      case 'businessType':
        return userType === 'wholesaler' && !value ? 'Business type is required for wholesalers' : '';
      default:
        return value ? '' : 'This field is required';
    }
  };

  const getThemeColor = () => {
    return userType === 'wholesaler' 
      ? isDarkMode 
        ? 'linear-gradient(135deg, #006064 0%, #00838f 50%, #0097a7 100%)'
        : 'linear-gradient(135deg, #00acc1 0%, #26c6da 50%, #4dd0e1 100%)'
      : isDarkMode
        ? 'linear-gradient(135deg, #00838f 0%, #0097a7 50%, #00acc1 100%)'
        : 'linear-gradient(135deg, #26c6da 0%, #4dd0e1 50%, #80deea 100%)';
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
        background: getThemeColor(),
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
        background: getThemeColor(),
        opacity: isDarkMode ? 0.1 : 0.15,
        borderRadius: '50%',
        zIndex: 0,
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={5}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
              <Typography 
                variant="h3" 
                fontWeight={800} 
                sx={{ 
                  mb: 2,
                  background: getThemeColor(),
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Join CRES Today
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {userType === 'wholesaler' 
                  ? 'Expand your business reach and connect with retailers nationwide'
                  : 'Access quality products from verified wholesalers and grow your retail business'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Already have an account?{' '}
                <Button 
                  variant="text" 
                  onClick={() => navigate('/sign-in')}
                  sx={{ 
                    color: 'info.main',
                    textTransform: 'none',
                    fontWeight: 600,
                    p: 0,
                    '&:hover': {
                      background: 'transparent',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Sign In
                </Button>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
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

                  <ToggleButtonGroup
                    value={userType}
                    exclusive
                    onChange={handleUserTypeChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <ToggleButton 
                      value="retailer" 
                      sx={{ 
                        flex: 1,
                        '&.Mui-selected': {
                          bgcolor: 'info.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'info.dark'
                          }
                        }
                      }}
          >
            Retailer
                    </ToggleButton>
                    <ToggleButton 
                      value="wholesaler" 
                      sx={{ 
                        flex: 1,
                        '&.Mui-selected': {
                          bgcolor: 'info.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'info.dark'
                          }
                        }
                      }}
          >
            Wholesaler
                    </ToggleButton>
                  </ToggleButtonGroup>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Full Name"
              name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
              required
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Email"
                        name="email"
              type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
              required
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Business Name"
              name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        error={!!errors.businessName}
                        helperText={errors.businessName}
                        required
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        error={!!errors.address}
                        helperText={errors.address}
                        required
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={2}
                      />
                    </Grid>
                    {userType === 'wholesaler' && (
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Business Type"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          error={!!errors.businessType}
                          helperText={errors.businessType}
                          required
                          fullWidth
                          variant="outlined"
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="GSTIN"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleChange}
                        error={!!errors.gstin}
                        helperText={errors.gstin}
                        required
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Password"
                        name="password"
              type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
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
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Confirm Password"
                        name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
              required
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  
                  <Button
            type="submit" 
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      py: 2,
                      borderRadius: 3,
                      background: getThemeColor(),
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Create Account'}
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

export default Register;