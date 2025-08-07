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

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      clientno: '',
      fname: '',
      lname: '',
      telno: '',
      street: '',
      city: '',
      email: '',
      preftype: '',
      maxrent: '',
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
              ['clientno', 'Client No'],
              ['fname', 'First Name'],
              ['lname', 'Last Name'],
              ['telno', 'Telephone Number'],
              ['street', 'Street Address'],
              ['city', 'City'],
              ['email', 'Email'],
              ['preftype', 'Housing Preference'],
              ['maxrent', 'Maximum Rent'],
            ].map(([name, label]) => (
              <Grid item xs={12} sm={6} key={name}>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={label}
                      fullWidth
                      size="small"
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
