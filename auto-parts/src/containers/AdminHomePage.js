import { Box } from '@material-ui/core';
import { Typography } from '@mui/material';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/actions/UserActions';

const centeredDiv = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgb(63, 81, 181)',
  height: '83.1vh',
  padding: '50px',
  color: '#fff',
};

const imageWithButtonDiv = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: 'auto',
  paddingTop: 45,
};

const AdminHomePage = props => {
  return (
    <div style={centeredDiv}>
      <div>
        <Typography variant="h2">
          <Box fontWeight="bold">CarLounge</Box>
        </Typography>
        <Typography variant="h3">This is the admin home page.</Typography>
      </div>
      <div style={imageWithButtonDiv}>
        <Typography variant="h3">
          Welcome, {props.loggedInUser.firstName}!
        </Typography>
        <img src="/images/HomeCar.png" alt="Home page car"></img>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomePage);
