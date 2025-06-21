import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  location: String,
  category: {
    type: String,
    enum: [
      "beach", "mountain", "forest", "city", "desert",
      "countryside", "lake", "village"
    ]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Listing = mongoose.model("Listing", listingSchema);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
  }
};

const imageMap = {
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  mountain: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  forest: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  city: "https://images.unsplash.com/photo-1494526585095-c41746248156",
  desert: "https://images.unsplash.com/photo-1606788075761-67c5b9ba0f0d",
  countryside: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  lake: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1",
  village: "https://images.unsplash.com/photo-1582056619535-6cacfb5393ef"
};


const sampleData = () => {
  const ownerId = "685275a8cfb91b62b48ae53c";
  const categories = Object.keys(imageMap);

  const listings = [];

  for (let i = 1; i <= 30; i++) {
    const category = categories[i % categories.length];
    listings.push({
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Stay #${i}`,
      description: `Beautiful ${category} location stay, perfect for a relaxing trip.`,
      image: imageMap[category],
      price: 1500 + i * 100,
      location: `Location ${i}`,
      category,
      owner: ownerId
    });
  }

  return listings;
};

const seedListings = async () => {
  try {
    await connectDB();
    await Listing.deleteMany();
    const data = sampleData();
    await Listing.insertMany(data);
    console.log("Seeded 30 listings successfully.");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedListings();
