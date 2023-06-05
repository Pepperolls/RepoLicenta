import { useEffect, useState } from 'react';
import { Grid, TextField, Typography, Box, Paper } from '@material-ui/core';
import ProductCard from '../components/ProductCard';
import PriceSlider from '../components/PriceSlider';
import MultipleSelectCheckbox from '../components/MultipleSelectCheckbox';

const centeredDiv = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const ProductCardsContainer = props => {
  useEffect(() => {
    props.fetchParts();
  }, []);

  const { partsWithCars = [], isLoadingParts = false, cars = [] } = props;
  const [searchBy, setSearchBy] = useState('');
  const [selectedCarMake, setSelectedCarMake] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [selectedCarFuelType, setSelectedCarFuelType] = useState('');
  const [selectedCarEngineCapacity, setSelectedCarEngineCapacity] =
    useState('');

  const partPrices = partsWithCars.map(partWithCar => partWithCar.part.price);
  const minPrice = Math.min(...partPrices);
  const maxPrice = Math.max(...partPrices);
  const [priceRange, setPriceRange] = useState([]);

  const filteredParts = partsWithCars.filter(partWithCar => {
    return (
      partWithCar.part.name.toLowerCase().includes(searchBy.toLowerCase()) &&
      (selectedCarMake === '' || partWithCar.car.make === selectedCarMake) &&
      (selectedCarModel === '' || partWithCar.car.model === selectedCarModel) &&
      (selectedCarFuelType === '' ||
        partWithCar.car.fuelType === selectedCarFuelType) &&
      (selectedCarEngineCapacity === '' ||
        partWithCar.car.cubicCapacity === selectedCarEngineCapacity) &&
      partWithCar.part.price >= priceRange[0] &&
      partWithCar.part.price <= priceRange[1]
    );
  });

  const handleSelectedCarMakeChange = event => {
    setSelectedCarMake(event.target.value);
    setSelectedCarModel('');
    setSelectedCarFuelType('');
    setSelectedCarEngineCapacity('');
  };
  const handleSelectedCarModelChange = event => {
    setSelectedCarModel(event.target.value);
    setSelectedCarFuelType('');
    setSelectedCarEngineCapacity('');
  };
  const handleSelectedCarFuelTypeChange = event => {
    setSelectedCarFuelType(event.target.value);
    setSelectedCarEngineCapacity('');
  };
  const handleSelectedCarEngineCapacityChange = event => {
    setSelectedCarEngineCapacity(event.target.value);
  };
  const handlePriceRangeChange = newValue => {
    setPriceRange(newValue);
  };

  const carMakeList = [...new Set(cars.map(car => car.make))];
  const carModelList = [
    ...new Set(
      cars
        .filter(function (car) {
          return car.make === selectedCarMake;
        })
        .map(car => car.model)
    ),
  ];
  const carFuelTypeList = [
    ...new Set(
      cars
        .filter(function (car) {
          return car.make === selectedCarMake && car.model === selectedCarModel;
        })
        .map(car => car.fuelType)
    ),
  ];
  const carEngineCapacityList = [
    ...new Set(
      cars
        .filter(function (car) {
          return (
            car.make === selectedCarMake &&
            car.model === selectedCarModel &&
            car.fuelType === selectedCarFuelType
          );
        })
        .map(car => car.cubicCapacity)
    ),
  ];

  if (isLoadingParts)
    return (
      <Grid align="center">
        <Typography>Loading parts...</Typography>
      </Grid>
    );

  return (
    <Grid container style={{ padding: 25 }} spacing={4}>
      <Grid item xs={2}>
        <Paper
          style={{
            padding: 15,
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 -1px 2px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <Grid container spacing={2} style={centeredDiv}>
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
                <Box fontWeight="bold">Car make</Box>
              </Typography>
              <MultipleSelectCheckbox
                optionsList={carMakeList}
                selectedOption={selectedCarMake}
                handleSelectedOptionChange={handleSelectedCarMakeChange}
              />
            </Grid>
            {selectedCarMake !== '' ? (
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <Box fontWeight="bold">Car model</Box>
                </Typography>
                <MultipleSelectCheckbox
                  optionsList={carModelList}
                  selectedOption={selectedCarModel}
                  handleSelectedOptionChange={handleSelectedCarModelChange}
                />
              </Grid>
            ) : null}
            {selectedCarModel !== '' ? (
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <Box fontWeight="bold">Fuel type</Box>
                </Typography>
                <MultipleSelectCheckbox
                  optionsList={carFuelTypeList}
                  selectedOption={selectedCarFuelType}
                  handleSelectedOptionChange={handleSelectedCarFuelTypeChange}
                />
              </Grid>
            ) : null}
            {selectedCarFuelType !== '' ? (
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <Box fontWeight="bold">Engine capacity</Box>
                </Typography>
                <MultipleSelectCheckbox
                  optionsList={carEngineCapacityList}
                  selectedOption={selectedCarEngineCapacity}
                  handleSelectedOptionChange={
                    handleSelectedCarEngineCapacityChange
                  }
                />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <Box fontWeight="bold">Price range</Box>
              </Typography>
              <PriceSlider
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceRange={priceRange}
                handlePriceRangeChange={handlePriceRangeChange}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={3}>
          {filteredParts.map((partWithCar, index) => (
            <Grid item xs={12} sm={4} lg={3} key={index}>
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
