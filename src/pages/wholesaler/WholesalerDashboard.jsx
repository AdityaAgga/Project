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
  CardActions,
  Tabs,
  Tab
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
  Help,
  Business,
  MonetizationOn,
  People,
  Analytics,
  Inventory2,
  Receipt,
  Chat
} from '@mui/icons-material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

const WholesalerDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalOrders: 156,
      activeRetailers: 42,
      totalRevenue: 125000,
      pendingShipments: 8,
      inventoryValue: 75000,
      averageOrderValue: 1200,
      customerSatisfaction: 4.7,
      monthlyGrowth: 15.2
    },
    recentOrders: [
      { id: 1, retailer: 'Retail Store A', products: 5, amount: 2500, status: 'Processing', date: '2024-03-20' },
      { id: 2, retailer: 'Retail Store B', products: 3, amount: 1800, status: 'Shipped', date: '2024-03-19' },
      { id: 3, retailer: 'Retail Store C', products: 8, amount: 4500, status: 'Delivered', date: '2024-03-18' }
    ],
    topRetailers: [
      { id: 1, name: 'Retail Store A', orders: 45, revenue: 25000, rating: 4.8, image: '/retailer1.jpg' },
      { id: 2, name: 'Retail Store B', orders: 38, revenue: 21000, rating: 4.6, image: '/retailer2.jpg' },
      { id: 3, name: 'Retail Store C', orders: 32, revenue: 18000, rating: 4.5, image: '/retailer3.jpg' }
    ],
    salesData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [15000, 18000, 22000, 25000, 28000, 32000]
    },
    performanceMetrics: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      orders: [12, 15, 18, 20, 16, 22, 19],
      revenue: [8000, 9500, 11000, 12500, 10500, 14000, 12000]
    },
    inventoryStatus: {
      labels: ['In Stock', 'Low Stock', 'Out of Stock'],
      data: [75, 15, 10],
      colors: [theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main]
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
        label: 'Revenue',
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
        label: 'Orders',
        data: dashboardData.performanceMetrics.orders,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4
      },
      {
        label: 'Revenue',
        data: dashboardData.performanceMetrics.revenue,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 4
      }
    ]
  };

  const inventoryChartData = {
    labels: dashboardData.inventoryStatus.labels,
    datasets: [
      {
        data: dashboardData.inventoryStatus.data,
        backgroundColor: dashboardData.inventoryStatus.colors,
        borderWidth: 0
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

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: theme.palette.text.primary
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
              Wholesaler Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Manage your wholesale business efficiently
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
              startIcon={<Inventory2 />}
              onClick={() => navigate('/wholesaler/products')}
            >
              Manage Inventory
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
                    <Typography variant="h6" gutterBottom>Total Orders</Typography>
                    <Typography variant="h4" fontWeight="bold">{dashboardData.stats.totalOrders}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>+15% from last month</Typography>
                  </Box>
                  <Receipt sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    <Typography variant="h6" gutterBottom>Active Retailers</Typography>
                    <Typography variant="h4" fontWeight="bold">{dashboardData.stats.activeRetailers}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>+5 new this month</Typography>
                  </Box>
                  <People sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    <Typography variant="h6" gutterBottom>Total Revenue</Typography>
                    <Typography variant="h4" fontWeight="bold">${dashboardData.stats.totalRevenue.toLocaleString()}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>+15.2% from last month</Typography>
                  </Box>
                  <MonetizationOn sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    <Typography variant="h6" gutterBottom>Pending Shipments</Typography>
                    <Typography variant="h4" fontWeight="bold">{dashboardData.stats.pendingShipments}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>To be shipped today</Typography>
                  </Box>
                  <LocalShipping sx={{ fontSize: 40, opacity: 0.8 }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom color="text.primary">Revenue Overview</Typography>
              <Box sx={{ height: 300 }}>
                <Line data={salesChartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom color="text.primary">Inventory Status</Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Doughnut data={inventoryChartData} options={doughnutOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Performance and Orders */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="text.primary">Recent Orders</Typography>
                <Button
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/wholesaler/orders')}
                >
                  View All
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Retailer</TableCell>
                      <TableCell>Products</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData.recentOrders.map((order) => (
                      <TableRow key={order.id} hover>
                        <TableCell>{order.retailer}</TableCell>
                        <TableCell>{order.products}</TableCell>
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
                <Typography variant="h6" gutterBottom color="text.primary">Top Retailers</Typography>
                <List>
                  {dashboardData.topRetailers.map((retailer) => (
                    <ListItem key={retailer.id} sx={{ py: 1 }}>
                      <ListItemIcon>
                        <Avatar src={retailer.image} />
                      </ListItemIcon>
                      <ListItemText
                        primary={retailer.name}
                        secondary={
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              ${retailer.revenue.toLocaleString()}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  sx={{
                                    fontSize: 16,
                                    color: i < retailer.rating ? 'warning.main' : 'grey.300'
                                  }}
                                />
                              ))}
                            </Box>
                          </Stack>
                        }
                      />
                      <Chip label={`${retailer.orders} orders`} size="small" color="primary" />
                    </ListItem>
                  ))}
                </List>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom color="text.primary">Performance Metrics</Typography>
                <Box sx={{ height: 200 }}>
                  <Bar data={performanceChartData} options={chartOptions} />
                </Box>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WholesalerDashboard; 