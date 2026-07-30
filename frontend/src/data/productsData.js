// Comprehensive UK B2B Wholesale Shelfmark Product Generator Engine
// Generates 40 realistic, branded products for every category (600 products in total)

const CATEGORY_NAMES = [
  'Electronics', 'Fashion', 'Home & Living', 'Furniture', 'Beauty',
  'Grocery', 'Baby & Kids', 'Sports', 'Books', 'Pet Supplies',
  'Gaming', 'Jewelry', 'Garden', 'Tools', 'Health'
];

const ITEM_TEMPLATES = {
  Electronics: [
    { title: 'UltraNoise ANC Wireless Headphones', basePrice: 129.99, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600' },
    { title: 'ProMech RGB Mechanical Keyboard', basePrice: 89.99, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600' },
    { title: '4K Ultra HD Streaming Smart Hub', basePrice: 59.99, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600' },
    { title: 'PowerVault 20,000mAh Power Bank', basePrice: 34.99, img: 'https://images.unsplash.com/photo-1609592424089-a21233010531?w=600' },
    { title: 'HD Smart Webcam with Privacy Cover', basePrice: 42.50, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600' },
    { title: 'Ergonomic Vertical Wireless Mouse', basePrice: 24.99, img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600' },
    { title: 'Dual-Band High-Speed Wi-Fi Router', basePrice: 69.99, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600' },
    { title: 'Portable Bluetooth Waterproof Speaker', basePrice: 38.00, img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600' }
  ],
  Fashion: [
    { title: 'Minimalist Chronograph Leather Watch', basePrice: 119.50, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600' },
    { title: 'Premium Organic Cotton Fleece Hoodie', basePrice: 45.00, img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600' },
    { title: 'Italian Full-Grain Leather Bifold Wallet', basePrice: 29.99, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600' },
    { title: 'Classic UV400 Polarized Sunglasses', basePrice: 22.50, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600' },
    { title: 'Waterproof Canvas Travel Duffel Bag', basePrice: 54.99, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600' },
    { title: 'Breathable Lightweight Running Trainers', basePrice: 65.00, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600' }
  ],
  'Home & Living': [
    { title: 'Smart Touch Sensor Bedside Lamp', basePrice: 34.99, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600' },
    { title: 'Essential Oil Ultrasonic Diffuser', basePrice: 29.99, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600' },
    { title: 'Stainless Steel Pour-Over Coffee Kettle', basePrice: 39.99, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600' },
    { title: 'Bamboo Fiber Kitchen Storage Containers', basePrice: 25.50, img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600' },
    { title: 'Luxury 400TC Egyptian Cotton Sheet Set', basePrice: 79.99, img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600' }
  ],
  Furniture: [
    { title: 'Executive High-Back Ergonomic Chair', basePrice: 189.99, img: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600' },
    { title: 'Nordic Solid Oak Minimalist Coffee Table', basePrice: 149.00, img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600' },
    { title: 'Adjustable Electric Standing Office Desk', basePrice: 289.99, img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600' },
    { title: 'Modern Velvet Accent Lounge Armchair', basePrice: 165.50, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600' },
    { title: 'Modular 3-Tier Wooden Bookcase Unit', basePrice: 79.99, img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc86de9?w=600' },
    { title: 'Space-Saving Metal Frame Folding Desk', basePrice: 64.99, img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600' },
    { title: 'Luxury Velvet Storage Ottoman Bench', basePrice: 59.99, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600' },
    { title: 'Scandinavian Round Dining Table', basePrice: 199.00, img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600' }
  ],
  Beauty: [
    { title: 'Organic Hyaluronic Botanical Serum', basePrice: 24.99, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600' },
    { title: 'Professional Ionic High-Speed Hair Dryer', basePrice: 49.99, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600' },
    { title: 'Rose Quartz Facial Massager Roller Set', basePrice: 18.50, img: 'https://images.unsplash.com/photo-1608248597261-e4d31846b840?w=600' },
    { title: 'Nutritive Vitamin C Glowing Face Cream', basePrice: 29.00, img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600' }
  ],
  Grocery: [
    { title: 'Artisan Whole Bean Dark Roast Coffee (1kg)', basePrice: 18.99, img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600' },
    { title: 'Organic Raw British Wildflower Honey', basePrice: 12.50, img: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=600' },
    { title: 'Cold-Pressed Extra Virgin Olive Oil (1L)', basePrice: 15.99, img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600' }
  ],
  'Baby & Kids': [
    { title: 'Montessori Educational Wooden Sorting Toy', basePrice: 22.99, img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600' },
    { title: 'Soft GOTS Organic Cotton Baby Blanket', basePrice: 19.99, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600' },
    { title: 'Multi-Functional Baby Carrier Wrap', basePrice: 34.50, img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600' }
  ],
  Sports: [
    { title: 'Non-Slip Eco TPE Yoga Mat (6mm)', basePrice: 27.99, img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600' },
    { title: 'Adjustable Latex Resistance Bands (5 Pcs)', basePrice: 16.99, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600' },
    { title: 'Stainless Steel Insulated Sports Flask (1L)', basePrice: 21.00, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600' }
  ],
  Books: [
    { title: 'Hardcover Executive Lined Journal Set', basePrice: 14.99, img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600' },
    { title: 'Leatherbound Daily Planner & Desk Calendar', basePrice: 19.99, img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600' }
  ],
  'Pet Supplies': [
    { title: 'Orthopedic Memory Foam Dog Bed', basePrice: 49.99, img: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600' },
    { title: 'Interactive Automatic Laser Cat Toy', basePrice: 19.99, img: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600' }
  ],
  Gaming: [
    { title: 'Pro 7.1 Surround Sound Gaming Headset', basePrice: 54.99, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600' },
    { title: 'High-DPI Optical Wired Gaming Mouse', basePrice: 29.99, img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600' }
  ],
  Jewelry: [
    { title: '925 Sterling Silver Solitaire Pendant', basePrice: 39.99, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600' },
    { title: 'Gold Plated Minimalist Hoop Earrings', basePrice: 24.99, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' }
  ],
  Garden: [
    { title: 'Solar Powered Outdoor Lights (4-Pack)', basePrice: 26.99, img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600' },
    { title: 'Stainless Steel Ergonomic Garden Hand Tools', basePrice: 29.99, img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600' }
  ],
  Tools: [
    { title: '20V Lithium-Ion Cordless Drill Driver Kit', basePrice: 69.99, img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600' },
    { title: '100-Piece Precision Screwdriver Tool Set', basePrice: 34.99, img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600' }
  ],
  Health: [
    { title: 'Percussion Deep Tissue Massage Gun', basePrice: 44.99, img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600' },
    { title: 'Smart Bluetooth Body Fat Bathroom Scale', basePrice: 29.99, img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600' }
  ]
};

const VARIANT_SUFFIXES = [
  'Pro Edition', 'Series X', 'Ultra UK Spec', 'Elite Wholesale Pack',
  'Compact Series', 'Executive Line', 'Premium B2B Pack', 'Master Edition',
  'V2 Upgraded', 'Industrial Grade', 'Deluxe Edition', 'Studio Model',
  'Eco Series', 'Nordic Edition', 'Heritage Line', 'Signature Series',
  'Vanguard Pack', 'Apex Edition', 'Comfort Series', 'Optima Spec'
];

export const generateCategoryProducts = () => {
  const allProducts = [];

  CATEGORY_NAMES.forEach((category) => {
    const templates = ITEM_TEMPLATES[category] || ITEM_TEMPLATES['Electronics'];
    const slugPrefix = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    for (let i = 1; i <= 40; i++) {
      const template = templates[(i - 1) % templates.length];
      const variantIndex = Math.floor((i - 1) / templates.length);
      const suffix = VARIANT_SUFFIXES[variantIndex % VARIANT_SUFFIXES.length] || `Model ${i}`;

      const name = `Shelfmark ${template.title} (${suffix})`;
      const price = parseFloat((template.basePrice * (1 + (i % 5) * 0.08)).toFixed(2));
      const sku = `SM-${slugPrefix.toUpperCase().slice(0, 4)}-${String(i).padStart(3, '0')}`;
      const stock = 15 + ((i * 7) % 65);
      const rating = parseFloat((4.4 + ((i % 6) * 0.1)).toFixed(1));
      const reviewsCount = 10 + ((i * 13) % 80);

      allProducts.push({
        _id: `${slugPrefix}_prod_${i}`,
        id: `${slugPrefix}_prod_${i}`,
        name,
        sku,
        price,
        category,
        description: `Official Shelfmark LTD ${name}. Manufactured to UK quality standards, supplied with full itemized VAT invoice and Wolverhampton distribution dispatch. Ideal for B2B wholesale re-selling and corporate retail.`,
        images: [template.img],
        stock,
        ratings: { average: rating, count: reviewsCount },
        attributes: {
          brand: 'Shelfmark',
          origin: 'UK Wolverhampton Hub',
          packaging: 'Wholesale Outer Carton (12 Units)',
          warranty: '12 Month Manufacturer Warranty'
        }
      });
    }
  });

  return allProducts;
};

export const GENERATED_PRODUCTS = generateCategoryProducts();
