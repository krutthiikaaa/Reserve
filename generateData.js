import fs from 'fs';

const categories = [
  { id: 1, name: 'Italian' },
  { id: 2, name: 'Chinese' },
  { id: 3, name: 'Indian' },
  { id: 4, name: 'BBQ' },
  { id: 5, name: 'Desserts' },
  { id: 6, name: 'Healthy' },
  { id: 7, name: 'Seafood' },
];

const categoryRestaurants = {
  'Italian': ['La Bella Vita', 'Roma Express', 'Luigis Trattoria', 'Pasta Paradiso'],
  'Chinese': ['Dragon Palace', 'Wok Magic', 'Golden Dragon', 'Lotus Garden'],
  'Indian': ['Spice Route', 'Curry House', 'Taj Mahal', 'Bombay Grill'],
  'BBQ': ['Smokey Ribs', 'Firehouse BBQ', 'Grill Master', 'Texas Smoke'],
  'Desserts': ['Sweet Tooth Cafe', 'Sugar Rush', 'The Bakery', 'Choco Loco'],
  'Healthy': ['Green Bowl', 'Fresh Fix', 'Salad Station', 'Nourish'],
  'Seafood': ['Ocean Grill', 'Pearl of the Sea', 'Catch of the Day', 'Blue Water Seafood']
};

const restaurantImages = {
  'Italian': ['1555396273-367ea4eb4db5', '1574071318508-1cdbab80d002', '1537047902294-62a40c20a6ae', '1604068549290-dea0e4a30536'],
  'Chinese': ['1563245372-f21724e3856d', '1552611052-33e04de081de', '1540189549336-e6e99c3679fe', '1585032226651-759b368d7246'],
  'Indian': ['1585937421612-70a008356fbe', '1517244683847-7456b63c5969', '1603894584373-5ac82b6ae398', '1565557623262-b51c2513a641'],
  'BBQ': ['1529193591184-b1d58069ecdd', '1555939594-58d7cb561ad1', '1594041680534-e8c8cdebd659', '1558030006-450675393462'],
  'Desserts': ['1551024601-bec78aea704b', '1587314168485-3236d6710814', '1550617931-e17a7b70dce2', '1488477181946-6428a0291777'],
  'Healthy': ['1512621776951-a57141f2eefd', '1490645935967-10de6ba8232e', '1546069901-ba9599a7e63c', '1498837167922-41c53bbf0e26'],
  'Seafood': ['1615719413546-198b25453f85', '1579684947550-22e945225d9a', '1565680018434-b513d5e5fd47', '1534080564583-6be75777b70a']
};

