import React from 'react';
import { Box, Typography, Paper, Button, Grid, Stack, useTheme } from '@mui/material';

const HowItWorksBrief = () => {
  const theme = useTheme();
  return (
    <Box sx={{
      bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
      py: { xs: 6, md: 10 },
      px: 2,
    }}>
      {/* Header Section */}
      <Box maxWidth={800} mx="auto" textAlign="center" mb={8}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Start sharing and connecting with your community in just a few simple steps
        </Typography>
      </Box>

      {/* Process Steps */}
      <Box maxWidth={1000} mx="auto" mb={10}>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={6} sx={{ p: 4, height: '100%', borderRadius: 3, position: 'relative' }}>
                <Box sx={{
                  position: 'absolute',
                  top: -24,
                  left: 24,
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  boxShadow: 2,
                  zIndex: 1,
                }}>{index + 1}</Box>
                <Stack alignItems="center" spacing={2} mt={2}>
                  <Box sx={{ fontSize: 40, bgcolor: 'primary.light', color: 'primary.dark', p: 2, borderRadius: '50%' }}>
                    {step.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" color="text.primary">
                    {step.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {step.description}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Guidelines Section */}
      <Box maxWidth={900} mx="auto" mb={10}>
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center" mb={4}>
            Community Guidelines
          </Typography>
          <Grid container spacing={3}>
            {guidelines.map((guideline, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box display="flex" alignItems="flex-start" gap={2} bgcolor="grey.100" p={2} borderRadius={2}>
                  <Box fontSize={32}>🛡️</Box>
                  <Box>
                    <Typography fontWeight="medium" color="text.primary">
                      {guideline.title}
                    </Typography>
                    <Typography color="text.secondary">{guideline.description}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Success Stories */}
      <Box maxWidth={900} mx="auto" mb={10}>
        <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center" mb={4}>
          Success Stories
        </Typography>
        <Grid container spacing={4}>
          {stories.map((story, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={4} sx={{ p: 4, borderRadius: 3, height: '100%' }}>
                <Box display="flex" alignItems="flex-start" gap={2}>
                  <Box fontSize={32}>⭐</Box>
                  <Box>
                    <Typography color="text.secondary" fontStyle="italic" mb={1}>
                      {story.quote}
                    </Typography>
                    <Typography fontWeight="medium" color="text.primary">
                      {story.author}
                    </Typography>
                    <Typography color="text.secondary" fontSize={14}>
                      {story.type}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box maxWidth={900} mx="auto" mb={10}>
        <Paper elevation={2} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3, bgcolor: 'primary.light' }}>
          <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center" mb={4}>
            Frequently Asked Questions
          </Typography>
          <Stack spacing={3}>
            {faqs.map((faq, index) => (
              <Paper key={index} elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="subtitle1" fontWeight="medium" color="text.primary" mb={1}>
                  {faq.question}
                </Typography>
                <Typography color="text.secondary">{faq.answer}</Typography>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Box>

      {/* Call to Action */}
      <Box maxWidth={800} mx="auto" textAlign="center">
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Ready to Get Started?
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Join our community today and start sharing resources with your neighbors
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 'bold', borderRadius: 2 }}>
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

const steps = [
  {
    icon: "👤",
    title: "Create Your Profile",
    description: "Sign up and create your profile with your skills, interests, and the resources you're willing to share."
  },
  {
    icon: "🔍",
    title: "Browse & Connect",
    description: "Search for available resources or post what you're looking for. Find community members with matching offers."
  },
  {
    icon: "🤝",
    title: "Exchange & Share",
    description: "Arrange exchanges, share resources, and build trust through successful transactions and feedback."
  }
];

const guidelines = [
  {
    title: "Respect & Trust",
    description: "Treat all community members with respect and maintain open communication."
  },
  {
    title: "Safety First",
    description: "Follow safety guidelines for in-person exchanges and maintain privacy."
  },
  {
    title: "Clear Communication",
    description: "Be clear about expectations, timing, and conditions of resource sharing."
  },
  {
    title: "Reliable Exchange",
    description: "Honor your commitments and return borrowed items in good condition."
  }
];

const stories = [
  {
    quote: "I borrowed a power drill for my home project and ended up making a great friend in my neighborhood!",
    author: "Sarah M.",
    type: "Tool Exchange"
  },
  {
    quote: "Teaching Spanish to a neighbor while learning gardening tips from them has been an amazing experience.",
    author: "Michael K.",
    type: "Skill Exchange"
  }
];

const faqs = [
  {
    question: "How do I know if I can trust other members?",
    answer: "Our platform includes a verification system, user ratings, and reviews. Members build reputation through successful exchanges and community participation."
  },
  {
    question: "What kind of items can I share?",
    answer: "You can share tools, equipment, books, skills, knowledge, or any resource that might be valuable to others. All items must comply with our community guidelines."
  },
  {
    question: "Is there a fee to join?",
    answer: "Basic membership is free! We believe in making resource sharing accessible to everyone in the community."
  }
];

export default HowItWorksBrief;