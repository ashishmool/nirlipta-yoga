import { useState } from "react";

const sidelinks = [
    { title: "Retreats", href: "/admin/retreats" },
    { title: "Workshops", href: "/admin/workshops" },
    { title: "Partners", href: "/admin/partners" },
    { title: "Users", href: "/admin/users" },
];

function Sidebar({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean; setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <aside
            style={{
                width: isCollapsed ? "60px" : "200px",
                backgroundColor: "#f8f9fa",
                height: "100vh",
                transition: "width 0.3s",
                padding: "10px",
            }}
        >
            <button onClick={() => setIsCollapsed(!isCollapsed)} style={{ marginBottom: "20px" }}>
                {isCollapsed ? "▶" : "◀"}
            </button>
            <nav>
                {sidelinks.map((link) => (
                    <a
                        key={link.title}
                        href={link.href}
                        style={{
                            display: "block",
                            padding: "10px 5px",
                            textDecoration: "none",
                            color: "#333",
                            marginBottom: "5px",
                            textAlign: isCollapsed ? "center" : "left",
                        }}
                    >
                        {link.title}
                    </a>
                ))}
            </nav>
        </aside>
    );
}

export default function AdminDashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
            {/* Sidebar */}
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

            {/* Main Content */}
            <div style={{ flex: 1, padding: "20px" }}>
                <header style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                    <h1>Admin Dashboard</h1>
                </header>
                <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                    <div style={{ background: "#f1f3f5", padding: "20px", borderRadius: "5px" }}>
                        <h2>Retreats</h2>
                        <p>Manage all retreats</p>
                    </div>
                    <div style={{ background: "#f1f3f5", padding: "20px", borderRadius: "5px" }}>
                        <h2>Workshops</h2>
                        <p>Manage all workshops</p>
                    </div>
                    <div style={{ background: "#f1f3f5", padding: "20px", borderRadius: "5px" }}>
                        <h2>Partners</h2>
                        <p>Manage all partners</p>
                    </div>
                    <div style={{ background: "#f1f3f5", padding: "20px", borderRadius: "5px" }}>
                        <h2>Users</h2>
                        <p>Manage all users</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
