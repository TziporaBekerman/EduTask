import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";

const links = [
  { to: "/student/home", label: "דף הבית" },
  { to: "/student/assignments", label: "מטלות" },
  { to: "/student/pending", label: "ממתין להגשה" },
  { to: "/student/grades", label: "ציונים" },
  { to: "/student/profile", label: "פרופיל" }
];

export default function StudentLayout({ setUser }) {
    return <Layout links={links} setUser={setUser} />;
}
