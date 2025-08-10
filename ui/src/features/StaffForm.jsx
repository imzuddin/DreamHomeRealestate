import React, { useEffect, useState } from 'react';
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
  MenuItem,
} from '@mui/material';
import { useGetBranchesQuery, useHireStaffMutation } from './api/apiSlice';

export default function StaffForm({ open, onClose }) {
  const [hireStaff, { isLoading, isSuccess, isError }] = useHireStaffMutation();
  const { data: branches = [], isLoading: branchesLoading } =
    useGetBranchesQuery();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      staffno: '',
      fname: '',
      lname: '',
      position: '',
      sex: '',
      dob: '',
      salary: 0,
      branchno: '',
      telephone: '',
      mobile: '',
      email: '',
    },
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess, onClose, reset]);

  const onSubmit = async (data) => {
    await hireStaff({
      ...data,
      salary: parseFloat(data.salary),
    }).unwrap();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle> Hire New Staff </DialogTitle>
      <DialogContent>
        <form id="hire-staff-form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="branchno"
                control={control}
                rules={{ required: 'Branch is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Branch No"
                    fullWidth
                    size="small"
                    error={!!errors.branchno}
                    helperText={errors.branchno?.message}
                  >
                    {branchesLoading ? (
                      <MenuItem value="">
                        <em>Loading…</em>
                      </MenuItem>
                    ) : (
                      branches.map((b) => (
                        <MenuItem key={b.branchno} value={b.branchno}>
                          {b.branchno} — {b.street}, {b.city}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                )}
              />
            </Grid>
            {[
              ['fname', 'First Name', { required: 'Field is required' }],
              ['lname', 'Last Name', { required: 'Field is required' }],
              ['position', 'Position', { required: 'Field is required' }],
              [
                'sex',
                'Sex',
                {
                  required: 'Field is required',
                  pattern: {
                    value: /^(M|F|NB)$/,
                    message: 'Use "M" or "F" or "NB"',
                  },
                },
              ],
              [
                'dob',
                'DOB (YYYY-MM-DD)',
                {
                  required: 'Field is required',
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: 'Use YYYY-MM-DD',
                  },
                },
              ],
              [
                'salary',
                'Salary',
                {
                  required: 'Field is required',
                  min: { value: 0, message: 'Salary must be non-negative' },
                },
              ],
              [
                'telephone',
                'Telephone',
                {
                  required: 'Field is required',
                  pattern: {
                    value: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                    message: 'Use format 123-456-7890',
                  },
                },
              ],
              [
                'mobile',
                'Mobile',
                {
                  required: 'Field is required',
                  pattern: {
                    value: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                    message: 'Use format 123-456-7890',
                  },
                },
              ],
              ['email', 'Email', { required: 'Field is required' }],
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
          form="hire-staff-form"
          variant="contained"
          disabled={isLoading}
        >
          Hire
        </Button>
      </DialogActions>
    </Dialog>
  );
}
