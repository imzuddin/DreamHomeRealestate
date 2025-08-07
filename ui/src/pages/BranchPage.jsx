import React, {useState} from "react";
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Construction from "@mui/icons-material/Construction"
import {
    useGetBranchesQuery,
    useCreateBranchMutation,
} from "../features/api/apiSlice";
import EditBranchModal from "../features/EditBranchModal";
import BranchForm from "../features/BranchForm";

export default function BranchPage() {
    const { data: branches = [], isLoading, isError } = useGetBranchesQuery();
    const [createBranch] = useCreateBranchMutation();

    const [formOpen, setFormOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const handleRowClick = (branch) => {
        setSelectedBranch(branch);
        setModalOpen(true);
    }

    return (
                <Box>
            <Box sx={{ display: "flex", flexDirection:"column", alignItems: "center", mb: 2 }}>
                <Typography variant="h4" sx={{ flexGrow: 1}}>
                    Branch Directory
                </Typography>
                <Button variant="contained" onClick={() => setFormOpen(true)}>
                    Add Branch
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
                                    "Branch No",
                                    "Street",
                                    "City",
                                    "Postal Code",
                                    "",
                                ].map((col) => (
                                    <TableCell key={col}>{col}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {branches.map((values) => (
                                <TableRow key={values.brancno} hover onClick={() => handleRowClick(values)} sx={{ cursor: "pointer"}}>
                                    <TableCell>{values.branchno}</TableCell>
                                    <TableCell>{values.street}</TableCell>
                                    <TableCell>{values.city}</TableCell>
                                    <TableCell>{values.postcode}</TableCell>
                                    <TableCell> 
                                        <IconButton
                                            onClick={() => handleRowClick(values)}
                                            size="small"
                                        >
                                            <Construction/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}

            <BranchForm open={formOpen} onClose={()=> setFormOpen(false)}/>
            {selectedBranch && (
                <EditBranchModal open={modalOpen} onClose={() => setModalOpen(false)} branch={selectedBranch} />
            )}
        </Box>
    )

}