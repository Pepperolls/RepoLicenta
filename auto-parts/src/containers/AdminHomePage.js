import { Grid } from '@mui/material';

const AdminHomePage = () => {
  const centeredDiv = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <Grid container style={{ padding: 25 }} spacing={4}>
      <Grid item xs={12} style={centeredDiv}>
        <h3>This is the admin home page</h3>
      </Grid>
    </Grid>
  );
};

export default AdminHomePage;
