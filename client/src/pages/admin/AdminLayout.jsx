import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";

const links = [
  { to: "/admin/home",        label: "דף הבית" },
  { to: "/admin/users",       label: "ניהול משתמשים" },
  { to: "/admin/groups",      label: "ניהול קבוצות" },
  { to: "/admin/assignments", label: "ניהול מטלות" },
  { to: "/admin/submissions", label: "הגשות וציונים" },
  { to: "/admin/reports",     label: "דוחות" },
  { to: "/admin/profile",     label: "פרופיל" }
];

export default function AdminLayout() {
  return <Layout links={links} />;
}
