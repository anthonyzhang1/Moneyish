// Necessary imports
import React from 'react';
import { Link, Redirect } from 'react-router-dom'

// Make LogIn equal a function that implements the following below
const LogIn = () => {
    // Initialize the following values and setters to a default state, in this case empty string or null
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [result, setResult] = React.useState(null);

    // This function handles the login functionality
    // It listens for the data entered in the username and password fields and readies it into a JSON format
    const handleLogin = () => {
        const body = {
            username: username,
            password: password,
        };

        // Makes an HTTP POST call to Java that carries the JSON object as the body in string format
        const settings = {
            method: 'post',
            body: JSON.stringify(body), // convert body to string
        };

        // Fetch calls /api/login in the backend to handle login logic
        fetch('/api/login', settings) // built in
            .then(res => res.json())
            .then(data => {
                setResult(data);
            })
            .catch(console.log); // async try/catch
    };

    // If the login was successful, then the user is redirected to Dashboard.js
    if (result !== null && result.isSuccess) {
        return (
            <Redirect push to="/dashboard" />
        );
    }

    // Login.js returns this to the webpage
    return (
        <div class="login_form">
            <h1 class="login_content">Log In</h1>
            <div class="login_field">
                <label for="login_username"><b>Username: </b></label>
                <input
                    id="login_username"
                    value={username} // Connects to the const, // e represents DOM event
                    onChange={e => setUsername(e.target.value)} />
            </div>
            <div class="login_field">
                <label for="login_password"><b>Password: </b></label>
                <input
                    id="login_password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div class="login_field">
                <button onClick={handleLogin}>Log In</button>
            </div>

            <div class="login_content_links">
                <p>Forgot your password?</p>
                <li class="login_content_links">
                    <Link class="dashboard_login" to="/reset-password">Reset Password</Link>
                </li>

                <p>Don't have an account yet?</p>
                <li class="login_content_links">
                    <Link class="dashboard_login" to="/sign-up">Sign Up</Link>
                </li>
            </div>
            {(result !== null && !result.isSuccess) && <div class="result_message"><h2 class="_aboutus">{result.message}</h2></div>}
        </div>
    );
};

// Step 3 export default
export default LogIn; // equivalent to "public" in java