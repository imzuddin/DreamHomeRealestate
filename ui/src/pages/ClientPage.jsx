import React, { useState } from "react";
import { Box, Button, Card, CardContent, Container, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetClientsQuery, useDeleteClientMutation } from "../features/api/apiSlice";
import ConfirmDialog from "../features/ConfirmationModal";
import ClientForm from "../features/ClientForm"; 

export default function ClientsPage() {
    const {data: clients = [], isLoading, isError } = useGetClientsQuery();
    const [ deleteClient ] = useDeleteClientMutation();

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ deleteID, setDeleteID ] = useState(null);
    const [ confirmationOpen, setConfirmationOpen] = useState(false);
    
    const handleRowClick = (clientNo) => {
        setConfirmationOpen(true);
        setDeleteID(clientNo)
    }

    const handleDelete = (clientNo) => {
        setConfirmationOpen(false);
        deleteClient(clientNo)
    }
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Card fullWidth sx={{ marginBottom: "10px", width: "100%"}}>
                <CardContent fullWidth>
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        Clients Directory
                    </Typography>
                </CardContent>
            </Card>

            {isLoading ? (
                <Typography> Loading ... </Typography>
            ) : isError ? (
                <Typography> Error Loading Clients </Typography>
            ) : (
                <Paper sx={{ width: "100%", mb: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {[
                                    "Client No",
                                    "First Name",
                                    "Last Name",
                                    "Telephone",
                                    "Street",
                                    "City",
                                    "Email",
                                    "Pref Type",
                                    "Max Rent",
                                    "",
                                ].map((col) => (
                                    <TableCell key={col}>{col}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map((values) => (
                                <TableRow key={values.clientno} sx={{ cursor: "pointer"}}>
                                    <TableCell>{values.clientno}</TableCell>
                                    <TableCell>{values.fname}</TableCell>
                                    <TableCell>{values.lname}</TableCell>
                                    <TableCell>{values.telno}</TableCell>
                                    <TableCell>{values.street}</TableCell>
                                    <TableCell>{values.city}</TableCell>
                                    <TableCell>{values.email}</TableCell>
                                    <TableCell>{values.preftype}</TableCell>
                                    <TableCell>{values.maxrent}</TableCell>
                                    <TableCell> 
                                        <IconButton
                                            onClick={() => handleRowClick(values.clientno)}
                                            size="small"
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box sx={{ padding: 2}}>
                        <Button variant="contained" fullWidth onClick={() => setModalOpen(true)}>
                            Add New Client
                        </Button>
                    </Box>
                </Paper>
            )}

            <ClientForm open={modalOpen} onClose={()=> setModalOpen(false)}/>
            <ConfirmDialog open={confirmationOpen} message="Are You Sure You Want To Delete This Client?" onClose={() => setConfirmationOpen(false)} onConfirm={() => handleDelete(deleteID)} />
        </Container>
    )
}