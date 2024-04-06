const mongoose = require("mongoose");

const user = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
    },
    age:{
      type:Number,
    },
    status:{
      type:String
    },
    // masterPassword: {
    //   type: String,
    //   default: "",
    // },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);