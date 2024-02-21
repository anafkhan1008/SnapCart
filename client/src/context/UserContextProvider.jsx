import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCart(parsedUser.cart || []);
      setWishlist(parsedUser.wishlist || []);
    }
  }, []);


  const updateUserAndLocalStorage = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    updateUserAndLocalStorage({ ...user, cart: updatedCart });
  };

  const addToWishList = (item) => {
    const updatedWishlist = [...wishlist, item];
    setWishlist(updatedWishlist);
    updateUserAndLocalStorage({ ...user, wishlist: updatedWishlist });
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item !== itemId);
    setCart(updatedCart);
    updateUserAndLocalStorage({ ...user, cart: updatedCart });
  };

  const removeFromWishlist = (itemId) => {
 
    const updatedWishlist = wishlist.filter((itemIdInWishlist) => itemIdInWishlist !== itemId);
    setWishlist(updatedWishlist);
    updateUserAndLocalStorage({ ...user, wishlist: updatedWishlist });

  };

  const contextValue = {
    user,
    setUser,
    cart,
    addToCart,
    removeFromCart,
    wishlist,
    addToWishList,
    removeFromWishlist,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

