const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const crypto = require('crypto');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const sampleProducts = [
  {
    name: 'Shelfmark Premium Ergonomic Office Chair',
    sku: 'SM-CHAIR-ERG01',
    description: 'A premium, high-back ergonomic office chair featuring lumbar support, adjustable 3D armrests, and a breathable mesh back. Designed for long hours of comfortable work.',
    price: 189.99,
    category: 'Office Furniture',
    images: ['https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80'],
    stock: 25,
    attributes: {
      color: 'Space Grey',
      material: 'Mesh & Aluminum',
      weight_limit: '150kg',
      adjustable_armrests: true
    },
    amazonAsin: 'B08XYZ1234'
  },
  {
    name: 'Shelfmark Multi-Device Wireless Mechanical Keyboard',
    sku: 'SM-KB-MECH02',
    description: 'Hot-swappable tactile wireless mechanical keyboard with customizable RGB backlighting and Bluetooth 5.1 connection. Connects up to 3 devices simultaneously.',
    price: 79.99,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'],
    stock: 50,
    attributes: {
      color: 'Matte Black',
      switch_type: 'Brown (Tactile)',
      battery_capacity: '4000mAh',
      layout: 'UK ISO'
    },
    amazonAsin: 'B08XYZ5678'
  },
  {
    name: 'Shelfmark Double-Wall Vacuum Insulated Water Bottle',
    sku: 'SM-BOTTLE-SS03',
    description: 'Leak-proof, double-walled stainless steel water bottle. Keeps beverages ice-cold for 24 hours or piping hot for 12 hours. Sweat-free powder-coated finish.',
    price: 18.50,
    category: 'Kitchen & Dining',
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80'],
    stock: 120,
    attributes: {
      capacity: '750ml',
      color: 'Forest Green',
      material: '18/8 Stainless Steel',
      dishwasher_safe: false
    },
    amazonAsin: 'B08XYZ9012'
  },
  {
    name: 'Shelfmark Organic Cotton Minimalist Hoodie',
    sku: 'SM-HD-ORG04',
    description: 'Ultra-soft, heavy-weight hoodie crafted from 100% certified organic cotton. Features a relaxed fit, kangaroo pocket, and double-layered drawstring hood.',
    price: 45.00,
    category: 'Apparel',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80'],
    stock: 80,
    attributes: {
      color: 'Oatmeal Melange',
      size: 'Medium',
      material: '100% Organic Cotton',
      gender: 'Unisex'
    },
    amazonAsin: 'B08XYZ3456'
  },
  {
    name: 'Shelfmark Smart Hydroponic Herb Garden Kit',
    sku: 'SM-GARDEN-HYD05',
    description: 'Indoor hydroponic gardening system with a high-efficiency 24-watt LED grow light panel. Fits up to 6 pods with automated timer settings for easy plant growth.',
    price: 64.99,
    category: 'Home & Garden',
    images: ['https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80'],
    stock: 15,
    attributes: {
      power: '24W',
      pod_count: 6,
      dimensions: '35cm x 15cm x 38cm',
      light_modes: 'Vegetable / Flower'
    },
    amazonAsin: 'B08XYZ7890'
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Existing Products and Users Cleared.');

    // Seed Sample Products
    await Product.insertMany(sampleProducts);
    console.log('Sample Products Seeded Successfully!');

    // Seed Default Administrator Account
    const hashedAdminPassword = crypto.createHash('sha256').update('admin123').digest('hex');
    await User.create({
      name: 'Shelfmark Admin',
      email: 'admin@shelfmarkltd.com',
      password: hashedAdminPassword,
      isAdmin: true,
      phone: '+44 20 7946 0958'
    });
    console.log('Admin User Seeded successfully! (Email: admin@shelfmarkltd.com, Password: admin123)');

    process.exit();
  } catch (error) {
    console.error(`Error during data seeding: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Database Products and Users Destroyed Successfully.');
    process.exit();
  } catch (error) {
    console.error(`Error during data destruction: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
