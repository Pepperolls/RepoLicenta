import Button from '@mui/material/Button';
import {
  Typography,
  Grid,
  Dialog,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { lightGreen } from '@mui/material/colors';
import CartProduct from './CartProduct';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../redux/actions/productActions';
import axios from 'axios';
import { toast } from 'react-toastify';
import { red } from '@mui/material/colors';

toast.configure();

const summaryGridContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
};

const columnCenteredFlex = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

const centeredFlex = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const spaceBetweenFlex = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const Cart = props => {
  const navigate = useNavigate();
  const {
    partsAddedToCart = [],
    isLoadingParts = false,
    loggedInUser = null,
  } = props;

  const partsAddedToCartDTO = partsAddedToCart.map(({ part, quantity }) => ({
    partModelGuid: part.partGuid,
    quantity,
  }));

  const totalSum = partsAddedToCart.reduce((sum, partAddedToCart) => {
    sum += partAddedToCart.quantity * partAddedToCart.part.price;
    return sum;
  }, 0);

  useEffect(() => {
    props.fetchParts();
  }, []);

  const [openConfirmOrderDialog, setOpenConfirmOrderDialog] = useState(false);

  function handleCheckoutNow() {
    setOpenConfirmOrderDialog(true);
  }

  async function handlePlaceOrder() {
    try {
      if (partsAddedToCartDTO.length > 0) {
        if (loggedInUser) {
          const res = await axios.post(
            process.env.REACT_APP_API_URL + '/CreateOrder',
            {
              orderItems: partsAddedToCartDTO,
              totalPrice: totalSum,
              userFirstName: loggedInUser.firstName,
              userLastName: loggedInUser.lastName,
              userEmail: loggedInUser.email,
              userCountry: loggedInUser.country,
              userCity: loggedInUser.city,
              userZipCode: loggedInUser.zipCode,
              userAddress: loggedInUser.address,
              userPhoneNumber: loggedInUser.phoneNumber,
            }
          );
          if (res) {
            toast.success('Order placed successfully!', {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 6000,
            });
            navigate('/OrderConfirmationPage');
            await axios.post(
              process.env.REACT_APP_API_URL + '/SendOrderEmailAsync',
              {
                orderItems: partsAddedToCartDTO,
                totalPrice: totalSum,
                userFirstName: loggedInUser.firstName,
                userLastName: loggedInUser.lastName,
                userEmail: loggedInUser.email,
                userCountry: loggedInUser.country,
                userCity: loggedInUser.city,
                userZipCode: loggedInUser.zipCode,
                userAddress: loggedInUser.address,
                userPhoneNumber: loggedInUser.phoneNumber,
              }
            );
            props.emptyCart();
            navigate('/OrderConfirmationPage');
          }
        } else {
          toast.error('You must be logged in before placing an order.', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 6000,
          });
        }
      } else {
        toast.error('You can not place an empty order.', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 6000,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 6000,
      });
    }
  }

  if (isLoadingParts)
    return (
      <Grid align="center">
        <Typography>Loading cart...</Typography>
      </Grid>
    );

  return (
    <div style={{ padding: '50px' }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Grid container spacing={3}>
            {partsAddedToCart.map((partAddedToCart, index) => {
              return (
                <Grid item xs={12} key={index}>
                  <CartProduct
                    itemId={partAddedToCart.part.partGuid}
                    title={partAddedToCart.part.name}
                    price={partAddedToCart.part.price}
                    imgSrc={partAddedToCart.part.imgUrl}
                    isAddedToCart={partAddedToCart.isAddedToCart}
                    quantity={partAddedToCart.quantity}
                    totalSum={props.totalSum}
                    addToTotalSum={props.addToTotalSum}
                    changeQuantity={props.changeQuantity}
                    removeFromCart={props.removeFromCart}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Paper
            style={{
              padding: 15,
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 -1px 2px 0 rgba(0, 0, 0, 0.2)',
            }}
          >
            <Grid container spacing={4} style={summaryGridContainerStyle}>
              <Grid item xs={12} style={centeredFlex}>
                <Typography variant="h4">ORDER SUMMARY</Typography>
              </Grid>
              <Grid item xs={12} style={spaceBetweenFlex}>
                <Typography>Subtotal</Typography>
                <Typography>${parseFloat(totalSum).toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} style={spaceBetweenFlex}>
                <Typography>Estimated Shipping</Typography>
                <Typography>$ 5.90</Typography>
              </Grid>
              <Grid item xs={12} style={spaceBetweenFlex}>
                <Typography>Shipping Discount</Typography>
                <Typography>$ -5.90</Typography>
              </Grid>
              <Grid item xs={12} style={spaceBetweenFlex} type="total">
                <Typography variant="h5">
                  <b>Total: </b>
                </Typography>
                <Typography variant="h5">
                  <b>${parseFloat(totalSum).toFixed(2)} </b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <div style={spaceBetweenFlex}>
                  <Typography>
                    <b>Payment method: </b>
                  </Typography>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="cash"
                      control={<Radio checked="true" color="primary" />}
                      label="Cash on delivery"
                      style={{ margin: '0px 5px 0px 5px' }}
                    />
                    <FormControlLabel
                      value="creditCard"
                      disabled
                      control={<Radio />}
                      label="Online with credit card"
                      style={{ margin: 0 }}
                    />
                  </RadioGroup>
                </div>
              </Grid>
              <Grid item xs={12} style={centeredFlex}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: lightGreen[700],
                  }}
                  onClick={handleCheckoutNow}
                >
                  Checkout now
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={openConfirmOrderDialog}
        onClose={() => setOpenConfirmOrderDialog(false)}
      >
        <DialogContent style={columnCenteredFlex}>
          <Grid container>
            <Grid item xs={12} style={centeredFlex}>
              <div style={columnCenteredFlex}>
                <img
                  class="logo"
                  src="https://i.imgur.com/Is4sTel.png"
                  alt="Company Logo"
                />
                <h1 style={{ marginTop: -30 }}>Order Confirmation</h1>
                <div>
                  <strong style={{ marginBottom: 10 }}>Billed To:</strong>{' '}
                  {loggedInUser.firstName + ' ' + loggedInUser.lastName}
                  <br />
                  <strong>Email:</strong> {loggedInUser.email}
                  <br />
                  <strong>Shipping Address:</strong>{' '}
                  {loggedInUser.address +
                    ', ' +
                    loggedInUser.city +
                    ', ' +
                    loggedInUser.zipCode +
                    ', ' +
                    loggedInUser.country}
                  <br />
                  <strong>Total Amount:</strong> <span>${totalSum}</span>
                  <br />
                  <strong>Payment Method:</strong> <span>Cash</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} style={centeredFlex}>
              <Button
                onClick={() => setOpenConfirmOrderDialog(false)}
                variant="contained"
                color="primary"
                style={{
                  marginTop: 15,
                  width: 175,
                  backgroundColor: red[500],
                }}
              >
                Go back
              </Button>
            </Grid>
            <Grid item xs={6} style={centeredFlex}>
              <Button
                onClick={handlePlaceOrder}
                variant="contained"
                color="primary"
                style={{
                  marginTop: 15,
                  width: 175,
                }}
              >
                Place order
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function mapStateToProps(state) {
  const {
    products: { partsAddedToCart, totalSum },
    users: { loggedInUser },
  } = state;
  return {
    partsAddedToCart,
    totalSum,
    loggedInUser,
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(productActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
