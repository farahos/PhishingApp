// import React, { useState, useEffect } from 'react';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
//   PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer 
// } from 'recharts';

// function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalRequests: 0,
//     pendingRequests: 0,
//     approvedRequests: 0,
//     rejectedRequests: 0,
//     todayRequests: 0
//   });
  
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState('week');

//   // Mock data - Replace with actual API calls
//   const requestData = [
//     { day: 'Mon', requests: 12 },
//     { day: 'Tue', requests: 19 },
//     { day: 'Wed', requests: 8 },
//     { day: 'Thu', requests: 15 },
//     { day: 'Fri', requests: 11 },
//     { day: 'Sat', requests: 6 },
//     { day: 'Sun', requests: 9 }
//   ];

//   const statusData = [
//     { name: 'Approved', value: 45 },
//     { name: 'Pending', value: 30 },
//     { name: 'Rejected', value: 25 }
//   ];

//   const categoryData = [
//     { category: 'Home Fund', requests: 15 },
//     { category: 'Car Prize', requests: 8 },
//     { category: 'Travel Trip', requests: 12 },
//     { category: 'Tech Bundle', requests: 20 },
//     { category: 'Education', requests: 7 }
//   ];

//   const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

//   useEffect(() => {
//     // Simulate API call
//     const fetchStats = async () => {
//       setLoading(true);
//       try {
//         // Replace with actual API call
//         setTimeout(() => {
//           setStats({
//             totalRequests: 156,
//             pendingRequests: 23,
//             approvedRequests: 98,
//             rejectedRequests: 35,
//             todayRequests: 8
//           });
//           setLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error('Error fetching stats:', error);
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const StatCard = ({ title, value, subtitle, icon, color }) => (
//     <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
//           {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
//         </div>
//         <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
//           <span className="text-white text-lg">{icon}</span>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
//           <p className="text-gray-600 mt-4">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center space-x-3 mb-2">
//                 <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm font-semibold"></span>
//                 </div>
//                 <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
//               </div>
//               <p className="text-gray-600">Overview of all card requests and statistics</p>
//             </div>
            
//             <div className="flex space-x-2">
//               {['day', 'week', 'month', 'year'].map((range) => (
//                 <button
//                   key={range}
//                   onClick={() => setTimeRange(range)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     timeRange === range
//                       ? 'bg-gray-900 text-white'
//                       : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
//                   }`}
//                 >
//                   {range.charAt(0).toUpperCase() + range.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Requests"
//             value={stats.totalRequests}
//             subtitle="All time"
//             icon="📊"
//             color="bg-blue-500"
//           />
//           <StatCard
//             title="Pending"
//             value={stats.pendingRequests}
//             subtitle="Awaiting review"
//             icon="⏳"
//             color="bg-yellow-500"
//           />
//           <StatCard
//             title="Approved"
//             value={stats.approvedRequests}
//             subtitle="Successfully processed"
//             icon="✅"
//             color="bg-green-500"
//           />
//           <StatCard
//             title="Today"
//             value={stats.todayRequests}
//             subtitle="New requests"
//             icon="🆕"
//             color="bg-purple-500"
//           />
//         </div>

//         {/* Charts Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Requests Over Time */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Requests Over Time</h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={requestData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis dataKey="day" stroke="#666" />
//                   <YAxis stroke="#666" />
//                   <Tooltip 
//                     contentStyle={{ 
//                       backgroundColor: 'white', 
//                       border: '1px solid #e5e7eb',
//                       borderRadius: '8px'
//                     }}
//                   />
//                   <Bar dataKey="requests" fill="#1f2937" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Request Status Distribution */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Status</h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={statusData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={100}
//                     paddingAngle={2}
//                     dataKey="value"
//                   >
//                     {statusData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Additional Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Requests by Category */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Requests by Category</h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={categoryData} layout="vertical">
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis type="number" stroke="#666" />
//                   <YAxis 
//                     type="category" 
//                     dataKey="category" 
//                     stroke="#666" 
//                     width={80}
//                     tick={{ fontSize: 12 }}
//                   />
//                   <Tooltip />
//                   <Bar dataKey="requests" fill="#374151" radius={[0, 4, 4, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Approval Rate Trend */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Rate Trend</h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={requestData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis dataKey="day" stroke="#666" />
//                   <YAxis stroke="#666" />
//                   <Tooltip />
//                   <Line 
//                     type="monotone" 
//                     dataKey="requests" 
//                     stroke="#10B981" 
//                     strokeWidth={2}
//                     dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//           <div className="flex space-x-4">
//             <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors font-medium">
//               View All Requests
//             </button>
//             <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
//               Export Data
//             </button>
//             <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
//               Generate Report
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
import React, { useState, useEffect } from 'react';

function AdminDashboard() {
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

export default AdminDashboard;