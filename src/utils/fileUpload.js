export const validateImage = (file) => {
  const errors = [];

  // Check file type
  if (!file.type.startsWith('image/')) {
    errors.push('File must be an image');
  }

  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    errors.push('Image size must be less than 5MB');
  }

  // Check dimensions (optional)
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.width < 100 || img.height < 100) {
        errors.push('Image dimensions must be at least 100x100 pixels');
      }
      resolve(errors);
    };
    img.onerror = () => {
      errors.push('Invalid image file');
      resolve(errors);
    };
    img.src = URL.createObjectURL(file);
  });
};

export const uploadProfileImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', file);

    const response = await fetch('/api/v1/users/profile/image', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.profileImage;
  } catch (error) {
    throw new Error(error.message || 'Failed to upload image');
  }
}; 