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
import { useCreateBranchMutation } from './api/apiSlice';

export default function BranchForm({ open, onClose }) {
  const [createBranch, { isLoading, isSuccess, isError }] =
    useCreateBranchMutation();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      branchno: '',
      street: '',
      city: '',
      postcode: '',
    },
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess, onClose, reset]);

  const onSubmit = async (data) => {
    await createBranch({
      ...data,
    }).unwrap();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle> Add New Branch </DialogTitle>
      <DialogContent>
        <form id="edit-branch-form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {[
              ['branchno', 'Branch ID'],
              ['street', 'Street Address'],
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
          form="edit-branch-form"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? 'Saving' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
