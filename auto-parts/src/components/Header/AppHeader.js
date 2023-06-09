import {
  AppBar,
  Dialog,
  ListItemText,
  ListItemIcon,
  Typography,
  Grid,
} from '@material-ui/core';
import Toolbar from '@mui/material/Toolbar';
import Button from '@material-ui/core/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeaderLeftButtons from './AppHeaderLeftButtons';
import AdminHeaderButtons from './AdminHeaderButtons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/UserActions';
import axios from 'axios';
import { useState } from 'react';
import { DialogContent } from '@mui/material';
import { red } from '@mui/material/colors';
import { toast } from 'react-toastify';

toast.configure();

const AppHeader = props => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [twoFactorSetup, setTwoFactorSetup] = useState({});

  const listItemIconStyle = {
    minWidth: '40px',
  };

  const iconStyle = {
    fontSize: 30,
    color: red[50],
  };

  const buttonStyle = {
    color: 'inherit',
    paddingRight: 25,
  };

  const dialogContentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  };

  const gridItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const pathNames = [
    '/AdminHomePage',
    '/AdminCarsPage',
    '/AdminUsersPage',
    '/AdminPartsPage',
  ];

  const getTwoFactorSetup = async () => {
    const settings = await axios.get(
      process.env.REACT_APP_API_URL +
        `/EnableTwoFactorAuthentication/${props.loggedInUser.email}`
    );

    setTwoFactorSetup(settings.data);
  };

  async function handleShow2faConfig() {
    getTwoFactorSetup();
    setOpen(true);
  }

  async function handleTwoFactorEnabled() {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL +
          `/UpdateUser/${props.loggedInUser.userId}`,
        {
          email: props.loggedInUser.email,
          username: props.loggedInUser.username,
          password: props.loggedInUser.password,
          firstName: props.loggedInUser.firstName,
          lastName: props.loggedInUser.lastName,
          isAdmin: props.loggedInUser.isAdmin,
          isTwoFactorAuthenticationEnabled: true,
        }
      );
      if (res) {
        props.updateUser(res.data);
        toast.success('2FA enabled successfully!', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 6000,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 6000,
      });
    }
    setOpen(false);
  }

  async function handleTwoFactorDisabling() {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL +
          `/UpdateUser/${props.loggedInUser.userId}`,
        {
          email: props.loggedInUser.email,
          username: props.loggedInUser.username,
          password: props.loggedInUser.password,
          firstName: props.loggedInUser.firstName,
          lastName: props.loggedInUser.lastName,
          isAdmin: props.loggedInUser.isAdmin,
          isTwoFactorAuthenticationEnabled: false,
        }
      );
      if (res) {
        props.updateUser(res.data);
        toast.success('2FA disabled successfully!', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 6000,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 6000,
      });
    }
  }

  return !pathNames.includes(location?.pathname) ? (
    <AppBar position="relative">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <AppHeaderLeftButtons></AppHeaderLeftButtons>
        </div>

        <Button onClick={() => navigate('/Cart')} style={buttonStyle}>
          <ListItemIcon style={listItemIconStyle}>
            <ShoppingCartOutlinedIcon style={iconStyle} />
          </ListItemIcon>
          <ListItemText primary="Shopping cart" />
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
          <>
            {props.loggedInUser.isTwoFactorAuthenticationEnabled === false ? (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleShow2faConfig}
                  style={{ marginRight: '20px' }}
                >
                  Enable 2FA
                </Button>
                <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
                  PaperProps={{
                    style: {
                      maxHeight: '100%',
                      maxWidth: '100%',
                    },
                  }}
                >
                  <DialogContent style={dialogContentStyle}>
                    <Typography style={{ textAlign: 'center' }}>
                      Please scan the QR code below using the Google
                      Authenticator application:
                    </Typography>
                    <div>
                      <img
                        src={twoFactorSetup.qrCode}
                        style={{ height: 300, width: 300 }}
                        alt="QR Code"
                      />
                    </div>
                    <Typography style={{ textAlign: 'center' }}>
                      You may also choose to manually enter the code:
                      <br />
                      {twoFactorSetup.manualCode}
                    </Typography>
                    <Grid container>
                      <Grid item style={gridItemStyle} xs={6}>
                        <Button
                          onClick={() => setOpen(false)}
                          variant="contained"
                          color="primary"
                          style={{
                            marginTop: 15,
                            width: 100,
                            backgroundColor: red[500],
                          }}
                        >
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item style={gridItemStyle} xs={6}>
                        <Button
                          onClick={handleTwoFactorEnabled}
                          variant="contained"
                          color="primary"
                          style={{
                            marginTop: 15,
                            width: 100,
                            // backgroundColor: lightGreen[500],
                          }}
                        >
                          Done
                        </Button>
                      </Grid>
                    </Grid>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleTwoFactorDisabling}
                style={{ marginRight: '20px' }}
              >
                Disable 2FA
              </Button>
            )}

            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => props.logoutUser()}
            >
              Log Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar position="relative">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <AdminHeaderButtons></AdminHeaderButtons>
        </div>
        {props.loggedInUser === null ? null : (
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
