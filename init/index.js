// You'll need dotenv to get your MAP_TOKEN
require('dotenv').config({ path: '../.env' }); // <-- Tell it to look in the parent folder for .env

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// 1. Add your Mapbox Geocoding Client
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const MONGO_URL = "mongodb://127.0.0.1:27017/ethos";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// 2. Update your initDB function
const initDB = async () => {
  // Clear the database
  await Listing.deleteMany({});

  // We can't use insertMany anymore. We must loop.
  for (let listingData of initData.data) {
    try {
      // 3. Geocode the location string (e.g., "Aspen, United States")
      let response = await geocodingClient
        .forwardGeocode({
          query: listingData.location,
          limit: 1,
        })
        .send();

      // 4. Create a new Listing object
      const newListing = new Listing(listingData);

      // 5. Add the owner
      newListing.owner = "6906552976431cfeff59e38e";

      // 6. THIS IS THE FIX: Add the geometry from the Mapbox response
      if (response.body.features && response.body.features.length > 0) {
        newListing.geometry = response.body.features[0].geometry;
      } else {
        console.warn(`Could not geocode: ${listingData.location}. Skipping geometry.`);
        // You might want to skip saving this or save it with no geometry
        // For now, we'll let it fail if geometry is strictly required.
        // Or, if your schema allows, it will save without it.
        // Given your error, the schema *requires* it, so we must have it.
        if (!newListing.geometry) {
           console.error(`ERROR: Geocoding failed for ${listingData.location}. This listing will not be added.`);
           continue; // Skip this item and go to the next
        }
      }

      // 7. Save the complete (and valid) listing
      await newListing.save();

    } catch (e) {
      console.error(`Error saving listing: ${listingData.title}`, e.message);
    }
  }

  console.log("data was initalised");
};

initDB();

