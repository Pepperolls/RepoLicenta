import { Grid } from '@mui/material';
import { MailOutline, Phone } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const mainGridStyle = {
    display: 'flex',
    width: '100vw',
    maxHeight: '160px',
    backgroundColor: '#3f51b5',
    color: 'white',
    marginTop: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const gridItemStyle = {
    maxWidth: '22%',
    padding: '10px 0px 10px 45px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const centeredFlex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    !(
      location?.pathname === '/AdminHomePage' ||
      location?.pathname === '/AdminCarsPage' ||
      location?.pathname === '/AdminUsersPage' ||
      location?.pathname === '/AdminPartsPage'
    ) && (
      <Grid container style={mainGridStyle}>
        <Grid item xs={4} style={gridItemStyle}>
          <div>
            <h2>CarLounge</h2>
            <p>
              Never let your car feel left out of your life. Keep it maintained,
              using the most reliable parts provider.
            </p>
          </div>
        </Grid>
        <Grid item xs={4} style={gridItemStyle}>
          <div>
            <div style={centeredFlex}>
              <h3>Contact</h3>
            </div>
            <div style={centeredFlex}>
              <Phone style={{ paddingRight: 10 }} /> <span>+0712 345 678</span>
            </div>
            <div style={centeredFlex}>
              <MailOutline style={{ paddingRight: 10 }} />
              <span>contact@carlounge.org</span>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  );
};

export default Footer;
