import React  from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import StaffPage from "./pages/StaffPage";
import ClientsPage from "./pages/ClientPage";
import BranchPage from "./pages/BranchPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="staff" element={<StaffPage />} />
                <Route path="client" element={<ClientsPage/>} />
                <Route path="branch" element={<BranchPage/>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
