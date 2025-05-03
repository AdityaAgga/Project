const express = require('express');
const router = express.Router();
const { upload, cleanupOldFile } = require('../utils/fileUpload');
const User = require('../models/User');
const auth = require('../middleware/auth');

// ... existing routes ...

// Upload profile image
router.post('/profile/image', auth, upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      // Clean up the uploaded file if user not found
      cleanupOldFile(req.file.path);
      return res.status(404).json({ error: 'User not found' });
    }

    // Clean up old profile image if exists
    if (user.profileImage) {
      cleanupOldFile(user.profileImage);
    }

    // Update user's profile image
    user.profileImage = req.file.path;
    await user.save();

    res.json({ profileImage: user.profileImage });
  } catch (error) {
    // Clean up the uploaded file if there's an error
    if (req.file) {
      cleanupOldFile(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// ... rest of the existing routes ...

module.exports = router;

