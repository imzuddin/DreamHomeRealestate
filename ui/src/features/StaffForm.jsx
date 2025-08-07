import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Button, Typography } from "@mui/material"
import { useHireStaffMutation } from "./api/apiSlice";

export default function StaffForm({ open, onClose }) {
    const [hireStaff, { isLoading, isSuccess, isError }] = useHireStaffMutation();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            staffno: "",
            fname: "",
            lname: "",
            position: "",
            sex: "",
            dob: "",
            salary: 0,
            branchno: "",
            telephone: "",
            mobile: "",
            email: ""
        }
    })

    useEffect(() => {
        if(isSuccess) {
            reset();
            onClose();
        }
    }, [isSuccess, onClose, reset])

    const onSubmit = async (data) => {
        await hireStaff({
            ...data,
            salary: parseFloat(data.salary)
        }).unwrap();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle> Hire New Staff </DialogTitle>
            <DialogContent>
                <form id="hire-staff-form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                    {[
                    ["staffno", "Staff No"],
                    ["fname", "First Name"],
                    ["lname", "Last Name"],
                    ["position", "Position"],
                    ["sex", "Sex"],
                    ["dob", "DOB (YYYY-MM-DD)"],
                    ["salary", "Salary"],
                    ["branchno", "Branch No"],
                    ["telephone", "Telephone"],
                    ["mobile", "Mobile"],
                    ["email", "Email"]
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
                <Button type="submit" form="hire-staff-form" variant="contained" disabled={isLoading}>
                    {isLoading ? "Saving" : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}