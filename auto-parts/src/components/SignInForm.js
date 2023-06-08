import axios from 'axios';
import {
  Grid,
  Paper,
  Button,
  TextField,
  Typography,
  Link,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/actions/UserActions';
import { useState } from 'react';
import TwoFactorAuthentication from './TwoFactorAuthentication';

toast.configure();

const mainGridStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 'auto',
};

const paperStyle = {
  padding: 20,
  height: '100%',
  width: '27.5%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const btnStyle = {
  margin: '15px 0',
};

const schema = yup
  .object()
  .shape({
    usernameOrEmail: yup.string().required('E-mail or username is required.'),
    password: yup.string().required('Password is required.'),
  })
  .required();

const SignInForm = props => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [display2FA, setDisplay2FA] = useState(false);
  const [userToLogin, setUserToLogin] = useState({});

  const submitLoginForm = async data => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL +
          `/LoginUser/${data.usernameOrEmail}/${data.password}`
      );

      if (res) {
        if (!res.data.isTwoFactorAuthenticationEnabled) {
          props.loginUser(res.data);
          toast.success('Logged in successfully!', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 6000,
          });
          if (res.data?.isAdmin) {
            navigate('/AdminHomePage');
          } else {
            navigate('/Products');
          }
        } else {
          setUserToLogin(res.data);
          setDisplay2FA(true);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 6000,
      });
    }
  };

  return display2FA === false ? (
    <Grid container style={mainGridStyle}>
      <Paper elevation={7} style={paperStyle}>
        <img
          src="/images/Logo_blue.png"
          alt="Blue car logo"
          height={'65%'}
          width={'65%'}
          style={{ alignSelf: 'center' }}
        />
        <form onSubmit={handleSubmit(submitLoginForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="usernameOrEmail"
                margin="normal"
                variant="outlined"
                label="Enter e-mail or username"
                fullWidth
                error={!!errors.usernameOrEmail}
                helperText={errors?.usernameOrEmail?.message}
                {...register('usernameOrEmail')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                variant="outlined"
                type="password"
                label="Enter password"
                fullWidth
                error={!!errors.password}
                helperText={errors?.password?.message}
                {...register('password')}
              />
            </Grid>
          </Grid>
        </form>
        <Button
          id="submit"
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit(submitLoginForm)}
          fullWidth
          style={btnStyle}
        >
          Sign In
        </Button>
        <Typography style={{ marginTop: '5px' }}>
          <Link href="#">Forgot password</Link>
        </Typography>
        <Typography>
          {' '}
          Don't have an account?{' '}
          <Link href="#" onClick={() => navigate('/SignUp')}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  ) : (
    <TwoFactorAuthentication
      userToLogin={userToLogin}
      loginUser={props.loginUser}
    ></TwoFactorAuthentication>
  );
};

function mapStateToProps(state) {
  const { loggedInUser } = state;
  return {
    loggedInUser,
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(userActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
