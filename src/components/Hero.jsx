import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper, Stack, useTheme } from '@mui/material';

const Hero = () => {
  const theme = useTheme();
  return (
    <Box
      id="hero"
      sx={{
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 60%, #f3e8ff 100%)',
        textAlign: 'center',
        py: { xs: 8, md: 12 },
        transition: 'background 0.3s',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: theme.palette.primary.main, textShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          Connecting Wholesalers and Retailers for Seamless Bulk Transactions
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Discover products in bulk, negotiate prices, and streamline your supply chain.
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="center" mb={6}>
          <Paper elevation={4} sx={{ p: 4, width: { xs: '100%', md: 320 }, textAlign: 'center', borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>
              I am a Retailer
            </Typography>
            <Typography color="text.secondary" mb={2}>
              Looking to buy products in bulk from wholesalers
            </Typography>
            <Button
              component={Link}
              to="/register?type=retailer"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Sign Up as Retailer
            </Button>
          </Paper>
          <Paper elevation={4} sx={{ p: 4, width: { xs: '100%', md: 320 }, textAlign: 'center', borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="bold" color="secondary" mb={1}>
              I am a Wholesaler
            </Typography>
            <Typography color="text.secondary" mb={2}>
              Looking to sell products in bulk to retailers
            </Typography>
            <Button
              component={Link}
              to="/register?type=wholesaler"
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
            >
              Sign Up as Wholesaler
            </Button>
          </Paper>
        </Stack>
        <Button
          href="#marketplace"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            fontWeight: 'bold',
            borderRadius: 3,
            mt: 2,
          }}
        >
          Browse Marketplace
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;