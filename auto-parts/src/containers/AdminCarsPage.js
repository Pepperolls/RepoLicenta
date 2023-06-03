import AddCarForm from '../components/AddCarForm';
import DeleteCarForm from '../components/DeleteCarForm';
import UpdateCarForm from '../components/UpdateCarForm';
import { Grid } from '@mui/material';

const AdminCarsPage = () => {
  const centeredDiv = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Grid container style={{ padding: 25 }} spacing={4}>
      <Grid item xs={12} style={centeredDiv}>
        <h3>This is the cars control page</h3>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <AddCarForm />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <UpdateCarForm />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <DeleteCarForm />
      </Grid>
    </Grid>
  );
};

export default AdminCarsPage;
