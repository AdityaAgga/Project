import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  IconButton, 
  Stack, 
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge,
  useTheme,
  Tabs,
  Tab
} from '@mui/material';
import {
  Inventory,
  ShoppingCart,
  Message,
  Analytics,
  Add,
  TrendingUp,
  Notifications,
  Settings,
  Person,
  LocalShipping,
  AttachMoney,
  Store
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const WholesalerDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Sample data - replace with actual data from API
  const stats = {
    totalProducts: 156,
    activeOrders: 12,
    pendingMessages: 5,
    monthlyRevenue: 125000
  };

  const recentOrders = [
    { id: 'ORD001', retailer: 'Retail Store 1', date: '2024-04-28', amount: 25000, status: 'Processing' },
    { id: 'ORD002', retailer: 'Retail Store 2', date: '2024-04-27', amount: 18000, status: 'Shipped' },
    { id: 'ORD003', retailer: 'Retail Store 3', date: '2024-04-26', amount: 32000, status: 'Delivered' }
  ];

  const recentMessages = [
    { sender: 'Retail Store 1', message: 'Regarding bulk order inquiry', time: '2h ago' },
    { sender: 'Retail Store 2', message: 'Product availability check', time: '4h ago' },
    { sender: 'Retail Store 3', message: 'Order status update', time: '1d ago' }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const StatCard = ({ icon, title, value, color }) => (
    <Card sx={{ height: '100%', bgcolor: color + '.light', color: color + '.dark', borderRadius: 1, boxShadow: 'none', minHeight: 80 }}>
      <CardContent sx={{ p: 1.2, '&:last-child': { pb: 1.2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          {icon}
          <Typography variant="subtitle2" sx={{ ml: 0.5, fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: 22 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 0, bgcolor: '#f5f5f8', minHeight: '100vh', width: '100vw' }}>
      <Box sx={{ width: '100vw' }}>
        {/* Header Section */}
        <Box sx={{ mb: 1 }}>
          <Grid container spacing={0.5} alignItems="center" sx={{ width: '100%' }}>
            <Grid item sx={{ width: '70%' }}>
              <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: 22 }}>
                Welcome back, Wholesaler!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 15 }}>
                Here's what's happening with your business today
              </Typography>
            </Grid>
            <Grid item sx={{ width: '30%', display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
              <IconButton color="primary" size="small">
                <Badge badgeContent={5} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton color="primary" size="small">
                <Settings />
              </IconButton>
              <IconButton color="primary" size="small">
                <Person />
              </IconButton>
            </Grid>
          </Grid>
        </Box>

        {/* Stats Overview */}
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid item sx={{ width: '25%' }}>
            <StatCard
              icon={<Inventory sx={{ fontSize: 20 }} />}
              title="Total Products"
              value={stats.totalProducts}
              color="primary"
            />
          </Grid>
          <Grid item sx={{ width: '25%' }}>
            <StatCard
              icon={<ShoppingCart sx={{ fontSize: 20 }} />}
              title="Active Orders"
              value={stats.activeOrders}
              color="secondary"
            />
          </Grid>
          <Grid item sx={{ width: '25%' }}>
            <StatCard
              icon={<Message sx={{ fontSize: 20 }} />}
              title="Messages"
              value={stats.pendingMessages}
              color="info"
            />
          </Grid>
          <Grid item sx={{ width: '25%' }}>
            <StatCard
              icon={<AttachMoney sx={{ fontSize: 20 }} />}
              title="Monthly Revenue"
              value={`₹${stats.monthlyRevenue.toLocaleString()}`}
              color="success"
            />
          </Grid>
        </Grid>

        {/* Main Content */}
        <Grid container spacing={2} sx={{ width: '100%' }}>
          {/* Left Column */}
          <Grid item sx={{ width: '70%' }}>
            <Paper sx={{ p: 1, mb: 1, borderRadius: 1, boxShadow: 'none' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: 15 }}>
                  Quick Actions
                </Typography>
              </Box>
              <Grid container spacing={0.5}>
                <Grid item sx={{ width: '25%' }}>
                  <Button
                    fullWidth
                    size="small"
                    variant="contained"
                    startIcon={<Add fontSize="small" />}
                    sx={{ minWidth: 0, py: 0.7, fontSize: 13, borderRadius: 1 }}
                    onClick={() => navigate('/product-management')}
                  >
                    Add Product
                  </Button>
                </Grid>
                <Grid item sx={{ width: '25%' }}>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    startIcon={<Inventory fontSize="small" />}
                    sx={{ minWidth: 0, py: 0.7, fontSize: 13, borderRadius: 1 }}
                    onClick={() => navigate('/inventory-updates')}
                  >
                    Manage Inventory
                  </Button>
                </Grid>
                <Grid item sx={{ width: '25%' }}>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    startIcon={<Analytics fontSize="small" />}
                    sx={{ minWidth: 0, py: 0.7, fontSize: 13, borderRadius: 1 }}
                    onClick={() => navigate('/analytics')}
                  >
                    View Analytics
                  </Button>
                </Grid>
                <Grid item sx={{ width: '25%' }}>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    startIcon={<Message fontSize="small" />}
                    sx={{ minWidth: 0, py: 0.7, fontSize: 13, borderRadius: 1 }}
                    onClick={() => navigate('/messages')}
                  >
                    Messages
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 1, borderRadius: 1, boxShadow: 'none' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="Recent Orders" />
                  <Tab label="Analytics" />
                </Tabs>
              </Box>
              {activeTab === 0 && (
                <List>
                  {recentOrders.map((order) => (
                    <React.Fragment key={order.id}>
                      <ListItem sx={{ py: 0.7 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ width: 28, height: 28 }}>
                            <Store fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="body2" sx={{ fontWeight: 500 }}>{order.retailer}</Typography>}
                          secondary={<Typography variant="caption">Order ID: {order.id} • {order.date}</Typography>}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight="bold">
                            ₹{order.amount.toLocaleString()}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: order.status === 'Delivered' ? 'success.main' :
                                     order.status === 'Processing' ? 'warning.main' : 'info.main',
                              fontWeight: 600
                            }}
                          >
                            {order.status}
                          </Typography>
                        </Box>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              )}
              {activeTab === 1 && (
                <Box sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Analytics Dashboard Coming Soon
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Right Column */}
          <Grid item sx={{ width: '30%' }}>
            <Paper sx={{ p: 1, mb: 1, borderRadius: 1, boxShadow: 'none' }}>
              <Typography variant="subtitle2" fontWeight="bold" mb={1} sx={{ fontSize: 15 }}>
                Recent Messages
              </Typography>
              <List>
                {recentMessages.map((msg, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ py: 0.7 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ width: 28, height: 28 }}>
                          <Person fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant="body2" sx={{ fontWeight: 500 }}>{msg.sender}</Typography>}
                        secondary={
                          <Box>
                            <Typography variant="caption" color="text.primary">
                              {msg.message}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                              {msg.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentMessages.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                fullWidth
                size="small"
                variant="text"
                startIcon={<Message fontSize="small" />}
                onClick={() => navigate('/messages')}
                sx={{ mt: 1, fontSize: 13, borderRadius: 1 }}
              >
                View All Messages
              </Button>
            </Paper>

            <Paper sx={{ p: 1, borderRadius: 1, boxShadow: 'none' }}>
              <Typography variant="subtitle2" fontWeight="bold" mb={1} sx={{ fontSize: 15 }}>
                Quick Stats
              </Typography>
              <Stack spacing={0.7}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Total Products</Typography>
                  <Typography variant="body2" fontWeight="bold">{stats.totalProducts}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Active Orders</Typography>
                  <Typography variant="body2" fontWeight="bold">{stats.activeOrders}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Pending Messages</Typography>
                  <Typography variant="body2" fontWeight="bold">{stats.pendingMessages}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Monthly Revenue</Typography>
                  <Typography variant="body2" fontWeight="bold">₹{stats.monthlyRevenue.toLocaleString()}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WholesalerDashboard; 