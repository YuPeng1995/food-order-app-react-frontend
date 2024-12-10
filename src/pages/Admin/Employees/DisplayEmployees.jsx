import { useNavigate } from "react-router-dom";

export default function DisplayEmployees({ employees, setCurrentPage, handleEnableAndDisableEmployee }) {
    const navigate = useNavigate();

    return (
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
                            <button onClick={() => navigate("/admin/employee", { state: { employeeId: employee.id } })}>Update</button>
                            {employee.status === 0 ?
                                <button onClick={() => handleEnableAndDisableEmployee(employee.status, employee.id)}>Enable</button> :
                                <button onClick={() => handleEnableAndDisableEmployee(employee.status, employee.id)}>Disable</button>}
                            <button>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}