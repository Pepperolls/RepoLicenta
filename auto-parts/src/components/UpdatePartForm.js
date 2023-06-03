import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Paper,
  Button,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { useState } from 'react';

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
    partGuid: yup
      .string()
      .matches(guidRegex, 'This field should be a GUID.')
      .required('The part Guid is required.'),
    referencedCarGuid: yup
      .string()
      .matches(guidRegex, 'This field should be a GUID.')
      .required('The referenced car Guid is required.'),
    partName: yup
      .string('The part name must be a valid string.')
      .min(4, 'The part name must have at least 4 characters.')
      .required('The part name is required.'),
    partPrice: yup
      .number('The price must be a valid number.')
      .typeError('The price must be a valid number.')
      .positive('The price must be a positive number.')
      .required('The price is required.'),
    partCategory: yup.string(),
    partDescription: yup.string(),
    partImageUrl: yup.string(),
  })
  .required();

const UpdatePartForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isPriceFieldSelected, setIsPriceFieldSelected] = useState(false);
  const submitUpdatePartForm = async data => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + `/UpdatePart/${data.partGuid}`,
        {
          fK_CarGuid: data.referencedCarGuid,
          name: data.partName,
          price: data.partPrice,
          category: data.partCategory,
          description: data.partDescription,
          imgUrl: data.partImageUrl,
        }
      );
      if (res) {
        toast.success('Part updated successfully!', {
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
        <h2>Update an existing part</h2>
        <form id="updatePartForm" onSubmit={handleSubmit(submitUpdatePartForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="partGuid"
                margin="normal"
                variant="outlined"
                label="Enter part GUID"
                fullWidth
                error={!!errors?.partGuid}
                helperText={errors?.partGuid?.message}
                onFocus={e => setIsPriceFieldSelected(false)}
                {...register('partGuid')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="referencedCarGuid"
                margin="normal"
                variant="outlined"
                label="Enter referenced car GUID"
                fullWidth
                error={!!errors?.referencedCarGuid}
                helperText={errors?.referencedCarGuid?.message}
                onFocus={e => setIsPriceFieldSelected(false)}
                {...register('referencedCarGuid')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="partName"
                margin="normal"
                variant="outlined"
                label="Enter part name"
                fullWidth
                error={!!errors.partName}
                helperText={errors?.partName?.message}
                onFocus={e => setIsPriceFieldSelected(false)}
                {...register('partName')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="partPrice"
                margin="normal"
                variant="outlined"
                label="Enter price"
                InputProps={{
                  startAdornment: isPriceFieldSelected && (
                    <InputAdornment>$</InputAdornment>
                  ),
                }}
                onFocus={e => setIsPriceFieldSelected(true)}
                onBlur={e => setIsPriceFieldSelected(false)}
                fullWidth
                error={!!errors?.partPrice}
                helperText={errors?.partPrice?.message}
                {...register('partPrice')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="partCategory"
                margin="normal"
                variant="outlined"
                label="Enter category"
                fullWidth
                error={!!errors?.partCategory}
                helperText={errors?.partCategory?.message}
                onFocus={e => setIsPriceFieldSelected(false)}
                {...register('partCategory')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name="partImageUrl"
                margin="normal"
                variant="outlined"
                label="Enter part image url"
                fullWidth
                error={!!errors?.partImageUrl}
                helperText={errors?.partImageUrl?.message}
                onFocus={e => setIsPriceFieldSelected(false)}
                {...register('partImageUrl')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="partDescription"
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
                label="Enter part description"
                fullWidth
                error={!!errors?.partDescription}
                helperText={errors?.partDescription?.message}
                onFocus={e => setIsPriceFieldSelected(false)}
                {...register('partDescription')}
              />
            </Grid>
          </Grid>
        </form>
        <Button
          id="submit"
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit(submitUpdatePartForm)}
          fullWidth
          style={btnStyle}
        >
          Update part
        </Button>
      </Paper>
    </Grid>
  );
};

export default UpdatePartForm;
