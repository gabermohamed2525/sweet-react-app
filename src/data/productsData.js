// مولد لـ 320 منتج حلويات احترافي - نسخة نظيفة ومضمونة
const categories = ['Cakes', 'Oriental', 'Chocolates', 'Pastries', 'Donuts'];
const adjectives = ['Delicious', 'Crispy', 'Sweet', 'Creamy', 'Royal', 'Golden', 'Fresh', 'Special', 'Luxury', 'Tasty'];

const baseNames = {
  Cakes: ['Chocolate Cake', 'Red Velvet', 'Cheesecake', 'Fruit Tart', 'Vanilla Sponge', 'Black Forest'],
  Oriental: ['Basbousa', 'Kunafa', 'Baklava', 'Goulash', 'Luqaimat', 'Atayef'],
  Chocolates: ['Dark Truffle', 'Milk Praline', 'White Choco Bar', 'Hazelnut Bomb', 'Caramel Fudge'],
  Pastries: ['Croissant', 'Danish', 'Eclair', 'Macaron Box', 'Cinnamon Roll'],
  Donuts: ['Glazed Donut', 'Chocolate Sprinkles', 'Filled Jelly Donut', 'Caramel Crunch']
};

// صور دقيقة ومضمونة لكل قسم لضمان ظهور 100% بدون أي أخطاء
const categoryImages = {
  Cakes: [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80"
  ],
  Oriental: [
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1582716401301-b2444cb73373?auto=format&fit=crop&w=600&q=80"
  ],
  Chocolates: [
    "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80"
  ],
  Pastries: [
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
  ],
  Donuts: [
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1621236378690-e593d50849d5?auto=format&fit=crop&w=600&q=80"
  ]
};

// تصدير واحد فقط للمتغير 'products'
export const products = Array.from({ length: 320 }, (_, index) => {
  const category = categories[index % categories.length];
  const nameList = baseNames[category];
  const baseName = nameList[index % nameList.length];
  const adj = adjectives[index % adjectives.length];
  
  const imagesList = categoryImages[category];
  const selectedImage = imagesList[index % imagesList.length];

  return {
    id: index + 1,
    name: `${adj} ${baseName} #${index + 1}`,
    category: category,
    price: Math.floor(((index * 13) % 250) + 30),
    rating: (4.1 + ((index * 7) % 9) / 10).toFixed(1),
    image: selectedImage,
    description: `A masterfully crafted ${baseName.toLowerCase()} made with premium ingredients, rich flavors, and a touch of sweetness to brighten your day.`
  };
});