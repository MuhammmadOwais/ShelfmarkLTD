import React from 'react';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

const CartPage = ({ cart, itemsPrice, taxPrice, totalPrice, setView, handleUpdateQty, handleRemoveItem }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 animate-fadeIn">
      <button
        onClick={() => setView('shop')}
        className="text-slate-500 hover:text-slate-800 text-sm mb-6 flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
      >
        ← Continue Shopping
      </button>

      <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-3xl p-8 max-w-md mx-auto space-y-4 shadow-sm">
          <div className="h-16 w-16 bg-[#c29a4a]/10 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="h-8 w-8 text-[#c29a4a]" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Your cart is empty</h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            Explore our premium catalogs of high-quality electronics, kitchen utilities, and office products.
          </p>
          <button
            onClick={() => setView('shop')}
            className="px-6 py-2.5 bg-[#0b2545] hover:bg-[#07172a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              <div className="divide-y divide-slate-100">
                {cart.map(item => (
                  <div key={item.product} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-5">
                    {/* Product info */}
                    <div className="col-span-6 flex items-center gap-4">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded-xl border border-slate-100 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{item.name}</h4>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">
                          SKU: {item.product.substring(0, 10).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-2 text-center text-sm font-semibold text-slate-700">
                      <span className="md:hidden text-xs text-slate-400 block mb-1">Unit Price</span>
                      £{item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex flex-col items-center">
                      <span className="md:hidden text-xs text-slate-400 block mb-1">Quantity</span>
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => handleUpdateQty(item.product, item.qty - 1)}
                          className="px-2.5 py-1 text-slate-500 hover:bg-slate-200 transition-colors text-xs font-extrabold cursor-pointer"
                        >-</button>
                        <span className="px-3 text-xs font-bold text-slate-800">{item.qty}</span>
                        <button
                          onClick={() => handleUpdateQty(item.product, item.qty + 1)}
                          className="px-2.5 py-1 text-slate-500 hover:bg-slate-200 transition-colors text-xs font-extrabold cursor-pointer"
                        >+</button>
                      </div>
                    </div>

                    {/* Row total & remove */}
                    <div className="col-span-2 text-right flex md:flex-col items-center md:items-end justify-between gap-2">
                      <span className="md:hidden text-xs text-slate-400">Total Price</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-950">£{(item.price * item.qty).toFixed(2)}</span>
                        <button
                          onClick={() => handleRemoveItem(item.product)}
                          className="text-red-500 hover:text-red-600 transition-colors p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3 uppercase tracking-wider">Cart Total</h3>
            <div className="space-y-3.5 text-xs font-semibold text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal (Excl. VAT)</span>
                <span className="text-slate-950 font-bold">£{itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>UK VAT (20%)</span>
                <span className="text-slate-950 font-bold">£{taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pb-3.5 border-b border-slate-200">
                <span>Standard Delivery</span>
                <span className="text-green-600 font-bold uppercase tracking-wider">FREE</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-slate-950 font-black text-sm">
                <span>Grand Total</span>
                <span className="text-[#0b2545] text-lg">£{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => setView('checkout')}
                className="w-full py-3.5 bg-[#c29a4a] hover:bg-[#d4aa5a] text-slate-950 font-extrabold rounded-xl transition-all shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView('shop')}
                className="w-full py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
