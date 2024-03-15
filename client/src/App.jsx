import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserContextProvider from './context/UserContextProvider';
import { SnackbarProvider } from 'notistack';

const Home = lazy(() => import('./Pages/Home'));
const Category = lazy(() => import('./Pages/Category'));
const AddProduct = lazy(() => import('./Pages/AddProduct'))
const Product = lazy(() => import('./Pages/Product'));
const Signup = lazy(() => import('./Pages/Signup'));
const Signin = lazy(() => import('./Pages/Signin'));
const Cart = lazy(() => import('./Pages/Cart'));
const Wishlist = lazy(() => import('./Pages/Wishlist'));
const PaymentSuccess = lazy(()=> import('./Pages/PaymentSuccess'))
const Profile = lazy(()=> import('./Pages/Profile'))

function App() {
  return (
    <UserContextProvider>
      <SnackbarProvider maxSnack={4}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:name" element={<Category />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/signin" element={<Signin/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/paymentsuccess/reference/:id" element={<PaymentSuccess />} />
              <Route path="/user/:id" element={<Profile />} />


            </Routes>
          </Suspense>
        </Router>
      </SnackbarProvider>
    </UserContextProvider>
  );
}

export default App;

