import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const CommentModel = mongoose.model("Comment", CommentSchema);
