import React from 'react';
import { CakeSlice, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-rose-500 mb-4">
            <CakeSlice className="w-7 h-7" />
            <span>SweeSweets</span>
          </div>
          <p className="text-gray-400 text-sm">
            Your ultimate destination for freshly baked luxury sweets, custom cakes, and delightful treats made with passion.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/products" className="hover:text-white transition">Our Products</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">Contact Info</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-rose-500" /> 01025134834</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-rose-500" /> support@sweesweets.com</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-rose-500" /> Main Street, Sweet City</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">Working Hours</h3>
          <p className="text-sm text-gray-400 mb-2">Everyday: 9:00 AM - 11:00 PM</p>
          <p className="text-xs text-rose-400 font-medium">Order online and enjoy fast doorstep delivery or cash/online payments!</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
        Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for SweeSweets Bakery © 2026
      </div>
    </footer>
  );
}