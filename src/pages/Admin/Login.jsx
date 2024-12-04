import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import adminApiClient from "../../utils/adminApiClient";

export default function Login() {
    const navigate = useNavigate(); // Initialize navigate function
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");

        try {
            // Send the JSON body with Axios
            const response = await adminApiClient.post('http://localhost:8080/admin/employee/login', {
                username, // JSON key is "username"
                password  // JSON key is "password"
            });

            const token = response.data.data.token;

            // 将token存入localStorage
            localStorage.setItem('token', token);

            // 存储token到Redux
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: token,
            });

            navigate("/admin/dashboard");
        } catch (error) {
            // Handle the error
            console.error('There was an error logging in!', error);

            dispatch({
                type: 'LOGIN_FAILURE',
                payload: error.response.data.message || 'Login failed',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" placeholder="Enter your username" required />
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Enter your password" required />
            </div>

            {/* Submit Button */}
            <button type="submit">Login</button>
        </form>
    );
}