
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './hooks/useUser';
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';




import Register from './pages/Register.jsx';
import Home from './components/Home.jsx';
import Amount from './components/Amount.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import ViewBook from './admin/allRequest.jsx';





const router = createBrowserRouter([
  {
    path: "/", element: <App/>,
    children:[
      { path: '/Home', 
          element: <Home /> },
        { path: '/login', 
          element: <Login/> },
            { path: '/Register', 
          element: <Register/> },

        
          { path: '/admin-dashboard', 
          element: <AdminDashboard /> },
           { path: '/allRequest', 
          element: <ViewBook /> }
          

        

         
    ]
  
  }
])
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>

    <Toaster />
    <RouterProvider router={router} />
    </UserProvider>

  </React.StrictMode>
);
