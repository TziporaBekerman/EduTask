import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout({ links }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="layout">
            <aside className="sidebar">
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
            <main className="main">
                <Outlet />
            </main>
        </div>
    );
}
