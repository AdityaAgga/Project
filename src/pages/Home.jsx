import React from 'react';
import { Box, Typography, Container, Button, Grid, Paper, Stack, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const features = [
    {
      icon: <InventoryIcon sx={{ fontSize: 40 }} />,
      title: 'Bulk Inventory Management',
      description: 'Efficiently manage your inventory with our advanced tracking system'
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Streamlined Logistics',
      description: 'Integrated shipping and delivery management for smooth operations'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Business Networking',
      description: 'Connect with verified wholesalers and retailers in your industry'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Transactions',
      description: 'End-to-end encrypted payments and verified business profiles'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description: 'Sign up as a wholesaler or retailer and complete your business profile'
    },
    {
      number: '02',
      title: 'Connect & Discover',
      description: 'Browse products, connect with partners, and start building your network'
    },
    {
      number: '03',
      title: 'Start Trading',
      description: 'Place orders, manage inventory, and grow your business'
    }
  ];

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(26, 35, 126, 0.1) 0%, rgba(18, 18, 18, 0.05) 50%, rgba(49, 27, 146, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(232, 234, 246, 0.6) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(237, 231, 246, 0.6) 100%)',
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
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

        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
            <Typography 
              variant="h2" 
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
              Transform Your B2B Trading Experience
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              Connect directly with verified wholesalers and retailers. Streamline your supply chain and grow your business.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => navigate('/register?type=wholesaler')}
                sx={{ 
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }}
              >
                Join as Wholesaler
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={() => navigate('/register?type=retailer')}
                sx={{ 
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3
                }}
              >
                Join as Retailer
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h3" fontWeight={700} textAlign="center" mb={2}>
          Why Choose Our Platform
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" mb={8}>
          Everything you need to streamline your B2B operations
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ 
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
        py: { xs: 8, md: 12 },
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight={700} textAlign="center" mb={2}>
            How It Works
          </Typography>
          <Typography variant="h6" color="text.secondary" textAlign="center" mb={8}>
            Get started with our platform in three simple steps
          </Typography>
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 4,
                    bgcolor: 'transparent',
                    position: 'relative',
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 20,
                      color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      fontSize: '8rem',
                      fontWeight: 900,
                      zIndex: 0,
                    }}
                  >
                    {step.number}
                  </Typography>
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h5" fontWeight={600} mb={2}>
                      {step.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {step.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.4) 0%, rgba(49, 27, 146, 0.4) 100%)'
          : 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(49, 27, 146, 0.1) 100%)',
        color: theme.palette.text.primary,
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Add subtle decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: isDarkMode
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: isDarkMode
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
          }}
        />
        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            fontWeight={700} 
            mb={3}
            sx={{
              background: isDarkMode
                ? 'linear-gradient(135deg, #82b1ff 0%, #ffffff 50%, #b388ff 100%)'
                : 'linear-gradient(135deg, #1976d2 0%, #000000 50%, #311b92 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ready to Transform Your Business?
          </Typography>
          <Typography 
            variant="h6" 
            mb={4} 
            sx={{ 
              color: theme.palette.text.secondary,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Join thousands of businesses already trading on our platform
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register?type=wholesaler')}
              sx={{ 
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
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
              Start as Wholesaler
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/register?type=retailer')}
              sx={{ 
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  background: 'rgba(25, 118, 210, 0.04)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Start as Retailer
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
