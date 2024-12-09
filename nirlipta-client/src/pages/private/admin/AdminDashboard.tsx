import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaChalkboardTeacher, FaHammer, FaHome, FaSuitcase, FaHandshake, FaUsers, FaSignOutAlt } from "react-icons/fa";

const sidelinks = [
    { title: "Instructors", href: "/admin/instructors", icon: <FaChalkboardTeacher /> },
    { title: "Workshops", href: "/admin/workshops", icon: <FaHammer /> },
    { title: "Accommodations", href: "/admin/accommodations", icon: <FaHome /> },
    { title: "Retreats", href: "/admin/retreats", icon: <FaSuitcase /> },
    { title: "Users", href: "/admin/users", icon: <FaUsers /> },
];

function Sidebar({ isCollapsed, setIsCollapsed, onLogout }: { isCollapsed: boolean; setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>; onLogout: () => void }) {
    return (
        <aside
            style={{
                width: isCollapsed ? "60px" : "200px",
                backgroundColor: "#f8f9fa",
                height: "100vh",
                transition: "width 0.3s",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <div>
                <button onClick={() => setIsCollapsed(!isCollapsed)} style={{ marginBottom: "20px", width: "100%" }}>
                    {isCollapsed ? "▶" : "◀"}
                </button>
                <nav>
                    {sidelinks.map((link) => (
                        <Link
                            key={link.title}
                            to={link.href}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "10px",
                                textDecoration: "none",
                                color: "#333",
                                marginBottom: "5px",
                                justifyContent: isCollapsed ? "center" : "flex-start",
                            }}
                        >
                            <span style={{ marginRight: isCollapsed ? 0 : "10px" }}>{link.icon}</span>
                            {!isCollapsed && <span>{link.title}</span>}
                        </Link>
                    ))}
                </nav>
            </div>
            <button
                onClick={onLogout}
                style={{
                    backgroundColor: "#e63946",
                    color: "#fff",
                    padding: "10px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isCollapsed ? "center" : "flex-start",
                }}
            >
                <FaSignOutAlt style={{ marginRight: isCollapsed ? 0 : "10px" }} />
                {!isCollapsed && <span>Logout</span>}
            </button>
        </aside>
    );
}

export default function AdminDashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleLogout = () => {
        // Clear localStorage and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        // Redirect with a full page reload
        window.location.href = "/";
    };

    const userEmail = localStorage.getItem("email");

    return (
        <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
            {/* Sidebar */}
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} onLogout={handleLogout} />

            {/* Main Content */}
            <div style={{ flex: 1, padding: "20px" }}>
                <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
                    <header style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px", cursor: "pointer" }}>
                        <h1>Admin Dashboard</h1>
                        {userEmail && <p>Welcome, {userEmail}</p>}
                    </header>
                </Link>
                <div>
                    {/* Render nested routes */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
