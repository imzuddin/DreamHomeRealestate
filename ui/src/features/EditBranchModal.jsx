import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useUpdateBranchMutation } from './api/apiSlice';

export default function EditBranchModal({ open, onClose, branch }) {
  const [updateBranch, { isLoading, isSuccess, isError }] =
    useUpdateBranchMutation();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      street: branch.street,
      city: branch.city,
      postcode: branch.postcode,
    },
  });

  useEffect(() => {
    reset({
      street: branch.street,
      city: branch.city,
      postcode: branch.postcode,
    });
  }, [branch, reset]);

  const onSubmit = async (data) => {
    await updateBranch({ branchno: branch.branchno, ...data });
    if (!isError) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ borderRadius: '100px' }}
    >
      <DialogTitle>Edit Branch Information</DialogTitle>
      <DialogContent sx={{ padding: '10px' }}>
        <form id="edit-staff-form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {[
              ['street', 'Street'],
              ['city', 'City'],
              ['postcode', 'Postal Code'],
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
                      variant="outlined"
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
          form="edit-staff-form"
          variant="contained"
          disabled={isLoading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
