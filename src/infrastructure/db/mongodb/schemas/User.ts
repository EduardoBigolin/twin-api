import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAuthenticated: { type: Boolean, required: true, default: false },
});
UserSchema.index({ id: 1 }, { unique: true });
export const UserModel = mongoose.model("User", UserSchema);
