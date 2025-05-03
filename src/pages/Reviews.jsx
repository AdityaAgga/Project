import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Rating,
  Avatar,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Divider,
  useTheme,
  LinearProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  ThumbUp as ThumbUpIcon,
  Sort as SortIcon,
  Star as StarIcon,
  FilterList as FilterIcon,
  VerifiedUser as VerifiedUserIcon
} from '@mui/icons-material';

// Sample review data
const sampleReviews = [
  {
    id: 1,
    customerName: 'John Smith',
    customerType: 'Retailer',
    rating: 5,
    date: '2024-04-25',
    comment: 'Excellent wholesale service! The products are of high quality and delivery was prompt. Will definitely order again.',
    helpful: 24,
    verified: true,
    productCategory: 'Electronics'
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    customerType: 'Wholesaler',
    rating: 4,
    date: '2024-04-23',
    comment: 'Great platform for business. The ordering process is smooth and customer service is responsive.',
    helpful: 15,
    verified: true,
    productCategory: 'Fashion'
  },
  {
    id: 3,
    customerName: 'Mike Brown',
    customerType: 'Retailer',
    rating: 5,
    date: '2024-04-20',
    comment: 'Best wholesale prices in the market. The bulk ordering feature saves a lot of time.',
    helpful: 32,
    verified: true,
    productCategory: 'Electronics'
  },
  {
    id: 4,
    customerName: 'Emily Davis',
    customerType: 'Retailer',
    rating: 3,
    date: '2024-04-18',
    comment: 'Good service overall, but delivery times could be improved. Product quality is consistent.',
    helpful: 8,
    verified: true,
    productCategory: 'Home & Garden'
  },
  {
    id: 5,
    customerName: 'David Wilson',
    customerType: 'Wholesaler',
    rating: 5,
    date: '2024-04-15',
    comment: 'The analytics dashboard is incredibly useful for tracking sales and inventory. Great platform!',
    helpful: 45,
    verified: true,
    productCategory: 'Fashion'
  }
];

const Reviews = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Calculate rating statistics
  const totalReviews = sampleReviews.length;
  const averageRating = sampleReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
  const ratingCounts = sampleReviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 64px)',
      pt: '84px',
      pb: 4,
      bgcolor: 'background.default'
    }}>
      <Box maxWidth="1200px" mx="auto" px={3}>
        {/* Header Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            mb: 3, 
            borderRadius: 2,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #1a237e 30%, #311b92 90%)'
              : 'linear-gradient(45deg, #3f51b5 30%, #5c6bc0 90%)',
            color: 'white'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Customer Reviews
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Rating 
                  value={averageRating} 
                  precision={0.1} 
                  readOnly 
                  sx={{ color: 'white' }}
                />
                <Typography variant="h6">
                  {averageRating.toFixed(1)}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  ({totalReviews} reviews)
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Stack 
                    key={rating}
                    direction="row" 
                    spacing={2} 
                    alignItems="center"
                  >
                    <Typography variant="body2" sx={{ minWidth: 60 }}>
                      {rating} stars
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(ratingCounts[rating] || 0) / totalReviews * 100}
                      sx={{ 
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'white'
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ minWidth: 40 }}>
                      {ratingCounts[rating] || 0}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Filters Section */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={2}
            alignItems={{ xs: 'stretch', md: 'center' }}
          >
            <TextField
              placeholder="Search reviews..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={<SortIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="recent">Most Recent</MenuItem>
                <MenuItem value="helpful">Most Helpful</MenuItem>
                <MenuItem value="rating">Highest Rating</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Rating</InputLabel>
              <Select
                value={filterRating}
                label="Rating"
                onChange={(e) => setFilterRating(e.target.value)}
                startAdornment={<StarIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="all">All Ratings</MenuItem>
                <MenuItem value="5">5 Stars</MenuItem>
                <MenuItem value="4">4 Stars & Up</MenuItem>
                <MenuItem value="3">3 Stars & Up</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
                startAdornment={<FilterIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="fashion">Fashion</MenuItem>
                <MenuItem value="home">Home & Garden</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Reviews List */}
        <Stack spacing={2}>
          {sampleReviews.map((review) => (
            <Paper 
              key={review.id}
              sx={{ 
                p: 3, 
                borderRadius: 2,
                '&:hover': {
                  boxShadow: theme.shadows[4]
                },
                transition: 'box-shadow 0.2s'
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar 
                  sx={{ 
                    width: 48, 
                    height: 48,
                    bgcolor: theme.palette.primary.main
                  }}
                >
                  {review.customerName.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={1}
                    flexWrap="wrap"
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.customerName}
                    </Typography>
                    {review.verified && (
                      <Chip
                        icon={<VerifiedUserIcon />}
                        label="Verified Purchase"
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    <Chip
                      label={review.customerType}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.date).toLocaleDateString()}
                    </Typography>
                  </Stack>
                  <Rating 
                    value={review.rating} 
                    readOnly 
                    size="small"
                    sx={{ my: 1 }}
                  />
                  <Typography variant="body1" paragraph>
                    {review.comment}
                  </Typography>
                  <Stack 
                    direction="row" 
                    spacing={2}
                    alignItems="center"
                  >
                    <Button
                      size="small"
                      startIcon={<ThumbUpIcon />}
                      variant="text"
                      color="inherit"
                    >
                      Helpful ({review.helpful})
                    </Button>
                    <Chip
                      label={review.productCategory}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Reviews; 