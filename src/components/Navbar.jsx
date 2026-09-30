import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, CakeSlice, User, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase'; // تأكد من مسار الـ supabase الصحيح عندك

export default function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // متابعة حالة تسجيل الدخول للمستخدم لحظياً
  useEffect(() => {
    // جلب المستخدم الحالي أول ما الصفحة تفتح
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    fetchUser();

    // الاستماع لأي تغير في تسجيل الدخول أو الخروج
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // دالة تسجيل الخروج
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  // استخراج اسم المستخدم من إيميله (مثلا: ahmed@gmail.com هتبقى ahmed)
  const username = user?.email ? user.email.split('@')[0] : 'Account';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-sweetPrimary">
              <CakeSlice className="w-8 h-8" />
              <span>SweeSweets</span>
            </Link>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse font-medium">
            <Link to="/" className="hover:text-sweetPrimary transition">Home</Link>
            <Link to="/about" className="hover:text-sweetPrimary transition">About Us</Link>
            <Link to="/products" className="hover:text-sweetPrimary transition">Products</Link>
            <Link to="/contact" className="hover:text-sweetPrimary transition">Contact Us</Link>
          </div>

          {/* Right Action Icons (Cart & Account / User) */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Cart Button */}
            <Link to="/checkout" className="relative p-2 text-gray-700 hover:text-sweetPrimary transition flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-xl font-semibold">
              <ShoppingBag className="w-5 h-5 text-sweetPrimary flex justify-center items-center" />
              <span>Cart</span>
              <span className="bg-sweetPrimary text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </Link>

            {/* User Account Section */}
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-800 px-3 py-1.5 rounded-xl text-sm font-semibold">
                  <User className="w-4 h-4 text-sweetPrimary" />
                  <span className="max-w-[120px] truncate capitalize">{username}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  title="Logout"
                  className="p-2 text-gray-500 hover:text-sweetPrimary hover:bg-rose-50 rounded-xl transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center gap-1 bg-rose-50 text-sweetPrimary px-4 py-2 rounded-lg font-semibold hover:bg-rose-100 transition">
                <User className="w-4 h-4" /> Account
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-700">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 pt-2 pb-4 space-y-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 font-medium">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 font-medium">About Us</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="block py-2 font-medium">Products</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 font-medium">Contact Us</Link>
          
          {user ? (
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-sweetPrimary">Hi, {username}</span>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-sm text-red-600 font-semibold">Logout</button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 font-medium text-sweetPrimary">Login / Register</Link>
          )}
        </div>
      )}
    </nav>
  );
}