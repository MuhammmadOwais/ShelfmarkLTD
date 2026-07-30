import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import CookieBanner from './components/CookieBanner';
import { ShoppingBag, ArrowRight, Trash2, CheckCircle2, ShieldCheck, HelpCircle, Phone, Sparkles, User, X, Plus, Edit, Users, Trash, Upload, ExternalLink, Mail, Star, ShoppingCart } from 'lucide-react';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NewsletterModal from './pages/NewsletterModal';
import AuthModal from './pages/AuthModal';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CategoryPage from './pages/CategoryPage';
import PrivateLabelPage from './pages/PrivateLabelPage';
import { CATEGORY_PRODUCTS } from './data/categories';

// BRAND CONFIGURATION - ENTER YOUR LOGO / ASSET LINKS HERE
const LOGO_URL = "https://res.cloudinary.com/sfjl53dg/image/upload/v1784846896/compressed-compressed-Shelfmake_qpkxoi.webp";
const FAVICON_URL = "https://res.cloudinary.com/sfjl53dg/image/upload/v1784845956/compressed-Adobe_Express_-_file_hlgfli.webp";
const LOGO_DARK_URL = "https://res.cloudinary.com/sfjl53dg/image/upload/v1784846896/compressed-compressed-Shelfmake_qpkxoi.webp";

const HERO_IMAGES = [
  "https://res.cloudinary.com/sfjl53dg/image/upload/v1784760817/compressed-pexels-ai25studioai-6207767_xabyyf.webp",
  "https://res.cloudinary.com/sfjl53dg/image/upload/v1784760817/compressed-pexels-tasso-mitsarakis-4849571-7996793_uqhslq.webp",
  "https://res.cloudinary.com/sfjl53dg/image/upload/v1784760816/compressed-pexels-negativespace-34577_nwuemn.webp"
];


