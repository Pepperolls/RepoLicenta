import AddPartForm from '../components/AddPartForm';
import Grid from '@material-ui/core/Grid';
import UpdatePartForm from '../components/UpdatePartForm';
import DeletePartForm from '../components/DeletePartForm';

const AdminPartsPage = () => {
  const centeredDiv = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Grid container style={{ padding: 25 }} spacing={4}>
      <Grid item xs={12} style={centeredDiv}>
        <h3>This is the products control page</h3>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <AddPartForm />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <UpdatePartForm />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <DeletePartForm />
      </Grid>
    </Grid>
  );
};

export default AdminPartsPage;
