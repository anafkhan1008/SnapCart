import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import UserContext from "../context/UserContext";
import axios from "axios";
import Container from "@mui/material/Container";
import CartItem from "../Components/CartItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Button, Box } from "@mui/material";
import Footer from "../Components/Footer";

import base_url from "../config";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { user, cart, removeAllFromCart } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const currency = "INR";
  const navigate = useNavigate();
  const id = user._id;
  const userId = id.toString()
  const verifyPayment = async (response) => {
    try {
      const res = await axios.post(`${base_url}/capture-payment`, response);
      console.log(res.data);
      removeAllFromCart();
      await removeAllFromDB();
      navigate(`/paymentsuccess/reference/${res.data.reference}`);
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  const removeAllFromDB = async () => {
    try {
      const res = await axios.delete(
        `${base_url}/users/${userId}/cart/remove/all`
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error removing all items from cart:", error);
    }
  };

  const handlePayment = async (e) => {
    try {
      const { data } = await axios.post(`${base_url}/create-payment`, {
        totalPrice,
        currency,
      });

      const order = data.order;
      console.log(order);
      const options = {
        key: "rzp_test_ynGOWH91dWBAcJ",
        amount: order.amount,
        currency: order.currency,
        name: "snapcart",
        description: "Test Transaction",
        image: "",
        order_id: order.id,
        handler: function (response) {
          verifyPayment(response);
        },
        prefill: {
          name: user.username,
          email: user.email,
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      console.log(options);
      const rzp = new window.Razorpay(options);
      rzp.open();
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/users/${user._id}/cart`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    if (data && data.length > 0) {
      const total = data.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [data]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {data.length > 0 ? (
              <Container
                maxWidth="xl"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {data.map((item) => (
                  <CartItem item={item} />
                ))}
              </Container>
            ) : (
              <Container>
                <Typography variant="h2" color="initial">
                  No items added in cart
                </Typography>
              </Container>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Price:
                </Typography>
                <Typography variant="h6" component="div">
                  ${totalPrice}
                </Typography>
                <Button
                  variant="contained"
                  className="StyledButton"
                  onClick={handlePayment}
                >
                  Proceed to checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Cart;
