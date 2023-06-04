import { AppBar } from '@material-ui/core';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { red } from '@mui/material/colors';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeaderLeftButtons from './AppHeaderLeftButtons';
import AdminHeaderButtons from './AdminHeaderButtons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/UserActions';

const AppHeader = props => {
  const navigate = useNavigate();
  const location = useLocation();

  const iconStyle = {
    fontSize: 30,
    color: red[50],
  };

  const pathNames = [
    '/AdminHomePage',
    '/AdminCarsPage',
    '/AdminUsersPage',
    '/AdminPartsPage',
  ];
  console.log(props);

  return !pathNames.includes(location?.pathname) ? (
    <AppBar position="relative">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <AppHeaderLeftButtons></AppHeaderLeftButtons>
        </div>

        <Button onClick={() => navigate('/Cart')}>
          <ListItemIcon minwidth="40px">
            <ShoppingCartOutlinedIcon style={iconStyle} />
          </ListItemIcon>
        </Button>

        {props.loggedInUser === null ? (
          <>
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
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => props.logoutUser()}
          >
            Log Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar position="relative">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <AdminHeaderButtons></AdminHeaderButtons>
        </div>
        {props.loggedInUser === null ? (
          <></>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              props.logoutUser();
              navigate('/');
            }}
          >
            Log Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps(state) {
  const {
    users: { loggedInUser },
  } = state;
  return {
    loggedInUser,
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(userActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
