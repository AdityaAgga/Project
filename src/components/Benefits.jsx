import React from 'react';
import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';

const benefits = [
  {
    title: 'For Wholesalers',
    color: 'primary',
    description: 'Increase reach to retailers, manage bulk orders, and offer volume discounts.',
  },
  {
    title: 'For Retailers',
    color: 'secondary',
    description: 'Get competitive pricing, bid on bulk orders, and track your inventory.',
  },
];

const Benefits = () => {
  const theme = useTheme();
  return (
    <Box
      id="benefits"
      sx={{
        textAlign: 'center',
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdfa 60%, #f0f9ff 100%)',
        transition: 'background 0.3s',
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="primary"
        gutterBottom
        sx={{ mb: 6, textShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
      >
        Why Choose Us?
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch" maxWidth={900} mx="auto">
        {benefits.map((benefit, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                height: '100%',
                bgcolor: 'background.paper',
                borderTop: `6px solid ${theme.palette[benefit.color].main}`,
                boxShadow: `0 4px 24px 0 ${theme.palette[benefit.color].main}22`,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color={benefit.color}
                gutterBottom
                sx={{ mb: 2 }}
              >
                {benefit.title}
              </Typography>
              <Typography color="text.secondary" fontSize={18}>
                {benefit.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Benefits;