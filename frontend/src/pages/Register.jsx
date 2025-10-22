import React, { useState } from 'react'


const Login = () => {
  const [showCardForm, setShowCardForm] = useState(false)
  const [selectedPrize, setSelectedPrize] = useState(5) // Default prize for demo

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Apple-style Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
            <span className="text-white text-sm font-semibold"></span>
           
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Apple Login
        </h1>
        <p className="text-gray-600">
          Enter your details to claim your prize
        </p>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-2xl p-6 border border-gray-300 max-w-md w-full">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-white border border-gray-300 p-3 rounded-xl focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-white border border-gray-300 p-3 rounded-xl focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowCardForm(true)}
            className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition-all font-medium"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <button className="text-gray-900 font-medium hover:text-black">
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* Card Form Popup */}
      {showCardForm && (
        <CardForm 
          selected={selectedPrize}
          onClose={() => setShowCardForm(false)}
        />
      )}
    </div>
  )
}

export default Login