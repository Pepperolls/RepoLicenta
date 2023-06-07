import { TextField, Typography, Button } from '@material-ui/core';
import { useState } from 'react';
import { red } from '@mui/material/colors';
import { Paper, Grid } from '@mui/material';

const mainDivStyles = {
  display: 'flex',
  justifyContent: 'space-bewteen',
};

const centeredFlex = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const CartProduct = props => {
  const { itemId, title, price, imgSrc } = props;

  const [quantity, setQuantity] = useState(props.quantity);
  var totalProductPrice = price * quantity;

  return (
    <Paper
      style={{
        padding: 15,
        boxShadow:
          '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 -1px 2px 0 rgba(0, 0, 0, 0.2)',
      }}
    >
      <div style={mainDivStyles}>
        <Grid container>
          <Grid item xs={4}>
            <img
              src={imgSrc}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
              }}
              alt="Product"
            />
          </Grid>
          <Grid item xs={8} style={{ margin: 'auto', paddingLeft: 15 }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <b>Product:</b> {title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <b>Price:</b> ${price}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={centeredFlex} padding="25px">
          <Grid item style={centeredFlex} xs={12}>
            <TextField
              id="quantity"
              label="Quantity"
              value={quantity}
              variant="outlined"
              style={{ width: 100 }}
              type="number"
              onChange={event => {
                const newQuantity = event.target.value;
                if (newQuantity <= 0) {
                  event.target.value = 1;
                } else {
                  setQuantity(event.target.value);
                  props.changeQuantity(itemId, newQuantity);
                }
              }}
            />
          </Grid>
          <Grid item style={centeredFlex} xs={12}>
            <Typography variant="h6">
              <b>Total price: ${parseFloat(totalProductPrice).toFixed(2)}</b>
            </Typography>
          </Grid>
          <Grid item style={centeredFlex} xs={12}>
            <Button
              variant="contained"
              style={{ backgroundColor: red[500], color: red[50] }}
              aria-label="removeFromCart"
              onClick={() => props.removeFromCart(itemId)}
            >
              REMOVE FROM CART
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default CartProduct;
