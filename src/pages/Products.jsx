import React, { useState, useMemo } from 'react';
import { Search, Star, ShoppingBag, Sparkles } from 'lucide-react';

// قائمة ضخمة ومنوعة من صور Unsplash الثابتة والمضمونة للحلويات
const reliableImages = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1582716401301-b2444cb73373?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1587241314719-37e9eb4148b0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1621236378690-e593d50849d5?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
];

const categoriesList = ['Cakes', 'Oriental', 'Chocolates', 'Pastries', 'Donuts'];
const adjectives = ['Delicious', 'Crispy', 'Sweet', 'Creamy', 'Royal', 'Golden', 'Fresh', 'Special', 'Luxury', 'Tasty'];
const baseNames = {
  Cakes: ['Chocolate Cake', 'Red Velvet', 'Cheesecake', 'Fruit Tart', 'Vanilla Sponge', 'Black Forest'],
  Oriental: ['Basbousa', 'Kunafa', 'Baklava', 'Goulash', 'Luqaimat', 'Atayef'],
  Chocolates: ['Dark Truffle', 'Milk Praline', 'White Choco Bar', 'Hazelnut Bomb', 'Caramel Fudge'],
  Pastries: ['Croissant', 'Danish', 'Eclair', 'Macaron Box', 'Cinnamon Roll'],
  Donuts: ['Glazed Donut', 'Chocolate Sprinkles', 'Filled Jelly Donut', 'Caramel Crunch']
};

// توليد 320 منتج استاتيكي ببيانات دقيقة وصور مضمونة 100%
const staticProducts = Array.from({ length: 320 }, (_, index) => {
  const category = categoriesList[index % categoriesList.length];
  const nameList = baseNames[category];
  const baseName = nameList[index % nameList.length];
  const adj = adjectives[index % adjectives.length];
  
  return {
    id: index + 1,
    name: `${adj} ${baseName} #${index + 1}`,
    category: category,
    price: Math.floor((index * 13) % 250) + 40,
    rating: (4.1 + ((index * 7) % 9) / 10).toFixed(1),
    image: reliableImages[index % reliableImages.length],
    description: `A masterfully crafted ${baseName.toLowerCase()} made with premium ingredients, rich flavors, and a touch of sweetness to brighten your day.`
  };
});

export default function Products({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['All', 'Cakes', 'Oriental', 'Chocolates', 'Pastries', 'Donuts'];

  const filteredProducts = useMemo(() => {
    return staticProducts
      .filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="bg-[#0B0F19] text-gray-100 min-h-screen px-4 sm:px-6 lg:px-8 py-16 space-y-16 selection:bg-rose-500 selection:text-white">
      
      {/* Background Glow Effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Header Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 px-5 py-2 rounded-full text-xs font-semibold text-rose-400 backdrop-blur-xl animate-pulse">
          <Sparkles className="w-4 h-4 text-rose-500" /> Exclusive Luxury Collection
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Our Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600">Sweets</span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg">
          Discover over 300 artisanal masterpieces baked fresh with passion and finest ingredients.
        </p>
      </div>

      {/* Search and Filters Bar (Dark Glassmorphism) */}
      <div className="max-w-7xl mx-auto bg-gray-900/60 border border-white/10 p-6 sm:p-8 rounded-[2.5px] backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row gap-5 items-center justify-between relative z-10 rounded-3xl">
        <div className="relative w-full md:w-[420px]">
          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search from 300+ exquisite items..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 rounded-2xl border border-white/10 focus:outline-none focus:border-rose-500 text-sm font-semibold text-white placeholder-gray-500 transition"
          />
        </div>

        <div className="flex w-full md:w-auto items-center justify-end">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-auto px-6 py-3.5 bg-gray-900/90 rounded-2xl border border-white/10 text-sm font-bold text-gray-300 focus:outline-none focus:border-rose-500 transition cursor-pointer shadow-lg"
          >
            <option value="default" className="bg-gray-900">Sort by: Featured</option>
            <option value="price-low" className="bg-gray-900">Price: Low to High</option>
            <option value="price-high" className="bg-gray-900">Price: High to Low</option>
            <option value="rating" className="bg-gray-900">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto flex overflow-x-auto pb-3 gap-3 scrollbar-none justify-start md:justify-center relative z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-7 py-3.5 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-300 shadow-md ${
              selectedCategory === cat 
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-900/40 scale-105' 
                : 'bg-gray-900/60 text-gray-400 hover:bg-white/10 border border-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid - Dark Luxury Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group bg-gray-900/80 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col transform hover:-translate-y-2.5 transition-all duration-500 backdrop-blur-xl"
          >
            {/* Image Container */}
            <div className="relative h-72 overflow-hidden bg-gray-800">
              <img 
                src={product.image} 
                alt={product.name} 
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
              
              {/* Category Badge */}
              <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-xs font-black px-4 py-2 rounded-full text-rose-300 border border-white/10 uppercase tracking-wider">
                {product.category}
              </span>

              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md flex items-center gap-1 text-amber-400 text-xs font-extrabold px-3.5 py-2 rounded-full border border-white/10">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 
                <span>{product.rating}</span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-7 flex flex-col flex-grow justify-between space-y-6">
              <div className="space-y-2">
                <h3 className="font-extrabold text-white text-xl tracking-tight group-hover:text-rose-400 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Price and Add Button */}
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

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-28 max-w-xl mx-auto bg-gray-900/60 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl space-y-4 relative z-10">
          <div className="w-20 h-20 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-inner border border-rose-500/20">
            🍰
          </div>
          <h3 className="text-2xl font-black text-white">No sweets found</h3>
          <p className="text-gray-400 text-base">No sweets matching your search. Try typing another keyword!</p>
        </div>
      )}

    </div>
  );
}