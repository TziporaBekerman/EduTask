import Layout from "../../components/common/Layout";

const links = [
  { to: "/lecturer/home",        label: "דף הבית" },
  { to: "/lecturer/submissions", label: "הגשות וציונים" },
  { to: "/lecturer/profile",     label: "פרופיל" },
  { to: "/lecturer/assignments", label: "ניהול מטלות" },
];

export default function LecturerLayout({ setUser }) {
  return <Layout links={links} setUser={setUser} />;
}