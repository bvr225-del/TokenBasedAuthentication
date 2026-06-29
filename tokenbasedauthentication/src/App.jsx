import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DepartmentList from './components/DepartmentList';
import DepartmentForm from './components/DepartmentForm';
import Navigation from './components/Navigation';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import RestaurantList from './components/RestaurantList';
import RestaurantForm from './components/RestaurantForm';

import NoRecordFound from './components/NoRecordFound';
import Login from './components/Login';
import AuthService from './services/AuthService';

function RequireAuth({ children }) {
  console.log(AuthService.isAuthenticated());
  return AuthService.isAuthenticated() ? children : <Navigate to="/" replace />;
}

function App() {
   return (
    <>
    
    <Router>
       <Navigation />  
        <div className="container mt-4">
          <Routes>
            {/* Login Routes */}
            <Route path="/" element={<Login />} />

            {/* Department Routes */}
            <Route path="/departments" element={<RequireAuth><DepartmentList /></RequireAuth>} />
            <Route path="/departments/add" element={<RequireAuth><DepartmentForm /></RequireAuth>} />
            <Route path="/departments/edit/:id" element={<RequireAuth><DepartmentForm /></RequireAuth>} />

            {/* Employee Routes */}
            <Route path="/employees" element={<RequireAuth><EmployeeList /></RequireAuth>} />
            <Route path="/employees/add" element={<RequireAuth><EmployeeForm /></RequireAuth>} />
            <Route path="/employees/edit/:id" element={<RequireAuth><EmployeeForm /></RequireAuth>} />

            {/* Order Routes */}
            <Route path="/orders" element={<RequireAuth><OrderList /></RequireAuth>} />
            <Route path="/orders/add" element={<RequireAuth><OrderForm /></RequireAuth>} />
            <Route path="/orders/edit/:id" element={<RequireAuth><OrderForm /></RequireAuth>} />

                        {/* Restaurant Routes */}
            <Route path="/restaurants" element={<RequireAuth><RestaurantList /></RequireAuth>} />
            <Route path="/restaurants/add" element={<RequireAuth><RestaurantForm /></RequireAuth>} />
            <Route path="/restaurants/edit/:id" element={<RequireAuth><RestaurantForm /></RequireAuth>} />


            <Route path="*" element={<NoRecordFound />} />
          </Routes>
        </div> 
      </Router>
      </>
   );
}

export default App