const menuDictionary = {
  'Italian': {
    'Appetizers': [
      { name: 'Bruschetta al Pomodoro', img: '1572695157366-5e485cdea99e' },
      { name: 'Caprese Salad', img: '1592417817098-8fd3d9eb14a5' },
      { name: 'Garlic Bread', img: '1573140247632-f8fd74997d5c' }
    ],
    'Main Course': [
      { name: 'Margherita Pizza', img: '1604068549290-dea0e4a30536' },
      { name: 'Spaghetti Carbonara', img: '1612874686371-8c49bd07f7c6' },
      { name: 'Lasagna al Forno', img: '1619881589316-56c7f9e6b587' },
      { name: 'Mushroom Risotto', img: '1626645738196-c2a7c87a8f58' }
    ],
    'Desserts': [
      { name: 'Tiramisu', img: '1571877227200-a0d98ea607e9' },
      { name: 'Panna Cotta', img: '1488477181946-6428a0291777' }
    ]
  },
  'Chinese': {
    'Appetizers': [
      { name: 'Spring Rolls', img: '1540189549336-e6e99c3679fe' },
      { name: 'Pork Dumplings', img: '1496116218417-184c13e64f89' },
      { name: 'Hot and Sour Soup', img: '1547597341-2670e1a8eb0d' }
    ],
    'Main Course': [
      { name: 'Peking Duck', img: '1585032226651-759b368d7246' },
      { name: 'Kung Pao Chicken', img: '1552611052-33e04de081de' },
      { name: 'Beef and Broccoli', img: '1563245372-f21724e3856d' },
      { name: 'Sweet and Sour Pork', img: '1525755673011-31464730623a' }
    ],
    'Rice/Breads': [
      { name: 'Fried Rice', img: '1603133872878-684f208fb84b' },
      { name: 'Steamed Bao', img: '1564834724105-918b73d1b9e0' }
    ]
  },
  'Indian': {
    'Appetizers': [
      { name: 'Samosa Chaat', img: '1601050690597-df0568f70950' },
      { name: 'Onion Bhaji', img: '1565557623262-b51c2513a641' },
      { name: 'Paneer Tikka', img: '1585937421612-70a008356fbe' }
    ],
    'Main Course': [
      { name: 'Butter Chicken', img: '1603894584373-5ac82b6ae398' },
      { name: 'Lamb Rogan Josh', img: '1517244683847-7456b63c5969' },
      { name: 'Palak Paneer', img: '1606851094655-b25cb2a5c624' },
      { name: 'Chicken Tikka Masala', img: '1565557623262-b51c2513a641' }
    ],
    'Rice/Breads': [
      { name: 'Garlic Naan', img: '1585937421612-70a008356fbe' },
      { name: 'Biryani', img: '1563379091339-03b2184f4f0c' }
    ]
  },
  'BBQ': {
    'Appetizers': [
      { name: 'BBQ Wings', img: '1569058251502-36c56ec236f1' },
      { name: 'Loaded Fries', img: '1518013431119-2fdd15f17112' },
      { name: 'Onion Rings', img: '1625938144755-652e08e359b7' }
    ],
    'Main Course': [
      { name: 'Smoked Brisket', img: '1555939594-58d7cb561ad1' },
      { name: 'Pork Ribs', img: '1529193591184-b1d58069ecdd' },
      { name: 'Pulled Pork Sandwich', img: '1594041680534-e8c8cdebd659' },
      { name: 'Grilled Steak', img: '1544025162805-0604b3252f4c' }
    ],
    'Sides': [
      { name: 'Mac and Cheese', img: '1583610996885-3b95a8ffc4db' },
      { name: 'Coleslaw', img: '1615486801874-9549da78f9f6' }
    ]
  },
  'Desserts': {
    'Desserts': [
      { name: 'Chocolate Fudge Cake', img: '1578985545062-69928b1d9587' },
      { name: 'Cheesecake', img: '1550617931-e17a7b70dce2' },
      { name: 'Fruit Tart', img: '1551024601-bec78aea704b' },
      { name: 'Macarons', img: '1569864358642-9d1692617711' },
      { name: 'Ice Cream Sundae', img: '1558332152-f47dc6c0062f' },
      { name: 'Red Velvet Cupcake', img: '1614707693957-3f3c4dbb6b6c' },
      { name: 'Brownie', img: '1606313564200-e75d5e30476c' },
      { name: 'Croissant', img: '1587314168485-3236d6710814' }
    ]
  },
  'Healthy': {
    'Appetizers': [
      { name: 'Avocado Toast', img: '1541519227354-08fa141151bb' },
      { name: 'Hummus & Veggies', img: '1576082987455-ceb83ba5f3a0' }
    ],
    'Main Course': [
      { name: 'Quinoa Salad Bowl', img: '1512621776951-a57141f2eefd' },
      { name: 'Grilled Salmon', img: '1467003909585-2f8a72700288' },
      { name: 'Buddha Bowl', img: '1490645935967-10de6ba8232e' },
      { name: 'Chicken Wrap', img: '1546069901-ba9599a7e63c' }
    ],
    'Drinks': [
      { name: 'Green Smoothie', img: '1628557044797-df401692b01e' },
      { name: 'Acai Bowl', img: '1498837167922-41c53bbf0e26' }
    ]
  },
  'Seafood': {
    'Appetizers': [
      { name: 'Calamari Rings', img: '1626200419365-ea9e78297b79' },
      { name: 'Oysters', img: '1596738139556-9ff53b0e35f5' },
      { name: 'Shrimp Cocktail', img: '1565680018434-b513d5e5fd47' }
    ],
    'Main Course': [
      { name: 'Grilled Lobster', img: '1615719413546-198b25453f85' },
      { name: 'Seafood Paella', img: '1534080564583-6be75777b70a' },
      { name: 'Fish and Chips', img: '1579684947550-22e945225d9a' },
      { name: 'Garlic Butter Prawns', img: '1559742811-822873691df8' }
    ]
  }
};

const commonDrinks = [
  { name: 'Mojito', img: '1556679343-c7306c1976bc' },
  { name: 'Iced Latte', img: '1514362545857-3bc16c4c7d1b' },
  { name: 'Lemonade', img: '1513558161293-cdaf765ed2fd' },
  { name: 'Red Wine', img: '1510812431401-41d2c2e151d3' }
];

const galleryPool = [
  '1414235077428-338989a2e8c0',
  '1550966871-3ed3cdb5ed0c',
  '1517248135467-4c7edcad34c4',
  '1559339352-11d035aa65de',
  '1525610553991-2bede1a236e2',
  '1554118811-1e0d58224f24',
  '1560624052-449f5ddf0c31',
  '1544148103-0773bf10d330',
  '1551632436-eba489f66cc9',
  '1564758564-26615b88267f'
];

