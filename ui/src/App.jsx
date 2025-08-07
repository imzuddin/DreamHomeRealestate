import React  from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import StaffPage from "./pages/StaffPage";
import ClientsPage from "./pages/ClientPage";
import BranchPage from "./pages/BranchPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./contexts/AuthContext";

function RequireAuth({ children, roles }) {
  const { role } = useAuth();
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/" element={ <RequireAuth> <Layout /> </RequireAuth>}>
                <Route index element={<Home />} />
                <Route path="staff" element={<RequireAuth roles={["admin"]} > <StaffPage /> </RequireAuth>} />
                <Route path="client" element={<ClientsPage/>} />
                <Route path="branch" element={<BranchPage/>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
