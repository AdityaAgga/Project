import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const params = new URLSearchParams(location.search);
  const email = params.get('email') || '';
  const userType = params.get('type') || '';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      // First verify OTP
      const verifyResponse = await axios.post('http://localhost:5000/api/v1/auth/verify-otp', {
        email,
        otp
      });

      if (verifyResponse.data.status === 'success') {
        // After successful OTP verification, log the user in
        const loggedIn = await login(email, localStorage.getItem('tempPassword'), userType);
        if (loggedIn) {
          setMessage('Account verified successfully! Redirecting to dashboard...');
          localStorage.removeItem('tempPassword');
          navigate(userType === 'wholesaler' ? '/wholesaler' : `/${userType}/dashboard`);
        } else {
          setError('Login failed.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
      <Paper elevation={4} sx={{ maxWidth: 400, width: '100%', p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1} color="primary">
          Verify Your Email
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={3}>
          Enter the 6-digit OTP sent to <span style={{ fontWeight: 600 }}>{email}</span>
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <TextField
              label="Enter OTP"
              type="text"
              inputProps={{ maxLength: 6, pattern: '[0-9]{6}', style: { textAlign: 'center', letterSpacing: '0.3em', fontSize: 24 } }}
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading || otp.length !== 6}
              sx={{ fontWeight: 'bold', borderRadius: 2 }}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </Stack>
        </Box>
        <Box mt={3} textAlign="center">
          <Button color="primary" variant="text" disabled sx={{ fontWeight: 500 }}>
            Resend OTP (coming soon)
          </Button>
        </Box>
        {message && <Typography mt={2} color="success.main" textAlign="center">{message}</Typography>}
        {error && <Typography mt={2} color="error.main" textAlign="center">{error}</Typography>}
      </Paper>
    </Box>
  );
};

export default OtpVerification;