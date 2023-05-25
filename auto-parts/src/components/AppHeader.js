import { AppBar } from '@material-ui/core';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppHeaderLeftButtons from './AppHeaderLeftButtons';
import ListItemIcon from '@mui/material/ListItemIcon';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { red } from '@mui/material/colors';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminHeaderButtons from './AdminHeaderButtons';

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const iconStyle = {
    fontSize: 30,
    color: red[50],
  };

  return !(
    location?.pathname === '/AdminHomePage' ||
    location?.pathname === '/AdminCarsPage' ||
    location?.pathname === '/AdminUsersPage' ||
    location?.pathname === '/AdminPartsPage'
  ) ? (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <AppHeaderLeftButtons></AppHeaderLeftButtons>
          </Typography>

          <Button onClick={() => navigate('/Cart')}>
            <ListItemIcon minwidth="40px">
              <ShoppingCartOutlinedIcon style={iconStyle} />
            </ListItemIcon>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/LogIn')}
            style={{ margin: '0 8px 0 0' }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/SignUp')}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <AdminHeaderButtons></AdminHeaderButtons>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
