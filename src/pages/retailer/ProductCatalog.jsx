import React, { useState } from 'react';
import { Box, Paper, Typography, Grid, TextField, MenuItem, Button, Stack } from '@mui/material';

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);

  const categories = [
    'all',
    'electronics',
    'clothing',
    'home & kitchen',
    'beauty',
    'sports'
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Box maxWidth={1200} mx="auto" px={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'stretch', md: 'center' }} mb={4}>
          <Typography variant="h4" fontWeight="bold" color="primary">Product Catalog</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              size="small"
              variant="outlined"
            />
            <TextField
              select
              label="Category"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              size="small"
              variant="outlined"
            >
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>
        <Grid container spacing={4}>
          {filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', height: '100%' }}>
                <Box component="img" src={product.image} alt={product.name} sx={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>{product.name}</Typography>
                  <Typography color="text.secondary" mb={0.5}>Category: {product.category}</Typography>
                  <Typography color="text.secondary" mb={0.5}>Wholesaler: {product.wholesaler}</Typography>
                  <Typography color="text.secondary" mb={0.5}>Stock: {product.stock} units</Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography variant="h6" fontWeight="bold" color="primary">${product.price}</Typography>
                    <Button variant="contained" color="primary" sx={{ fontWeight: 'bold', borderRadius: 2 }}>
                      Place Order
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductCatalog; 