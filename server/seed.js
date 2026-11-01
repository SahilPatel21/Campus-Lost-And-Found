const mongoose = require('mongoose');
require('dotenv').config();
const Item = require('./models/Item');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campusLostFound';

// Sample realistic college campus items
const sampleItems = [
  {
    title: 'Black Leather Wallet',
    description: 'Lost a black WildHorn leather wallet containing Student ID card (Roll No. CS-2022-45), hostel pass, and some cash near the library entrance.',
    category: 'Bags & Wallets',
    type: 'Lost',
    location: 'Central Library, Ground Floor Entrance',
    date: new Date('2024-10-18'),
    contact: 'Sahil Sharma - 9876543210 (sahil.cs@college.edu)',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=60',
    status: 'Open',
  },
  {
    title: 'Casio fx-991EX ClassWiz Calculator',
    description: 'Found a black Casio scientific calculator on the front desk of Physics Lecture Hall 2 after the second period.',
    category: 'Electronics',
    type: 'Found',
    location: 'Physics Lecture Hall 2, Science Block',
    date: new Date('2024-10-19'),
    contact: 'Prof. Ramesh / Physics Lab Room 102',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=60',
    status: 'Open',
  },
  {
    title: 'Blue Milton Stainless Steel Water Bottle',
    description: 'Left my insulated blue water bottle with silver cap in the Badminton court near the sports complex.',
    category: 'Other',
    type: 'Lost',
    location: 'Sports Complex Badminton Court',
    date: new Date('2024-10-20'),
    contact: 'Ananya Verma - Room 204 Girls Hostel (ananya@college.edu)',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=60',
    status: 'Open',
  },
  {
    title: 'College ID Card - Mechanical Dept',
    description: 'Found a College Identity Card belonging to Rahul Mehta (Branch: Mechanical Engg, Year: 3rd). Handed over to college security desk.',
    category: 'ID Cards & Documents',
    type: 'Found',
    location: 'Campus Canteen Table 7',
    date: new Date('2024-10-21'),
    contact: 'Main Gate Security Office (Ext: 104)',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=60',
    status: 'Open',
  },
  {
    title: 'Set of 3 Keys with Batman Keychain',
    description: 'Found a ring with 2 cupboard keys, 1 bike key, and a black Batman rubber keychain near the bike parking area.',
    category: 'Keys',
    type: 'Found',
    location: 'East Wing Two-Wheeler Parking',
    date: new Date('2024-10-21'),
    contact: 'Security Guard Mr. Singh (9811223344)',
    imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=60',
    status: 'Open',
  },
  {
    title: 'White Wireless Earbuds (Boat Airdopes)',
    description: 'Found white Boat earbuds case in the Computer Lab 3. Successfully verified and returned to the owner.',
    category: 'Electronics',
    type: 'Found',
    location: 'Computer Lab 3, IT Department',
    date: new Date('2024-10-15'),
    contact: 'Lab Technician Mr. Amit',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=60',
    status: 'Returned',
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB at:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB.');

    // Clear existing items in collection
    console.log('Clearing existing items...');
    await Item.deleteMany({});

    // Insert sample items
    console.log('Inserting sample items into campusLostFound database...');
    const createdItems = await Item.insertMany(sampleItems);
    console.log(`🎉 Successfully seeded ${createdItems.length} items!`);

    await mongoose.connection.close();
    console.log('Database connection closed. Seed complete.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
    process.exit(1);
  }
}

seedDatabase();
