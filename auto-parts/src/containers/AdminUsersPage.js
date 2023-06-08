import { Grid } from '@mui/material';
import AddUserForm from '../components/AdminPageComponents/UserForms/AddUserForm';
import DeleteUserForm from '../components/AdminPageComponents/UserForms/DeleteUserForm';
import UpdateUserForm from '../components/AdminPageComponents/UserForms/UpdateUserForm';

const AdminUsersPage = () => {
  const centeredDiv = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Grid container style={{ padding: 25 }}>
      <Grid item xs={12} style={centeredDiv}>
        <h3>This is the users control page</h3>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <AddUserForm />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <UpdateUserForm />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <DeleteUserForm />
      </Grid>
    </Grid>
  );
};

export default AdminUsersPage;
