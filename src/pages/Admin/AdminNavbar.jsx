import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
    const navigate = useNavigate();
    return (
        <div className="admin-navbar">
            <h1>Gourmet Paradise</h1>
            <ul>
                <li onClick={() => navigate("/admin/dashboard")}>Dashboard</li>
                <li onClick={() => navigate("/admin/orders")}>Orders</li>
                <li onClick={() => navigate("/admin/categories")}>Categories</li>
                <li onClick={() => navigate("/admin/dishes")}>Dishes</li>
                <li onClick={() => navigate("/admin/combol-meals")}>Combo Meals</li>
                <li onClick={() => navigate("/admin/reports")}>Reports</li>
                <li onClick={() => navigate("/admin/employees")}>Employees</li>
            </ul>
        </div>
    );
}