import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import {
  Grid,
  Paper,
  Button,
  TextField,
  Typography,
  Link,
} from '@material-ui/core';

toast.configure();

const mainGridStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 'auto',
};

const paperStyle = {
  padding: '0px 20px 10px 20px',
  height: '100%',
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const btnStyle = {
  margin: '30px 0px 15px 0px',
};

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('E-mail is invalid.')
      .required('E-mail is required.'),
    username: yup.string().required('Username is required.'),
    password: yup
      .string()
      .required('Password is required.')
      .min(4, 'The password must have at least 4 characters.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'The passwords should match.'),
    firstName: yup.string().required('First name is required.'),
    lastName: yup.string().required('Last name is required.'),
    country: yup.string().required('Country is required.'),
    city: yup.string().required('City is required.'),
    zipCode: yup.string().required('Zip code is required.'),
    addressLine: yup.string().required('Address is required.'),
    phoneNumber: yup.string().required('Phone number is required.'),
  })
  .required();

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitSignUpForm = async data => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + '/CreateUser',
        {
          email: data.email,
          username: data.username,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          city: data.city,
          zipCode: data.zipCode,
          address: data.addressLine,
          phoneNumber: data.phoneNumber,
        }
      );

      if (res) {
        toast.success('Account created successfully!', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 6000,
        });
        navigate('/LogIn');
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 6000,
      });
    }
  };

  return (
    <Grid container style={mainGridStyle}>
      <Paper elevation={7} style={paperStyle}>
        <img
          src="/images/Logo_blue.png"
          alt="Blue car logo"
          height={'65%'}
          width={'65%'}
          style={{ alignSelf: 'center' }}
        />
        <form id="signUpForm" onSubmit={handleSubmit(submitSignUpForm)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="email"
                variant="outlined"
                label="E-mail"
                fullWidth
                error={!!errors.email}
                helperText={errors?.email?.message}
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="username"
                variant="outlined"
                label="Username"
                fullWidth
                error={!!errors?.username}
                helperText={errors?.username?.message}
                {...register('username')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="password"
                variant="outlined"
                type="password"
                label="Password"
                fullWidth
                error={!!errors?.password}
                helperText={errors?.password?.message}
                {...register('password')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="confirmPassword"
                variant="outlined"
                type="password"
                label="Confirm password"
                fullWidth
                error={!!errors?.confirmPassword}
                helperText={
                  errors?.confirmPassword?.message && 'Passwords should match'
                }
                {...register('confirmPassword')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="firstName"
                variant="outlined"
                label="First name"
                fullWidth
                error={!!errors?.firstName}
                helperText={errors?.firstName?.message}
                {...register('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="lastName"
                variant="outlined"
                label="Last name"
                fullWidth
                error={!!errors?.lastName}
                helperText={errors?.lastName?.message}
                {...register('lastName')}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <TextField
                name="country"
                variant="outlined"
                label="Country"
                fullWidth
                error={!!errors?.country}
                helperText={errors?.country?.message}
                {...register('country')}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <TextField
                name="city"
                variant="outlined"
                label="City"
                fullWidth
                error={!!errors?.city}
                helperText={errors?.city?.message}
                {...register('city')}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <TextField
                name="zipCode"
                variant="outlined"
                label="Zip code"
                fullWidth
                error={!!errors?.zipCode}
                helperText={errors?.zipCode?.message}
                {...register('zipCode')}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
              <TextField
                name="addressLine"
                variant="outlined"
                label="Address line"
                fullWidth
                error={!!errors?.addressLine}
                helperText={errors?.addressLine?.message}
                {...register('addressLine')}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <TextField
                name="phoneNumber"
                variant="outlined"
                label="Phone number"
                fullWidth
                error={!!errors?.phoneNumber}
                helperText={errors?.phoneNumber?.message}
                {...register('phoneNumber')}
              />
            </Grid>
          </Grid>
        </form>
        <Button
          id="submit"
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit(submitSignUpForm)}
          fullWidth
          style={btnStyle}
        >
          Sign Up
        </Button>
        <Typography>
          Already have an account?{' '}
          <Link href="#" onClick={() => navigate('/LogIn')}>
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignUp;
