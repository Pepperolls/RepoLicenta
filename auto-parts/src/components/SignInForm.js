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

toast.configure();

const mainGridStyle = {
  minHeight: '88.5vh',
  minWidth: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
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

const SignInForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitLoginForm = async data => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL +
          `/LoginUser/${data.usernameOrEmail}/${data.password}`
      );

      if (res) {
        toast.success('Logged in successfully!', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 6000,
        });
        if (res.data?.isAdmin) {
          navigate('/AdminHomePage');
        } else {
          navigate('/Products');
        }
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
        <img
          src="/images/Logo_blue.png"
          alt="Blue car logo"
          height={'65%'}
          width={'65%'}
          style={{ alignSelf: 'center' }}
        />
        <form onSubmit={handleSubmit(submitLoginForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
  );
};

export default SignInForm;
