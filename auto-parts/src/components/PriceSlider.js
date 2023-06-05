import { Slider, Grid, Input } from '@mui/material';
import { useEffect } from 'react';

const mainDivStyle = {
  width: '215px',
};

const priceInputStyle = {
  width: '80px',
};

const PriceSlider = props => {
  const { priceRange = [], minPrice, maxPrice } = props;

  const handleRangeChange = (event, newValue) => {
    props.handlePriceRangeChange(newValue);
  };

  useEffect(() => {
    props.handlePriceRangeChange([minPrice, maxPrice]);
  }, []);

  const handleInputChange = inputIndex => event => {
    const newRange = [...priceRange];
    newRange[inputIndex] =
      event.target.value === '' ? 0 : Number(event.target.value);
    props.handlePriceRangeChange(newRange);
  };

  return (
    <div style={mainDivStyle}>
      <Slider
        value={priceRange}
        onChange={handleRangeChange}
        min={minPrice}
        max={maxPrice}
        valueLabelDisplay="auto"
      />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item padding={0} xs={5}>
          <Input
            value={priceRange[0]}
            onChange={handleInputChange(0)}
            type="number"
            inputProps={{
              min: minPrice,
              max: maxPrice,
              style: { textAlign: 'center' },
            }}
            style={priceInputStyle}
          />
        </Grid>
        <Grid item style={{ textAlign: 'center' }} padding={0} xs={2}>
          -
        </Grid>
        <Grid item padding={0} xs={5}>
          <Input
            value={priceRange[1]}
            onChange={handleInputChange(1)}
            type="number"
            inputProps={{
              min: minPrice,
              max: maxPrice,
              style: { textAlign: 'center' },
            }}
            style={priceInputStyle}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PriceSlider;
