import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import adminApiClient from "../../utils/adminApiClient";
import { useDispatch } from "react-redux";
import NewEmployee from "./NewEmployee";

export default function Employees() {
    const [currentPage, setCurrentPage] = useState("display");
    const dispatch = useDispatch();

    const [employees, setEmployees] = useState([]); // State for storing the list of users
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    function getEmployees() {
        adminApiClient.get('http://localhost:8080/admin/employee/page', {
            params: {
                page: 1,
                pageSize: 5,
            }
        })
            .then((response) => {
                setEmployees(response.data.data.records); // Axios automatically parses JSON
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }

    useEffect(() => getEmployees(), []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    async function handleSubmitNewEmployee(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");
        const name = formData.get("name");
        const phone = formData.get("phone");
        const gender = formData.get("gender");
        const driverLicense = formData.get("driver-license");

        try {
            const response = await adminApiClient.post('http://localhost:8080/admin/employee', {
                username,
                name,
                phone,
                gender,
                driverLicense
            });
            setCurrentPage("display");
        } catch (error) {
            console.error('There was an error logging in!', error);

            dispatch({
                type: 'LOGIN_FAILURE',
                payload: error.response.data.message || 'Login failed',
            });
        }
    }

    async function handleEnableAndDisableEmployee(status, id) {
        try {
            const response = await adminApiClient
                .post(`http://localhost:8080/admin/employee/status/${status === 0 ? 1 : 0}`, null, {
                    params: {id: id},
                });
            getEmployees();
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    }

    return (
        <div className="admin-employees">
            <AdminNavbar />
            {currentPage === "display" &&
                <div className="admin-display-employees">
                    <h1>Current Employees</h1>
                    <button className="new-employee-button" onClick={() => setCurrentPage("new-employee")}>Add New Employee</button>
                    <ul className="employee-table">
                        <li className="table-header">
                            <span>Username</span>
                            <span>Name</span>
                            <span>Phone</span>
                            <span>Status</span>
                            <span>Update Time</span>
                            <span>Actions</span>
                        </li>
                        {employees.map((employee, index) => (
                            <li key={index} className="table-row">
                                <span>{employee.username}</span>
                                <span>{employee.name}</span>
                                <span>{employee.phone}</span>
                                {employee.status === 0 ? <span>Disabled</span> : <span>Enabled</span>}
                                <span>{employee.updateTime}</span>
                                <div className="actions">
                                    <button>Update</button>
                                    {employee.status === 0 ?
                                        <button onClick={() => handleEnableAndDisableEmployee(employee.status, employee.id)}>Enable</button> :
                                        <button onClick={() => handleEnableAndDisableEmployee(employee.status, employee.id)}>Disable</button>}
                                    <button>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            {currentPage === "new-employee" && <NewEmployee handleSubmitNewEmployee={handleSubmitNewEmployee} />}
        </div>
    );
}