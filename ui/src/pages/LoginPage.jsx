import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useLoginMutation } from "../features/api/apiSlice";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { control, handleSubmit } = useForm({ 
    defaultValues: 
        { 
            username: "", 
            password: "" 
        } 
    });

    const [loginApi, { isLoading, error }] = useLoginMutation();
    const { role, login } = useAuth();
    const navigate = useNavigate();

    if (role) {
        return <Navigate to="/" replace />;
    }
    
    const onSubmit = async (data) => {
        try {
            const { role } = await loginApi(data).unwrap();
            login(role);
            navigate("/", { replace: true })
        } catch {

        }
    }

    return (
        <Box sx={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center"}}>
            <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(/background.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(8px)",
                transform: "scale(1.05)",
                zIndex: -1,
            }}>

            </Box>
            <Box sx={{
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
            }}>
                <Paper sx={{ padding: 4, width: 500, borderRadius: "25px" }}>
                    <Typography variant="h5" gutterBottom sx={{ justifyContent: ""}}> Welcome to Dream Home </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: "Username Required"}}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Username"
                                    fullWidth
                                    margin="normal"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password Required"}}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    fullWidth
                                    margin="normal"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        { error && (
                            <Typography color="error" variant="body2">Invalid credentials</Typography>
                        )}
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isLoading}>
                            Login
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Box>
    )
};