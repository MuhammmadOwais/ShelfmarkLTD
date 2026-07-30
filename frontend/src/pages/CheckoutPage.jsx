import React from 'react';
import { ArrowRight, ShieldCheck, Trash2 } from 'lucide-react';

const CheckoutPage = ({
  cart,
  shippingForm,
  handleInputChange,
  handleCheckoutSubmit,
  handleRemoveItem,
  loading,
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  setView,
}) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <button
        onClick={() => setView('shop')}
        className="text-slate-400 hover:text-slate-800 text-sm mb-6 flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
      >
        ← Back to shopping
      </button>

      <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Billing &amp; Delivery</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Shipping Form ── */}
        <form onSubmit={handleCheckoutSubmit} className="lg:col-span-7 space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">UK Shipping Address</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Full Name</label>
              <input
                required type="text" name="name" placeholder="e.g. John Doe"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a]"
                value={shippingForm.name} onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Street Address</label>
              <input
                required type="text" name="street" placeholder="e.g. 221B Baker Street"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a]"
                value={shippingForm.street} onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">City</label>
                <input
                  required type="text" name="city" placeholder="e.g. London"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a]"
                  value={shippingForm.city} onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">County / State</label>
                <input
                  required type="text" name="state" placeholder="e.g. Greater London"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a]"
                  value={shippingForm.state} onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Postcode</label>
                <input
                  required type="text" name="postalCode" placeholder="e.g. NW1 6XE"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a]"
                  value={shippingForm.postalCode} onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Phone Number</label>
                <input
                  required type="text" name="phone" placeholder="e.g. +44 20 XXXX XXXX"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a]"
                  value={shippingForm.phone} onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* ── Payment Notice ── */}
          <div className="rounded-2xl overflow-hidden border border-amber-200 bg-amber-50 mt-2">
            {/* Top bar */}
            <div className="bg-amber-500 px-5 py-2.5 flex items-center gap-2">
              <span className="text-lg">🔧</span>
              <span className="text-white font-black text-xs uppercase tracking-widest">Payment Gateway — Coming Soon</span>
            </div>
            {/* Body */}
            <div className="px-5 py-5 space-y-3">
              <p className="text-sm font-bold text-amber-900">
                We are currently setting up our secure payment gateway.
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">
                Online card &amp; PayPal payments will be available very soon. In the meantime, please contact us directly to complete your order and arrange payment.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <a
                  href="mailto:admin@shelfmark.com"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 hover:text-amber-700 transition-colors"
                >
                  📧 admin@shelfmark.com
                </a>
              </div>
              <p className="text-[10px] text-amber-700 pt-1 border-t border-amber-200">
                Please include your order details and delivery address in your message. We'll confirm and process your order within 24 hours.
              </p>
            </div>
          </div>

          {/* Disabled submit button to indicate payment is unavailable */}
          <button
            type="button"
            disabled
            className="w-full py-3.5 mt-2 rounded-xl bg-slate-200 text-slate-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <span>🔒 Payment Integration Coming Soon</span>
          </button>
        </form>


        {/* ── Order Summary ── */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-md font-bold text-slate-900 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">Order Summary</h3>
            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.product} className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded-lg" />
                    <div className="max-w-[180px]">
                      <span className="text-xs font-bold text-slate-800 block truncate">{item.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">Qty: {item.qty} × £{item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-900">£{(item.price * item.qty).toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.product)}
                      className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 mt-4 pt-4 space-y-2.5 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-slate-800 font-semibold">£{itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>UK VAT (20%)</span>
                <span className="text-slate-800 font-semibold">£{taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping (UK standard)</span>
                <span className="text-slate-800 font-semibold">
                  {shippingPrice === 0 ? 'FREE' : `£${shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2.5 border-t border-slate-200">
                <span>Total Price</span>
                <span className="text-[#0b2545] font-black">£{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-start gap-3 shadow-sm">
            <ShieldCheck className="h-6 w-6 text-[#c29a4a] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-slate-900 font-semibold text-xs uppercase tracking-wider mb-1">ShelfmarkLTD Guarantee</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Safe &amp; secure SSL encrypted checkout. Fast shipping with full DPD / Royal Mail courier tracking details sent on dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
