import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserContextProvider from './context/UserContextProvider';
import { SnackbarProvider } from 'notistack';

// Lazy-loaded components
const Home = lazy(() => import('./Pages/Home'));
const Category = lazy(() => import('./Pages/Category'));
const Product = lazy(() => import('./Pages/Product'));
const Signup = lazy(() => import('./Pages/Signup'));
const Signin = lazy(() => import('./Pages/Signin'));
const Cart = lazy(() => import('./Pages/Cart'));
const Wishlist = lazy(() => import('./Pages/Wishlist'));

function App() {
  return (
    <UserContextProvider>
      <SnackbarProvider maxSnack={4}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:name" element={<Category />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </Suspense>
        </Router>
      </SnackbarProvider>
    </UserContextProvider>
  );
}

export default App;

