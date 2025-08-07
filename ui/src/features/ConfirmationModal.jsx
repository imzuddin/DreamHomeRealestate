import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

export default function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle> Confirmation </DialogTitle>
      <DialogContent>
        <Typography> {message} </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>No</Button>
        <Button onClick={onConfirm} variant="contained" autofocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
