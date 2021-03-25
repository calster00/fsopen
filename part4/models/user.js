const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    min: [5, "Min allowed username length is 5 characters"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: String
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);