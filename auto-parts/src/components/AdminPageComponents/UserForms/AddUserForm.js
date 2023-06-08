import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Paper,
  Button,
  TextField,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { useState } from 'react';
import { Typography } from '@mui/material';

toast.configure();

const mainGridStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const switchStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const paperStyle = {
  padding: 20,
  width: '85%',
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

const AddUserForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isAdminSwitchChecked, setIsAdminSwitchChecked] = useState(false);
  const [is2FASwitchChecked, setIs2FASwitchChecked] = useState(false);

  const submitAddUserForm = async data => {
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
          isAdmin: isAdminSwitchChecked,
          isTwoFactorAuthenticationEnabled: is2FASwitchChecked,
        }
      );
      if (res) {
        toast.success('User created successfully!', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 6000,
        });
        reset();
        setIsAdminSwitchChecked(false);
        setIs2FASwitchChecked(false);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 6000,
      });
    }
  };

  return (
    <Grid style={mainGridStyle}>
      <Paper elevation={10} style={paperStyle}>
        <h2>Add a new user</h2>
        <form id="addUserForm" onSubmit={handleSubmit(submitAddUserForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="email"
                margin="normal"
                variant="outlined"
                label="Enter e-mail"
                fullWidth
                error={!!errors.email}
                helperText={errors?.email?.message}
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="username"
                margin="normal"
                variant="outlined"
                label="Enter username"
                fullWidth
                error={!!errors?.username}
                helperText={errors?.username?.message}
                {...register('username')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="password"
                margin="normal"
                variant="outlined"
                type="password"
                label="Enter password"
                fullWidth
                error={!!errors?.password}
                helperText={errors?.password?.message}
                {...register('password')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="confirmPassword"
                margin="normal"
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
                margin="normal"
                variant="outlined"
                label="Enter first name"
                fullWidth
                error={!!errors?.firstName}
                helperText={errors?.firstName?.message}
                {...register('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="lastName"
                margin="normal"
                variant="outlined"
                label="Enter last name"
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
            <Grid item xs={6} style={switchStyle}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isAdminSwitchChecked}
                    color="primary"
                    onChange={event =>
                      setIsAdminSwitchChecked(event.target.checked)
                    }
                  />
                }
                label="Is admin"
              />
            </Grid>
            <Grid item xs={6} style={switchStyle}>
              <FormControlLabel
                control={
                  <Switch
                    checked={is2FASwitchChecked}
                    color="primary"
                    onChange={event =>
                      setIs2FASwitchChecked(event.target.checked)
                    }
                  />
                }
                label="Is 2FA enabled"
              />
              {/* <Typography>* recommended false</Typography> */}
            </Grid>
          </Grid>
        </form>
        <Button
          id="submit"
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit(submitAddUserForm)}
          fullWidth
          style={btnStyle}
        >
          Add user
        </Button>
      </Paper>
    </Grid>
  );
};

export default AddUserForm;
