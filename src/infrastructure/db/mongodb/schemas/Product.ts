import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  discount: { type: Number, default: 0 },
  quantity: { type: Number, required: true, default: 1 },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
ProductSchema.index({ id: 1 }, { unique: true });

export const ProductModel = mongoose.model("Product", ProductSchema);
