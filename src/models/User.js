/* eslint-disable no-dupe-keys */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: false },
  id: { type: String, required: false },
  IsAdmin: { type: Boolean, required: false },
  username: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true } /* eslint-disable no-dupe-keys */,
  PhoneNumber: { type: String, required: false },
  Cart: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
      name: { type: String, required: true },
      Language: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
  Wishlist: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      name: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
  Orders: [
    {
      ID: { type: String, required: true },
      Email: { type: String, required: true },
      Country: { type: String, required: true },
      State: { type: String, required: true },
      Address: { type: String, required: true },
      PhoneNumber: { type: String, required: true },
      Amount: { type: String, required: true },
      CustomerId: { type: String, required: true },
      products: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
        },
      ],
      Date: { type: Date, default: Date.now },
    },
  ],
});

function createModel(modelName, schema) {
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }
  return mongoose.model(modelName, schema);
}

const User = createModel("User", userSchema);

export default User;
