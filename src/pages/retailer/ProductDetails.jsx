import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
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
  Chip,
  Divider,
  Rating,
  Avatar,
  IconButton
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../components/PaymentForm';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useAuth } from '../../context/AuthContext';

const stripePromise = loadStripe('pk_test_placeholder'); // Replace with your real key

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDialog, setOrderDialog] = useState({ open: false });
  const [orderQty, setOrderQty] = useState(1);
  const [orderLoading, setOrderLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [orderAmount, setOrderAmount] = useState(0);
  const [orderCreated, setOrderCreated] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewDialog, setReviewDialog] = useState({ open: false });
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: '',
    title: ''
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/v1/products/${productId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch product details');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/v1/products/${productId}/reviews`);
        if (!res.ok) throw new Error('Failed to fetch reviews');
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchProductDetails();
    fetchReviews();
  }, [productId]);

  const handleOrderClick = () => {
    setOrderDialog({ open: true });
  };

  const handleOrderClose = () => {
    setOrderDialog({ open: false });
    setOrderQty(1);
    setOrderCreated(false);
  };

  const handleOrderSubmit = async () => {
    setOrderLoading(true);
    try {
      const res = await fetch('/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          wholesaler: product.owner._id,
          products: [product._id],
          quantity: orderQty,
          amount: product.price * orderQty,
          deliveryAddress,
          status: 'Pending'
        })
      });
      if (!res.ok) throw new Error('Failed to create order');
      const data = await res.json();
      setOrderAmount(product.price * orderQty);
      setOrderCreated(true);
      setClientSecret(data.clientSecret);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setOrderLoading(false);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const res = await fetch(`/api/v1/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(reviewForm)
      });

      if (!res.ok) throw new Error('Failed to submit review');

      const newReview = await res.json();
      setReviews(prev => [...prev, newReview]);
      setReviewDialog({ open: false });
      setReviewForm({ rating: 0, comment: '', title: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!product) {
    return null;
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Box maxWidth={1200} mx="auto" px={2}>
        <Button onClick={() => navigate('/retailer/products')} variant="outlined" sx={{ mb: 3 }}>
          Back to Products
        </Button>
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  minHeight: 400
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 4 }}>
                <Stack direction="row" spacing={1} mb={2}>
                  {product.categories?.map(category => (
                    <Chip key={category} label={category} color="primary" variant="outlined" />
                  ))}
                </Stack>
                <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating
                    value={averageRating}
                    precision={0.5}
                    readOnly
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({reviews.length} reviews)
                  </Typography>
                </Box>
                <Typography variant="h5" color="text.secondary" mb={3}>
                  ${product.price}
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  {product.description}
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Stack spacing={2} mb={4}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Specifications
                  </Typography>
                  {product.specifications?.map((spec, index) => (
                    <Box key={index}>
                      <Typography variant="body2" color="text.secondary">
                        {spec.key}: {spec.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                  <Typography variant="body1">Stock: {product.stock} units</Typography>
                  <Chip
                    label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    color={product.stock > 0 ? 'success' : 'error'}
                  />
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                  <Typography variant="body1">Wholesaler:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {product.owner?.name || 'N/A'}
                  </Typography>
                </Stack>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleOrderClick}
                  disabled={product.stock <= 0}
                  sx={{ width: '100%', py: 1.5 }}
                >
                  Place Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Dialog open={orderDialog.open} onClose={handleOrderClose} maxWidth="sm" fullWidth>
        <DialogTitle>Place Order</DialogTitle>
        <DialogContent>
          {orderCreated ? (
            <Elements stripe={stripePromise}>
              <PaymentForm
                clientSecret={clientSecret}
                onSuccess={() => {
                  setOrderCreated(false);
                  handleOrderClose();
                  setSnackbar({ open: true, message: 'Payment successful!', severity: 'success' });
                }}
                onError={(error) => {
                  setSnackbar({ open: true, message: error.message, severity: 'error' });
                }}
              />
            </Elements>
          ) : (
            <Box component="form" onSubmit={handleOrderSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={orderQty}
                onChange={(e) => setOrderQty(Number(e.target.value))}
                margin="normal"
                required
                inputProps={{ min: 1, max: product.stock }}
              />
              <TextField
                fullWidth
                label="Delivery Address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                margin="normal"
                required
                multiline
                rows={3}
              />
            </Box>
          )}
        </DialogContent>
        {!orderCreated && (
          <DialogActions>
            <Button onClick={handleOrderClose}>Cancel</Button>
            <Button onClick={handleOrderSubmit} variant="contained" disabled={orderLoading}>
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
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {/* Reviews Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Customer Reviews</Typography>
              <Button
                variant="contained"
                onClick={() => setReviewDialog({ open: true })}
                disabled={!user}
              >
                Write a Review
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {reviews.length === 0 ? (
              <Typography color="text.secondary">No reviews yet</Typography>
            ) : (
              <Stack spacing={2}>
                {reviews.map((review) => (
                  <Box key={review._id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                        {review.user.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">{review.user.name}</Typography>
                        <Rating value={review.rating} size="small" readOnly />
                      </Box>
                    </Box>
                    <Typography variant="subtitle1" gutterBottom>
                      {review.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.comment}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Review Dialog */}
      <Dialog open={reviewDialog.open} onClose={() => setReviewDialog({ open: false })}>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>Rating</Typography>
            <Rating
              value={reviewForm.rating}
              onChange={(event, newValue) => {
                setReviewForm(prev => ({ ...prev, rating: newValue }));
              }}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
            <TextField
              fullWidth
              label="Title"
              value={reviewForm.title}
              onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Your Review"
              value={reviewForm.comment}
              onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
              multiline
              rows={4}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialog({ open: false })}>Cancel</Button>
          <Button
            onClick={handleReviewSubmit}
            variant="contained"
            disabled={!reviewForm.rating || !reviewForm.title || !reviewForm.comment}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetails; 