import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import HomeImage from "../assets/images/home3.jpg"
import HeroImage from "../assets/images/heroimages.jpg"
import { useNavigate } from 'react-router-dom';


const HeroSection = styled('div')(({ theme }) => ({
  backgroundImage: `url(${HomeImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '900px', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(4),

  '&::before': { 
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)', 
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: 3,
    paddingRight: 60,
    paddingLeft: 60,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'black',
    color: 'white',
    transition: 'background-color 0.3s, color 0.3s',
    '&:hover': {
      backgroundColor: 'white', 
      color: 'black', 
    },
  }));

function Hero({data}) {
const navigate = useNavigate()

const handleClick = () => {
  navigate('/allproducts')
}

  return (
    <HeroSection sx={{mb : 2}}>
      <ContentContainer maxWidth="md">
        <div className='Backdrop' >
        <Typography variant="h1" component="h1"  gutterBottom sx={{font : 'Fredoka' , fontWeight : '900' , }}>
          Welcome to snapcart
        </Typography>
       
        <Typography variant="h5" component="p" gutterBottom>
          Discover amazing products and enjoy great deals.
        </Typography>
        <StyledButton variant="contained" color="primary" onClick={handleClick} >
          Shop Now
        </StyledButton>
        </div>
      
      </ContentContainer>
    </HeroSection>
  );
}

export default Hero;