const reviewers = ['Alice M.', 'John D.', 'Sarah K.', 'Mike T.', 'Emily R.', 'Chris W.', 'Jessica B.', 'David L.', 'Michael B.', 'Emma S.'];
const reviewTexts = [
  'Absolutely amazing experience! The food was divine.',
  'Great ambiance and friendly staff. Highly recommend.',
  'Good food, but the wait time was a bit long.',
  'Best meal I have had in a while. Definitely coming back.',
  'The flavors were incredibly authentic and rich.',
  'A wonderful hidden gem with a beautiful atmosphere.',
  'Portions were generous and everything tasted fresh.',
  'The signature dishes are a must-try. 5 stars!',
  'I loved the aesthetic of the place. Perfect for date night.'
];

let restaurants = [];
let dishes = [];
let rCounter = 1;
let dCounter = 1;

function getUnsplashUrl(id) {
  return 'https://images.unsplash.com/photo-' + id + '?q=80&w=800&auto=format&fit=crop';
}

Object.entries(categoryRestaurants).forEach(([cuisine, names]) => {
  names.forEach((name, i) => {
    const restaurantId = 'r' + (rCounter++);
    
    // Generate reviews
    const numReviews = Math.floor(Math.random() * 4) + 3; // 3 to 6 reviews
    const reviews = Array.from({ length: numReviews }).map((_, idx) => ({
      id: 'rev_' + restaurantId + '_' + idx,
      user: reviewers[Math.floor(Math.random() * reviewers.length)],
      rating: (Math.random() * 1 + 4).toFixed(1), // 4.0 to 5.0
      text: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
    }));

    // Generate gallery using shuffled pool
    const shuffledGallery = [...galleryPool].sort(() => 0.5 - Math.random());
    const gallery = shuffledGallery.slice(0, 6).map(img => getUnsplashUrl(img));

    restaurants.push({
      id: restaurantId,
      name,
      cuisine,
      rating: parseFloat((Math.random() * 0.8 + 4.1).toFixed(1)),
      distance: (Math.random() * 5 + 0.5).toFixed(1) + ' km',
      eta: Math.floor(Math.random() * 30 + 15) + ' min',
      isOpen: Math.random() > 0.1,
      image: getUnsplashUrl(restaurantImages[cuisine][i % restaurantImages[cuisine].length]),
      description: 'Experience the best ' + cuisine + ' cuisine at ' + name + '. Bringing authentic flavors and a beautiful atmosphere right to your table. Join us for a memorable dining experience.',
      address: (Math.floor(Math.random() * 900) + 10) + ' ' + cuisine + ' Street, Foodville',
      reviews,
      gallery
    });

    // Generate 10 specific dishes
    let assignedDishes = 0;
    const cuisineMenu = menuDictionary[cuisine] || menuDictionary['Italian']; // Fallback
    
    // Distribute from specific cuisine categories
    for (const [dishCat, items] of Object.entries(cuisineMenu)) {
      items.forEach(item => {
        if(assignedDishes < 8) { // Reserve 2 spots for drinks if not Desserts
          dishes.push({
            id: 'd' + (dCounter++),
            name: item.name,
            restaurant: name,
            restaurantId,
            price: parseFloat((Math.random() * 20 + 8).toFixed(2)),
            rating: parseFloat((Math.random() * 0.8 + 4.1).toFixed(1)),
            image: getUnsplashUrl(item.img),
            badges: Math.random() > 0.7 ? ['Best Seller'] : (Math.random() > 0.8 ? ['Signature'] : []),
            category: dishCat,
            description: 'A delicious serving of our famous ' + item.name + ' prepared fresh daily.'
          });
          assignedDishes++;
        }
      });
    }

    // Fill the rest up to 10 with drinks or random items
    while(assignedDishes < 10) {
      const drink = commonDrinks[Math.floor(Math.random() * commonDrinks.length)];
      dishes.push({
        id: 'd' + (dCounter++),
        name: drink.name,
        restaurant: name,
        restaurantId,
        price: parseFloat((Math.random() * 5 + 3).toFixed(2)),
        rating: 4.5,
        image: getUnsplashUrl(drink.img),
        badges: [],
        category: 'Drinks',
        description: 'Refreshing ' + drink.name + ' to complement your meal.'
      });
      assignedDishes++;
    }
  });
});

const offers = [
  { id: 1, title: 'Free Dessert', description: 'On orders above $50', color: '#C97B63' },
  { id: 2, title: '20% OFF', description: 'On table reservations', color: '#F4A261' },
  { id: 3, title: 'Free Delivery', description: 'For first time users', color: '#B0A99F' },
];

const fileContent = 'export const categories = ' + JSON.stringify(categories, null, 2) + ';\n' +
'export const restaurants = ' + JSON.stringify(restaurants, null, 2) + ';\n' +
'export const dishes = ' + JSON.stringify(dishes, null, 2) + ';\n' +
'export const offers = ' + JSON.stringify(offers, null, 2) + ';\n';

fs.writeFileSync('./src/data/mockData.js', fileContent);
console.log('Successfully generated specific, beautifully mapped mockData.js!');
