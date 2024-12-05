import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { useEffect, useState } from "react";
import adminApiClient from "../../utils/adminApiClient";
import { useNavigate } from "react-router-dom";

export default function UpdateEmployee() {
    const { employeeId } = useLocation().state || "";
    const [employee, setEmployee] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        adminApiClient.get(`http://localhost:8080/admin/employee/${employeeId}`)
            .then((response) => {
                setEmployee(response.data.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    function handleOnChange(e) {
        setEmployee((prevEmployee) => ({ ...prevEmployee, [e.target.name]: e.target.value }));
    }

    async function handleSubmitUpdateEmployee(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const name = formData.get("name");
        const phone = formData.get("phone");
        const gender = formData.get("gender");
        const driverLicense = formData.get("driver-license");

        try {
            const response = await adminApiClient.put("http://localhost:8080/admin/employee", {
                id: employeeId, username, name, phone, gender, driverLicense
            });
            navigate("/admin/employees");
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="admin-employees">
            <AdminNavbar />
            <div className="admin-update-employee">
                <h2>Update Employee</h2>
                <form onSubmit={handleSubmitUpdateEmployee}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={employee.username} onChange={handleOnChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={employee.name} onChange={handleOnChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" id="phone" name="phone" value={employee.phone} onChange={handleOnChange} />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <div className="gender-options">
                            <input type="radio" id="male" name="gender" value="0" checked={employee.gender === "0"} onChange={handleOnChange} />
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="female" name="gender" value="1" checked={employee.gender === "1"} onChange={handleOnChange} />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="driver-license">Driver's License</label>
                        <input type="text" id="driver-license" name="driver-license" value={employee.driverLicense} onChange={handleOnChange} />
                    </div>

                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}