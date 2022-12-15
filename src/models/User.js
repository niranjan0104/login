const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    full_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      // lowercase: true,
      // required: true,
      // unique: true,
    },
    // gender: {
    //   type: String,
    // },
    // phoneNumber: {
    //   type: String,
    //   unique: false,
    // },
    profileImage: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
