import React, { useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useUpdateStaffMutation } from "./api/apiSlice";

export default function EditStaffModal({ open, onClose, staff }) {
    const [updateStaff, { isLoading, isSuccess, isError }] = useUpdateStaffMutation();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            salary: staff.salary,
            telephone: staff.telephone,
            mobile: staff.mobile,
            email: staff.email,
        },
    });

    useEffect(() => {
        reset({
            salary: staff.salary,
            telephone: staff.telephone,
            mobile: staff.mobile,
            email: staff.email,
        });
    }, [staff, reset])

    const onSubmit = async (data) => {
        await updateStaff({ staffNo: staff.staffNo, ...data });
        if (!isError ) {
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle> 
                Edit {staff.fname}'s Information 
            </DialogTitle>
            <DialogContent>
                <form id="edit-staff-form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        {[
                            ["salary", "Salary"],
                            ["telephone", "Telephone"],
                            ["mobile", "Mobile"],
                            ["email", "Email"],
                        ].map(([name, label]) => (
                            <Grid item xs={12} sm={6} key={name}>
                                <Controller
                                    name={name}
                                    control={control}
                                    render={({ field}) => (
                                        <TextField 
                                            {...field}
                                            label={label}
                                            fullWidth
                                            variant="outlined"
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
                <Button type="submit" form="edit-staff-form" variant="contained" disabled={isLoading}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}