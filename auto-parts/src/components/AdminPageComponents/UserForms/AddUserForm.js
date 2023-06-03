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

toast.configure();

const mainGridStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const paperStyle = {
  padding: 20,
  width: '70%',
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

  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

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
          isAdmin: isSwitchChecked,
        }
      );
      if (res) {
        toast.success('User created successfully!', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 6000,
        });
        reset();
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
            <Grid item xs={12} style={mainGridStyle}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isSwitchChecked}
                    color="primary"
                    onChange={event => setIsSwitchChecked(event.target.checked)}
                  />
                }
                label="Is admin"
              />
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
