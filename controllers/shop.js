const Product = require('../models/products');

const getIndex = (req, res) => {
  res.render('home', {
    pageTitle: 'FetchIT – Premium Pet Products',
    path: '/'
  });
};

const getAllProducts = async (req, res) => {
  try {
    const category = req.query.category;

    let products = await Product.findAll();

    if (category && category !== 'all') {
      products = products.filter(p => p.category === category);
    }

    res.render('products', {
      products: products,
      pageTitle: 'Shop',
      path: '/products',
      currentCategory: category || 'all'
    });

  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('product-details', {
      product: product,
      pageTitle: product.name,
      path: '/products'
    });

  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getIndex,
  getAllProducts,
  getProductDetails
};