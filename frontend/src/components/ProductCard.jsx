import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, ExternalLink, PackageCheck, ShieldCheck } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onViewDetail }) => {
  const { _id, id, name, price, category, description, images, ratings, attributes, amazonAsin, stock } = product;
  const [wished, setWished] = useState(false);

  const productIdStr = (_id || id || '101').toString().slice(-6).toUpperCase();
  const sku = `SKU: SM-${productIdStr}`;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-slate-900 text-slate-900' : 'text-slate-200 fill-slate-200'}`}
      />
    ));
  };

  const isLowStock = stock && stock > 0 && stock <= 10;
  const isOutOfStock = stock === 0;

  const unitPriceExVat = price / 1.2;
  const rrpPrice = price * 1.45;
  const packQty = 12;
  const packPriceExVat = unitPriceExVat * packQty;
  const packPriceIncVat = price * packQty;

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-900 overflow-hidden flex flex-col h-full relative group transition-all duration-300 shadow-sm hover:shadow-xl">

      {/* ── Product Image & Badge Box ── */}
      <div 
        className="relative overflow-hidden bg-slate-50 cursor-pointer" 
        style={{ aspectRatio: '4/3' }}
        onClick={() => onViewDetail && onViewDetail(product)}
      >
        <img
          src={images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Pill Badge */}
        <span className="absolute top-3 left-3 bg-[#071527]/95 backdrop-blur-sm text-white font-extrabold text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
          {category}
        </span>

        {/* Stock Badge */}
        {isLowStock && !isOutOfStock && (
          <span className="absolute top-3 right-10 bg-slate-800 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
            Low Stock ({stock})
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
            Out of Stock
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); setWished(w => !w); }}
          className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm hover:scale-110 transition-transform cursor-pointer border-none"
          title="Save to Wishlist"
        >
          <Heart className={`h-3.5 w-3.5 transition-colors ${wished ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
        </button>

        {/* Quick Order B2B Hover Overlay */}
        <div className="product-overlay absolute inset-x-0 bottom-0 flex items-center gap-2 px-3 py-2 bg-[#071527]/95 backdrop-blur-md">
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            disabled={isOutOfStock}
            className="flex-1 py-2 text-[11px] font-black uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-200 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </button>
          {amazonAsin && (
            <a
              href={`https://www.amazon.co.uk/dp/${amazonAsin}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
              title="View Amazon UK Listing"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* ── Product B2B Details Body ── */}
      <div className="p-4 flex flex-col flex-grow bg-white space-y-2">

        {/* Rating Row & SKU */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold border-b border-slate-100 pb-1.5">
          <span className="uppercase tracking-wider font-extrabold text-slate-600">{sku}</span>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">{renderStars(ratings?.average || 4.5)}</div>
            <span className="text-slate-500">({ratings?.count || 12})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3
          className="text-slate-900 font-extrabold text-sm leading-snug line-clamp-2 hover:text-[#071527] transition-colors cursor-pointer"
          onClick={() => onViewDetail && onViewDetail(product)}
        >
          {name}
        </h3>

        {/* Wholesale Pack & RRP Spec Bar */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-md p-2 text-[11px] space-y-1">
          <div className="flex justify-between items-center text-slate-600">
            <span>Pack Qty: <strong className="text-slate-900">{packQty} Units</strong></span>
            <span className="text-slate-400">RRP: <strong className="text-slate-700">£{rrpPrice.toFixed(2)}</strong></span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
            <PackageCheck className="h-3 w-3 shrink-0 text-emerald-600" />
            <span>UK Wolverhampton Stock (Dispatch Ready)</span>
          </div>
        </div>

        {/* Wholesale Pricing Stack */}
        <div className="pt-2 mt-auto border-t border-slate-100 space-y-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Unit Price</span>
            <div className="text-right">
              <span className="text-base font-black text-slate-900 tracking-tight">£{unitPriceExVat.toFixed(2)}</span>
              <span className="text-[9px] text-slate-500 font-semibold ml-1">Ex. VAT</span>
              <span className="block text-[9px] text-slate-400">(£{price.toFixed(2)} Inc. VAT)</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between bg-slate-900 text-white px-2.5 py-1.5 rounded-md text-xs">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">Pack Price ({packQty}x)</span>
            <span className="font-black text-white">£{packPriceExVat.toFixed(2)} <span className="text-[9px] text-slate-400 font-normal">Ex VAT</span></span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
