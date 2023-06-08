import axios from 'axios';
import { Grid, Paper, Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CodeInput from 'react-code-input';
import { useState } from 'react';

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
  width: '23.5%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const btnStyle = {
  margin: '15px 0',
};

const TwoFactorAuthentication = props => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const submit2FACode = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL +
          `/CheckTwoFactorAuthentication/${code}/${props.userToLogin.email}`
      );

      if (res) {
        props.loginUser(props.userToLogin);
        toast.success('Logged in successfully!', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 6000,
        });
        if (props.userToLogin?.isAdmin) {
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
    <Grid container style={mainGridStyle}>
      <Paper elevation={7} style={paperStyle}>
        <img
          src="/images/Logo_blue.png"
          alt="Blue car logo"
          height={'80%'}
          width={'80%'}
          style={{ alignSelf: 'center' }}
        />
        <h1
          style={{
            textAlign: 'center',
            margin: '0px 0px 15px 0px',
            fontSize: '25px',
          }}
        >
          Please enter your 2FA code:
        </h1>
        <Grid container spacing={2}>
          <Grid item xs={12} style={mainGridStyle}>
            <CodeInput
              type="text"
              fields={6}
              value={code}
              onChange={setCode}
              inputStyle={{
                display: 'inline-block',
                textAlign: 'center',
                width: '40px',
                height: '40px',
                margin: '5px',
                fontSize: '18px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </Grid>
        </Grid>
        <Button
          id="submit"
          type="submit"
          color="primary"
          variant="contained"
          onClick={submit2FACode}
          style={btnStyle}
        >
          Submit
        </Button>
      </Paper>
    </Grid>
  );
};

export default TwoFactorAuthentication;
