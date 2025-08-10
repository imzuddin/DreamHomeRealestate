import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useRegisterClientMutation } from './api/apiSlice';

export default function ClientForm({ open, onClose }) {
  const [addClient, { isLoading, isSuccess, isError }] =
    useRegisterClientMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clientno: '',
      fname: '',
      lname: '',
      telno: '',
      street: '',
      city: '',
      email: '',
      preftype: '',
      maxrent: 0,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess, onClose, reset]);

  const onSubmit = async (data) => {
    await addClient({
      ...data,
    }).unwrap();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle> Add New Client </DialogTitle>
      <DialogContent>
        <form id="add-client-form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {[
              ['fname', 'First Name', { required: 'Field is required' }],
              ['lname', 'Last Name', { required: 'Field is required' }],
              [
                'telno',
                'Telephone Number',
                {
                  required: 'Field is required',
                  pattern: {
                    value: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                    message: 'Use format 123-456-7890',
                  },
                },
              ],
              ['street', 'Street Address', { required: 'Field is required' }],
              ['city', 'City', { required: 'Field is required' }],
              ['email', 'Email', { required: 'Field is required' }],
              [
                'preftype',
                'Housing Preference',
                { required: 'Field is required' },
              ],
              [
                'maxrent',
                'Maximum Rent',
                {
                  required: 'Field is required',
                  min: { value: 0, message: 'Salary must be non-negative' },
                },
              ],
            ].map(([name, label, rules]) => (
              <Grid item xs={12} sm={6} key={name}>
                <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={label}
                      fullWidth
                      size="small"
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="add-client-form"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? 'Saving' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
