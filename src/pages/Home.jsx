import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Clock, Star, ShoppingBag, ChevronLeft, ChevronRight, Flame, HeartHandshake, Award } from 'lucide-react';
import { products } from '../data/productsData';

const heroImages = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=900&q=80"
];

const testimonials = [
  { id: 1, name: "Youssef E.", comment: "An absolute masterpiece of a bakery website, and the taste is even better!", rating: 5 },
  { id: 2, name: "Nourhan A.", comment: "The dark luxury theme combined with the fresh cakes makes ordering such a treat.", rating: 5 },
  { id: 3, name: "Karim M.", comment: "Super fast delivery and top-notch quality pastries. Totally obsessed!", rating: 5 }
];

export default function Home({ addToCart }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef(null);

  // Auto Slider for Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Horizontal Slider scroll handler
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.75;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const featuredProducts = products.slice(0, 10);

  return (
    <div className="bg-[#0B0F19] text-gray-100 space-y-28 pb-28 selection:bg-rose-500 selection:text-white overflow-hidden">
      
      {/* 1. Hero Section: Ultra Modern Dark Theme with Larger Floating Slider */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 px-4">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-rose-600/15 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-rose-400 backdrop-blur-xl animate-pulse">
              <Flame className="w-4 h-4 text-rose-500" /> Artisanal Bakery & Confectionery
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1]">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600">Sweet Experience</span>
            </h1>

            <p className="text-gray-400 text-lg sm:text-xl font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Immerse yourself in a world of luxury desserts, handcrafted pastries, and rich chocolates designed to make every second memorable.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link 
                to="/products" 
                className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-rose-900/30 transition-all duration-300 flex items-center gap-3 hover:scale-105"
              >
                Explore Collection <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/about" 
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-4 rounded-2xl backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                Our Heritage
              </Link>
            </div>
          </div>

          {/* Hero Slider Card - (كبرنا مساحته وارتفاعه وعرضه هنا) */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-lg h-[540px] sm:h-[580px] rounded-[3rem] overflow-hidden border border-white/15 shadow-2xl bg-gray-900/60 backdrop-blur-2xl group">
              {heroImages.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt="Luxury Bakery Slider" 
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform group-hover:scale-105 ${
                    index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-10">
                <span className="text-xs font-bold uppercase tracking-widest bg-black/55 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 text-rose-300">
                  Featured Creation
                </span>
                <span className="text-sm font-black text-white bg-rose-600/85 px-4 py-2 rounded-full shadow-lg">
                  Fresh Daily
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/60 border border-white/5 p-8 rounded-3xl backdrop-blur-xl flex items-center gap-5 hover:border-rose-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-400">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Express Delivery</h3>
              <p className="text-gray-400 text-sm mt-0.5">Speedy doorstep delivery across town.</p>
            </div>
          </div>

          <div className="bg-gray-900/60 border border-white/5 p-8 rounded-3xl backdrop-blur-xl flex items-center gap-5 hover:border-rose-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Premium Ingredients</h3>
              <p className="text-gray-400 text-sm mt-0.5">100% natural and high-grade butter.</p>
            </div>
          </div>

          <div className="bg-gray-900/60 border border-white/5 p-8 rounded-3xl backdrop-blur-xl flex items-center gap-5 hover:border-rose-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-400">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Secure Payments</h3>
              <p className="text-gray-400 text-sm mt-0.5">Cash, Cards & Mobile wallets supported.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Horizontal Product Slider (Large Dark Glass Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Handpicked Selection</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">Featured Masterpieces</h2>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => scrollSlider('left')} 
              className="p-3 bg-gray-900 border border-white/10 hover:bg-rose-600 hover:text-white rounded-full transition shadow-lg text-gray-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollSlider('right')} 
              className="p-3 bg-gray-900 border border-white/10 hover:bg-rose-600 hover:text-white rounded-full transition shadow-lg text-gray-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link to="/products" className="hidden sm:flex text-rose-400 font-bold hover:underline items-center gap-1 ml-4 text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Slider Container */}
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto gap-8 pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[340px] sm:min-w-[380px] snap-start group bg-gray-900/80 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col transform hover:-translate-y-2.5 transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden bg-gray-800">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
                
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-xs font-black px-4 py-2 rounded-full text-rose-300 border border-white/10 uppercase tracking-wider">
                  {product.category}
                </span>

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md flex items-center gap-1 text-amber-400 text-xs font-extrabold px-3.5 py-2 rounded-full border border-white/10">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 
                  <span>{product.rating}</span>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-grow justify-between space-y-6">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-white text-xl tracking-tight group-hover:text-rose-400 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block font-bold uppercase tracking-wider">Price</span>
                    <span className="text-2xl font-black text-white">
                      {product.price} <span className="text-sm font-bold text-rose-400">EGP</span>
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white px-5 py-3 rounded-2xl text-xs font-black transition-all duration-300 border border-rose-500/30 shadow-lg flex items-center gap-2 active:scale-95 uppercase tracking-wider"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 rounded-[3rem] p-8 sm:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14 relative z-10">
            <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest">
              Excellence Defined
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">Why Connoisseurs Choose Us</h2>
            <p className="text-gray-400 text-sm sm:text-base">We blend traditional baking heritage with state-of-the-art culinary creativity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-white/5 border border-white/5 p-8 rounded-3xl backdrop-blur-md space-y-4">
              <div className="w-14 h-14 bg-rose-600/20 text-rose-400 rounded-2xl flex items-center justify-center font-bold">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Master Pastry Chefs</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Crafted by award-winning global bakers with years of fine dining expertise.</p>
            </div>

            <div className="bg-white/5 border border-white/5 p-8 rounded-3xl backdrop-blur-md space-y-4">
              <div className="w-14 h-14 bg-rose-600/20 text-rose-400 rounded-2xl flex items-center justify-center font-bold">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Handmade Daily</h3>
              <p className="text-gray-400 text-sm leading-relaxed">No preservatives or shortcuts. Pure ingredients prepared fresh every single morning.</p>
            </div>

            <div className="bg-white/5 border border-white/5 p-8 rounded-3xl backdrop-blur-md space-y-4">
              <div className="w-14 h-14 bg-rose-600/20 text-rose-400 rounded-2xl flex items-center justify-center font-bold">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Loved by Thousands</h3>
              <p className="text-gray-400 text-sm leading-relaxed">The premier choice for luxury weddings, birthdays, and everyday gourmet cravings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Customer Reviews</h2>
          <p className="text-gray-400 text-sm">Hear what our loyal dessert lovers have to say</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-gray-900/60 border border-white/5 p-8 rounded-3xl backdrop-blur-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 italic text-sm leading-relaxed">"{t.comment}"</p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-bold text-white text-sm">{t.name}</span>
                <span className="text-xs text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">Verified Client</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}