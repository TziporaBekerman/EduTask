import { NavLink, Outlet, useNavigate } from "react-router-dom";

const links = [
  { to: "/admin/users", label: "ניהול משתמשים" },
  { to: "/admin/groups", label: "ניהול קבוצות" },
  { to: "/admin/assignments", label: "ניהול מטלות" },
  { to: "/admin/submissions", label: "הגשות וציונים" },
  { to: "/admin/reports", label: "דוחות" }
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">EduTask</h2>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button className="logout-btn" onClick={handleLogout}>התנתקות</button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
