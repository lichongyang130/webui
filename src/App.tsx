import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./api";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sections from "./pages/Sections";
import Categories from "./pages/Categories";
import Resources from "./pages/Resources";
import Assets from "./pages/Assets";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          getToken() ? (
            <Layout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/sections/:id" element={<Categories />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
