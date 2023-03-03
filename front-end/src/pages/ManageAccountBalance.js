// Step 1 import react
import React from 'react';
import { Link } from 'react-router-dom' // third party library found in package.json

// Step 2 create a component func that returns an element
const ManageAccountBalance = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cardType, setCardType] = React.useState('Master Card');
    const [cardholderName, setCardholderName] = React.useState('');
    const [cardNumber, setCardNumber] = React.useState('');
    const [cardExpiration, setCardExpiration] = React.useState('');
    const [transferAmount, settransferAmount] = React.useState('');
    const [result, setResult] = React.useState(null);

    const handleManageAccountBalance = () => {
        const body = {
            username: username,
            password: password,
            transferAmount: transferAmount,
            cardType: cardType,
            cardholderName: cardholderName,
            cardNumber: cardNumber,
            cardExpiration: cardExpiration
        };
        // Make an http call to java
        const settings = {
            method: 'post',
            body: JSON.stringify(body), // convert body to string
        };
        fetch('/api/manage-account-balance', settings) // built in
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
                <h1 class="login_content">You are managing your account balance.</h1>
            </div>
            <div class="login_content">
                <h2>Enter your information to transfer money to/from your account:</h2>
            </div>
            <div class="login_field">
                <label for="manage_balance_username"><b>Username: </b></label>
                <input
                    id="manage_balance_username"
                    type="text"
                    name="username"
                    value={username} // Connects to the const
                    onChange={e => setUsername(e.target.value)} />
            </div>
            <div class="login_field">
                <label for="manage_balance_password"><b>Password: </b></label>
                <input
                    id="manage_balance_password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div class="login_content">
                <h2>Enter your credit card information:</h2>
            </div>
            <div class="login_field">
                <label><b>Card Type: </b></label>
                <select value={cardType} onChange={(e) => { setCardType(e.target.value) }}>
                    <option value="Master Card">Master Card</option>
                    <option value="Visa">Visa</option>
                    <option value="Discover">Discover</option>
                    <option value="American Express">American Express</option>
                </select>
            </div>
            <div class="login_field">
                <label for="manage_balance_cardholder_name"><b>Cardholder Name: </b></label>
                <input
                    id="manage_balance_cardholder_name"
                    type="text"
                    name="cardholderName"
                    value={cardholderName} // Connects to the const, // e represents DOM event
                    onChange={e => setCardholderName(e.target.value)} />
            </div>
            <div class="login_field">
                <label for="manage_balance_card_number"><b>Card Number: </b></label>
                <input
                    id="manage_balance_card_number"
                    type="number"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                />
            </div>
            <div class="login_field">
                <label for="manage_balance_card_expiration"><b>Expiration Date: </b></label>
                <input
                    id="manage_balance_card_expiration"
                    type="text"
                    name="cardExpiration"
                    value={cardExpiration}
                    onChange={e => setCardExpiration(e.target.value)}
                />
            </div>
            <div class="login_content">
                <h2>Dollar Amount to Transfer:</h2>
                <p>Enter a positive amount to load money into your account or<br></br>
                    enter a negative amount to withdraw money from your account.</p>
            </div>
            <div class="login_content">
                <label><b>$ </b></label>
                <input
                    type="number"
                    min="-10000.00"
                    max="10000.00"
                    step="10.00"
                    name="transferAmount"
                    value={transferAmount}
                    onChange={e => settransferAmount(e.target.value)}
                />
            </div>

            <div class="login_content">
                <button onClick={handleManageAccountBalance}>Transfer Funds</button>
            </div>
            {result !== null && <div class="result_message"><h2 class="_aboutus">{result.message}</h2></div>}
            <div class="padding_bottom">

            </div>
        </div>
    );
};

// Step 3 export default
export default ManageAccountBalance;