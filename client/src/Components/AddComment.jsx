import React from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Card, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import base_url from "../config";

function AddComment({ data }) {
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const prodId = data.prodId;
  const userId = data.user._id;

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      const res = await axios.post(`${base_url}/products/${prodId}/review`, {
        rating,
        comment,
        userId
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setComment("");
    setRating(0);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Add review
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Comment"
            value={comment}
            onChange={handleCommentChange}
    
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="warning"
            onClick={handleAddComment}
            fullWidth
            className="StyledButton"
          >
            Add comment
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AddComment;
