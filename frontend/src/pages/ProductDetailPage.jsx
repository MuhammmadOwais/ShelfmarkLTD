import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, ChevronRight, FileText, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export const createSlug = (text) => {
  if (!text) return 'item';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const ProductDetailPage = ({ product, allProducts = [], setView, setSelectedCategory, handleAddToCart, setSelectedProduct }) => {
  const [selectedImg, setSelectedImg] = useState(product?.images?.[0] || '');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImg(product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // SEO Clean URL Update: domain.com/category-name/product-title
      const catSlug = createSlug(product.category);
      const prodSlug = createSlug(product.name);
      try {
        window.history.pushState({}, '', `/${catSlug}/${prodSlug}`);
      } catch {
        // Fallback
      }

      document.title = `${product.name} | Shelfmark Ltd UK Wholesale`;
    }
  }, [product]);

  if (!product) return null;

  const unitPriceIncVat = product.price || 0;
  const unitPriceExVat = unitPriceIncVat / 1.2;
  const rrpPrice = unitPriceIncVat * 1.45;
  const packQty = 12;
  const packPriceExVat = unitPriceExVat * packQty;
  const packPriceIncVat = unitPriceIncVat * packQty;
  const sku = product.sku || `SM-${(product._id || product.id || '101').toString().slice(-6).toUpperCase()}`;

  // Find related products in the same category
  const relatedProducts = (allProducts || [])
    .filter(p => p._id !== product._id && p.category === product.category)
    .slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      handleAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="bg-slate-50 min-h-screen font-sans text-slate-800 animate-fadeIn pb-16">
      
      {/* ─────── 1. BREADCRUMBS BAR ─────── */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 lg:px-8 text-xs font-semibold text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button
            onClick={() => setView('shop')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
          <button
            onClick={() => { setSelectedCategory(product.category); setView('category'); }}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            {product.category}
          </button>
          <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-bold truncate max-w-sm">{product.name}</span>
        </div>
      </div>

      {/* ─────── 2. MAIN PRODUCT DETAILS CONTAINER ─────── */}
      <div className="max-w-7xl mx-auto py-8 px-4 lg:px-8 space-y-10">
        
        {/* Top Product Header */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <span className="bg-[#071527] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
              {product.category}
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              Product Code: <strong className="text-slate-900">{sku}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight pt-1">
            {product.name}
          </h1>
        </div>

        {/* 2-Column Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: IMAGE DISPLAY & THUMBNAILS (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm overflow-hidden relative group">
              <div className="aspect-square bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center border border-slate-100">
                <img
                  src={selectedImg || product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* In Stock Badge */}
              <div className="absolute top-6 left-6 bg-emerald-700 text-white font-extrabold text-[10px] px-3 py-1 rounded shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                <span>UK Stock Ready</span>
              </div>
            </div>

            {/* Thumbnail Array */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto py-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImg === img ? 'border-[#071527] ring-2 ring-[#071527]/20 scale-105' : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* UK Warehouse Dispatch Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Truck className="h-4 w-4 text-emerald-600" />
                <span>UK Wolverhampton Warehouse Hub</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Item in stock for immediate next-day UK mainland dispatch. Includes itemized VAT invoice.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: B2B WHOLESALE PRICING & ORDER MATRIX (7 COLS) */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Wholesale Pack Specifications Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pack Quantity</span>
                <strong className="text-slate-900 font-extrabold text-sm">{packQty} Units / Case</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Est. RRP Per Unit</span>
                <strong className="text-slate-900 font-extrabold text-sm">£{rrpPrice.toFixed(2)}</strong>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">UK Stock Status</span>
                <span className="text-emerald-700 font-black text-xs">In Stock (Dispatch Ready)</span>
              </div>
            </div>

            {/* Dual Net Wholesale Pricing Matrix */}
            <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#071527] text-white px-5 py-3 flex items-center justify-between font-black text-xs uppercase tracking-wider">
                <span>Wholesale Trade Price Breakdown</span>
                <span className="text-slate-300 text-[10px]">UK VAT Rate 20%</span>
              </div>

              <div className="p-5 space-y-4 bg-white">
                {/* Single Unit Price Row */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Single Unit Trade Price</span>
                    <span className="text-xs text-slate-600 font-semibold">Excluding UK VAT</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900">£{unitPriceExVat.toFixed(2)}</span>
                    <span className="text-[11px] font-bold text-slate-500 block">
                      (£{unitPriceIncVat.toFixed(2)} Inc. VAT)
                    </span>
                  </div>
                </div>

                {/* Outer Pack / Case Price Row */}
                <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-xs font-black text-[#071527] uppercase tracking-wider block">Full Case / Pack Price ({packQty} Units)</span>
                    <span className="text-xs text-slate-600 font-semibold">Bulk Trade Rate</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#071527]">£{packPriceExVat.toFixed(2)}</span>
                    <span className="text-[11px] font-bold text-slate-600 block">
                      (£{packPriceIncVat.toFixed(2)} Inc. VAT)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Order Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                
                {/* Qty Selector */}
                <div className="flex items-center border border-slate-300 rounded-md overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3.5 py-2.5 text-sm font-black text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2.5 font-mono font-black text-slate-900 text-sm bg-white border-x border-slate-300 min-w-[44px] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3.5 py-2.5 text-sm font-black text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-6 bg-[#071527] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>{added ? 'Added to Order!' : 'Add to Cart / Order'}</span>
                </button>
              </div>

              {/* Trade Quote & Private Label Button */}
              <button
                onClick={() => setView('contact')}
                className="w-full py-3 px-6 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-xs uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-slate-700" />
                <span>Request Bulk Wholesale / Private Label Quote</span>
              </button>
            </div>

            {/* UK Trade Service Guarantee Strip */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-[10px] font-bold text-slate-600 text-center">
              <div className="bg-slate-50 p-2 rounded border border-slate-200 flex flex-col items-center">
                <Truck className="h-3.5 w-3.5 text-[#071527] mb-1" />
                <span>FREE UK Shipping &gt;£150</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200 flex flex-col items-center">
                <Zap className="h-3.5 w-3.5 text-[#071527] mb-1" />
                <span>Same Day UK Dispatch</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200 flex flex-col items-center">
                <ShieldCheck className="h-3.5 w-3.5 text-[#071527] mb-1" />
                <span>Official VAT Invoice</span>
              </div>
            </div>

          </div>

        </div>

        {/* ─────── 3. CLEAN & ELEGANT PRODUCT SPECIFICATIONS TAB SECTION (SAMPLE MATCH) ─────── */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          
          {/* Top Tab Header */}
          <div className="border-b border-slate-200 bg-slate-50/50 px-6 pt-4">
            <div className="inline-block border-b-2 border-[#071527] bg-white px-5 py-2.5 rounded-t-md text-xs font-black uppercase tracking-wider text-slate-900 shadow-sm">
              Product Specifications
            </div>
          </div>

          {/* 2-Column Minimalist Content Layout */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Product Description & Bullet Points */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Product Description
              </h2>
              
              <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-medium">
                <p className="font-bold text-slate-900 text-sm">
                  {product.name}
                </p>

                <ul className="space-y-2 pl-4 list-disc text-slate-700">
                  <li><strong>Material:</strong> Premium UK Standard Materials</li>
                  <li><strong>Outer Case Quantity:</strong> {packQty} Units / Carton</li>
                  <li><strong>UK Quality Standards:</strong> Fully Compliant</li>
                  <li><strong>Official VAT Invoice:</strong> Included with every order</li>
                </ul>

                <p className="text-slate-600 pt-2 leading-relaxed italic text-[11px]">
                  {product.description || `${product.name} is supplied directly by Shelfmark LTD from our Wolverhampton distribution hub. Manufactured to high UK quality standards, ideal for retail shelf display, e-commerce re-selling, and commercial procurement.`}
                </p>
                <p className="text-[11px] text-slate-500 italic">
                  <strong>Wholesale Territories:</strong> United Kingdom (Mainland, Highlands &amp; Islands), European Union, and International B2B Trade.
                </p>
              </div>
            </div>

            {/* Right Column: Product Attributes (Clean Minimalist Lines - No Heavy Boxes) */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Product Attributes
              </h2>

              <div className="divide-y divide-slate-200 text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">Dimensions</span>
                  <span className="text-slate-700 font-semibold">Standard UK Pack Size</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">EAN Barcode</span>
                  <span className="text-slate-700 font-mono font-semibold">5055071788253</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">Carton Quantity</span>
                  <span className="text-slate-700 font-bold">{packQty}</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">Weight (kg)</span>
                  <span className="text-slate-700 font-mono font-semibold">0.450000</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">On Sale</span>
                  <span className="text-slate-700 font-semibold">No</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">Brand</span>
                  <span className="text-slate-900 font-extrabold">Shelfmark</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ─────── 4. RELATED PRODUCTS GRID ─────── */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  More From {product.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Customers Who Viewed This Also Bought
                </h3>
              </div>
              <button
                onClick={() => { setSelectedCategory(product.category); setView('category'); }}
                className="text-xs font-black text-[#071527] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Category</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard
                  key={relProd._id}
                  product={relProd}
                  onAddToCart={handleAddToCart}
                  onViewDetail={(p) => {
                    if (setSelectedProduct) setSelectedProduct(p);
                    setSelectedImg(p.images?.[0] || '');
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};

export default ProductDetailPage;
