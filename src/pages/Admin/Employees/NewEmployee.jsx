export default function NewEmployee({ handleSubmitNewEmployee, setCurrentPage }) {
    return (
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
                <button onClick={() => setCurrentPage("display")}>Cancel</button>
            </form>
        </div>
    );
}