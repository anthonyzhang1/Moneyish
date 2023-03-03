// Step 1 import react
import React from 'react';
import { Link } from 'react-router-dom' // third party library found in package.json

// Step 2 create a component func that returns an element
const CheckBalance = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [result, setResult] = React.useState(null);

    const handleCheckBalance = () => {
        const body = {
            username: username,
            password: password,
        };

        // Make an http call to java
        const settings = {
            method: 'post',
            body: JSON.stringify(body), // convert body to string
        };

        fetch('/api/check-balance', settings)
            .then(res => res.json())
            .then(data => {
                setResult(data);
            })
            .catch(console.log); // async try/catch
    };

    return (
        <div>
            <div>
                <Link to="/dashboard" className="dashboard_components"><h2 class=".back_button">Go Back</h2></Link>
                <h1 className="login_content">You are at the Check Balance page.</h1>
            </div>
            <h2 class="login_content">Enter your information to check your balance:</h2>
            <div class="login_field">
                <label for="check_balance_username"><b>Username: </b></label>
                <input
                    id="check_balance_username"
                    type="text"
                    name="username"
                    value={username} // Connects to the const
                    onChange={e => setUsername(e.target.value)} />
            </div>
            <div class="login_field">
                <label for="check_balance_password"><b>Password: </b></label>
                <input
                    id="check_balance_password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div class="login_field">
                <button onClick={handleCheckBalance}>Check Balance</button>
            </div>
            {result !== null && <div class="result_message"><h2 class="_aboutus">{result.message}</h2></div>}
        </div>
    );
};

// Step 3 export default
export default CheckBalance;