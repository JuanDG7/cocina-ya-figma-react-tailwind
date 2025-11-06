import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  confirmPassword: string;
  status: string;
  recipes: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true, trim: true },
  confirmPassword: { type: String, trim: true },
  status: { type: String, trim: true, default: "normal" },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

export default mongoose.model<IUser>("User", userSchema);
