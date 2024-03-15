import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import base_url from "../config";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";


export default function AddProduct() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
    author : user._id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${base_url}/addproducts`, formData);
      // Reset form after successful submission
      setFormData({
        name: "",
        category: "",
        price: "",
        image: "",
        description: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error here, e.g., display an error message
    }
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="md">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Select category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={formData.category}
                  label="Category"
                  onChange={handleChange}
                  name="category"
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Home and Decor">Home and Decor</MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Health and Wellness">Health and Wellness</MenuItem>
                  <MenuItem value="Automotive">Automotive</MenuItem>
                  <MenuItem value="Books">Books</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="price"
                label="Price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="image"
                label="Image URL"
                value={formData.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
