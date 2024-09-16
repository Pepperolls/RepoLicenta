import {
  AppBar,
  Dialog,
  ListItemText,
  ListItemIcon,
  Typography,
  Grid,
  Menu,
  MenuItem,
} from '@material-ui/core';
import Toolbar from '@mui/material/Toolbar';
import Button from '@material-ui/core/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
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

const centeredFlex = {
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

toast.configure();

const AppHeader = props => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open2FADialog, setOpen2FADialog] = useState(false);
  const [twoFactorSetup, setTwoFactorSetup] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenUserMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateAccount = () => {
    navigate('/UpdateUserAccount');
    handleClose();
  };

  const handleLogout = () => {
    props.logoutUser();
    handleClose();
  };

  const getTwoFactorSetup = async () => {
    const settings = await axios.get(
      process.env.REACT_APP_API_URL +
        `/EnableTwoFactorAuthentication/${props.loggedInUser.email}`
    );

    setTwoFactorSetup(settings.data);
  };

  async function handleShow2faConfig() {
    getTwoFactorSetup();
    setOpen2FADialog(true);
  }

  async function handleTwoFactorEnabled() {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL +
          `/UpdateUser/${props.loggedInUser.userId}?encryptPassword=false`,
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
    setOpen2FADialog(false);
  }

  async function handleTwoFactorDisabling() {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL +
          `/UpdateUser/${props.loggedInUser.userId}?encryptPassword=false`,
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
            <Button
              aria-controls="dropdown-menu"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              startIcon={<AccountCircleOutlined style={iconStyle} />}
              endIcon={<ExpandMoreOutlined style={iconStyle} />}
              color="secondary"
              size="large"
              style={buttonStyle}
            >
              <ListItemText primary={props.loggedInUser.firstName} />
            </Button>
            <Menu
              id="dropdown-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {props.loggedInUser.isTwoFactorAuthenticationEnabled === false ? (
                <>
                  <MenuItem style={centeredFlex}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth
                      onClick={handleShow2faConfig}
                    >
                      Enable 2FA
                    </Button>
                    <Dialog
                      open={open2FADialog}
                      onClose={() => setOpen2FADialog(false)}
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
                          <Grid item style={centeredFlex} xs={6}>
                            <Button
                              onClick={() => setOpen2FADialog(false)}
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
                          <Grid item style={centeredFlex} xs={6}>
                            <Button
                              onClick={handleTwoFactorEnabled}
                              variant="contained"
                              color="primary"
                              style={{
                                marginTop: 15,
                                width: 100,
                              }}
                            >
                              Done
                            </Button>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem style={centeredFlex}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth
                      onClick={handleTwoFactorDisabling}
                    >
                      Disable 2FA
                    </Button>
                  </MenuItem>
                </>
              )}
              <MenuItem style={centeredFlex}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={handleUpdateAccount}
                >
                  Update account
                </Button>
              </MenuItem>
              <MenuItem style={centeredFlex}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </MenuItem>
            </Menu>
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