const MOCK_PRODUCTS = [
  {
    _id: 'mock_1',
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
      adjustable_armrests: 'Yes'
    },
    amazonAsin: 'B08XYZ1234',
    ratings: { average: 4.8, count: 42 }
  },
  {
    _id: 'mock_2',
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
    amazonAsin: 'B08XYZ5678',
    ratings: { average: 4.6, count: 18 }
  },
  {
    _id: 'mock_3',
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
      dishwasher_safe: 'No'
    },
    amazonAsin: 'B08XYZ9012',
    ratings: { average: 4.5, count: 88 }
  },
  {
    _id: 'mock_4',
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
    amazonAsin: 'B08XYZ3456',
    ratings: { average: 4.7, count: 31 }
  },
  {
    _id: 'mock_5',
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
    amazonAsin: 'B08XYZ7890',
    ratings: { average: 4.4, count: 12 }
  }
];

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [products, setProducts] = useState(CATEGORY_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(CATEGORY_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce search input to avoid hitting database on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);
  const [view, setView] = useState('shop'); // 'shop', 'cart', 'checkout', 'success', 'admin', 'product', 'privacy', 'category'
  const [orderResult, setOrderResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiActive, setApiActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Helper for view navigation with clean URL synchronization for SEO
  const changeView = (newView, catSlug = '') => {
    setView(newView);
    try {
      if (newView === 'privacy') {
        window.history.pushState({}, '', '/privacy-policy');
      } else if (newView === 'terms') {
        window.history.pushState({}, '', '/terms-of-service');
      } else if (newView === 'refund') {
        window.history.pushState({}, '', '/refund-policy');
      } else if (newView === 'about') {
        window.history.pushState({}, '', '/about');
      } else if (newView === 'contact') {
        window.history.pushState({}, '', '/contact');
      } else if (newView === 'privatelabel') {
        window.history.pushState({}, '', '/private-label');
      } else if (newView === 'cart') {
        window.history.pushState({}, '', '/cart');
      } else if (newView === 'checkout') {
        window.history.pushState({}, '', '/checkout');
      } else if (newView === 'category' && catSlug) {
        window.history.pushState({}, '', `/category/${catSlug}`);
      } else if (newView === 'shop') {
        window.history.pushState({}, '', '/');
      }
    } catch {
      // Fallback for isolated environments
    }
  };

  const handleSelectCategory = (catVal) => {
    if (!catVal || catVal === 'All') {
      setSelectedCategory('All');
      changeView('shop');
    } else {
      setSelectedCategory(catVal);
      changeView('category', catVal);
    }
  };

  // Sync state with URL pathname & hash on load / navigation
  useEffect(() => {
    const parseUrlView = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('privacy') || hash.includes('privacy')) {
        return { view: 'privacy', cat: 'All' };
      } else if (path.includes('terms') || hash.includes('terms')) {
        return { view: 'terms', cat: 'All' };
      } else if (path.includes('refund') || hash.includes('refund')) {
        return { view: 'refund', cat: 'All' };
      } else if (path.includes('about') || hash.includes('about')) {
        return { view: 'about', cat: 'All' };
      } else if (path.includes('contact') || hash.includes('contact')) {
        return { view: 'contact', cat: 'All' };
      } else if (path.includes('private-label') || hash.includes('private-label')) {
        return { view: 'privatelabel', cat: 'All' };
      } else if (path.includes('cart') || hash.includes('cart')) {
        return { view: 'cart', cat: 'All' };
        return { view: 'cart', cat: 'All' };
      } else if (path.includes('checkout') || hash.includes('checkout')) {
        return { view: 'checkout', cat: 'All' };
      } else if (path.includes('/category/') || hash.includes('/category/')) {
        const parts = path.includes('/category/') ? path.split('/category/') : hash.split('/category/');
        const slug = parts[1]?.replace(/\/$/, '') || 'electronics';
        return { view: 'category', cat: slug };
      }
      return { view: 'shop', cat: 'All' };
    };

    const res = parseUrlView();
    if (res.view !== 'shop') {
      setView(res.view);
      setSelectedCategory(res.cat);
    }

    const handlePopState = () => {
      const updated = parseUrlView();
      setView(updated.view);
      setSelectedCategory(updated.cat);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Set home page SEO Title & Meta Description when on shop view
  useEffect(() => {
    if (view === 'shop') {
      document.title = "Shelfmark Ltd | Shop Quality Products Online at Affordable Prices";
      let metaDesc = document.querySelector('meta[name="description"]');
      const descText = "Discover quality products at Shelfmark Ltd. Shop electronics, home essentials, fashion, beauty, accessories, and more with secure shopping, great prices, and fast delivery.";
      if (metaDesc) {
        metaDesc.setAttribute('content', descText);
      } else {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        metaDesc.content = descText;
        document.head.appendChild(metaDesc);
      }
    }
  }, [view]);


  const [heroIndex, setHeroIndex] = useState(0);

  // Preload all slideshow images in background on mount to prevent loading lag/white flicker
  useEffect(() => {
    HERO_IMAGES.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Form Fields for Checkout
  const [shippingForm, setShippingForm] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'Stripe'
  });

  // Auth and user account states
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('shelfmark_user') || 'null'));
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'forgot', 'reset'
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', phone: '', resetCode: '', newPassword: '' });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Pre-populate checkout form when user changes
  useEffect(() => {
    if (user) {
      setShippingForm(prev => ({
        ...prev,
        name: user.name,
        phone: user.phone || prev.phone,
        ...(user.shippingAddress || {})
      }));
    }
  }, [user]);

  // Newsletter modal states & handlers
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState('');
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    setNewsletterSuccess('');
    setNewsletterError('');

    try {
      const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterSuccess('Thank you for subscribing to our newsletter!');
        setNewsletterEmail('');
      } else {
        setNewsletterError(data.message || 'Subscription failed.');
      }
    } catch (err) {
      setNewsletterError('Newsletter server connection failed.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  // Admin Panel states
  const [adminTab, setAdminTab] = useState('products'); // 'products', 'users'
  const [usersList, setUsersList] = useState([]);
  const [adminForm, setAdminForm] = useState({
    _id: '',
    name: '',
    sku: '',
    category: 'Electronics',
    price: '',
    stock: '',
    description: '',
    amazonAsin: '',
    image: '',
    attributes_color: '',
    attributes_material: ''
  });
  const [cloudinaryPreset, setCloudinaryPreset] = useState('ShelfMark');
  const [cloudinaryCloudName, setCloudinaryCloudName] = useState('sfjl53dg');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [adminFormOpen, setAdminFormOpen] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [adminSuccess, setAdminSuccess] = useState('');

  // Load users list for the admin panel
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);
      if (res.ok) {
        const data = await res.json();
        setUsersList(data);
      }
    } catch (err) {
      console.warn("Failed to load users list from database.");
    }
  };

  // Fetch users when viewing admin panel
  useEffect(() => {
    if (view === 'admin') {
      fetchUsers();
    }
  }, [view]);

  // Handle product edit click
  const handleEditProductClick = (product) => {
    setAdminForm({
      _id: product._id,
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      amazonAsin: product.amazonAsin || '',
      image: product.images[0] || '',
      attributes_color: product.attributes?.color || '',
      attributes_material: product.attributes?.material || ''
    });
    setAdminFormOpen(true);
    setAdminError('');
    setAdminSuccess('');
  };

  // Handle product delete click
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product from the database?")) return;
    try {
      const res = await fetch(`${API_BASE}/products/${productId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setAdminSuccess("Product deleted successfully!");
        // Refresh products list
        const refreshed = products.filter(p => p._id !== productId);
        setProducts(refreshed);
        setFilteredProducts(refreshed);
      } else {
        const data = await res.json();
        setAdminError(data.message || "Failed to delete product.");
      }
    } catch (err) {
      setAdminError("Database connection error. Could not delete product.");
    }
  };

  // Handle Cloudinary Image Upload
  const handleCloudinaryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setAdminError('');
    setAdminSuccess('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.secure_url) {
        setAdminForm(prev => ({ ...prev, image: data.secure_url }));
        setAdminSuccess("Image uploaded to Cloudinary successfully!");
      } else {
        setAdminError(data.error?.message || "Failed to upload image. Please check your Cloudinary Preset & Cloud Name.");
      }
    } catch (err) {
      setAdminError("Network error. Could not upload image to Cloudinary.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Admin Product Submit (Create/Update)
  const handleAdminProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAdminError('');
    setAdminSuccess('');

    const productPayload = {
      name: adminForm.name,
      sku: adminForm.sku,
      category: adminForm.category,
      price: parseFloat(adminForm.price),
      stock: parseInt(adminForm.stock),
      description: adminForm.description,
      amazonAsin: adminForm.amazonAsin,
      images: [adminForm.image],
      attributes: {
        color: adminForm.attributes_color,
        material: adminForm.attributes_material
      }
    };

    try {
      const isEdit = !!adminForm._id;
      const url = isEdit ? `${API_BASE}/products/${adminForm._id}` : `${API_BASE}/products`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productPayload)
      });

      const data = await res.json();

      if (res.ok) {
        setAdminSuccess(isEdit ? "Product updated successfully!" : "Product created successfully!");
        setAdminFormOpen(false);
        // Refresh products list in state
        let updatedList;
        if (isEdit) {
          updatedList = products.map(p => p._id === data._id ? data : p);
        } else {
          updatedList = [...products, data];
        }
        setProducts(updatedList);
        setFilteredProducts(updatedList);
        // Reset form
        setAdminForm({
          _id: '',
          name: '',
          sku: '',
          category: 'Electronics',
          price: '',
          stock: '',
          description: '',
          amazonAsin: '',
          image: '',
          attributes_color: '',
          attributes_material: ''
        });
      } else {
        setAdminError(data.message || "Failed to save product.");
      }
    } catch (err) {
      setAdminError("Database connection error. Could not save product.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('shelfmark_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('shelfmark_user');
  };

  const handleAuthFormChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    setAuthSuccess('');

    try {
      if (authMode === 'login') {
        const res = await fetch(`${API_BASE}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: authForm.email, password: authForm.password })
        });
        const data = await res.json();
        if (res.ok) {
          handleLogin(data);
          setShowAuthModal(false);
        } else {
          setAuthError(data.message || 'Login failed.');
        }
      }
      else if (authMode === 'signup') {
        const res = await fetch(`${API_BASE}/users/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: authForm.name,
            email: authForm.email,
            password: authForm.password,
            phone: authForm.phone
          })
        });
        const data = await res.json();
        if (res.ok) {
          handleLogin(data);
          setShowAuthModal(false);
        } else {
          setAuthError(data.message || 'Signup failed.');
        }
      }
      else if (authMode === 'forgot') {
        const res = await fetch(`${API_BASE}/users/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: authForm.email })
        });
        const data = await res.json();
        if (res.ok) {
          setAuthMode('reset');
          setAuthSuccess(`Reset verification code generated: ${data.resetCode}`);
          setAuthForm(prev => ({ ...prev, resetCode: data.resetCode })); // auto-fill for testing ease
        } else {
          setAuthError(data.message || 'Failed to request reset code.');
        }
      }
      else if (authMode === 'reset') {
        const res = await fetch(`${API_BASE}/users/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: authForm.email,
            code: authForm.resetCode,
            newPassword: authForm.newPassword
          })
        });
        const data = await res.json();
        if (res.ok) {
          setAuthMode('login');
          setAuthSuccess('Password has been reset successfully. Please login.');
          alert('Password has been reset successfully! Please log in with your new password.');
        } else {
          setAuthError(data.message || 'Failed to reset password.');
        }
      }
    } catch (error) {
      setAuthError('Database API offline. Cannot reach auth server.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Load Products from Backend API (real-time debounced database query)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `${API_BASE}/products`;
        const params = [];

        if (selectedCategory && selectedCategory !== 'All') {
          params.push(`category=${encodeURIComponent(selectedCategory)}`);
        }
        if (debouncedSearchQuery) {
          params.push(`search=${encodeURIComponent(debouncedSearchQuery)}`);
        }

        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
          setFilteredProducts(data);
          setApiActive(true);
        } else {
          setApiActive(false);
        }
      } catch (error) {
        console.warn("Backend API server offline. Falling back to local search filtering.");
        setApiActive(false);
      } finally {
        setLoading(false);
      }
    };

    // Only query database if server is active (or on initial load to verify API status)
    fetchProducts();
  }, [selectedCategory, debouncedSearchQuery]);

  // Client-side search and filter fallback if API server is offline
  useEffect(() => {
    if (!apiActive) {
      let result = MOCK_PRODUCTS;

      if (selectedCategory && selectedCategory !== 'All') {
        result = result.filter(p => p.category === selectedCategory);
      }

      if (debouncedSearchQuery) {
        const q = debouncedSearchQuery.toLowerCase();
        result = result.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
        );
      }

      setProducts(MOCK_PRODUCTS);
      setFilteredProducts(result);
    }
  }, [selectedCategory, debouncedSearchQuery, apiActive]);

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.product === product._id);
      if (existing) {
        return prevCart.map(item =>
          item.product === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        qty: 1,
        maxStock: product.stock
      }];
    });
    // Redirect to the dedicated cart review page instantly
    setView('cart');
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => item.product === productId ? { ...item, qty: newQty } : item)
    );
  };

  const handleRemoveItem = (productId) => {
    setCart(prev => prev.filter(item => item.product !== productId));
  };

  // Pricing calculations (UK VAT standard 20%)
  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxPrice = itemsPrice * 0.20; // 20% UK VAT
  const shippingPrice = itemsPrice > 50 || itemsPrice === 0 ? 0.00 : 4.99; // Free UK Delivery over Â£50
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  // Checkout Form Handler
  const handleInputChange = (e) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
  };

  // Submit Order to backend (or simulate if mock data)
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      user: user ? user._id : null,
      orderItems: cart.map(item => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item.product
      })),
      shippingAddress: {
        street: shippingForm.street,
        city: shippingForm.city,
        state: shippingForm.state,
        postalCode: shippingForm.postalCode,
        country: 'United Kingdom'
      },
      paymentMethod: shippingForm.paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    };

    if (apiActive) {
      try {
        const res = await fetch(`${API_BASE}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });

        if (res.ok) {
          const createdOrder = await res.json();
          // Simulate payment completion endpoint
          const payRes = await fetch(`${API_BASE}/orders/${createdOrder._id}/pay`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
          });
          const paidOrder = await payRes.json();
          setOrderResult(paidOrder);
          setCart([]);
          setView('success');
        } else {
          alert('Failed to place order via backend database.');
        }
      } catch (err) {
        console.error("API error during checkout: ", err);
        // Fallback simulation
        simulateSuccess();
      } finally {
        setLoading(false);
      }
    } else {
      // Simulate mock checkout
      setTimeout(() => {
        simulateSuccess();
        setLoading(false);
      }, 1500);
    }
  };

  const simulateSuccess = () => {
    setOrderResult({
      _id: 'sm_order_' + Math.floor(Math.random() * 89999 + 10000),
      orderItems: [...cart],
      shippingAddress: { ...shippingForm },
      paymentMethod: shippingForm.paymentMethod,
      totalPrice,
      isPaid: true,
      paidAt: new Date().toISOString()
    });
    setCart([]);
    setView('success');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-800">

      {/* Dynamic Navbar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        logoUrl={LOGO_URL}
        logoMobileUrl={LOGO_DARK_URL}
        user={user}
        products={products}
        onAuthClick={() => {
          setAuthMode('login');
          setAuthError('');
          setAuthSuccess('');
          setAuthForm({ name: '', email: '', password: '', phone: '', resetCode: '', newPassword: '' });
          setShowAuthModal(true);
        }}
        onLogout={handleLogout}
        onAdminClick={() => setView('admin')}
        onAboutClick={() => changeView('about')}
        onContactClick={() => changeView('contact')}
        onNewsletterClick={() => {
          setNewsletterEmail('');
          setNewsletterSuccess('');
          setNewsletterError('');
          setShowNewsletterModal(true);
        }}
        onCartClick={() => setView('cart')}
        onProductClick={(product) => {
          setSelectedProduct(product);
          setView('product');
        }}
      />

      {/* Main Container */}
      <main className="flex-grow">

        {view === 'admin' && (
          <div className="max-w-7xl mx-auto py-12 px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <button
                  onClick={() => setView('shop')}
                  className="text-slate-400 hover:text-slate-800 text-sm mb-2 flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
                >
                  &larr; Back to Shop
                </button>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Administrative Control Panel</h2>
                <p className="text-xs text-slate-500 mt-1">Manage catalog products, Cloudinary images, and registered users.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setAdminTab('products');
                    setAdminError('');
                    setAdminSuccess('');
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 transition-all ${adminTab === 'products'
                    ? 'bg-[#0b2545] text-white border-[#0b2545] shadow-md'
                    : 'bg-white text-slate-650 border-slate-200 hover:border-slate-350 shadow-sm'
                    }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Manage Products</span>
                </button>

                <button
                  onClick={() => {
                    setAdminTab('users');
                    setAdminError('');
                    setAdminSuccess('');
                    fetchUsers();
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 transition-all ${adminTab === 'users'
                    ? 'bg-[#0b2545] text-white border-[#0b2545] shadow-md'
                    : 'bg-white text-slate-650 border-slate-200 hover:border-slate-350 shadow-sm'
                    }`}
                >
                  <Users className="h-4 w-4" />
                  <span>View Users Data</span>
                </button>
              </div>
            </div>

            {adminSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-semibold p-4 rounded-xl mb-6 shadow-sm flex items-center justify-between">
                <span>{adminSuccess}</span>
                <button onClick={() => setAdminSuccess('')} className="text-green-500 hover:text-green-700">âœ•</button>
              </div>
            )}

            {adminError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold p-4 rounded-xl mb-6 shadow-sm flex items-center justify-between">
                <span>{adminError}</span>
                <button onClick={() => setAdminError('')} className="text-red-500 hover:text-red-700">âœ•</button>
              </div>
            )}

            {/* TAB CONTENT: PRODUCTS */}
            {adminTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Catalog Inventory ({products.length} Items)</span>
                  <button
                    onClick={() => {
                      setAdminForm({
                        _id: '',
                        name: '',
                        sku: '',
                        category: 'Electronics',
                        price: '',
                        stock: '',
                        description: '',
                        amazonAsin: '',
                        image: '',
                        attributes_color: '',
                        attributes_material: ''
                      });
                      setAdminFormOpen(true);
                      setAdminError('');
                      setAdminSuccess('');
                    }}
                    className="bg-brand-600 hover:bg-brand-500 text-slate-950 font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New Product</span>
                  </button>
                </div>

                {/* Add/Edit Product Modal Dialog Overlay */}
                {adminFormOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setAdminFormOpen(false)} />
                    <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl p-6 relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-800 animate-fadeIn">
                      <button
                        onClick={() => setAdminFormOpen(false)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
                      >
                        <X className="h-6 w-6" />
                      </button>

                      <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                        {adminForm._id ? 'Edit Catalog Product' : 'Add New Catalog Product'}
                      </h3>
                      <p className="text-xs text-slate-500 mb-6">Enter the product details. It will show on the homepage immediately inside its category.</p>

                      <form onSubmit={handleAdminProductSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Product Name</label>
                            <input
                              type="text" required value={adminForm.name} onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">SKU Number</label>
                            <input
                              type="text" required value={adminForm.sku} onChange={(e) => setAdminForm({ ...adminForm, sku: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Category</label>
                            <select
                              value={adminForm.category} onChange={(e) => setAdminForm({ ...adminForm, category: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
                            >
                              <option value="Electronics">Electronics</option>
                              <option value="Apparel">Apparel</option>
                              <option value="Kitchen & Dining">Kitchen & Dining</option>
                              <option value="Office Furniture">Office Furniture</option>
                              <option value="Home & Garden">Home & Garden</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Price (Â£)</label>
                            <input
                              type="number" step="0.01" required value={adminForm.price} onChange={(e) => setAdminForm({ ...adminForm, price: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Stock count</label>
                            <input
                              type="number" required value={adminForm.stock} onChange={(e) => setAdminForm({ ...adminForm, stock: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
                            />
                          </div>
                        </div>

                        {/* Cloudinary Integration Section */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                              <Upload className="h-4 w-4 text-brand-650" />
                              Cloudinary Image Sourcing
                            </span>
                            <span className="text-[10px] text-slate-400">Cloud Name: <strong className="text-slate-600">{cloudinaryCloudName}</strong></span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <label className="block text-slate-500 font-bold mb-1">Select Local File to Upload</label>
                              <input
                                type="file" accept="image/*" onChange={handleCloudinaryUpload}
                                className="w-full text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-500/10 file:text-brand-700 hover:file:bg-brand-500/20 cursor-pointer"
                              />
                              {uploadingImage && <p className="text-[10px] text-brand-650 animate-pulse mt-1 font-bold">Uploading to Cloudinary Cloud...</p>}
                            </div>
                            <div>
                              <label className="block text-slate-500 font-bold mb-1">Image URL (Updated automatically or paste direct URL)</label>
                              <input
                                type="text" value={adminForm.image} onChange={(e) => setAdminForm({ ...adminForm, image: e.target.value })} placeholder="https://..."
                                className="w-full bg-white border border-slate-250 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-brand-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Amazon ASIN (Optional)</label>
                            <input
                              type="text" placeholder="e.g. B08XYZ..." value={adminForm.amazonAsin} onChange={(e) => setAdminForm({ ...adminForm, amazonAsin: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Attr: Color</label>
                              <input
                                type="text" placeholder="e.g. Black" value={adminForm.attributes_color} onChange={(e) => setAdminForm({ ...adminForm, attributes_color: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Attr: Material</label>
                              <input
                                type="text" placeholder="e.g. Leather" value={adminForm.attributes_material} onChange={(e) => setAdminForm({ ...adminForm, attributes_material: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Product Description</label>
                          <textarea
                            rows="3" required value={adminForm.description} onChange={(e) => setAdminForm({ ...adminForm, description: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500 resize-none"
                          />
                        </div>

                        <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
                          <button
                            type="button" onClick={() => setAdminFormOpen(false)}
                            className="px-4 py-2 border border-slate-200 hover:border-slate-350 font-bold text-slate-600 text-xs rounded-lg transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit" disabled={loading}
                            className="px-6 py-2 bg-[#0b2545] hover:bg-[#07172a] font-bold text-white text-xs rounded-lg transition-all"
                          >
                            {loading ? 'Saving Item...' : 'Save Product'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Products Inventory List */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                          <th className="py-3 px-4">Item</th>
                          <th className="py-3 px-4">SKU</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Price</th>
                          <th className="py-3 px-4">Stock</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                        {products.map((prod) => (
                          <tr key={prod._id} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4 flex items-center gap-3">
                              <img src={prod.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80'} alt="" className="h-9 w-9 object-cover rounded-lg border border-slate-200" />
                              <span className="font-bold text-slate-900 max-w-[200px] truncate">{prod.name}</span>
                            </td>
                            <td className="py-3 px-4 text-slate-500">{prod.sku}</td>
                            <td className="py-3 px-4"><span className="bg-slate-100 text-slate-650 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">{prod.category}</span></td>
                            <td className="py-3 px-4 text-slate-900">Â£{prod.price?.toFixed(2)}</td>
                            <td className="py-3 px-4">
                              <span className={prod.stock === 0 ? 'text-red-500' : prod.stock < 5 ? 'text-amber-500' : 'text-slate-650'}>
                                {prod.stock} Units
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => handleEditProductClick(prod)} className="p-1.5 text-slate-500 hover:text-brand-650 transition-colors border border-slate-100 rounded-lg hover:bg-slate-50">
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button onClick={() => handleDeleteProduct(prod._id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors border border-slate-100 rounded-lg hover:bg-slate-50">
                                  <Trash className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: USERS LIST */}
            {adminTab === 'users' && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-50 border-b border-slate-200">
                  <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Registered Users Database ({usersList.length} Entries)</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Registered Date</th>
                        <th className="py-3 px-4 text-right">Account Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                      {usersList.map((usr) => (
                        <tr key={usr._id} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 flex items-center gap-2">
                            <User className="h-4.5 w-4.5 text-slate-400" />
                            <span className="font-bold text-slate-900">{usr.name}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-500">{usr.email}</td>
                          <td className="py-3 px-4 text-slate-500">{usr.phone || 'N/A'}</td>
                          <td className="py-3 px-4 text-slate-400">{new Date(usr.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${usr.isAdmin
                              ? 'bg-brand-500/10 text-brand-700 border border-brand-500/20'
                              : 'bg-slate-100 text-slate-500'
                              }`}>
                              {usr.isAdmin ? 'Admin' : 'Customer'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────── PRODUCT DETAIL ─────── */}
        {(view === 'product' || view === 'product-detail') && (
          <ProductDetailPage
            product={selectedProduct || (products && products[0]) || MOCK_PRODUCTS[0]}
            allProducts={products || MOCK_PRODUCTS}
            setView={changeView}
            setSelectedCategory={handleSelectCategory}
            handleAddToCart={handleAddToCart}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {/* â”€â”€â”€â”€â”€â”€â”€ SHOP â”€â”€â”€â”€â”€â”€â”€ */}
        {view === 'shop' && (
          <ShopPage
            products={products}
            filteredProducts={filteredProducts}
            loading={loading}
            apiActive={apiActive}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleSelectCategory}
            cart={cart}
            itemsPrice={itemsPrice}
            heroIndex={heroIndex}
            setHeroIndex={setHeroIndex}
            setView={setView}
            handleAddToCart={handleAddToCart}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {/* â”€â”€â”€â”€â”€â”€â”€ CART â”€â”€â”€â”€â”€â”€â”€ */}
        {view === 'cart' && (
          <CartPage
            cart={cart}
            itemsPrice={itemsPrice}
            taxPrice={taxPrice}
            totalPrice={totalPrice}
            setView={setView}
            handleUpdateQty={handleUpdateQty}
            handleRemoveItem={handleRemoveItem}
          />
        )}

        {/* â”€â”€â”€â”€â”€â”€â”€ CHECKOUT â”€â”€â”€â”€â”€â”€â”€ */}
        {view === 'checkout' && (
          <CheckoutPage
            cart={cart}
            shippingForm={shippingForm}
            handleInputChange={handleInputChange}
            handleCheckoutSubmit={handleCheckoutSubmit}
            handleRemoveItem={handleRemoveItem}
            loading={loading}
            itemsPrice={itemsPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
            setView={setView}
          />
        )}

        {/* â”€â”€â”€â”€â”€â”€â”€ ORDER SUCCESS â”€â”€â”€â”€â”€â”€â”€ */}
        {view === 'success' && orderResult && (
          <OrderSuccessPage
            orderResult={orderResult}
            setView={setView}
          />
        )}

        {/* ─────── PRIVACY POLICY ─────── */}
        {view === 'privacy' && (
          <PrivacyPolicy setView={changeView} />
        )}

        {/* ─────── TERMS OF SERVICE ─────── */}
        {view === 'terms' && (
          <TermsOfService setView={changeView} />
        )}

        {/* ─────── REFUND POLICY ─────── */}
        {view === 'refund' && (
          <RefundPolicy setView={changeView} />
        )}

        {/* ─────── ABOUT US ─────── */}
        {view === 'about' && (
          <AboutPage setView={changeView} />
        )}

        {/* ─────── CONTACT US ─────── */}
        {view === 'contact' && (
          <ContactPage setView={changeView} />
        )}

        {/* ─────── CATEGORY PAGE ─────── */}
        {view === 'category' && (
          <CategoryPage
            categorySlug={selectedCategory}
            setView={changeView}
            setSelectedProduct={setSelectedProduct}
            handleAddToCart={handleAddToCart}
          />
        )}

      </main>

      {/* ─────── AUTH MODAL ─────── */}
      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        authMode={authMode}
        setAuthMode={setAuthMode}
        authForm={authForm}
        handleAuthFormChange={handleAuthFormChange}
        handleAuthSubmit={handleAuthSubmit}
        authLoading={authLoading}
        authError={authError}
        authSuccess={authSuccess}
        setAuthError={setAuthError}
        setAuthSuccess={setAuthSuccess}
      />

      {/* ─────── NEWSLETTER MODAL ─────── */}
      <NewsletterModal
        show={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
        email={newsletterEmail}
        setEmail={setNewsletterEmail}
        onSubmit={handleNewsletterSubmit}
        loading={newsletterLoading}
        success={newsletterSuccess}
        error={newsletterError}
      />

      {/* Corporate compliant cookie banner */}
      <CookieBanner onPrivacyClick={() => changeView('privacy')} />

      {/* Corporate compliant footer */}
      <Footer
        logoUrl={LOGO_DARK_URL}
        onPrivacyClick={() => changeView('privacy')}
        onTermsClick={() => changeView('terms')}
        onRefundClick={() => changeView('refund')}
        onAboutClick={() => changeView('about')}
        onContactClick={() => changeView('contact')}
        onCategoryClick={handleSelectCategory}
      />

    </div>
  );
}

export default App;

