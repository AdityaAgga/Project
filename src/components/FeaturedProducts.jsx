import React from 'react';
import { Box, Typography, Paper, Button, Grid, useTheme } from '@mui/material';

const products = [
  {
    name: 'Premium Rice',
    price: '₹100',
    color: 'primary',
    image: '/pd_4.jpg',
    detailsLink: '#',
  },
  {
    name: 'Organic Wheat',
    price: '₹120',
    color: 'secondary',
    image: '/pd_4.jpg',
    detailsLink: '#',
  },
  {
    name: 'Bulk Sugar',
    price: '₹90',
    color: 'success',
    image: '/pd_4.jpg',
    detailsLink: '#',
  },
];

const FeaturedProducts = () => {
  const theme = useTheme();
  return (
    <Box
      id="featured-products"
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
        Featured Products
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch" maxWidth={1100} mx="auto">
        {products.map((product, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                height: '100%',
                bgcolor: 'background.paper',
                borderTop: `6px solid ${theme.palette[product.color].main}`,
                boxShadow: `0 4px 24px 0 ${theme.palette[product.color].main}22`,
              }}
            >
              <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{ width: 240, height: 140, objectFit: 'cover', borderRadius: 2, boxShadow: 2 }}
                />
              </Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                color={product.color}
                gutterBottom
                sx={{ mb: 1 }}
              >
                {product.name}
              </Typography>
              <Typography color="text.secondary" fontSize={18} mb={2}>
                Price per unit: {product.price}
              </Typography>
              <Button
                href={product.detailsLink}
                variant="contained"
                color={product.color}
                size="medium"
                sx={{ fontWeight: 'bold', borderRadius: 2, mt: 2 }}
                fullWidth
              >
                View Details
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedProducts;