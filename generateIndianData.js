import fs from 'fs';
import https from 'https';

const fetchJson = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try { resolve(JSON.parse(data)); }
            catch(e) { resolve({ meals: [], drinks: [] }); }
          });
        }).on('error', reject);
      });
    } catch (err) {
      if (i === retries - 1) return { meals: [], drinks: [] };
      await new Promise(r => setTimeout(r, 1000));
    }
  }
};

async function generate() {
  console.log("Fetching real data from MealDB & CocktailDB...");
  const [
    italianRes, chineseRes, indianRes,
    seafoodRes, dessertRes, vegRes,
    beefRes, drinksRes
  ] = await Promise.all([
    fetchJson('https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian'),
    fetchJson('https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese'),
    fetchJson('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian'),
    fetchJson('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'),
    fetchJson('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'),
    fetchJson('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian'),
    fetchJson('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef'),
    fetchJson('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
  ]);

  const pools = {
    'Italian': (italianRes?.meals || []).map(m => ({ name: m.strMeal, img: m.strMealThumb, cat: 'Main Course' })),
    'Chinese': (chineseRes?.meals || []).map(m => ({ name: m.strMeal, img: m.strMealThumb, cat: 'Main Course' })),
    'Indian': (indianRes?.meals || []).map(m => ({ name: m.strMeal, img: m.strMealThumb, cat: 'Main Course' })),
    'Seafood': (seafoodRes?.meals || []).map(m => ({ name: m.strMeal, img: m.strMealThumb, cat: 'Main Course' })),
    'Desserts': (dessertRes?.meals || []).map(m => ({ name: m.strMeal, img: m.strMealThumb, cat: 'Desserts' })),
    'Healthy': (vegRes?.meals || []).map(m => ({ name: m.strMeal, img: m.strMealThumb, cat: 'Main Course' })),
    'BBQ': (beefRes?.meals || []).map(m => ({ name: m.strMeal, img: m.strMealThumb, cat: 'Main Course' })),
    'South Indian': (indianRes?.meals || []).map(m => ({ name: m.strMeal, img: m.strMealThumb, cat: 'Main Course' })),
    'North Indian': (indianRes?.meals || []).map(m => ({ name: m.strMeal, img: m.strMealThumb, cat: 'Main Course' })),
    'Drinks': (drinksRes?.drinks || []).map(m => ({ name: m.strDrink, img: m.strDrinkThumb, cat: 'Drinks' }))
  };

  const categoriesList = [
    'Italian', 'Chinese', 'Indian', 'BBQ', 'Desserts', 
    'Healthy', 'Seafood', 'South Indian', 'North Indian'
  ];

  const categories = categoriesList.map((name, idx) => ({ id: idx + 1, name }));

  const locations = ['Hyderabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Vizag'];
  
  const manualRestaurants = [];
  
  // Specific real names we want to intersperse
  const realNames = {
    'Hyderabad': { 'Indian': ['Paradise Biryani', 'Shah Ghouse'], 'Desserts': ['Pista House', 'Karachi Bakery'] },
    'Mumbai': { 'Seafood': ['Bastian', 'Gajalee'], 'Italian': ['Pizza By The Bay', 'Mia Cucina'] },
    'Delhi': { 'North Indian': ['Karim’s', 'Bukhara'], 'BBQ': ['Barbeque Nation', 'Pirates of Grill'] },
    'Bangalore': { 'Chinese': ['Mainland China', 'Yauatcha'], 'Healthy': ['Truffles', 'Sante Spa Cuisine'] },
    'Chennai': { 'South Indian': ['A2B', 'Saravana Bhavan'] },
    'Kolkata': { 'Indian': ['Peter Cat', 'Oh! Calcutta'] },
    'Pune': { 'South Indian': ['Vaishali', 'Wadeshwar'] },
    'Vizag': { 'Italian': ['Flying Spaghetti Monster', 'Upland Bistro'] }
  };

  const prefixes = ['The Great', 'Authentic', 'Royal', 'Spicy', 'Urban', 'Classic', 'Grand', 'Modern'];
  const suffixes = ['Bistro', 'Kitchen', 'Diner', 'House', 'Lounge', 'Cafe', 'Place', 'Hub'];

  locations.forEach(loc => {
    categoriesList.forEach(cat => {
      // Check if we have real names for this combo
      let namesForCombo = realNames[loc]?.[cat] || [];
      
      // We need exactly 2
      let namesToUse = [...namesForCombo];
      while (namesToUse.length < 2) {
        const pre = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
        namesToUse.push(`${pre} ${cat} ${suf}`);
      }
      
      // Use exactly 2
      namesToUse.slice(0, 2).forEach(name => {
        manualRestaurants.push({
          name: name,
          location: loc,
          cuisine: cat
        });
      });
    });
  });

  const offers = [
    { id: 1, title: 'Free Dessert', description: 'On orders above ₹500', color: '#C97B63', type: 'dessert' },
    { id: 2, title: '20% OFF', description: 'On table reservations', color: '#F4A261', type: 'discount' },
    { id: 3, title: 'Free Delivery', description: 'For first-time users', color: '#B0A99F', type: 'delivery' },
    { id: 4, title: 'Book Nearby Slots', description: 'Search nearby restaurants & reserve', color: '#8b5a4a', type: 'slots' },
  ];

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  let restaurants = [];
  let dishes = [];
  let dCounter = 1;

  manualRestaurants.forEach((r, i) => {
    const restaurantId = 'r' + (i + 1);
    
    // Pick dishes for this restaurant based on cuisine
    let menuPool = shuffle([...(pools[r.cuisine] || pools['Healthy'])]);
    let assigned = [];
    assigned.push(...menuPool.slice(0, 5));
    
    let dPool = shuffle([...pools['Desserts']]);
    assigned.push(...dPool.slice(0, 2));

    let drPool = shuffle([...pools['Drinks']]);
    assigned.push(...drPool.slice(0, 3));

    const coverImage = assigned[0]?.img || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop';
    const gallery = assigned.slice(1, 7).map(item => item.img);

    restaurants.push({
      id: restaurantId,
      name: r.name,
      location: r.location,
      cuisine: r.cuisine,
      rating: parseFloat((Math.random() * 0.8 + 4.1).toFixed(1)),
      distance: (Math.random() * 5 + 0.5).toFixed(1) + ' km',
      eta: Math.floor(Math.random() * 30 + 15) + ' min',
      isOpen: Math.random() > 0.1,
      image: coverImage,
      description: 'Experience the best ' + r.cuisine + ' cuisine at ' + r.name + ' in ' + r.location + '.',
      address: '123 Main Street, ' + r.location,
      availableSlots: ['12:00 PM', '1:00 PM', '7:00 PM', '8:30 PM'],
      hasFreeDelivery: Math.random() > 0.3,
      hasReservationDiscount: Math.random() > 0.4,
      hasFreeDessert: Math.random() > 0.4,
      reviews: [
        {
          id: 'rev_' + restaurantId + '_0',
          user: 'Aarav M.',
          rating: '4.8',
          text: 'Absolutely amazing experience!',
          date: '2026-04-10'
        }
      ],
      gallery
    });

    assigned.forEach(item => {
      dishes.push({
        id: 'd' + (dCounter++),
        name: item.name,
        restaurant: r.name,
        restaurantId,
        price: parseFloat((Math.random() * 200 + 150).toFixed(0)), // ₹ price
        rating: parseFloat((Math.random() * 0.8 + 4.1).toFixed(1)),
        image: item.img,
        badges: Math.random() > 0.7 ? ['Best Seller'] : [],
        category: item.cat,
        description: 'Our signature ' + item.name + ' prepared fresh.'
      });
    });
  });

  const fileContent = 'export const categories = ' + JSON.stringify(categories, null, 2) + ';\n' +
  'export const restaurants = ' + JSON.stringify(restaurants, null, 2) + ';\n' +
  'export const dishes = ' + JSON.stringify(dishes, null, 2) + ';\n' +
  'export const offers = ' + JSON.stringify(offers, null, 2) + ';\n';

  fs.writeFileSync('./src/data/mockData.js', fileContent);
  console.log('Successfully generated Indian mockData.js with 144 restaurants!');
}

generate();
