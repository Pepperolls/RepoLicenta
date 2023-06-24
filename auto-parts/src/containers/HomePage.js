import { Button, Box } from '@material-ui/core';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const centeredDiv = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgb(63, 81, 181)',
  height: '82.5vh',
  padding: '50px',
  color: '#fff',
};

const imageWithButtonDiv = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: 'auto',
  paddingTop: 45,
};

const shopNowBtnStyle = {
  height: '65px',
  width: '200px',
  marginBottom: 35,
  color: '#fff',
  boxShadow:
    '0px 0px 6px 5px rgba(255, 255, 255, 0.8), 0 -0px 6px 5px rgba(255, 255, 255, 0.8)',
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={centeredDiv}>
      <div>
        <Typography variant="h2">
          <Box fontWeight="bold">CarLounge</Box>
        </Typography>
        <Typography variant="h3">
          Your favorite online car parts provider!
        </Typography>
      </div>
      <div style={imageWithButtonDiv}>
        <Button
          onClick={() => navigate('/Products')}
          variant="contained"
          color="primary"
          size="large"
          style={shopNowBtnStyle}
        >
          <Typography
            style={{
              fontWeight: 700,
              fontSize: '20px',
              color: '#fff',
            }}
          >
            Shop now
          </Typography>
        </Button>
        <img src="/images/HomeCar.png" alt="Home page car"></img>
      </div>
    </div>
  );
};

export default HomePage;
