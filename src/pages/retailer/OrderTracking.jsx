import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Chip
} from '@mui/material';
import { useParams } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`/api/v1/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!res.ok) throw new Error('Failed to fetch order details');
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchTrackingInfo = async () => {
      try {
        const res = await fetch(`/api/v1/orders/${orderId}/tracking`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setTrackingInfo(data);
        }
      } catch (err) {
        console.error('Error fetching tracking info:', err);
      }
    };

    fetchOrderDetails();
    fetchTrackingInfo();
  }, [orderId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'pending':
        return <PendingIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <LocalShippingIcon color="primary" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'primary';
    }
  };

  const steps = [
    {
      label: 'Order Placed',
      description: 'Your order has been received and is being processed.',
      status: 'completed'
    },
    {
      label: 'Processing',
      description: 'Your order is being prepared for shipment.',
      status: order?.status === 'processing' ? 'pending' : 'completed'
    },
    {
      label: 'Shipped',
      description: 'Your order has been shipped and is on its way.',
      status: order?.status === 'shipped' ? 'pending' : order?.status === 'delivered' ? 'completed' : 'pending'
    },
    {
      label: 'Out for Delivery',
      description: 'Your order is out for delivery.',
      status: order?.status === 'delivered' ? 'completed' : 'pending'
    },
    {
      label: 'Delivered',
      description: 'Your order has been delivered successfully.',
      status: order?.status === 'delivered' ? 'completed' : 'pending'
    }
  ];

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Tracking
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Order #{orderId}
      </Typography>

      <Grid container spacing={3}>
        {/* Order Status Timeline */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Stepper orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label} active={step.status === 'pending'} completed={step.status === 'completed'}>
                  <StepLabel
                    StepIconComponent={() => getStatusIcon(step.status)}
                    error={step.status === 'error'}
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                    {trackingInfo && step.label === 'Shipped' && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          Tracking Number: {trackingInfo.trackingNumber}
                        </Typography>
                        <Typography variant="body2">
                          Carrier: {trackingInfo.carrier}
                        </Typography>
                        {trackingInfo.estimatedDelivery && (
                          <Typography variant="body2">
                            Estimated Delivery: {new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Order Status
              </Typography>
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                sx={{ mt: 1 }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Order Date
              </Typography>
              <Typography variant="body1">
                {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Total Amount
              </Typography>
              <Typography variant="h6" color="primary">
                ${order.totalAmount}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Delivery Address
              </Typography>
              <Typography variant="body1">
                {order.deliveryAddress}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderTracking; 