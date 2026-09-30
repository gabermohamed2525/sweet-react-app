import React, { useState } from 'react';
import { supabase } from "../lib/supabase";
import { ShoppingBag, Trash2, CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react';

export default function Checkout({ cart, setCart }) {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [vodafoneNumber, setVodafoneNumber] = useState('');
  const [fawryCode, setFawryCode] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Your cart is empty!');

    try {
      // 1. تخزين الطلب في جدول orders داخل Supabase
      const { error } = await supabase.from('orders').insert([
        {
          customer_name: customerInfo.name,
          phone: customerInfo.phone,
          address: customerInfo.address,
          total_price: totalAmount,
          payment_method: paymentMethod,
          items: cart,
          created_at: new Date()
        }
      ]);

      if (error) console.log('Supabase insert note (table might need creation):', error.message);

      // 2. معالجة الدفع بالكاش وإرسال الفاتورة عبر واتساب على الرقم المطلوب 01025134834
      if (paymentMethod === 'cash') {
        const itemsList = cart.map(i => `- ${i.name} (x${i.quantity || 1}) : ${i.price * (i.quantity || 1)} EGP`).join('%0A');
        const message = `*New Order - SweeSweets*%0A%0A*Name:* ${customerInfo.name}%0A*Phone:* ${customerInfo.phone}%0A*Address:* ${customerInfo.address}%0A%0A*Items:*%0A${itemsList}%0A%0A*Total:* ${totalAmount} EGP%0A*Payment:* Cash on Delivery`;
        
        window.open(`https://wa.me/201025134834?text=${message}`, '_blank');
      } else if (paymentMethod === 'fawry') {
        setFawryCode(Math.floor(10000000 + Math.random() * 90000000));
      }

      setOrderPlaced(true);
      setCart([]);
    } catch (err) {
      alert('Error placing order: ' + err.message);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="bg-green-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center text-green-500">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Order Placed Successfully!</h1>
        <p className="text-gray-600">Thank you for ordering from SweeSweets. Your order has been saved and processed successfully.</p>
        {paymentMethod === 'fawry' && fawryCode && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900 font-bold">
            Fawry Pay Reference Code: {fawryCode} (Pay within 24 hours)
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout & Payment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Cart & Customer Form */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sweetPrimary" /> Order Summary ({cart.length} items)
            </h2>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                        <span className="text-xs text-sweetPrimary font-semibold">{item.price} EGP</span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-sweetPrimary">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-4 border-t border-gray-100 flex justify-between text-lg font-extrabold">
              <span>Total Amount:</span>
              <span className="text-sweetPrimary">{totalAmount} EGP</span>
            </div>
          </div>

          <form id="checkout-form" onSubmit={handleCheckout} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Delivery Information</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                placeholder="Ahmed Mohamed" 
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-sweetPrimary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone Number</label>
              <input 
                type="tel" 
                required 
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                placeholder="010xxxxxxxx" 
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-sweetPrimary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Delivery Address</label>
              <textarea 
                rows="2" 
                required 
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                placeholder="Street name, building, apartment..." 
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-sweetPrimary"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Payment Methods Selection */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Select Payment Method</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${paymentMethod === 'cash' ? 'border-sweetPrimary bg-rose-50/50 text-sweetPrimary font-bold' : 'border-gray-200 text-gray-600'}`}
              >
                <Banknote className="w-6 h-6" /> Cash on Delivery (WhatsApp)
              </button>
              <button 
                type="button" 
                onClick={() => setPaymentMethod('vodafone')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${paymentMethod === 'vodafone' ? 'border-sweetPrimary bg-rose-50/50 text-sweetPrimary font-bold' : 'border-gray-200 text-gray-600'}`}
              >
                <Smartphone className="w-6 h-6" /> Vodafone Cash
              </button>
              <button 
                type="button" 
                onClick={() => setPaymentMethod('fawry')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${paymentMethod === 'fawry' ? 'border-sweetPrimary bg-rose-50/50 text-sweetPrimary font-bold' : 'border-gray-200 text-gray-600'}`}
              >
                <span className="font-extrabold text-lg">Fawry</span> Fawry Pay
              </button>
              <button 
                type="button" 
                onClick={() => setPaymentMethod('visa')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${paymentMethod === 'visa' ? 'border-sweetPrimary bg-rose-50/50 text-sweetPrimary font-bold' : 'border-gray-200 text-gray-600'}`}
              >
                <CreditCard className="w-6 h-6" /> Credit Card (Visa)
              </button>
            </div>

            {/* Conditional Payment Inputs */}
            {paymentMethod === 'vodafone' && (
              <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                <p className="text-xs text-gray-600">Transfer total amount to Vodafone Cash number: <strong className="text-sweetPrimary">01025134834</strong></p>
                <input 
                  type="tel" 
                  placeholder="Enter your sender phone number"
                  value={vodafoneNumber}
                  onChange={(e) => setVodafoneNumber(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm"
                />
              </div>
            )}

            {paymentMethod === 'fawry' && (
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-xs text-gray-600">You will receive a Fawry reference code to complete payment at any nearby Fawry store or app.</p>
              </div>
            )}

            {paymentMethod === 'visa' && (
              <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                <input 
                  type="text" 
                  placeholder="Card Number (4111 2222 ...)"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm"
                  />
                  <input 
                    type="password" 
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="p-4 bg-rose-50/50 rounded-2xl text-xs text-sweetPrimary font-medium">
                Note: Choosing Cash on Delivery will automatically open WhatsApp with the formatted invoice ready to send to <strong className="underline">01025134834</strong>.
              </div>
            )}

            <button 
              type="submit"
              form="checkout-form"
              className="w-full bg-sweetPrimary bg-rose-700 text-white font-bold py-4 rounded-xl shadow-lg transition"
            >
              Confirm & Complete Order ({totalAmount} EGP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}