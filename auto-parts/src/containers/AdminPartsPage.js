import Grid from '@material-ui/core/Grid';
import AddPartForm from '../components/AdminPageComponents/PartForms/AddPartForm';
import DeletePartForm from '../components/AdminPageComponents/PartForms/DeletePartForm';
import UpdatePartForm from '../components/AdminPageComponents/PartForms/UpdatePartForm';

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
        <h3>This is the parts control page</h3>
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
