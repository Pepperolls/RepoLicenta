import { useState } from 'react';
import { Slider, Grid, Input } from '@mui/material';

const mainDivStyle = {
  width: '215px',
};

const priceInputStyle = {
  width: '80px',
};

export default function PriceSlider() {
  const [range, setRange] = useState([0, 900]); // Initial price range values

  const handleRangeChange = (event, newValue) => {
    setRange(newValue);
  };

  const handleInputChange = inputIndex => event => {
    const newRange = [...range];
    newRange[inputIndex] =
      event.target.value === '' ? 0 : Number(event.target.value);
    setRange(newRange);
  };

  return (
    <div style={mainDivStyle}>
      <Slider
        value={range}
        onChange={handleRangeChange}
        min={0}
        max={900}
        valueLabelDisplay="auto"
      />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Input
            value={range[0]}
            onChange={handleInputChange(0)}
            type="number"
            inputProps={{
              min: 0,
              max: 900,
              style: { textAlign: 'center' },
            }}
            style={priceInputStyle}
          />
        </Grid>
        <Grid item>-</Grid>
        <Grid item>
          <Input
            value={range[1]}
            onChange={handleInputChange(1)}
            type="number"
            inputProps={{
              min: 0,
              max: 900,
              style: { textAlign: 'center' },
            }}
            style={priceInputStyle}
          />
        </Grid>
      </Grid>
    </div>
  );
}
