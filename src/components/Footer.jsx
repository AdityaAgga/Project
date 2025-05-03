import React from 'react';
import { Box, Typography, Link as MuiLink, Stack } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1e293b', // deep blue/gray
        color: '#fff',
        textAlign: 'center',
        py: 4,
      }}
    >
      <Stack direction="row" spacing={4} justifyContent="center" mb={2}>
        <MuiLink href="#about" color="inherit" underline="hover" sx={{ '&:hover': { color: '#38bdf8' } }}>
          About
        </MuiLink>
        <MuiLink href="#contact" color="inherit" underline="hover" sx={{ '&:hover': { color: '#38bdf8' } }}>
          Contact
        </MuiLink>
        <MuiLink href="#privacy-policy" color="inherit" underline="hover" sx={{ '&:hover': { color: '#38bdf8' } }}>
          Privacy Policy
        </MuiLink>
      </Stack>
      <Typography variant="body2" color="inherit">
        © 2025 CRES - All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;