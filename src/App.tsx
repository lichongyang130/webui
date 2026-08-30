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
import Ops from "./pages/Ops";
import Home from "./pages/public/Home";
import SectionPage from "./pages/public/SectionPage";
import Gallery from "./pages/public/Gallery";
import ItemDetail from "./pages/public/ItemDetail";
import Learn from "./pages/public/Learn";
import Wizard from "./pages/public/Wizard";
import Compare from "./pages/public/Compare";
import Demos from "./pages/public/Demos";

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
        <Route path="/demos" element={<Demos />} />
        <Route path="/i/:id" element={<ItemDetail />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/compare" element={<Compare />} />
      </Route>

      {/* 后台管理 */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminGuard />}>
        <Route index element={<Dashboard />} />
        <Route path="sections" element={<Sections />} />
        <Route path="sections/:id" element={<Categories />} />
        <Route path="resources" element={<Resources />} />
        <Route path="assets" element={<Assets />} />
        <Route path="ops" element={<Ops />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
