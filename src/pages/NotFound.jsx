import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  useTheme
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: isDarkMode
        ? 'linear-gradient(135deg, rgba(26, 35, 126, 0.1) 0%, rgba(18, 18, 18, 0.05) 50%, rgba(49, 27, 146, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(232, 234, 246, 0.6) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(237, 231, 246, 0.6) 100%)',
    }}>
      {/* Decorative Elements */}
      <Box sx={{
        position: 'absolute',
        top: -120,
        left: -120,
        width: 320,
        height: 320,
        background: `linear-gradient(135deg, ${theme.palette.info.main} 60%, ${theme.palette.info.light} 100%)`,
        opacity: isDarkMode ? 0.15 : 0.2,
        borderRadius: '50%',
        zIndex: 0,
        animation: 'float 6s ease-in-out infinite',
        '@keyframes float': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, 20px)' },
          '100%': { transform: 'translate(0, 0)' }
        }
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -100,
        right: -100,
        width: 260,
        height: 260,
        background: `linear-gradient(135deg, ${theme.palette.info.light} 60%, ${theme.palette.info.main} 100%)`,
        opacity: isDarkMode ? 0.1 : 0.15,
        borderRadius: '50%',
        zIndex: 0,
        animation: 'float 8s ease-in-out infinite',
        '@keyframes float': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-20px, -20px)' },
          '100%': { transform: 'translate(0, 0)' }
        }
      }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          }
        }}>
          <Typography 
            variant="h1" 
            fontWeight={800} 
            sx={{ 
              mb: 2,
              fontSize: { xs: '4rem', md: '6rem' },
              background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.light} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' },
                '100%': { transform: 'scale(1)' }
              }
            }}
          >
            404
          </Typography>
          <Typography 
            variant="h4" 
            fontWeight={600} 
            sx={{ 
              mb: 2,
              color: 'text.primary',
              animation: 'slideIn 1s ease-out',
              '@keyframes slideIn': {
                '0%': { opacity: 0, transform: 'translateX(-20px)' },
                '100%': { opacity: 1, transform: 'translateX(0)' }
              }
            }}
          >
            Oops! Page Not Found
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              maxWidth: '400px',
              mx: 'auto',
              animation: 'slideIn 1s ease-out 0.2s',
              animationFillMode: 'both',
              '@keyframes slideIn': {
                '0%': { opacity: 0, transform: 'translateX(-20px)' },
                '100%': { opacity: 1, transform: 'translateX(0)' }
              }
            }}
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ 
              py: 1.5,
              px: 4,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.light} 100%)`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              },
              transition: 'all 0.2s ease-in-out',
              animation: 'slideIn 1s ease-out 0.4s',
              animationFillMode: 'both',
            }}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound; 