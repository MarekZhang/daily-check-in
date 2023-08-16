import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  id: String,
  leetCodeAccount: String,
  userAvatar: String,
  nickName: String,
  todayAC: Number,
  weekAC: Number,
  allTimeAC: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
