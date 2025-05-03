const Product = require('../model/productModel');
const cloudinary = require('../utils/cloudinary');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, stock, price, image } = req.body;
    const product = new Product({ name, stock, price, image, owner: req.user.id });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, stock, price, image } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { name, stock, price, image },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProductWithImage = async (req, res) => {
  try {
    const { name, stock, price } = req.body;
    let imageUrl = '';
    if (req.file) {
      // Upload image buffer to Cloudinary
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'products' },
        async (error, result) => {
          if (error) return res.status(500).json({ error: error.message });
          imageUrl = result.secure_url;
          const product = new Product({
            name,
            stock,
            price,
            image: imageUrl,
            owner: req.user.id,
          });
          await product.save();
          res.json(product);
        }
      );
      stream.end(req.file.buffer);
    } else {
      const product = new Product({
        name,
        stock,
        price,
        image: '',
        owner: req.user.id,
      });
      await product.save();
      res.json(product);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('owner', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 