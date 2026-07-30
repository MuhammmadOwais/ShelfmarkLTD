import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const OrderSuccessPage = ({ orderResult, setView }) => {
  if (!orderResult) return null;

  return (
    <div className="max-w-xl mx-auto py-24 px-6 text-center animate-fadeIn">
      <div className="inline-flex items-center justify-center p-4 bg-green-500/10 border border-green-500/30 text-green-600 rounded-full mb-6">
        <CheckCircle2 className="h-10 w-10 animate-bounce" />
      </div>

      <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Order Confirmed!</h2>
      <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
        Thank you for shopping with <strong>ShelfmarkLTD</strong>. Your order has been placed successfully and is currently being processed.
      </p>

      <div className="bg-slate-50 border border-slate-200 text-left p-6 rounded-2xl mb-8 space-y-4 shadow-sm">
        <div className="flex justify-between text-xs pb-3 border-b border-slate-200">
          <div>
            <span className="text-slate-400 block uppercase tracking-wider font-bold">Order ID</span>
            <span className="text-slate-900 font-extrabold">{orderResult._id}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block uppercase tracking-wider font-bold">Payment Method</span>
            <span className="text-slate-900 font-extrabold">{orderResult.paymentMethod}</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Deliver To:</h4>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {orderResult.shippingAddress.name} <br />
            {orderResult.shippingAddress.street}, {orderResult.shippingAddress.city}, <br />
            {orderResult.shippingAddress.state}, {orderResult.shippingAddress.postalCode}, UK
          </p>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500 font-semibold">Amount Paid (Incl. VAT)</span>
          <span className="text-[#0b2545] font-extrabold text-base">£{orderResult.totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Order items */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 text-left space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">Items Ordered</h4>
        {orderResult.orderItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded-lg border border-slate-100" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{item.name}</p>
              <p className="text-[10px] text-slate-400">Qty: {item.qty} × £{item.price?.toFixed(2)}</p>
            </div>
            <span className="text-xs font-bold text-slate-900">£{((item.price || 0) * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setView('shop')}
        className="px-8 py-3.5 rounded-full bg-[#c29a4a] hover:bg-[#d4aa5a] text-slate-950 font-bold text-sm transition-all shadow-md cursor-pointer"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccessPage;
