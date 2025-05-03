import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Button, 
  Stack, 
  Chip, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  CircularProgress, 
  Alert,
  Card,
  CardContent,
  IconButton,
  useTheme,
  LinearProgress,
  Avatar,
  Badge,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardHeader,
  CardActions
} from '@mui/material';
import { 
  Link, 
  useNavigate 
} from 'react-router-dom';
import { 
  ShoppingCart, 
  Inventory, 
  Message, 
  TrendingUp, 
  LocalShipping, 
  Notifications,
  MoreVert,
  ArrowForward,
  Star,
  StarBorder,
  Person,
  Store,
  Payment,
  Assessment,
  Timeline,
  Category,
  LocalOffer,
  Group,
  Settings,
  Help
} from '@mui/icons-material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const RetailerDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      pendingOrders: 5,
      totalProducts: 24,
      totalSales: 15000,
      newMessages: 3,
      activeSuppliers: 8,
      monthlyGrowth: 12.5,
      customerSatisfaction: 4.8,
      inventoryValue: 45000
    },
    recentMessages: [
      { id: 1, sender: 'Wholesaler A', message: 'Your order has been shipped', time: '2 hours ago' },
      { id: 2, sender: 'Wholesaler B', message: 'New products available', time: '5 hours ago' },
      { id: 3, sender: 'Support', message: 'Your query has been resolved', time: '1 day ago' }
    ],
    recentOrders: [
      { id: 1, product: 'Product A', quantity: 10, status: 'Pending', date: '2024-03-20', amount: 1200 },
      { id: 2, product: 'Product B', quantity: 5, status: 'Shipped', date: '2024-03-19', amount: 800 },
      { id: 3, product: 'Product C', quantity: 15, status: 'Delivered', date: '2024-03-18', amount: 1500 }
    ],
    salesData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [3000, 4000, 3500, 5000, 4500, 6000]
    },
    topProducts: [
      { id: 1, name: 'Product A', sales: 120, rating: 4.5, price: 99.99, image: '/product1.jpg' },
      { id: 2, name: 'Product B', sales: 95, rating: 4.2, price: 149.99, image: '/product2.jpg' },
      { id: 3, name: 'Product C', sales: 80, rating: 4.0, price: 79.99, image: '/product3.jpg' }
    ],
    performanceMetrics: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      sales: [1200, 1900, 1500, 2100, 1800, 2500, 2200],
      orders: [8, 12, 10, 15, 11, 18, 14]
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const salesChartData = {
    labels: dashboardData.salesData.labels,
    datasets: [
      {
        label: 'Sales',
        data: dashboardData.salesData.data,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        tension: 0.4,
        fill: true
      }
    ]
  };

  const performanceChartData = {
    labels: dashboardData.performanceMetrics.labels,
    datasets: [
      {
        label: 'Sales',
        data: dashboardData.performanceMetrics.sales,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4
      },
      {
        label: 'Orders',
        data: dashboardData.performanceMetrics.orders,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: theme.palette.text.primary
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        },
        ticks: {
          color: theme.palette.text.secondary
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: theme.palette.text.secondary
        }
      }
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

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Box maxWidth={1400} mx="auto" px={2}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Welcome back! Here's what's happening with your store today.
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Settings />}
            >
              Settings
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCart />}
              onClick={() => navigate('/retailer/orders')}
            >
              New Order
            </Button>
          </Stack>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: 'white'
            }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" gutterBottom>Pending Orders</Typography>
                    <Typography variant="h4" fontWeight="bold">{dashboardData.stats.pendingOrders}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>+2 from last week</Typography>
                  </Box>
                  <LocalShipping sx={{ fontSize: 40, opacity: 0.8 }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
              color: 'white'
            }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" gutterBottom>Total Products</Typography>
                    <Typography variant="h4" fontWeight="bold">{dashboardData.stats.totalProducts}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>+5 new this month</Typography>
                  </Box>
                  <Inventory sx={{ fontSize: 40, opacity: 0.8 }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
              color: 'white'
            }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" gutterBottom>Total Sales</Typography>
                    <Typography variant="h4" fontWeight="bold">${dashboardData.stats.totalSales.toLocaleString()}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>+12.5% from last month</Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
              color: 'white'
            }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" gutterBottom>New Messages</Typography>
                    <Typography variant="h4" fontWeight="bold">{dashboardData.stats.newMessages}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>3 unread messages</Typography>
                  </Box>
                  <Message sx={{ fontSize: 40, opacity: 0.8 }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom color="text.primary">Sales Overview</Typography>
              <Box sx={{ height: 300 }}>
                <Line data={salesChartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom color="text.primary">Performance Metrics</Typography>
              <Box sx={{ height: 300 }}>
                <Bar data={performanceChartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Recent Orders and Messages */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="text.primary">Recent Orders</Typography>
                <Button
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/retailer/orders')}
                >
                  View All
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData.recentOrders.map((order) => (
                      <TableRow key={order.id} hover>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>${order.amount}</TableCell>
                        <TableCell>
                          <Chip 
                            label={order.status}
                            color={
                              order.status === 'Delivered' ? 'success' :
                              order.status === 'Shipped' ? 'info' :
                              'warning'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom color="text.primary">Recent Messages</Typography>
                <Stack spacing={2}>
                  {dashboardData.recentMessages.map((message) => (
                    <Box key={message.id} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" color="text.primary">{message.sender}</Typography>
                        <Typography variant="caption" color="text.secondary">{message.time}</Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">{message.message}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom color="text.primary">Top Products</Typography>
                <List>
                  {dashboardData.topProducts.map((product) => (
                    <ListItem key={product.id} sx={{ py: 1 }}>
                      <ListItemIcon>
                        <Avatar src={product.image} />
                      </ListItemIcon>
                      <ListItemText
                        primary={product.name}
                        secondary={
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              ${product.price}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  sx={{
                                    fontSize: 16,
                                    color: i < product.rating ? 'warning.main' : 'grey.300'
                                  }}
                                />
                              ))}
                            </Box>
                          </Stack>
                        }
                      />
                      <Chip label={`${product.sales} sales`} size="small" color="primary" />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RetailerDashboard; 