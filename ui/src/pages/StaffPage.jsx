import React, { useState } from "react";
import { Box, Button, Paper, Table, TableBody, IconButton, TableCell, TableHead, TableRow, Typography, Card, CardContent, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetStaffQuery } from "../features/api/apiSlice";
import EditStaffModal from "../features/EditStaffModal";
import StaffForm from "../features/StaffForm";
import Construction from "@mui/icons-material/Construction"

export default function StaffPage() {
    const { data: staffList = [], isLoading, isError} = useGetStaffQuery();

    const [ selectedStaff, setSelectedStaff ] = useState(null);
    const [ modalOpen, setModalOpen ] = useState(false); 
    const [ hireOpen, setHireOpen ] = useState(false);

    const handleRowClick = (staff) => {
        setSelectedStaff(staff);
        setModalOpen(true);
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                <Card fullWidth sx={{ marginBottom: "10px", width: "100%"}}>
                    <CardContent fullWidth>
                        <Typography variant="h4" sx={{ flexGrow: 1 }}>
                            Staff Directory
                        </Typography>
                    </CardContent>
                </Card>


                {isLoading ? (
                    <Typography> Loading... </Typography>
                ) : isError ? (
                    <Typography color="error"> Error Loading Staff </Typography>
                ) : (
                    <Paper sx={{ width: "100%", mb: 3 }}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    {[
                                        "Staff No",
                                        "First Name",
                                        "Last Name",
                                        "Position",
                                        "Sex",
                                        "DOB",
                                        "Salary",
                                        "Branch",
                                        "Telephone",
                                        "Mobile",
                                        "Email",
                                        "",
                                    ].map((col) => (
                                        <TableCell key={col}>{col}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {staffList.map((values) => (
                                    <TableRow key={values.staffno} hover onClick={() => handleRowClick(values)} sx={{ cursor: "pointer"}}>
                                        <TableCell>{values.staffno}</TableCell>
                                        <TableCell>{values.fname}</TableCell>
                                        <TableCell>{values.lname}</TableCell>
                                        <TableCell>{values.position}</TableCell>
                                        <TableCell>{values.sex}</TableCell>
                                        <TableCell>{values.dob}</TableCell>
                                        <TableCell>{values.salary}</TableCell>
                                        <TableCell>{values.branchno}</TableCell>
                                        <TableCell>{values.telephone}</TableCell>
                                        <TableCell>{values.mobile}</TableCell>
                                        <TableCell>{values.email}</TableCell>
                                        <TableCell> 
                                            <IconButton
                                                onClick={() => handleRowClick(values)}
                                                size="large"
                                            >
                                                <Construction/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Box sx={{ padding: 2}}>
                            <Button variant="contained" fullWidth onClick={() => setHireOpen(true)}>
                                Hire New Staff
                            </Button>
                        </Box>
                    </Paper>
                )}

                {selectedStaff && (
                    <EditStaffModal open={modalOpen} onClose={() => setModalOpen(false)} staff={selectedStaff}/>
                )}
                <StaffForm open={hireOpen} onClose={() => setHireOpen(false)} />
            </Box>
        </Container>
    )
}