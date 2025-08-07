import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Button, Typography } from "@mui/material"
import { useHireStaffMutation } from "./api/apiSlice";

const generateStaffNo = () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `S${num}`;
};

export default function StaffForm({ open, onClose }) {
    const [hireStaff, { isLoading, isSuccess, isError }] = useHireStaffMutation();

    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
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
            salary: parseFloat(data.salary),
            staffno: generateStaffNo(),
        }).unwrap();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle> Hire New Staff </DialogTitle>
            <DialogContent>
                <form id="hire-staff-form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Controller
                            name="staffno"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input type="hidden" {...field} />
                            )}
                        />
                    {[
                    ["fname", "First Name", { reqiuired: "Field is required"}],
                    ["lname", "Last Name", { reqiuired: "Field is required"}],
                    ["position", "Position", { reqiuired: "Field is required"}],
                    ["sex", "Sex", { reqiuired: "Field is required", pattern: { value: /^(M|F)$/, message: "Use ‘M’ or ‘F’" }}],
                    ["dob", "DOB (YYYY-MM-DD)", { reqiuired: "Field is required", pattern: { value: /^\d{4}-\d{2}-\d{2}$/, message: "Use YYYY-MM-DD"}}],
                    ["salary", "Salary", { reqiuired: "Field is required", min: { value: 0, message: "Salary must be non-negative"}}],
                    ["branchno", "Branch No", { reqiuired: "Field is required"}],
                    ["telephone", "Telephone", { reqiuired: "Field is required"}],
                    ["mobile", "Mobile", { reqiuired: "Field is required"}],
                    ["email", "Email", { reqiuired: "Field is required"}]
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
                <Button type="submit" form="hire-staff-form" variant="contained" disabled={isLoading}>
                    Hire
                </Button>
            </DialogActions>
        </Dialog>
    )
}