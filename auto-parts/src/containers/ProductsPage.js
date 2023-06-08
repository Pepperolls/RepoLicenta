import ProductCardsContainer from './ProductCardsContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../redux/actions/productActions';

const ProductsPage = props => {
  return (
    <ProductCardsContainer
      partsWithCars={props.partsWithCars}
      isLoadingParts={props.isLoadingParts}
      cars={props.cars}
      fetchParts={props.fetchParts}
      addToCart={props.addToCart}
      addToFavorites={props.addToFavorites}
      removeFromFavorites={props.removeFromFavorites}
    />
  );
};

function mapStateToProps(state) {
  const {
    products: {
      partsWithCars,
      partsAddedToCart,
      partsAddedToFavorites,
      isLoadingParts,
    },
  } = state;
  return {
    partsWithCars: partsWithCars.map(partWithCar => {
      const isAddedToCart = partsAddedToCart.includes(
        partWithCar.part.partGuid
      );
      const isAddedToFavorites = partsAddedToFavorites.includes(
        partWithCar.part.partGuid
      );
      return { ...partWithCar, isAddedToCart, isAddedToFavorites };
    }),
    isLoadingParts,
    cars: Array.from(
      new Set(partsWithCars.map(partWithCar => partWithCar.car.carGuid))
    ).map(carGuid => {
      return partsWithCars.find(
        partWithCar => partWithCar.car.carGuid === carGuid
      ).car;
    }),
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(productActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
