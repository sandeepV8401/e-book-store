import React from "react";
import RootRedirect from "./RootRedirect";
import PublicLayout from "../../shared/layouts/PublicLayout";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../../shared/layouts/MainLayout";
import NotFound from "../../shared/pages/notFound/NotFound";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import ProfilePage from "../../features/auth/pages/ProfilePage";
import HomePage from "../../shared/pages/home/HomePage";
import CartPage from "../../features/cart/pages/CartPage";
import OrdersPage from "../../features/orders/pages/OrdersPage";
import BooksPage from "../../features/books/pages/BooksPage";
import BookDetailsPage from "../../features/books/pages/BookDetailsPage";
import CheckoutPage from "../../features/orders/pages/CheckoutPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      {/* public routes  */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* protected routes  */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />}/>
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
        </Route>
      </Route>

      {/* not found  */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
