import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Layers, ChevronRight, ChevronLeft, ArrowLeft, ShieldCheck, Tag, Filter, CheckCircle2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import { CATEGORIES_DATA } from '../data/categories';

const BRAND_PARTNERS = [
  { name: 'Mattel', tag: 'Official Wholesale Partner' },
  { name: 'Hasbro', tag: 'UK Trade Distributor' },
  { name: 'Funko', tag: 'Licensed Supply' },
  { name: 'Casdon', tag: 'Direct Factory' },
  { name: 'Henbrandt', tag: 'Wholesale Partner' },
  { name: 'One For Fun', tag: 'Trade Stockist' },
  { name: 'Paper Projects', tag: 'UK Supply Hub' },
  { name: 'Character', tag: 'Licensed Wholesale' },
];

const ShopPage = ({
  products,
  filteredProducts,
  loading,
  apiActive,
  selectedCategory,
  setSelectedCategory,
  cart,
  itemsPrice,
  heroIndex,
  setHeroIndex,
  setView,
  handleAddToCart,
  setSelectedProduct,
}) => {
  // Category slider pagination state
  const [sliderIndex, setSliderIndex] = useState(0);
  const itemsPerPage = 4;
  const totalSlides = Math.ceil(CATEGORIES_DATA.length / itemsPerPage);

  useEffect(() => {
    document.title = "Shelfmark Ltd — Top England Corporate Website, Premier UK Wholesaler & E-Commerce Store";
  }, []);

  const handleNextSlide = () => {
    setSliderIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrevSlide = () => {
    setSliderIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleCategories = CATEGORIES_DATA.slice(
    sliderIndex * itemsPerPage,
    sliderIndex * itemsPerPage + itemsPerPage
  );

  const handleViewDetail = (prod) => {
    if (setSelectedProduct) setSelectedProduct(prod);
    if (setView) setView('product');
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 animate-fadeIn">

      {/* ─────── HERO SLIDESHOW SECTION ─────── */}
      <HeroSection
        heroIndex={heroIndex}
        onContactClick={() => setView('contact')}
      />



      {/* ─────── CATEGORIES CAROUSEL SECTION ─────── */}
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.16em] mb-1">
              Store Departments
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Explore Popular Wholesale Categories
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevSlide}
              className="h-10 w-10 rounded-full bg-white border border-slate-200 hover:border-slate-900 hover:bg-[#071527] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
              aria-label="Previous Categories"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextSlide}
              className="h-10 w-10 rounded-full bg-white border border-slate-200 hover:border-slate-900 hover:bg-[#071527] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
              aria-label="Next Categories"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCategories.map((cat) => (
            <a
              key={cat.id}
              href={`/category/${cat.slug}`}
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory(cat.slug);
                const catalogEl = document.getElementById('catalog');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 block border border-slate-200"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col justify-end space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                  40 Products Available
                </span>
                <h3 className="text-lg font-black tracking-tight text-white group-hover:text-slate-200 transition-colors">
                  {cat.name}
                </h3>

                <div className="flex items-center justify-between pt-1 border-t border-white/10">
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                    Explore Collection
                  </span>
                  <div className="h-8 w-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 shadow-md">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ─────── PRODUCT CATALOG WITH LEFT B2B FILTER SIDEBAR ─────── */}
      <div id="catalog" className="max-w-7xl mx-auto py-12 px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-900" />
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.16em]">
                {selectedCategory === 'All' ? 'All Departments' : selectedCategory} Catalog
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {selectedCategory === 'All' ? 'Featured Trade Collection' : `${selectedCategory} Stock`}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600 font-bold bg-white border border-slate-200 px-3.5 py-2 rounded-md shadow-sm">
              Showing {filteredProducts.length} Wholesale Items
            </span>
          </div>
        </div>

        {/* 2-Column B2B Layout: Left Filter Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDEBAR: Department Filters */}
          <aside className="lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Filter className="h-4 w-4 text-slate-900" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Filter By Department
              </h3>
            </div>

            <div className="space-y-1 max-h-[480px] overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${selectedCategory === 'All' ? 'bg-[#071527] text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
              >
                <span>All Departments</span>
                <span className="text-[10px] opacity-80">({products.length})</span>
              </button>

              {CATEGORIES_DATA.map((cat) => {
                const isActive = selectedCategory === cat.slug || selectedCategory === cat.name;
                const count = products ? products.filter(p => p.category === cat.name || p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cat.slug).length : 40;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs font-semibold transition-all flex items-center justify-between cursor-pointer truncate ${isActive ? 'bg-[#071527] text-white font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] opacity-70 shrink-0 ml-2">({count || 40})</span>
                  </button>
                );
              })}
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-2">
              <span className="font-extrabold text-slate-900 uppercase tracking-wider block text-[10px]">
                UK Trade Benefits
              </span>
              <ul className="space-y-1.5 text-slate-600 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Free UK Shipping over £150 Ex VAT</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Custom Private Label Branding</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Wolverhampton Warehouse Dispatch</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* RIGHT COLUMN: Product Grid */}
          <main className="lg:col-span-9">
            {/* Loading Spinner */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#071527]" />
                <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Loading stock items...</p>
              </div>
            )}

            {/* Product Grid */}
            {!loading && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onViewDetail={handleViewDetail}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                <ShoppingBag className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                <h3 className="text-lg font-bold text-slate-800">No products found in this category</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  We couldn't find any products matching your current category filter. Try selecting another department.
                </p>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="mt-5 px-5 py-2.5 bg-[#071527] text-white text-xs font-bold uppercase tracking-wider rounded-md hover:bg-slate-800 transition-colors"
                >
                  View All Products
                </button>
              </div>
            )}
          </main>

        </div>

      </div>




    </div>
  );
};

export default ShopPage;
