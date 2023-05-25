import Cart from '../components/Cart';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../redux/actions/productActions';

const mainDivStyle = {
  minHeight: '100vh',
  minWidth: '100vw',
};

const CartPage = props => {
  return (
    <div style={mainDivStyle}>
      <Cart
        parts={props.parts}
        isLoadingParts={props.isLoadingParts}
        fetchParts={props.fetchParts}
        //addToCart={props.addToCart}
        removeFromCart={props.removeFromCart}
        addToTotalSum={props.addToTotalSum}
        totalSum={props.totalSum}
        changeQuantity={props.changeQuantity}
      />
    </div>
  );
};

function mapStateToProps(state) {
  const {
    products: { parts, partsAddedToCart, isLoadingParts, totalSum },
  } = state;
  return {
    parts: parts.map(p => {
      const partAddedToCart = partsAddedToCart.find(
        part => part.partId == p.partModelId
      );
      console.log('Container log', partAddedToCart);
      return {
        ...p,
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
