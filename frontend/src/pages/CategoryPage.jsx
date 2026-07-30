import React, { useState, useEffect, useMemo } from 'react';
import { SlidersHorizontal, ArrowLeft, Filter, Sparkles, ShoppingBag, CheckCircle2, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES_DATA, CATEGORY_PRODUCTS } from '../data/categories';

const CategoryPage = ({ categorySlug, setView, setSelectedProduct, handleAddToCart }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Find category metadata by slug
  const categoryInfo = useMemo(() => {
    return CATEGORIES_DATA.find(c => c.slug === categorySlug || c.name.toLowerCase() === categorySlug.toLowerCase()) || {
      id: categorySlug,
      name: categorySlug ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Category',
      slug: categorySlug,
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
      icon: '🛍️',
      description: 'Explore high quality products across trusted brands with fast UK delivery.',
    };
  }, [categorySlug]);

  // Set Page Title & Meta Description dynamically for SEO
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${categoryInfo.name} Wholesale UK | Top England Supplier — Shelfmark Ltd`;

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    const newDescText = `Shop ${categoryInfo.name} B2B wholesale supply from Shelfmark Ltd (shelfmarkltd), a top England corporate supplier in Wolverhampton. Fast UK mainland dispatch.`;

    if (metaDesc) {
      metaDesc.setAttribute('content', newDescText);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = newDescText;
      document.head.appendChild(metaDesc);
    }

    // Push URL state for clean domainname/category/category-name link structure
    try {
      window.history.pushState({}, '', `/category/${categoryInfo.slug}`);
    } catch {
      // Fallback
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle || "ShelfmarkLTD | Premium UK E-Commerce Store";
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
    };
  }, [categoryInfo]);

  // Filter products for this specific category
  const categoryProducts = useMemo(() => {
    let prods = CATEGORY_PRODUCTS.filter(p => {
      const pCat = p.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
      const targetSlug = categoryInfo.slug.toLowerCase();
      return pCat === targetSlug || p.category.toLowerCase() === categoryInfo.name.toLowerCase();
    });

    // If no exact match found, return subset of fallback catalog
    if (prods.length === 0) {
      prods = CATEGORY_PRODUCTS.slice(0, 3);
    }

    // Apply Price Range Filter
    if (selectedPriceRange === 'under-30') {
      prods = prods.filter(p => p.price < 30);
    } else if (selectedPriceRange === '30-70') {
      prods = prods.filter(p => p.price >= 30 && p.price <= 70);
    } else if (selectedPriceRange === 'over-70') {
      prods = prods.filter(p => p.price > 70);
    }

    // Apply Stock Filter
    if (inStockOnly) {
      prods = prods.filter(p => p.stock > 0);
    }

    // Apply Sorting
    if (sortBy === 'price-low') {
      prods.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      prods.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      prods.sort((a, b) => (b.ratings?.average || 0) - (a.ratings?.average || 0));
    }

    return prods;
  }, [categoryInfo, selectedPriceRange, inStockOnly, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-fadeIn" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* ─────── HERO CATEGORY BANNER ─────── */}
      <div className="bg-[#0b2545] text-white relative overflow-hidden py-14 px-6 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-[#0b2545]/90 to-transparent z-10" />
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0 scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url(${categoryInfo.image})` }}
        />

        <div className="max-w-7xl mx-auto relative z-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6">
            <button onClick={() => setView('shop')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-400">Categories</span>
            <span>/</span>
            <span className="text-white font-bold">{categoryInfo.name}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
                <span>Official Category</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                {categoryInfo.name}
              </h1>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                {categoryInfo.description}
              </p>
            </div>

            {/* Category Image Card */}
            <div className="relative rounded-md overflow-hidden border border-white/20 shadow-2xl h-36 w-full md:w-56 shrink-0 bg-slate-900">
              <img
                src={categoryInfo.image}
                alt={categoryInfo.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                  {categoryProducts.length} Products Listed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────── CONTROLS & FILTER BAR ─────── */}
      <div className="sticky top-[var(--navbar-height,65px)] z-30 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm py-3 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 text-xs font-semibold text-slate-700">
          
          {/* Left: Filter Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-slate-900 uppercase tracking-wider">
              <SlidersHorizontal className="h-4 w-4 text-slate-700" />
              Filter By:
            </span>

            {/* Price Range Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-md">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under-30', label: '< £30' },
                { id: '30-70', label: '£30 - £70' },
                { id: 'over-70', label: '> £70' },
              ].map(pr => (
                <button
                  key={pr.id}
                  onClick={() => setSelectedPriceRange(pr.id)}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer font-bold ${
                    selectedPriceRange === pr.id
                      ? 'bg-[#0b2545] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pr.label}
                </button>
              ))}
            </div>

            {/* Stock Toggle */}
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-all cursor-pointer font-bold ${
                inStockOnly
                  ? 'bg-green-50 text-green-700 border-green-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              <CheckCircle2 className={`h-3.5 w-3.5 ${inStockOnly ? 'text-green-600' : 'text-slate-400'}`} />
              In Stock Only
            </button>
          </div>

          {/* Right: Sort By Dropdown */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-slate-500 font-bold uppercase tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 border border-slate-200 text-slate-900 font-bold text-xs rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>


      {/* ─────── PRODUCT CATALOG GRID ─────── */}
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {categoryInfo.name} Collection
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Showing {categoryProducts.length} verified products</p>
          </div>
          
          <button
            onClick={() => setView('shop')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0b2545] hover:text-[#c29a4a] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Products
          </button>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-4">
            <ShoppingBag className="h-12 w-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No products match your selected filter</h3>
            <p className="text-xs text-slate-500">Try resetting price or stock filters to see full collection.</p>
            <button
              onClick={() => { setSelectedPriceRange('all'); setInStockOnly(false); }}
              className="px-5 py-2 bg-[#0b2545] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetail={(p) => {
                  setSelectedProduct(p);
                  setView('product');
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
