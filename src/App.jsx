import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";
import { useState } from "react";
import './styles/App.css';

import Home from "./pages/User/Home";
import Restaurant from "./pages/User/Restaurant";
import ChatList from "./pages/ChatList";
import ChatWindow from "./pages/ChatWindow";
import UserFooter from "./pages/User/UserFooter";
import Cart from "./pages/User/Cart";
import OrderDetail from "./pages/User/OrderDetail";
import Profile from "./pages/User/Profile";
import Dashboard from "./pages/Admin/Dashboard";
import Dishes from "./pages/Admin/Dishes";
import Orders from "./pages/Admin/Orders";
import Reports from "./pages/Admin/Reports";
import Login from "./pages/Admin/Login";
import Employees from "./pages/Admin/Employees";
import Test from "./Test";
import { AdminPrivateRoute } from "./components/PrivateRoute";

const queryClient = new QueryClient(); // 创建一个 QueryClient 实例

function App() {

  // Dummy authentication function
  const isAuthenticated = (role) => {
    // Replace this logic with actual authentication
    const userRole = localStorage.getItem("role"); // "user" or "admin"
    return userRole === role;
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="app">
            <Routes>
              {/* 用户端路由 */}
              <Route path="/" element={<Test />} />
              <Route path="/user/category/list" element={<Home />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/chat" element={<ChatList />} />
              <Route path="/chat/:id" element={<ChatWindow />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order/:id" element={<OrderDetail />} />
              {/* <Route path="/profile" element={<UserProtectedRoute role="user"><Profile /></UserProtectedRoute>} /> */}

              {/* 管理端路由 */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<AdminPrivateRoute><Dashboard /></AdminPrivateRoute>} />
              <Route path="/admin/dishes" element={<AdminPrivateRoute><Dishes /></AdminPrivateRoute>} />
              <Route path="/admin/orders" element={<AdminPrivateRoute><Orders /></AdminPrivateRoute>} />
              <Route path="/admin/reports" element={<AdminPrivateRoute><Reports /></AdminPrivateRoute>} />
              <Route path="/admin/employees" element={<AdminPrivateRoute><Employees /></AdminPrivateRoute>} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>

  )
}

export default App
