import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Required. Please enter your user name."],
    },
    email: {
      type: String,
      required: [true, "Required. Please enter your email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Required. Please set a strong password."],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
