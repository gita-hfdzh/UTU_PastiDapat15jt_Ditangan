const Product = require('../models/Product');

// Data Cadangan (Fallback) jika user belum setting MongoDB
const fallbackProducts = [
  {
    _id: "991", name: 'Tulang Ikan Tuna Segar (Per Kg)', mainType: 'limbah', category: 'tulang', price: 5000, oldPrice: null, rating: 4.5, sold: 450, stock: 120, seller: 'LAMURI Hub Aceh Besar', image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=400&h=280&q=80', badge: 'Bahan Baku', badgeType: 'badge-warning'
  },
  {
    _id: "1", name: 'Keripik Kulit Ikan Tongkol', mainType: 'olahan', category: 'makanan', price: 35000, oldPrice: 45000, rating: 4.8, sold: 2140, stock: 42, seller: 'Dapur Pesisir Aceh', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&h=280&q=80', badge: 'Terlaris', badgeType: 'badge-blue'
  },
  {
    _id: "2", name: 'Pupuk Cair Organik dari Limbah Ikan', mainType: 'olahan', category: 'pakan', price: 28000, rating: 4.7, sold: 891, stock: 120, seller: 'GreenAceh Fertilizer', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&h=280&q=80', badge: 'Organik',  badgeType: 'badge-success'
  }
];

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    if (!process.env.MONGO_URI) {
      // Jika database belum diisi, kembalikan data darurat
      return res.json(fallbackProducts);
    }
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch products' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    if (!process.env.MONGO_URI) {
      const product = fallbackProducts.find(p => p._id === req.params.id);
      return product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
    }
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
