import React, { useEffect, useState } from 'react';
import axios from "axios";
import base_url from "../config";
import { Avatar, Box, Rating, Typography } from '@mui/material';


function Comments({ reviews }) {
  return (
    <div>
      <h2>Comments</h2>
       {reviews.map((review, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar alt="User Avatar" src={review.user && review.user.avatar} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {review.user && review.user.username}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating name="read-only" value={review.rating} readOnly />
            </Box>
            <Typography variant="body1">{review.comment}</Typography>
          </Box>
        </Box>
      ))}
    </div>
  );
}

export default Comments;
