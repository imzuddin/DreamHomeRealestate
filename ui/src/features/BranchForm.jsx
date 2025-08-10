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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
              ['street', 'Street Address', { required: 'Field is required' }],
              ['city', 'City', { required: 'Field is required' }],
              [
                'postcode',
                'Postal Code',
                {
                  required: 'Field is required',
                  pattern: {
                    value: /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/,
                    message: 'Format A1A 1A1',
                  },
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
