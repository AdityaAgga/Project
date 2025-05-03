import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Stack, useTheme } from '@mui/material';

const CallToAction = () => {
  const theme = useTheme();
  return (
    <Box
      id="cta"
      sx={{
        textAlign: 'center',
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdfa 100%)',
        color: theme.palette.text.primary,
        transition: 'background 0.3s',
      }}
    >
      <Box maxWidth={800} mx="auto" px={2}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 3, color: theme.palette.primary.main, textShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          Ready to Scale Your Business?
        </Typography>
        <Typography variant="h6" sx={{ mb: 5, color: theme.palette.text.secondary }}>
          Join our platform today as a retailer or wholesaler and start growing your business.
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="center" alignItems="center">
          <Button
            component={Link}
            to="/register?type=retailer"
            variant="contained"
            color="primary"
            size="large"
            sx={{ fontWeight: 'bold', borderRadius: 2, minWidth: 200 }}
          >
            Join as Retailer
          </Button>
          <Button
            component={Link}
            to="/register?type=wholesaler"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ fontWeight: 'bold', borderRadius: 2, minWidth: 200 }}
          >
            Join as Wholesaler
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CallToAction;