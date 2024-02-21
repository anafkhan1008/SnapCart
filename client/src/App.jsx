import { useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home';
import Category from './Pages/Category';
import Product from './Pages/Product';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Cart from './Pages/Cart';
import UserContextProvider from './context/UserContextProvider';
import { SnackbarProvider} from 'notistack';
import Wishlist from './Pages/Wishlist'
function App() {
  return (
    <UserContextProvider>
    <SnackbarProvider maxSnack={4}>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<Category/>} />
        <Route path="/product/:id" element = {<Product/>} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/signin" element = {<Signin/>} />
        <Route path= "/cart" element = {<Cart/>} />
        <Route path="/wishlist" element = {<Wishlist/>} />
        </Routes>
    </BrowserRouter>
    </SnackbarProvider>
    </UserContextProvider>
  )
}

export default App
