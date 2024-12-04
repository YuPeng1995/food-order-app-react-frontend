import "./../../styles/AdminDashboard.css";
import AdminNavbar from "./AdminNavbar";

export default function Dashboard() {

    return (
        <div className="admin-dashboard">
            <AdminNavbar />
            <div className="admin-dashboard-content">
                <h1>Content</h1>
            </div>
        </div>
    );
}