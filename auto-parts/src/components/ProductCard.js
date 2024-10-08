import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Button } from '@material-ui/core';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';

toast.configure();

const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductCard = props => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    title,
    price,
    description,
    imgSrc,
    specifications,
    partId,
    isAddedToFavorites,
    carDetails,
  } = props;

  const carDetailsShown = `For: ${carDetails.make} ${carDetails.model}, 
  ${carDetails.fabricationYear}, ${carDetails.fuelType}, ${carDetails.cubicCapacity} cmc`;

  const cardStyle = {
    height: 500,
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 -1px 2px 0 rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const cardStyleAux = {
    height: '100%',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 -1px 2px 0 rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  function handleAddToCart() {
    props.addToCart(partId);
    toast.success('The part was added to your shopping cart.', {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 3000,
    });
  }

  return (
    <Card style={expanded ? cardStyleAux : cardStyle}>
      <CardHeader
        action={
          <IconButton
            aria-label="add to favorites"
            onClick={() =>
              isAddedToFavorites
                ? props.removeFromFavorites(partId)
                : props.addToFavorites(partId)
            }
          >
            {isAddedToFavorites ? (
              <FavoriteOutlinedIcon style={{ color: 'F50057' }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        }
        title={<h5 style={{ margin: 0 }}>{title}</h5>}
        subheader={
          <h4 style={{ margin: 0 }}>{'$' + parseFloat(price).toFixed(2)}</h4>
        }
      />
      <CardMedia
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>{carDetailsShown}</Typography>
        <img
          src={imgSrc}
          alt="Product"
          style={{
            width: '280px',
            height: '280px',
            objectFit: 'contain',
          }}
        ></img>
      </CardMedia>

      <CardActions>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            aria-label="addToCart"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </Button>
        </Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details: {description}</Typography>
          {/* <Typography paragraph>{description}</Typography> */}
          <Typography paragraph>Category: {specifications}</Typography>
          {/* <Typography paragraph>{specifications}</Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;
