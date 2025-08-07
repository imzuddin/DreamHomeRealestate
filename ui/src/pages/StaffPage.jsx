import React, { useState } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetStaffQuery } from "../features/api/apiSlice";
import EditStaffModal from "../features/EditStaffModal";
import StaffForm from "../features/StaffForm";

export default function StaffPage() {
    const { data: staffList = [], isLoading, isError} = useGetStaffQuery();
    const navigate = useNavigate();

    const [ selectedStaff, setSelectedStaff ] = useState(null);
    const [ modalOpen, setModalOpen ] = useState(false); 
    const [ hireOpen, setHireOpen ] = useState(false);

    const handleRowClick = (staff) => {
        setSelectedStaff(staff);
        setModalOpen(true);
    }

    return (
        <Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Staff Directory
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setHireOpen(true)}
                >
                    Hire New Staff
                </Button>

                {isLoading ? (
                    <Typography> Loading... </Typography>
                ) : isError ? (
                    <Typography color="error"> Error Loading Staff </Typography>
                ) : (
                    <Paper>
                        <Table>
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                )}

                {selectedStaff && (
                    <EditStaffModal open={modalOpen} onClose={() => setModalOpen(false)} staff={selectedStaff}/>
                )}
                <StaffForm open={hireOpen} onClose={() => setHireOpen(false)} />
            </Box>
        </Box>
    )
}