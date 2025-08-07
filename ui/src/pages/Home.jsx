import React from "react";
import { useGetBranchesQuery, useGetClientsQuery, useGetStaffQuery } from "../features/api/apiSlice";
import { Box, Typography, Grid, Container, Card, CardContent, CircularProgress } from "@mui/material"
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";

function StatCard({ title, value, icon, loading }) {
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: "10px"}}>
      <Box sx={{ fontSize: 40, mr: 2 }}>{icon}</Box>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Typography variant="h4">{value || 0}</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default function Home() {

    const {
        data: branches = [],
        isLoading: branchesLoading,
        isError: branchesError,
    } = useGetBranchesQuery();
    const {
        data: clients = [],
        isLoading: clientsLoading,
        isError: clientsError,
    } = useGetClientsQuery();
    const {
        data: staff = [],
        isLoading: staffLoading,
        isError: staffError,
    } = useGetStaffQuery();

    const anyError = branchesError || clientsError || staffError;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Card fullWidth sx={{ paddingTop: "20px", paddingLeft: "10px", marginBottom: "10px", width: "100%", height: "100px"}}>
                <Typography variant="h3">
                    Welcome to Dream Home Real Estate
                </Typography>
            </Card>
            <Card fullWidth sx={{ marginBottom: "10px", width: "100%", background: "transparent"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <StatCard
                            title="Staff"
                            icon={<GroupsIcon fontSize="inherit" />}
                            value={staff.length}
                            loading={branchesLoading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard
                            title="Clients"
                            icon={<PeopleIcon fontSize="inherit" />}
                            value={clients.length}
                            loading={branchesLoading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard
                            title="Branches"
                            icon={<HomeWorkIcon fontSize="inherit" />}
                            value={branches.length}
                            loading={branchesLoading}
                        />
                    </Grid>
                </Grid>

            </Card>

        </Container>
    )
}