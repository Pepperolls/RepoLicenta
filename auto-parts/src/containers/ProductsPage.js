import ProductCardsContainer from './ProductCardsContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../redux/actions/productActions';

const mainGridStyle = {
  minHeight: '79vh',
  minWidth: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const ProductsPage = props => {
  return (
    <div style={mainGridStyle}>
      <ProductCardsContainer
        parts={props.parts}
        isLoadingParts={props.isLoadingParts}
        fetchParts={props.fetchParts}
        addToCart={props.addToCart}
        addToFavorites={props.addToFavorites}
        removeFromFavorites={props.removeFromFavorites}
      />
    </div>
  );
};

function mapStateToProps(state) {
  const {
    products: {
      parts,
      partsAddedToCart,
      partsAddedToFavorites,
      isLoadingParts,
    },
  } = state;
  return {
    parts: parts.map(p => {
      const isAddedToCart = partsAddedToCart.includes(p.partModelId);
      const isAddedToFavorites = partsAddedToFavorites.includes(p.partModelId);
      return { ...p, isAddedToCart, isAddedToFavorites };
    }),

    isLoadingParts,
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(productActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
