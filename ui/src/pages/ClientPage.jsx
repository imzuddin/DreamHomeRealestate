import React, { useState } from "react";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
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
        <Box>
            <Box sx={{ display: "flex", flexDirection:"column", alignItems: "center", mb: 2 }}>
                <Typography variant="h4" sx={{ flexGrow: 1}}>
                    Client Directory
                </Typography>
                <Button variant="contained" onClick={() => setModalOpen(true)}>
                    Add Client
                </Button>
            </Box>

            {isLoading ? (
                <Typography> Loading ... </Typography>
            ) : isError ? (
                <Typography> Error Loading Clients </Typography>
            ) : (
                <Paper>
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
                </Paper>
            )}

            <ClientForm open={modalOpen} onClose={()=> setModalOpen(false)}/>
            <ConfirmDialog open={confirmationOpen} message="Are You Sure You Want To Delete This Client?" onClose={() => setConfirmationOpen(false)} onConfirm={() => handleDelete(deleteID)} />
        </Box>
    )
}