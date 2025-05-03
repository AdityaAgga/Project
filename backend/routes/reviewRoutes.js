const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Get all reviews for a product
router.get('/products/:productId/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new review
router.post('/products/:productId/reviews', auth, async (req, res) => {
  try {
    const { rating, title, comment } = req.body;

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({
      product: req.params.productId,
      user: req.user.id
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    const review = new Review({
      product: req.params.productId,
      user: req.user.id,
      rating,
      title,
      comment
    });

    await review.save();
    await review.populate('user', 'name');

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a review
router.put('/reviews/:reviewId', auth, async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.reviewId,
      user: req.user.id
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const { rating, title, comment } = req.body;
    review.rating = rating;
    review.title = title;
    review.comment = comment;

    await review.save();
    await review.populate('user', 'name');

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a review
router.delete('/reviews/:reviewId', auth, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.reviewId,
      user: req.user.id
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 