import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert as MuiAlert,
  Chip,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  OutlinedInput
} from '@mui/material';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../components/PaymentForm';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const BACKEND_URL = 'http://localhost:5000';
const stripePromise = loadStripe('pk_test_placeholder'); // Replace with your real key

const RetailerProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDialog, setOrderDialog] = useState({ open: false, product: null });
  const [orderQty, setOrderQty] = useState(1);
  const [orderLoading, setOrderLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showPayment, setShowPayment] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [orderCreated, setOrderCreated] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/products/all`, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term and category
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.categories?.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleOrderClick = (product) => {
    setOrderDialog({ open: true, product });
    setOrderQty(1);
  };

  const handleOrderClose = () => {
    setOrderDialog({ open: false, product: null });
    setOrderQty(1);
    setShowPayment(false);
    setOrderCreated(false);
    setDeliveryAddress('');
  };

  const handleOrderSubmit = async () => {
    if (!deliveryAddress.trim()) {
      setSnackbar({ open: true, message: 'Please enter a delivery address', severity: 'error' });
      return;
    }

    setOrderLoading(true);
    const product = orderDialog.product;
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          wholesaler: product.owner._id,
          products: [{ product: product._id, quantity: orderQty }],
          amount: product.price * orderQty,
          deliveryAddress,
          status: 'Pending'
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create order');
      }
      const data = await res.json();
      setOrderAmount(product.price * orderQty);
      setOrderCreated(true);
      setClientSecret(data.clientSecret);
      setShowPayment(true);
    } catch (err) {
      console.error('Error creating order:', err);
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setOrderLoading(false);
    }
  };

  // Get unique categories from products
  const categories = ['all', ...new Set(products.flatMap(p => p.categories || []))];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Box maxWidth={1200} mx="auto" px={2}>
        <Button component={Link} to="/retailer/dashboard" variant="outlined" sx={{ mb: 3 }}>
          Back to Dashboard
        </Button>
        <Typography variant="h4" fontWeight="bold" color="primary" mb={4}>
          Available Products
        </Typography>

        {/* Search and Filter Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {!loading && !error && filteredProducts.length === 0 && (
          <Alert severity="info" sx={{ mb: 3 }}>
            No products found matching your criteria
          </Alert>
        )}
        <Grid container spacing={4}>
          {filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', height: '100%' }}>
                {product.image && (
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover'
                    }}
                  />
                )}
                <Box sx={{ p: 3 }}>
                  <Stack direction="row" spacing={1} mb={2}>
                    {product.categories?.map(category => (
                      <Chip key={category} label={category} color="primary" variant="outlined" size="small" />
                    ))}
                  </Stack>
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={2}>
                    {product.description?.substring(0, 100)}...
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" color="primary">
                      ${product.price?.toLocaleString()}
                    </Typography>
                    <Chip
                      label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      color={product.stock > 0 ? 'success' : 'error'}
                      size="small"
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Button
                      component={Link}
                      to={`/retailer/products/${product._id}`}
                      variant="outlined"
                      color="primary"
                      fullWidth
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOrderClick(product)}
                      disabled={!product.stock || product.stock <= 0}
                      fullWidth
                    >
                      Order Now
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={orderDialog.open} onClose={handleOrderClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {orderCreated && showPayment ? 'Complete Payment' : 'Place Order'}
        </DialogTitle>
        <DialogContent>
          {orderCreated && showPayment ? (
            clientSecret ? (
              <Elements stripe={stripePromise}>
                <PaymentForm 
                  clientSecret={clientSecret}
                  amount={orderAmount}
                  onSuccess={() => {
                    setSnackbar({ open: true, message: 'Payment successful!', severity: 'success' });
                    handleOrderClose();
                  }}
                  onError={(error) => {
                    setSnackbar({ open: true, message: error.message, severity: 'error' });
                  }}
                />
              </Elements>
            ) : (
              <CircularProgress />
            )
          ) : (
            <>
              <Typography variant="body1" color="text.secondary" mb={3}>
                {orderDialog.product?.name} - ${orderDialog.product?.price} per unit
              </Typography>
              <TextField
                label="Quantity"
                type="number"
                value={orderQty}
                onChange={(e) => setOrderQty(Math.max(1, parseInt(e.target.value) || 1))}
                fullWidth
                margin="normal"
                InputProps={{ inputProps: { min: 1, max: orderDialog.product?.stock || 1 } }}
              />
              <TextField
                label="Delivery Address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
                required
              />
              <Typography variant="h6" color="primary" mt={2}>
                Total: ${((orderDialog.product?.price || 0) * orderQty).toLocaleString()}
              </Typography>
            </>
          )}
        </DialogContent>
        {!showPayment && (
          <DialogActions>
            <Button onClick={handleOrderClose}>Cancel</Button>
            <Button
              onClick={handleOrderSubmit}
              variant="contained"
              color="primary"
              disabled={orderLoading || !deliveryAddress.trim()}
            >
              {orderLoading ? <CircularProgress size={24} /> : 'Place Order'}
            </Button>
          </DialogActions>
        )}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default RetailerProducts; 