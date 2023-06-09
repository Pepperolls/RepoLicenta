import { Button, Grid, Paper } from '@material-ui/core';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const mainGridStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 'auto',
};

const paperStyle = {
  padding: 20,
  height: '100%',
  width: '25%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const btnStyle = {
  margin: '15px 0',
};

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <Grid container style={mainGridStyle}>
      <Paper elevation={7} style={paperStyle}>
        <img
          src="/images/Congrats.png"
          alt="Blue car logo"
          height={'45%'}
          width={'45%'}
          style={{ alignSelf: 'center' }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <h1
              style={{
                textAlign: 'center',
                margin: '15px 0px 0px 0px',
                fontSize: '30px',
              }}
            >
              Your order has been submitted!
            </h1>
          </Grid>
          <Grid item xs={12}>
            <h3
              style={{
                textAlign: 'center',
                margin: '25px 0px 0px 0px',
                fontSize: '25px',
                fontWeight: 650,
              }}
            >
              Thank you for choosing CarLounge!
            </h3>
          </Grid>
          <Grid item xs={12}>
            <h3
              style={{
                textAlign: 'center',
                color: grey[400],
                fontSize: '20px',
                fontWeight: 650,
                marginTop: 0,
              }}
            >
              You will receive an e-mail with the invoice once it has been
              processed.
            </h3>
          </Grid>
        </Grid>
        <Button
          id="submit"
          type="submit"
          color="primary"
          variant="contained"
          onClick={() => {
            navigate('/Products');
          }}
          fullWidth
          style={btnStyle}
        >
          Continue shopping
        </Button>
      </Paper>
    </Grid>
  );
};

export default OrderConfirmationPage;
