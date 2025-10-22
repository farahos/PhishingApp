import React, { useState, useEffect } from 'react';

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);


  // Fetch all cards
  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cards');
      const result = await response.json();
      
      if (result.success) {
        setCards(result.data);
      }
    } catch (error) {
      setMessage('Error fetching cards');
    } finally {
      setLoading(false);
    }
  };


  // Load cards on component mount
  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
       
          {/* Cards List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Your Cards
              </h2>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {cards.length} cards
              </span>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading cards...</p>
              </div>
            ) : cards.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">💳</div>
                <p className="text-gray-500 text-lg">No cards added yet</p>
                <p className="text-gray-400 text-sm mt-2">
                  Add your first card using the form
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cards.map((card) => (
                  <div
                    key={card._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {card.cardName}
                      </h3>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        Active
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Card Number:</span>
                        <span className="font-mono text-gray-800">
                          {card.cardNumberMasked}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Expires:</span>
                        <span className="text-gray-800">
                          {card.expiryMonth}/{card.expiryYear}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Added:</span>
                        <span className="text-gray-800 text-sm">
                          {new Date(card.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Your card details are securely stored and never shared.</p>
        </div>
      </div>
    
  );
}

export default App;