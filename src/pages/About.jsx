import React from 'react';
import { CakeSlice, Award, Users, HeartHandshake } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-sweetPrimary font-semibold uppercase tracking-wider text-sm">About SweeSweets</span>
        <h1 className="text-4xl font-extrabold text-gray-900">Crafting Happiness One Treat at a Time</h1>
        <p className="text-gray-600 text-lg">
          Welcome to SweeSweets, where passion meets confectionery art. Founded with a single dream: to bring authentic sweetness, luxury ingredients, and unforgettable flavors to every celebration.
        </p>
      </div>

      {/* Story & Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Sweet Journey & Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            Since our establishment, SweeSweets has grown from a small family bakery into a premier destination offering over 300 unique varieties of cakes, oriental sweets, pastries, and artisan chocolates. 
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe that every dessert tells a story. That is why our master pastry chefs carefully select premium Belgian chocolates, farm-fresh butter, and high-grade organic flour to ensure perfection in every single bite.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-3xl font-extrabold text-sweetPrimary">300+</h3>
              <p className="text-sm text-gray-500 mt-1">Unique Sweet Products</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-3xl font-extrabold text-sweetPrimary">15K+</h3>
              <p className="text-sm text-gray-500 mt-1">Happy Customers</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80" 
            alt="Bakery Kitchen" 
            className="rounded-3xl shadow-xl object-cover w-full h-[450px]"
          />
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Why SweeSweets Stands Out</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="bg-rose-50 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-sweetPrimary">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg">Uncompromised Quality</h3>
            <p className="text-sm text-gray-500">We never compromise on ingredient standards, maintaining rigorous hygiene and freshness.</p>
          </div>
          <div className="text-center space-y-3">
            <div className="bg-rose-50 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-sweetPrimary">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg">Expert Pastry Chefs</h3>
            <p className="text-sm text-gray-500">Our kitchen is led by award-winning artisans specialized in modern and traditional desserts.</p>
          </div>
          <div className="text-center space-y-3">
            <div className="bg-rose-50 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-sweetPrimary">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg">Customer Delight</h3>
            <p className="text-sm text-gray-500">Your satisfaction is our ultimate goal, with responsive customer support and custom orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
}