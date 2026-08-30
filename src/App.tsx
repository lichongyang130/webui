import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./api";
import Layout from "./components/Layout";
import PublicLayout from "./components/PublicLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sections from "./pages/Sections";
import Categories from "./pages/Categories";
import Resources from "./pages/Resources";
import Assets from "./pages/Assets";
import Settings from "./pages/Settings";
import Home from "./pages/public/Home";
import SectionPage from "./pages/public/SectionPage";
import Gallery from "./pages/public/Gallery";

function AdminGuard() {
  return getToken() ? <Layout /> : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* 前台展示站 */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/s/:slug" element={<SectionPage />} />
        <Route path="/gallery" element={<Gallery />} />
      </Route>

      {/* 后台管理 */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminGuard />}>
        <Route index element={<Dashboard />} />
        <Route path="sections" element={<Sections />} />
        <Route path="sections/:id" element={<Categories />} />
        <Route path="resources" element={<Resources />} />
        <Route path="assets" element={<Assets />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
