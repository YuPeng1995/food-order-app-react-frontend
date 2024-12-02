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
import Menu from "./pages/Admin/Menu";
import Orders from "./pages/Admin/Orders";
import Reports from "./pages/Admin/Reports";
import Login from "./pages/Admin/Login";

const queryClient = new QueryClient(); // 创建一个 QueryClient 实例

function App() {

  // Dummy authentication function
  const isAuthenticated = (role) => {
    // Replace this logic with actual authentication
    const userRole = localStorage.getItem("role"); // "user" or "admin"
    return userRole === role;
  };

  // Protected route component
  const ProtectedRoute = ({ children, role }) => {
    return isAuthenticated(role) ? children : <Navigate to={role === "admin" ? "/admin/login" : "/user/category/list"} />;
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="app">
            
            <Routes>
              {/* 用户端路由 */}
              <Route path="/user/category/list" element={<Home />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/chat" element={<ChatList />} />
              <Route path="/chat/:id" element={<ChatWindow />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order/:id" element={<OrderDetail />} />
              <Route path="/profile" element={<ProtectedRoute role="user"><Profile /></ProtectedRoute>} />

              {/* 管理端路由 */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/menu" element={<ProtectedRoute role="admin"><Menu /></ProtectedRoute>} />
              <Route path="/admin/orders" element={<ProtectedRoute role="admin"><Orders /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute role="admin"><Reports /></ProtectedRoute>} />
            </Routes>
          </div>
          <UserFooter />
        </Router>
      </QueryClientProvider>
    </Provider>

  )
}

export default App
