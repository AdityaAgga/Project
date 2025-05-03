import React from 'react';
import { Box, Typography, Paper, Button, Grid, Stack, useTheme } from '@mui/material';

const features = [
  {
    icon: '🔄',
    title: 'Resource Sharing',
    description: `List items you're willing to share or browse what others are offering. From tools to skills, every resource counts.`,
  },
  {
    icon: '👥',
    title: 'Community Building',
    description: 'Connect with neighbors, build trust, and strengthen local community bonds through meaningful exchanges.',
  },
  {
    icon: '🤝',
    title: 'Mutual Support',
    description: 'Contribute your unique skills and resources while benefiting from what others can offer. Everyone has something valuable to share.',
  },
  {
    icon: '🛡️',
    title: 'Trust & Safety',
    description: 'Our platform includes verification systems and community guidelines to ensure safe and reliable exchanges.',
  },
];

const values = [
  {
    icon: '🏘️',
    title: 'Community First',
    description: `We prioritize building strong, lasting connections within neighborhoods.`,
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    description: 'Reducing waste and promoting resource efficiency through sharing.',
  },
  {
    icon: '🌈',
    title: 'Inclusivity',
    description: `Creating a platform that's accessible and welcoming to everyone.`,
  },
];

const stats = [
  { icon: '👥', number: '5000+', label: 'Active Members' },
  { icon: '🤝', number: '10000+', label: 'Successful Exchanges' },
  { icon: '🌍', number: '50+', label: 'Local Communities' },
];

const benefits = [
  {
    icon: '💰',
    title: 'Save Money',
    description: 'Access resources without the need to purchase everything yourself.',
  },
  {
    icon: '♻️',
    title: 'Reduce Waste',
    description: 'Share rarely-used items instead of buying new ones.',
  },
  {
    icon: '🤝',
    title: 'Build Connections',
    description: 'Meet neighbors and form lasting community bonds.',
  },
  {
    icon: '📚',
    title: 'Share Knowledge',
    description: 'Exchange skills and learn from community members.',
  },
];

const About = () => {
  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100', minHeight: '100vh', py: 8, px: 2 }}>
      {/* Hero Section */}
      <Box maxWidth={900} mx="auto" textAlign="center" mb={8}>
        <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
          Community Resource Exchange
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Empowering communities through collaborative sharing and mutual support
        </Typography>
      </Box>

      {/* Mission Statement */}
      <Box maxWidth={900} mx="auto" mb={8}>
        <Paper elevation={4} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
            Our Mission
          </Typography>
          <Typography color="text.secondary" fontSize={18}>
            The Community Resource Exchange System is dedicated to creating a platform where neighbors can share resources, skills, and support with one another. We believe in building stronger communities through collaborative consumption and mutual aid, making resources more accessible while reducing waste and fostering meaningful connections.
          </Typography>
        </Paper>
      </Box>

      {/* Key Features */}
      <Box maxWidth={900} mx="auto" mb={8}>
        <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center" mb={4}>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: '100%' }}>
                <Stack alignItems="center" spacing={2}>
                  <Box fontSize={40} bgcolor="primary.light" color="primary.dark" p={2} borderRadius="50%">
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" color="text.primary">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Values Section */}
      <Box maxWidth={900} mx="auto" mb={8}>
        <Paper elevation={2} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3, bgcolor: 'primary.light' }}>
          <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center" mb={4}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box textAlign="center" p={2}>
                  <Box fontSize={36} mb={2}>{value.icon}</Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="text.primary" mb={1}>
                    {value.title}
                  </Typography>
                  <Typography color="text.secondary">{value.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Impact Stats */}
      <Box maxWidth={900} mx="auto" mb={8}>
        <Paper elevation={4} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center" mb={4}>
            Our Impact
          </Typography>
          <Grid container spacing={4} textAlign="center">
            {stats.map((stat, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box>
                  <Box fontSize={36} mb={1}>{stat.icon}</Box>
                  <Typography variant="h4" fontWeight="bold" color="primary" mb={1}>
                    {stat.number}
                  </Typography>
                  <Typography color="text.secondary">{stat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Benefits Section */}
      <Box maxWidth={900} mx="auto" mb={8}>
        <Paper elevation={2} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3, bgcolor: 'success.light' }}>
          <Typography variant="h5" fontWeight="bold" color="success.main" textAlign="center" mb={4}>
            Benefits
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: '100%' }}>
                  <Stack direction="row" alignItems="flex-start" spacing={2}>
                    <Box fontSize={32}>{benefit.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold" color="text.primary" mb={1}>
                        {benefit.title}
                      </Typography>
                      <Typography color="text.secondary">{benefit.description}</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Join Section */}
      <Box maxWidth={900} mx="auto" textAlign="center">
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Join Our Community
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Start sharing, connecting, and building a stronger community today. Every member makes our network more valuable for everyone.
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 'bold', borderRadius: 2 }}>
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default About;