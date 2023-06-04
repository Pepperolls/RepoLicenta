import Cart from '../components/Cart';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../redux/actions/ProductActions';

const CartPage = props => {
  return (
    <Cart
      partsWithCars={props.partsWithCars}
      isLoadingParts={props.isLoadingParts}
      fetchParts={props.fetchParts}
      removeFromCart={props.removeFromCart}
      addToTotalSum={props.addToTotalSum}
      totalSum={props.totalSum}
      changeQuantity={props.changeQuantity}
    />
  );
};

function mapStateToProps(state) {
  const {
    products: { partsWithCars, partsAddedToCart, isLoadingParts, totalSum },
  } = state;
  return {
    partsWithCars: partsWithCars.map(partWithCar => {
      const partAddedToCart = partsAddedToCart.find(
        part => part.partId == partWithCar.part.partGuid
      );
      return {
        ...partWithCar,
        isAddedToCart: partAddedToCart ? true : false,
        quantity: partAddedToCart ? partAddedToCart.quantity : 1,
      };
    }),
    isLoadingParts,
    totalSum,
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(productActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
