import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    username_ar: {
      type: String, // Add this field for the Arabic version of the name
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    role: {
      type: String,
      default: "",
      enum: ["User", "developer", "microdeveloper", "Admin"]
    },
    color: {
      type: String,
      default: "#fff",
    },
    bgColor: {
      type: String,
      default: "#643c1c",
    },

    associatedDeveloper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],

  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
