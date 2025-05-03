import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PhotoCamera, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const BACKEND_URL = 'http://localhost:5000';

const WholesalerProducts = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({
    name: '',
    stock: '',
    price: '',
    image: null,
    categories: []
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/products`, {
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
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (product = null) => {
    if (product) {
      setEditMode(true);
      setSelectedProduct(product);
      setForm({
        name: product.name,
        stock: product.stock,
        price: product.price,
        categories: product.categories || [],
        image: null
      });
      setPreview(product.image);
    } else {
      setEditMode(false);
      setSelectedProduct(null);
      setForm({
        name: '',
        stock: '',
        price: '',
        image: null,
        categories: []
      });
      setPreview(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedProduct(null);
    setForm({
      name: '',
      stock: '',
      price: '',
      image: null,
      categories: []
    });
    setPreview(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files?.length) {
      setForm(f => ({ ...f, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('stock', form.stock);
      formData.append('price', form.price);
      if (form.categories.length) {
        formData.append('categories', JSON.stringify(form.categories));
      }
      if (form.image) {
        formData.append('image', form.image);
      }

      const url = editMode
        ? `${BACKEND_URL}/api/v1/products/${selectedProduct._id}`
        : `${BACKEND_URL}/api/v1/products`;

      const res = await fetch(url, {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to ${editMode ? 'update' : 'add'} product`);
      }

      const data = await res.json();
      
      if (editMode) {
        setProducts(products.map(p => p._id === data._id ? data : p));
        setSnackbar({
          open: true,
          message: 'Product updated successfully',
          severity: 'success'
        });
      } else {
        setProducts([...products, data]);
        setSnackbar({
          open: true,
          message: 'Product added successfully',
          severity: 'success'
        });
      }
      handleClose();
    } catch (err) {
      console.error('Error submitting product:', err);
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setActionLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }

      setProducts(products.filter(p => p._id !== productId));
      setSnackbar({
        open: true,
        message: 'Product deleted successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error deleting product:', err);
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Box maxWidth={1200} mx="auto" px={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            My Products
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
            sx={{ fontWeight: 'bold', borderRadius: 2 }}
          >
            Add Product
          </Button>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && products.length === 0 && (
          <Alert severity="info" sx={{ mb: 3 }}>
            You haven't added any products yet
          </Alert>
        )}

        <Grid container spacing={4}>
          {products.map(product => (
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
                  <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>
                    {product.name}
                  </Typography>
                  <Stack direction="row" spacing={1} mb={2}>
                    {product.categories?.map(category => (
                      <Chip
                        key={category}
                        label={category}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Stack>
                  <Typography color="text.secondary" mb={0.5}>
                    Stock: {product.stock} units
                  </Typography>
                  <Typography color="text.secondary" mb={2}>
                    Price: ${product.price?.toLocaleString()}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpen(product)}
                      disabled={actionLoading}
                      fullWidth
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(product._id)}
                      disabled={actionLoading}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editMode ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                label="Product Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Stock"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                type="number"
                fullWidth
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
              <TextField
                label="Price"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  inputProps: { min: 0, step: 0.01 }
                }}
              />
              <FormControl fullWidth>
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={form.categories}
                  onChange={(e) => setForm({ ...form, categories: e.target.value })}
                  input={<OutlinedInput label="Categories" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {['Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Others'].map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCamera />}
                fullWidth
              >
                Upload Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={handleChange}
                />
              </Button>
              {preview && (
                <Box
                  component="img"
                  src={preview}
                  alt="Preview"
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 2
                  }}
                />
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={actionLoading}
            >
              {actionLoading ? (
                <CircularProgress size={24} />
              ) : editMode ? (
                'Update Product'
              ) : (
                'Add Product'
              )}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
            elevation={6}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default WholesalerProducts; 