import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  useTheme,
  InputAdornment,
  Container,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

// Sample order data
const sampleOrders = [
  {
    id: "ORD-2024-001",
    status: "Delivered",
    orderDate: "2024-04-20",
    deliveryDate: "2024-04-25",
    items: [
      {
        name: "Premium Smartphones Bundle",
        quantity: 50,
        price: 25000,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
      },
      {
        name: "Wireless Earbuds Bulk Pack",
        quantity: 100,
        price: 5000,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
      }
    ],
    timeline: [
      { 
        status: "Order Placed", 
        date: "2024-04-20 09:00 AM", 
        completed: true,
        icon: <CheckCircleIcon />
      },
      { 
        status: "Order Confirmed", 
        date: "2024-04-20 10:30 AM", 
        completed: true,
        icon: <CheckCircleIcon />
      },
      { 
        status: "Processing", 
        date: "2024-04-21 02:00 PM", 
        completed: true,
        icon: <ScheduleIcon />
      },
      { 
        status: "Shipped", 
        date: "2024-04-22 11:00 AM", 
        completed: true,
        icon: <ShippingIcon />
      },
      { 
        status: "Out for Delivery", 
        date: "2024-04-25 08:30 AM", 
        completed: true,
        icon: <LocationIcon />
      },
      { 
        status: "Delivered", 
        date: "2024-04-25 02:15 PM", 
        completed: true,
        icon: <CheckCircleIcon />
      }
    ],
    shippingAddress: "123 Business District, New York, NY 10001",
    paymentMethod: "Bank Transfer",
    totalAmount: 30000
  }
];

const OrderTracking = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(sampleOrders[0]);

  const handleSearch = (event) => {
    event.preventDefault();
    // Implement search logic here
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'in transit':
        return 'primary';
      case 'processing':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box 
        sx={{ 
          minHeight: '100vh',
          bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#f5f5f5',
          pt: { xs: 2, sm: 4 },
          pb: 4
        }}
      >
        <Container maxWidth="lg">
          {/* Header Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 2, sm: 4 }, 
              mb: 3, 
              borderRadius: 2,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
                : 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Track Your Order
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Real-time updates on your wholesale orders
            </Typography>
          </Paper>

          {/* Search Section */}
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              mb: 3, 
              borderRadius: 2,
              boxShadow: theme.shadows[2]
            }}
          >
            <form onSubmit={handleSearch}>
              <TextField
                fullWidth
                placeholder="Enter your Order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Button 
                      variant="contained" 
                      type="submit"
                      sx={{ 
                        borderRadius: '8px',
                        px: 3,
                        py: 1,
                        boxShadow: 2
                      }}
                    >
                      Track
                    </Button>
                  )
                }}
              />
            </form>
          </Paper>

          {/* Order Details */}
          {selectedOrder && (
            <Grid container spacing={3}>
              {/* Timeline */}
              <Grid item xs={12} md={8}>
                <Paper 
                  sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    borderRadius: 2,
                    height: '100%',
                    boxShadow: theme.shadows[2]
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight="bold">
                      Shipping Status
                    </Typography>
                    <Chip 
                      label={selectedOrder.status}
                      color={getStatusColor(selectedOrder.status)}
                      sx={{ fontWeight: 'medium' }}
                    />
                  </Stack>
                  <Stepper 
                    orientation="vertical" 
                    sx={{
                      '& .MuiStepLabel-root': {
                        padding: '12px 0',
                      },
                      '& .MuiStepContent-root': {
                        borderLeft: `2px solid ${theme.palette.divider}`,
                      }
                    }}
                  >
                    {selectedOrder.timeline.map((step, index) => (
                      <Step key={index} active={step.completed}>
                        <StepLabel StepIconComponent={() => (
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: step.completed ? 'primary.main' : 'grey.300',
                              color: step.completed ? 'white' : 'grey.600'
                            }}
                          >
                            {step.icon}
                          </Box>
                        )}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {step.status}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {step.date}
                          </Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Paper>
              </Grid>

              {/* Order Info */}
              <Grid item xs={12} md={4}>
                <Stack spacing={3}>
                  <Paper 
                    sx={{ 
                      p: { xs: 2, sm: 3 }, 
                      borderRadius: 2,
                      boxShadow: theme.shadows[2]
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Order Details
                    </Typography>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">Order ID</Typography>
                        <Typography fontWeight="medium">{selectedOrder.id}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">Order Date</Typography>
                        <Typography>{selectedOrder.orderDate}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">Expected Delivery</Typography>
                        <Typography>{selectedOrder.deliveryDate}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">Total Amount</Typography>
                        <Typography fontWeight="bold" color="primary.main">
                          ${selectedOrder.totalAmount.toLocaleString()}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>

                  <Paper 
                    sx={{ 
                      p: { xs: 2, sm: 3 }, 
                      borderRadius: 2,
                      boxShadow: theme.shadows[2]
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Shipping Details
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography color="text.secondary" gutterBottom>
                          Delivery Address
                        </Typography>
                        <Typography fontWeight="medium">
                          {selectedOrder.shippingAddress}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="text.secondary" gutterBottom>
                          Payment Method
                        </Typography>
                        <Typography fontWeight="medium">
                          {selectedOrder.paymentMethod}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Stack>
              </Grid>

              {/* Order Items */}
              <Grid item xs={12}>
                <Paper 
                  sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    borderRadius: 2,
                    boxShadow: theme.shadows[2]
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Order Items
                  </Typography>
                  <Grid container spacing={3}>
                    {selectedOrder.items.map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card 
                          sx={{ 
                            height: '100%',
                            borderRadius: 2,
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: theme.shadows[4]
                            }
                          }}
                        >
                          <Box
                            sx={{
                              height: 200,
                              backgroundImage: `url(${item.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              borderRadius: '8px 8px 0 0'
                            }}
                          />
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {item.name}
                            </Typography>
                            <Stack spacing={1}>
                              <Stack direction="row" justifyContent="space-between">
                                <Typography color="text.secondary">
                                  Quantity
                                </Typography>
                                <Typography fontWeight="medium">
                                  {item.quantity} units
                                </Typography>
                              </Stack>
                              <Stack direction="row" justifyContent="space-between">
                                <Typography color="text.secondary">
                                  Price
                                </Typography>
                                <Typography fontWeight="bold" color="primary.main">
                                  ${item.price.toLocaleString()}
                                </Typography>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </Container>
  );
};

export default OrderTracking; 