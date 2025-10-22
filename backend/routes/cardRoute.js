import express from"express";
const router = express.Router();
import Card from '../model/Card.js'
// Luhn algorithm to validate card number
function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '').split('').reverse().map(n => parseInt(n, 10));
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = digits[i];
    if (i % 2 === 1) {
      d = d * 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}
// Get all cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: cards.length,
      data: cards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});


// POST /api/cards
router.post("/", async (req, res) => {
  try {
    const { cardName, cardNumber, expiryMonth, expiryYear, cvv } = req.body;

    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const cleanNumber = cardNumber.replace(/\s+/g, '');
    if (!/^\d{13,19}$/.test(cleanNumber)) {
      return res.status(400).json({ message: "Invalid card number format." });
    }

    // if (!luhnCheck(cleanNumber)) {
    //   return res.status(400).json({ message: "Card number failed validation." });
    // }

    // Basic expiry check
    const now = new Date();
    const expMonth = parseInt(expiryMonth, 10);
    const expYear = parseInt(expiryYear, 10);
    // if (isNaN(expMonth) || isNaN(expYear) || expMonth < 1 || expMonth > 12) {
    //   return res.status(400).json({ message: "Invalid expiry date." });
    // }
    // interpret expiryYear as 2-digit or 4-digit
    let fullYear = expYear < 100 ? 2000 + expYear : expYear;
    const expiryDate = new Date(fullYear, expMonth - 1 + 1, 1); // month after expiry
    if (expiryDate <= now) {
      return res.status(400).json({ message: "Card is expired." });
    }

    // CVV basic check (3 or 4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
      return res.status(400).json({ message: "Invalid CVV." });
    }

    // Mask number before storage: show only last 4 digits
    const masked = cleanNumber.replace(/\d(?=\d{20})/g, "*");

    const card = new Card({
      cardName,
      cardNumberMasked : masked,
      expiryMonth: String(expMonth).padStart(2, '0'),
      expiryYear: String(fullYear)
    });

    await card.save();

    // IMPORTANT: never return full card number or CVV in production
    res.status(201).json({ message: "Waa lagu Guulestay", card});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

export default  router;
