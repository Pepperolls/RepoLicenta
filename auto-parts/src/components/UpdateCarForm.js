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
    carMake: yup
      .string('The car make must be a valid string.')
      .required('The car make is required.')
      .min(4, 'The car make must have at least 4 characters.'),
    carModel: yup
      .string('The car model must be a valid string.')
      .required('The car model is required.')
      .min(2, 'The car model must have at least 2 characters.'),
    carFabricationYear: yup
      .number('The car fabrication year should be a valid number.')
      .typeError('The fabrication year must be a valid number.')
      .min(1990, 'The car fabrication year can not be less than 1990.')
      .max(2023, 'The car fabrication year can not be higher than 2023.'),
    carCubicCapacity: yup
      .number('The car cubic capacity should be a valid number.')
      .typeError('The cubic capacity must be a valid number.')
      .min(700, 'The car cubic capacity can not be less than 700 cc.')
      .max(8200, 'The car cubic capacity can not be higher than 8200 cc.'),
    carFuelType: yup
      .string('The car fuel type must be a valid string.')
      .required('The car fuel type is required.')
      .matches(
        /^(Petrol|Diesel|Electric)$/,
        'The fuel type can be either Petrol, Diesel, or Electric.'
      ),
  })
  .required();

const UpdateCarForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitUpdateCarForm = async data => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + `/UpdateCar/${data.carGuid}`,
        {
          make: data.carMake,
          model: data.carModel,
          fabricationYear: data.carFabricationYear,
          cubicCapacity: data.carCubicCapacity,
          fuelType: data.carFuelType,
        }
      );
      if (res) {
        toast.success('Car updated successfully!', {
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
        <h2>Update an existing car</h2>
        <form id="addCarForm" onSubmit={handleSubmit(submitUpdateCarForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="carMake"
                margin="normal"
                variant="outlined"
                label="Enter car make"
                fullWidth
                error={!!errors?.carMake}
                helperText={errors?.carMake?.message}
                {...register('carMake')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="carModel"
                margin="normal"
                variant="outlined"
                label="Enter car model"
                fullWidth
                error={!!errors.carModel}
                helperText={errors?.carModel?.message}
                {...register('carModel')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="carFabricationYear"
                margin="normal"
                variant="outlined"
                label="Enter fabrication year"
                fullWidth
                error={!!errors?.carFabricationYear}
                helperText={errors?.carFabricationYear?.message}
                {...register('carFabricationYear')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="carCubicCapacity"
                margin="normal"
                variant="outlined"
                label="Enter car cubic capacity"
                fullWidth
                error={!!errors?.carCubicCapacity}
                helperText={errors?.carCubicCapacity?.message}
                {...register('carCubicCapacity')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="carFuelType"
                margin="normal"
                variant="outlined"
                label="Enter car fuel type"
                fullWidth
                error={!!errors?.carFuelType}
                helperText={errors?.carFuelType?.message}
                {...register('carFuelType')}
              />
            </Grid>
          </Grid>
        </form>
        <Button
          id="submit"
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit(submitUpdateCarForm)}
          fullWidth
          style={btnStyle}
        >
          Update car
        </Button>
      </Paper>
    </Grid>
  );
};

export default UpdateCarForm;
