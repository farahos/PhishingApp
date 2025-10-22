import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  cardName: { type: String, required: true },
  cardNumberMasked: { type: String, required: true }, // store masked number only
  expiryMonth: { type: String, required: true },
  expiryYear: { type: String, required: true },
  // We will NOT store CVV in plain text in this simple demo. If you need to store anything, store a token instead.
  createdAt: { type: Date, default: Date.now }
});


const Card = mongoose.model("Card", CardSchema);
export default Card;
