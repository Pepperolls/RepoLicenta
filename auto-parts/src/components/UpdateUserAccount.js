import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../redux/actions/productActions';

toast.configure();

const mainGridStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
};

const paperStyle = {
  padding: 20,
  width: '35%',
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
    email: yup.string().email('E-mail is invalid.'),
    username: yup.string(),
    password: yup
      .string()
      .min(4, 'The password must have at least 4 characters.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'The passwords should match.'),
    firstName: yup.string(),
    lastName: yup.string(),
    country: yup.string(),
    city: yup.string(),
    zipCode: yup.string(),
    addressLine: yup.string(),
    phoneNumber: yup.string(),
  })
  .required();

const UpdateUserAccount = props => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitUpdateProfileForm = async data => {
    try {
      console.log(data);
      console.log(props.loggedInUser);
      const res = await axios.put(
        process.env.REACT_APP_API_URL +
          `/UpdateUser/${props.loggedInUser.userId}`,
        {
          email: data.email ? data.email : props.loggedInUser.email,
          username: data.username ? data.username : props.loggedInUser.username,
          password: data.password ? data.password : props.loggedInUser.password,
          firstName: data.firstName
            ? data.firstName
            : props.loggedInUser.firstName,
          lastName: data.lastName ? data.lastName : props.loggedInUser.lastName,
          country: data.country ? data.country : props.loggedInUser.country,
          city: data.city ? data.city : props.loggedInUser.city,
          zipCode: data.zipCode ? data.zipCode : props.loggedInUser.zipCode,
          address: data.addressLine
            ? data.addressLine
            : props.loggedInUser.addressLine,
          phoneNumber: data.phoneNumber ? data.email : props.loggedInUser.email,
          isAdmin: props.loggedInUser.isAdmin,
          isTwoFactorAuthenticationEnabled:
            props.loggedInUser.is2FASwitchChecked,
        }
      );
      if (res) {
        toast.success('Profile updated successfully!', {
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
    <Grid container style={mainGridStyle}>
      <Paper elevation={10} style={paperStyle}>
        <h2>Update account details</h2>
        <form
          id="updateProfileForm"
          onSubmit={handleSubmit(submitUpdateProfileForm)}
        >
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
          </Grid>
        </form>
        <Button
          id="submit"
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit(submitUpdateProfileForm)}
          fullWidth
          style={btnStyle}
        >
          Update profile
        </Button>
      </Paper>
    </Grid>
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
  return { ...bindActionCreators(productActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserAccount);
