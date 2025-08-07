import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Construction from '@mui/icons-material/Construction';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { skipToken } from '@reduxjs/toolkit/query/react';
import {
  useGetBranchesQuery,
  useCreateBranchMutation,
  useGetBranchAddressQuery,
} from '../features/api/apiSlice';
import EditBranchModal from '../features/EditBranchModal';
import BranchForm from '../features/BranchForm';

export default function BranchPage() {
  const { data: branches = [], isLoading, isError } = useGetBranchesQuery();

  const [createBranch] = useCreateBranchMutation();

  const [formOpen, setFormOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchNoForAddress, setBranchNoForAddress] = useState(null);

  const {
    data: branchAddress,
    isLoading: addressLoading,
    isError: addressError,
  } = useGetBranchAddressQuery(
    branchNoForAddress != null ? branchNoForAddress : skipToken
  );

  const handleRowClick = (branch) => {
    setSelectedBranch(branch);
    setModalOpen(true);
  };

  const handleAddressCopy = (branchno) => {
    console.log(branchno);
    setBranchNoForAddress(branchno);
  };

  useEffect(() => {
    if (branchAddress) {
      const txt = branchAddress.address;
      navigator.clipboard
        .writeText(txt)
        .then(() => console.log('📋 Address copied!', txt))
        .catch((err) => console.error('Copy failed', err));
    }
  }, [branchAddress]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Card fullWidth sx={{ marginBottom: '10px', width: '100%' }}>
        <CardContent fullWidth>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Branch Directory
          </Typography>
        </CardContent>
      </Card>

      {isLoading ? (
        <Typography> Loading ... </Typography>
      ) : isError ? (
        <Typography> Error Loading Clients </Typography>
      ) : (
        <Paper sx={{ width: '100%', mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Branch No', 'Street', 'City', 'Postal Code', '', ''].map(
                  (col) => (
                    <TableCell key={col}>{col}</TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {branches.map((values) => (
                <TableRow key={values.brancno} sx={{ cursor: 'pointer' }}>
                  <TableCell>{values.branchno}</TableCell>
                  <TableCell>{values.street}</TableCell>
                  <TableCell>{values.city}</TableCell>
                  <TableCell>{values.postcode}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleRowClick(values)}
                      size="small"
                    >
                      <Construction />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleAddressCopy(values.branchno)}
                      size="small"
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ padding: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setFormOpen(true)}
            >
              Add Branch
            </Button>
          </Box>
        </Paper>
      )}

      <BranchForm open={formOpen} onClose={() => setFormOpen(false)} />
      {selectedBranch && (
        <EditBranchModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          branch={selectedBranch}
        />
      )}
    </Container>
  );
}
