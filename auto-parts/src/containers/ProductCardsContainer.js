import { Grid, TextField, Typography, Box } from '@material-ui/core';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import MultipleSelectCheckbox from '../components/MultipleSelectCheckbox';
import PriceSlider from '../components/PriceSlider';

const ProductCardsContainer = props => {
  const { partsWithCars = [], isLoadingParts = false } = props;
  const [searchBy, setSearchBy] = useState('');

  useEffect(() => {
    props.fetchParts();
  }, []);

  if (isLoadingParts)
    return (
      <Grid align="center">
        <Typography>Loading parts...</Typography>
      </Grid>
    );

  return (
    <Grid container style={{ padding: 25 }}>
      <Grid item xs={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              type="input"
              label="Search for a part"
              onChange={event => {
                setSearchBy(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <Box fontWeight="bold">Select make</Box>
            </Typography>
            <MultipleSelectCheckbox />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <Box fontWeight="bold">Select model</Box>
            </Typography>
            <MultipleSelectCheckbox />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <Box fontWeight="bold">Fuel</Box>
            </Typography>
            <MultipleSelectCheckbox />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <Box fontWeight="bold">Engine</Box>
            </Typography>
            <MultipleSelectCheckbox />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <Box fontWeight="bold">Price range</Box>
            </Typography>
            <PriceSlider />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={3}>
          {partsWithCars &&
            partsWithCars
              .filter(partWithCar => {
                return partWithCar.part.name
                  .toLowerCase()
                  .includes(searchBy.toLowerCase());
              })
              .map((partWithCar, key) => (
                <Grid item xs={12} sm={4} lg={3}>
                  <ProductCard
                    title={partWithCar.part.name}
                    price={partWithCar.part.price}
                    imgSrc={partWithCar.part.imgUrl}
                    isAddedToFavorites={partWithCar.isAddedToFavorites}
                    description={partWithCar.part.description}
                    specifications={partWithCar.part.category}
                    partId={partWithCar.part.partGuid}
                    carDetails={partWithCar.car}
                    addToCart={props.addToCart}
                    addToFavorites={props.addToFavorites}
                    removeFromFavorites={props.removeFromFavorites}
                  />
                </Grid>
              ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductCardsContainer;
