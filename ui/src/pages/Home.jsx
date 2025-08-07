import React from "react";
import { useGetHealthQuery } from "../features/api/apiSlice";
import { Box, Typography, Grid } from "@mui/material"

export default function Home() {
    return (
        <Box>
            <Typography variant="h4">
                Hello
            </Typography>
        </Box>
    )
}