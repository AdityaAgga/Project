import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  Chip,
  Stack,
  Avatar,
  Divider,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  LinearProgress,
  Card,
  CardContent,
  CardActions,
  Tab,
  Tabs,
  InputAdornment,
  Alert,
} from '@mui/material';
import {
  Timer as TimerIcon,
  LocalOffer as BidIcon,
  History as HistoryIcon,
  TrendingUp as TrendingUpIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
} from '@mui/icons-material';

// Sample auction data
const sampleAuctions = [
  {
    id: 1,
    title: 'Bulk Electronics Package',
    description: 'Large quantity of premium smartphones and accessories',
    currentBid: 25000,
    startingBid: 20000,
    minBidIncrement: 500,
    endTime: '2024-05-01T15:00:00',
    seller: 'TechWholesale Inc.',
    category: 'Electronics',
    bids: 15,
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1021&q=80',
    status: 'active'
  },
  {
    id: 2,
    title: 'Designer Fashion Collection',
    description: 'Premium designer clothing lot - Spring Collection',
    currentBid: 15000,
    startingBid: 12000,
    minBidIncrement: 300,
    endTime: '2024-05-02T18:00:00',
    seller: 'FashionPro Wholesale',
    category: 'Fashion',
    bids: 8,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    status: 'active'
  },
  {
    id: 3,
    title: 'Home Appliances Bundle',
    description: 'Wholesale lot of premium home appliances',
    currentBid: 35000,
    startingBid: 30000,
    minBidIncrement: 1000,
    endTime: '2024-05-03T12:00:00',
    seller: 'HomeGoods Wholesale',
    category: 'Home & Garden',
    bids: 12,
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80',
    status: 'active'
  }
];

// Sample bid history
const sampleBidHistory = [
  {
    id: 1,
    auctionId: 1,
    bidder: 'RetailTech Solutions',
    amount: 25000,
    time: '2024-04-26T10:30:00',
    status: 'highest'
  },
  {
    id: 2,
    auctionId: 1,
    bidder: 'ElectroMart',
    amount: 24500,
    time: '2024-04-26T10:15:00',
    status: 'outbid'
  }
];

const Bidding = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('endingSoon');
  const [openBidDialog, setOpenBidDialog] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [showBidSuccess, setShowBidSuccess] = useState(false);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenBidDialog = (auction) => {
    setSelectedAuction(auction);
    setBidAmount((auction.currentBid + auction.minBidIncrement).toString());
    setOpenBidDialog(true);
  };

  const handleCloseBidDialog = () => {
    setOpenBidDialog(false);
    setSelectedAuction(null);
    setBidAmount('');
  };

  const handlePlaceBid = () => {
    // Here you would implement the actual bid placement logic
    setShowBidSuccess(true);
    handleCloseBidDialog();
    setTimeout(() => setShowBidSuccess(false), 5000);
  };

  const getTimeRemaining = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };

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
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Bidding System
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Place bids on wholesale items and manage your bidding activities
          </Typography>
        </Paper>

        {/* Success Alert */}
        {showBidSuccess && (
          <Alert 
            severity="success" 
            sx={{ mb: 3 }}
            onClose={() => setShowBidSuccess(false)}
          >
            Bid placed successfully!
          </Alert>
        )}

        {/* Filters Section */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={2}
            alignItems={{ xs: 'stretch', md: 'center' }}
          >
            <TextField
              placeholder="Search auctions..."
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
            <TextField
              select
              size="small"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Category"
              sx={{ minWidth: 150 }}
              SelectProps={{
                startAdornment: <FilterIcon sx={{ mr: 1 }} />
              }}
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Garden</option>
            </TextField>
            <TextField
              select
              size="small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
              sx={{ minWidth: 150 }}
              SelectProps={{
                startAdornment: <SortIcon sx={{ mr: 1 }} />
              }}
            >
              <option value="endingSoon">Ending Soon</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="mostBids">Most Bids</option>
            </TextField>
          </Stack>
        </Paper>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab 
              icon={<BidIcon sx={{ mr: 1 }} />} 
              label="Active Auctions" 
              iconPosition="start"
            />
            <Tab 
              icon={<HistoryIcon sx={{ mr: 1 }} />} 
              label="My Bids" 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Active Auctions */}
        {currentTab === 0 && (
          <Grid container spacing={3}>
            {sampleAuctions.map((auction) => (
              <Grid item xs={12} md={6} lg={4} key={auction.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: theme.shadows[4]
                    },
                    transition: 'box-shadow 0.2s'
                  }}
                >
                  <Box 
                    sx={{ 
                      height: 200, 
                      backgroundImage: `url(${auction.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}
                  >
                    <Chip
                      label={auction.category}
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        color: 'white'
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {auction.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {auction.description}
                    </Typography>
                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                          Current Bid
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                          ${auction.currentBid.toLocaleString()}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                          Total Bids
                        </Typography>
                        <Typography variant="subtitle2">
                          {auction.bids}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <TimerIcon color="error" fontSize="small" />
                        <Typography variant="subtitle2" color="error.main">
                          Ends in {getTimeRemaining(auction.endTime)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      startIcon={<BidIcon />}
                      onClick={() => handleOpenBidDialog(auction)}
                    >
                      Place Bid
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* My Bids */}
        {currentTab === 1 && (
          <Stack spacing={2}>
            {sampleBidHistory.map((bid) => (
              <Paper 
                key={bid.id}
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {sampleAuctions.find(a => a.id === bid.auctionId)?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bid placed: {new Date(bid.time).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="h6" color="primary">
                      ${bid.amount.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Chip
                      label={bid.status === 'highest' ? 'Highest Bid' : 'Outbid'}
                      color={bid.status === 'highest' ? 'success' : 'error'}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Stack>
        )}

        {/* Bid Dialog */}
        <Dialog 
          open={openBidDialog} 
          onClose={handleCloseBidDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Place Bid
            <IconButton
              onClick={handleCloseBidDialog}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedAuction && (
              <Stack spacing={3}>
                <Typography variant="h6">
                  {selectedAuction.title}
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">
                      Current Bid
                    </Typography>
                    <Typography fontWeight="bold">
                      ${selectedAuction.currentBid.toLocaleString()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">
                      Minimum Increment
                    </Typography>
                    <Typography>
                      ${selectedAuction.minBidIncrement.toLocaleString()}
                    </Typography>
                  </Stack>
                  <TextField
                    label="Your Bid Amount"
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    helperText={`Minimum bid: $${(selectedAuction.currentBid + selectedAuction.minBidIncrement).toLocaleString()}`}
                  />
                </Stack>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBidDialog}>Cancel</Button>
            <Button 
              variant="contained"
              onClick={handlePlaceBid}
              disabled={!bidAmount || Number(bidAmount) <= (selectedAuction?.currentBid || 0)}
            >
              Place Bid
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Bidding; 