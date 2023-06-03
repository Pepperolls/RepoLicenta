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
  width: '70%',
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
    carGuid: yup
      .string()
      .matches(guidRegex, 'This field should be a GUID.')
      .required('The car Guid is required.'),
  })
  .required();

const DeleteCarForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitDeleteCarForm = async data => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL + `/DeleteCarByGuid/${data.carGuid}`
      );
      if (res) {
        toast.success('Car deleted successfully!', {
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
        <h2>Delete an existing car</h2>
        <form
          id="deleteCarForm"
          style={{ minWidth: '410px' }}
          onSubmit={handleSubmit(submitDeleteCarForm)}
        >
          <TextField
            name="carGuid"
            margin="normal"
            variant="outlined"
            label="Enter car GUID"
            fullWidth
            error={!!errors?.carGuid}
            helperText={errors?.carGuid?.message}
            {...register('carGuid')}
          />
        </form>
        <Button
          id="submit"
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit(submitDeleteCarForm)}
          fullWidth
          style={btnStyle}
        >
          Delete car
        </Button>
      </Paper>
    </Grid>
  );
};

export default DeleteCarForm;
