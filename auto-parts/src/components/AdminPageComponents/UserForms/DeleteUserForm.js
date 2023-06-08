import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Paper, Button, TextField } from '@material-ui/core';

toast.configure();

const mainGridStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const paperStyle = {
  padding: 20,
  width: '85%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const btnStyle = {
  margin: '15px 0',
};

const guidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const schema = yup
  .object()
  .shape({
    userGuid: yup
      .string()
      .matches(guidRegex, 'This field should be a GUID.')
      .required('The user Guid is required.'),
  })
  .required();

const DeleteUserForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitDeleteUserForm = async data => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL + `/DeleteUserByGuid/${data.userGuid}`
      );
      if (res) {
        toast.success('User deleted successfully!', {
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
        <h2>Delete an existing user</h2>
        <form
          id="deleteUserForm"
          style={{ minWidth: '530px' }}
          onSubmit={handleSubmit(submitDeleteUserForm)}
        >
          <TextField
            name="userGuid"
            margin="normal"
            variant="outlined"
            label="Enter user GUID"
            fullWidth
            error={!!errors?.userGuid}
            helperText={errors?.userGuid?.message}
            {...register('userGuid')}
          />
        </form>
        <Button
          id="submit"
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit(submitDeleteUserForm)}
          fullWidth
          style={btnStyle}
        >
          Delete user
        </Button>
      </Paper>
    </Grid>
  );
};

export default DeleteUserForm;
