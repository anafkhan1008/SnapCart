import { styled } from '@mui/system';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function Category({ data }) {

  const StyledBox = styled(Paper)(({ theme }) => ({
    position: 'relative',
    width: '300px',
    margin : 4,
    height: '350px',
    cursor : 'pointer',
    overflow: 'hidden',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '&:hover::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease-in-out', 
    },
  }));

  const TextContainer = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'white',
    padding: '10px',
    zIndex: 1, 
  });

  return (
    <Link to={`/category/${data.name}`} >
    <StyledBox>
      <img src={data.image} alt={data.name} />
      <TextContainer>
        <h2>{data.name}</h2>
      </TextContainer>
    </StyledBox> 
    </Link>
  );
}

export default Category;



