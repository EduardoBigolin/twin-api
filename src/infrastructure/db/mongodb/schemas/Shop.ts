import mongoose from "mongoose";
const { Schema } = mongoose;

const ShopSchema = new Schema({
  id: { type: String, unique: true },
  userId: {
    type: Schema.Types.String,
    ref: "User",
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  product: [
    {
      type: Schema.Types.String,
      ref: "Product",
    },
  ],
  content: {
    type: String,
    required: true,
  },
});

export const ShopModel = mongoose.model("Shop", ShopSchema);
