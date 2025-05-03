import React from 'react';
import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';

const steps = [
  {
    title: 'Step 1',
    color: 'primary',
    subtitle: 'Create Your Business Profile',
  },
  {
    title: 'Step 2',
    color: 'secondary',
    subtitle: 'List Products or Request Bulk Orders',
  },
  {
    title: 'Step 3',
    color: 'success',
    subtitle: 'Negotiate, Bid, and Finalize Deals',
  },
  {
    title: 'Step 4',
    color: 'primary',
    subtitle: 'Seamless Payment and Delivery',
  },
];

const HowItWorks = () => {
  const theme = useTheme();
  return (
    <Box
      id="how-it-works"
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
        How It Works
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch" maxWidth={1100} mx="auto">
        {steps.map((step, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                height: '100%',
                bgcolor: 'background.paper',
                borderTop: `6px solid ${theme.palette[step.color].main}`,
                boxShadow: `0 4px 24px 0 ${theme.palette[step.color].main}22`,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color={step.color}
                gutterBottom
                sx={{ mb: 2 }}
              >
                {step.title}
              </Typography>
              <Typography color="text.secondary" fontSize={18}>
                {step.subtitle}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;