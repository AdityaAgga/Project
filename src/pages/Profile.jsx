import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Divider,
  Avatar,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import BusinessIcon from '@mui/icons-material/Business';
import BarChartIcon from '@mui/icons-material/BarChart';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useAuth } from '../context/AuthContext';
import { validateImage, uploadProfileImage } from '../utils/fileUpload';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState(null);
  const [editDialog, setEditDialog] = useState({ open: false, type: null });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessAddress: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageDialog, setImageDialog] = useState({ open: false, image: null });
  const [crop, setCrop] = useState({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/v1/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch profile data');
        const data = await res.json();
        setProfileData(data);
        setFormData(prev => ({
          ...prev,
          name: data.name,
          email: data.email,
          phone: data.phone,
          businessName: data.businessName,
          businessAddress: data.businessAddress
        }));

        // Fetch user statistics
        const statsRes = await fetch('/api/v1/users/stats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleEditClick = (type) => {
    setEditDialog({ open: true, type });
  };

  const handleDialogClose = () => {
    setEditDialog({ open: false, type: null });
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let endpoint = '/api/v1/users/profile';
      let body = {};

      if (editDialog.type === 'profile') {
        body = {
          name: formData.name,
          phone: formData.phone
        };
      } else if (editDialog.type === 'business') {
        body = {
          businessName: formData.businessName,
          businessAddress: formData.businessAddress
        };
      } else if (editDialog.type === 'password') {
        endpoint = '/api/v1/users/change-password';
        body = {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        };
        
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }
      }

      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('Failed to update profile');

      setSnackbar({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success'
      });
      handleDialogClose();

      // Refresh profile data
      const profileRes = await fetch('/api/v1/users/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (profileRes.ok) {
        const data = await profileRes.json();
        setProfileData(data);
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const errors = await validateImage(file);
      if (errors.length > 0) {
        setSnackbar({
          open: true,
          message: errors.join(', '),
          severity: 'error'
        });
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setImageDialog({ open: true, image: imageUrl });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    }
  };

  const onImageLoad = (img) => {
    imgRef.current = img;
  };

  const handleCrop = async () => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    try {
      setUploadingImage(true);
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      canvas.toBlob(async (blob) => {
        try {
          const imageUrl = await uploadProfileImage(blob);
          setProfileData(prev => ({ ...prev, profileImage: imageUrl }));
          setImageDialog({ open: false, image: null });
          setSnackbar({
            open: true,
            message: 'Profile image updated successfully',
            severity: 'success'
          });
        } catch (err) {
          setSnackbar({
            open: true,
            message: err.message,
            severity: 'error'
          });
        } finally {
          setUploadingImage(false);
        }
      }, 'image/jpeg', 0.95);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
      setUploadingImage(false);
    }
  };

  if (loading && !profileData) {
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

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Box maxWidth={1200} mx="auto" px={2}>
        <Typography variant="h4" fontWeight="bold" color="primary" mb={4}>
          Profile
        </Typography>

        <Grid container spacing={4}>
          {/* Profile Overview */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Stack alignItems="center" spacing={2}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={profileData?.profileImage}
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: 'primary.main',
                      fontSize: '3rem'
                    }}
                  >
                    {profileData?.name?.[0]?.toUpperCase()}
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                  />
                  <Tooltip title="Change profile picture">
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.paper' }
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? (
                        <CircularProgress size={24} />
                      ) : (
                        <PhotoCameraIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="h5" fontWeight="bold">
                  {profileData?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {user?.role === 'retailer' ? 'Retailer' : 'Wholesaler'}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditClick('profile')}
                >
                  Edit Profile
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* Business Details */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight="bold">
                    Business Details
                  </Typography>
                  <IconButton onClick={() => handleEditClick('business')}>
                    <EditIcon />
                  </IconButton>
                </Stack>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Business Name
                    </Typography>
                    <Typography variant="body1">
                      {profileData?.businessName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {profileData?.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1">
                      {profileData?.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Business Address
                    </Typography>
                    <Typography variant="body1">
                      {profileData?.businessAddress}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          </Grid>

          {/* Statistics */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Business Statistics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="text.secondary">
                        Total Orders
                      </Typography>
                      <Typography variant="h4">
                        {stats?.totalOrders || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="text.secondary">
                        {user?.role === 'retailer' ? 'Amount Spent' : 'Revenue'}
                      </Typography>
                      <Typography variant="h4">
                        ${stats?.totalAmount || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="text.secondary">
                        Active Orders
                      </Typography>
                      <Typography variant="h4">
                        {stats?.activeOrders || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="text.secondary">
                        {user?.role === 'retailer' ? 'Products Ordered' : 'Products Listed'}
                      </Typography>
                      <Typography variant="h4">
                        {stats?.totalProducts || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Edit Dialogs */}
        <Dialog open={editDialog.open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editDialog.type === 'profile' && 'Edit Profile'}
            {editDialog.type === 'business' && 'Edit Business Details'}
            {editDialog.type === 'password' && 'Change Password'}
          </DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 2 }}>
              {editDialog.type === 'profile' && (
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Stack>
              )}
              {editDialog.type === 'business' && (
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    label="Business Address"
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                  />
                </Stack>
              )}
              {editDialog.type === 'password' && (
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </Stack>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Save Changes'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Password Change Button */}
        <Box sx={{ position: 'fixed', bottom: 24, right: 24 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LockIcon />}
            onClick={() => handleEditClick('password')}
          >
            Change Password
          </Button>
        </Box>

        {/* Image Crop Dialog */}
        <Dialog
          open={imageDialog.open}
          onClose={() => setImageDialog({ open: false, image: null })}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Crop Profile Picture</DialogTitle>
          <DialogContent>
            <Box sx={{ height: 400, width: '100%', display: 'flex', justifyContent: 'center' }}>
              {imageDialog.image && (
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  minWidth={100}
                  minHeight={100}
                >
                  <img
                    ref={imgRef}
                    src={imageDialog.image}
                    onLoad={(e) => onImageLoad(e.currentTarget)}
                    style={{ maxHeight: '400px', maxWidth: '100%' }}
                    alt="Crop preview"
                  />
                </ReactCrop>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setImageDialog({ open: false, image: null })}>
              Cancel
            </Button>
            <Button
              onClick={handleCrop}
              variant="contained"
              disabled={uploadingImage || !completedCrop}
            >
              {uploadingImage ? <CircularProgress size={24} /> : 'Crop & Upload'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
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
      </Box>
    </Box>
  );
};

export default Profile; 