const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Newsletter = require('../models/Newsletter');
const { sendEmail } = require('../utils/mail');

// @desc    Fetch all products with optional filters (category, search query)
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    const search = req.query.search;

    let query = {};

    // Apply category filter if specified
    if (category) {
      query.category = category;
    }

    // Apply search query if specified (partial case-insensitive matching)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a product (Admin only / Simple create)
// @route   POST /api/products
// @access  Public (simplified for setup, can add auth middleware later)
router.post('/', async (req, res) => {
  try {
    const { name, sku, price, description, category, stock, attributes, amazonAsin, images } = req.body;

    const productExists = await Product.findOne({ sku });
    if (productExists) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }

    const product = new Product({
      name,
      sku,
      price,
      description,
      category,
      stock,
      attributes,
      amazonAsin,
      images,
    });

    const createdProduct = await product.save();

    // Trigger newsletter broadcast asynchronously
    const broadcastNewsletter = async () => {
      try {
        const subscribers = await Newsletter.find({});
        if (subscribers.length === 0) return;

        const productUrl = `http://shelfmarkltd.com/?category=${encodeURIComponent(category)}`;
        const productImage = images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600';

        for (const sub of subscribers) {
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1e293b;">
              <!-- Header -->
              <div style="background-color: #0b2545; padding: 24px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">SHELFMARK<span style="color: #c29a4a;">LTD</span></h1>
                <p style="color: #e2e8f0; font-size: 11px; margin: 4px 0 0 0; text-transform: uppercase; tracking-wider: 1px;">New Arrival Announcement</p>
              </div>
              
              <!-- Body Content -->
              <div style="padding: 24px;">
                <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 0;">We Have Just Added A New Product!</h2>
                <p style="font-size: 14px; line-height: 1.6; color: #475569;">
                  Hello Subscriber, we are thrilled to announce that we have just added a premium new item to our catalog:
                </p>
                
                <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin: 24px 0; border: 1px solid #f1f5f9; text-align: center;">
                  <img src="${productImage}" alt="${name}" style="max-width: 100%; height: 200px; object-fit: cover; border-radius: 6px; margin-bottom: 16px;" />
                  <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0;">${name}</h3>
                  <p style="font-size: 13px; color: #64748b; margin: 0 0 12px 0;">SKU: ${sku} | Category: ${category}</p>
                  <p style="font-size: 22px; font-weight: 900; color: #0b2545; margin: 0 0 16px 0;">£${parseFloat(price).toFixed(2)}</p>
                  <a href="${productUrl}" style="display: inline-block; background-color: #c29a4a; color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: bold; font-size: 13px; text-transform: uppercase;">View Product Details</a>
                </div>
                
                <p style="font-size: 13px; color: #64748b; line-height: 1.6; border-top: 1px solid #f1f5f9; padding-top: 16px;">
                  <strong>Description:</strong> ${description}
                </p>
              </div>
              
              <!-- Footer Details -->
              <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; font-size: 11px; color: #64748b; line-height: 1.6;">
                <p style="margin: 0 0 4px 0; font-weight: bold; color: #334155;">Shelfmark LTD</p>
                <p style="margin: 0 0 4px 0;">1385 85 Dunstall Hill, Wolverhampton, United Kingdom, WV60SR</p>
                <p style="margin: 0;">Company Registration No: 17319960 | Tax / UTR: 43491 13593</p>
              </div>
            </div>
          `;

          await sendEmail({
            to: sub.email,
            subject: `NEW ARRIVAL: ${name} is now available on Shelfmark LTD!`,
            html: emailHtml
          });
        }
      } catch (err) {
        console.error("Newsletter email broadcast failed:", err.message);
      }
    };

    broadcastNewsletter();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { name, sku, price, description, category, stock, attributes, amazonAsin, images } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.sku = sku || product.sku;
      product.price = price !== undefined ? price : product.price;
      product.description = description || product.description;
      product.category = category || product.category;
      product.stock = stock !== undefined ? stock : product.stock;
      product.attributes = attributes || product.attributes;
      product.amazonAsin = amazonAsin || product.amazonAsin;
      product.images = images || product.images;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
