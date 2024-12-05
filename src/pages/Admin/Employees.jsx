import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import adminApiClient from "../../utils/adminApiClient";
import { useDispatch } from "react-redux";
import NewEmployee from "./NewEmployee";
import DisplayEmployees from "./DisplayEmployees";

export default function Employees() {
    const [currentPage, setCurrentPage] = useState("display");
    const dispatch = useDispatch();

    const [employees, setEmployees] = useState([]); // State for storing the list of users
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
            })
            .catch((err) => {
                setError(err.message);
            });
    }

    useEffect(() => getEmployees(), []);

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
            {currentPage === "display" && <DisplayEmployees 
                employees={employees}
                setCurrentPage={setCurrentPage}
                handleEnableAndDisableEmployee={handleEnableAndDisableEmployee}
            />}
            {currentPage === "new-employee" && <NewEmployee handleSubmitNewEmployee={handleSubmitNewEmployee} />}
        </div>
    );
}