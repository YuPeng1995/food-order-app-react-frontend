import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import adminApiClient from "../../utils/adminApiClient";
import { useDispatch } from "react-redux";

export default function Employees() {
    const [currentPage, setCurrentPage] = useState("display");
    const dispatch = useDispatch();

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
            console.log("Success." + response.data);

            setCurrentPage("display");
        } catch (error) {
            console.error('There was an error logging in!', error);

            dispatch({
                type: 'LOGIN_FAILURE',
                payload: error.response.data.message || 'Login failed',
            });
        }
    }

    return (
        <div className="admin-employees">
            <AdminNavbar />
            {currentPage === "display" &&
                <div className="admin-display-employees">
                    <h1>Current Employees</h1>
                    <button onClick={() => setCurrentPage("new-employee")}>Add New Employee</button>
                </div>
            }
            {currentPage === "new-employee" &&
                <div className="admin-new-employee">
                    <h2>Add Employee</h2>
                    <form onSubmit={handleSubmitNewEmployee}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" name="phone" />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <div className="gender-options">
                                <input type="radio" id="male" name="gender" value="0" />
                                <label htmlFor="male">Male</label>
                                <input type="radio" id="female" name="gender" value="1" />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="driver-license">Driver's License</label>
                            <input type="text" id="driver-license" name="driver-license" />
                        </div>

                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>

            }
        </div>
    );
}