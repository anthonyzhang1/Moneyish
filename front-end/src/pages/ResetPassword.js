// Necessary imports
import React from 'react';
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    // Initialize the following values and setters to a default state, in this case empty string or null
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [result, setResult] = React.useState(null);

    // This function handles the reset password functionality
    // It listens for the data entered in the username and email fields and readies it into a JSON format
    const handleResetPassword = () => {
        const body = {
            username: username,
            email: email,
        };

        // Makes an HTTP POST call to Java that carries the JSON object as the body in string format
        const settings = {
            method: 'post',
            body: JSON.stringify(body), // convert body to string
        };

        // Fetch calls /api/reset-password in the backend to handle reset password logic
        fetch('/api/reset-password', settings)
            .then(res => res.json())
            .then(data => {
                setResult(data);
            })
            .catch(console.log); // async try/catch
    };

    // ResetPassword.js returns this to the webpage
    return (
        <div class="reset_password_form">
            <h1 class="reset_password_content">Reset Password</h1>
            <h2 class="reset_password_content">
                Enter your username and email and we will email you a link to reset your password:
            </h2>

            <div class="reset_password_field">
                <label for="reset_password_username"><b>Username: </b></label>
                <input
                    id="reset_password_username"
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
            </div>
            <div class="reset_password_field">
                <label for="reset_password_email"><b>Email: </b></label>
                <input
                    id="reset_password_email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div class="reset_password_field">
                <button onClick={handleResetPassword}>Reset Password</button>
            </div>

            <div class="reset_password_links">
                <p>Remember your password?</p>
                <li class="reset_password_content_links">
                    <Link class="dashboard_login" to="/log-in">Log In</Link>
                </li>
            </div>
            {result !== null && <div class="result_message"><h2 class="_aboutus">{result.message}</h2></div>}
        </div>
    );
};

// Step 3 export default
export default ResetPassword; // equivalent to "public" in java