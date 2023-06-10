const mongoose = require("mongoose");

export async function mongoConnect() {
  await mongoose.connect(
    "mongodb+srv://eduardo123:123@main-twin.3tsl2nh.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("MongoDB is connected");
}
