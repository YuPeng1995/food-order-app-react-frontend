import axios from 'axios';

// Create an Axios instance with default configurations
const adminApiClient = axios.create({
    baseURL: '/', // Your API base URL
    headers: {
        'Content-Type': 'application/json', // Default content type for API requests
    }
});

// Add an interceptor to attach the token to every request
adminApiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
            // Attach token to request headers if it exists
            config.headers.token = token;
        }
        return config;
    },
    (error) => {
        // Handle any request errors
        return Promise.reject(error);
    }
);

export default adminApiClient;  // Export the Axios instance to be used throughout the app
