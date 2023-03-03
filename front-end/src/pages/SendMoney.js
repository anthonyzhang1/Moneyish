// Step 1 import react
import React from 'react';
import { Link } from 'react-router-dom' // third party library found in package.json

// Step 2 create a component func that returns an element
const SendMoney = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameRecipient, setUsernameRecipient] = React.useState('');
    const [transactionText, setTransactionText] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState('Account Balance');
    const [paymentAmount, setPaymentAmount] = React.useState('');
    const [publicTransaction, setPublic] = React.useState("false");
    const [result, setResult] = React.useState(null);

    const handleSendMoney = () => {
        const body = {
            username: username,
            password: password,
            usernameRecipient: usernameRecipient,
            publicTransaction: publicTransaction,
            paymentAmount: paymentAmount,
            paymentMethod: paymentMethod,
            transactionText: transactionText,
        };
        // Make an http call to java
        const settings = {
            method: 'post',
            body: JSON.stringify(body), // convert body to string
        };
        fetch('/api/send-money', settings) // built in
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
            </div>
            <div class="login_content">
                <h1 class="login_content">Send funds to recipient:</h1>
            </div>
            <div class="login_content">
                <h1>From:</h1>
                <h2>Enter your information to verify your transaction</h2>
            </div>
            <div class="login_field">
                <label for="send_money_username"><b>Username: </b></label>
                <input
                    id="send_money_username"
                    type="text"
                    name="username"
                    value={username} // Connects to the const, // e represents DOM event
                    onChange={e => setUsername(e.target.value)} />
            </div>
            <div class="login_field">
                <label for="send_money_password"><b>Password: </b></label>
                <input
                    id="send_money_password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div class="login_content">
                <h1>To:</h1>
            </div>
            <div class="login_field">
                <label for="send_money_usernameRecipient"><b>Their Moneyish Username </b></label>
                <input
                    id="send_money_usernameRecipient"
                    type="text"
                    name="usernameRecipient"
                    value={usernameRecipient} // Connects to the const, // e represents DOM event
                    onChange={e => setUsernameRecipient(e.target.value)} />
            </div>
            <div class="login_content">
                <h1>Your method of payment: </h1>
            </div>
            <div class="login_field">
                <select value={paymentMethod} onChange={(e) => { setPaymentMethod(e.target.value) }}>
                    <option value="Account Balance">Account Balance</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                </select>
            </div>
            <div>

            </div>
            <div class="login_field">
                <label for="send_money_paymentAmount"><b>Payment Amount $ </b></label>
                <input
                    id="send_money_paymentAmount"
                    type="number"
                    min=".99"
                    max="3000.00"
                    step="10.00"
                    name="paymentAmount"
                    value={paymentAmount}
                    onChange={e => setPaymentAmount(e.target.value)}
                />
            </div>
            <div class="login_content">
                <h1>Do you want this transaction to be publicly visible?</h1>
            </div>
            <div class="signup_radio_btns">
                <div class="signup_content">
                    <input
                        id="send_money_public_yes"
                        type="radio"
                        name="publicVerification"
                        checked={publicTransaction === "true"}
                        value="true"
                        onChange={(e) => { setPublic(e.target.value) }}
                        required
                    />
                    <label for="send_money_public_yes">Yes</label>
                    <input
                        id="send_money_public_no"
                        type="radio"
                        name="publicVerification"
                        checked={publicTransaction === "false"}
                        value="false"
                        onChange={(e) => { setPublic(e.target.value) }}
                    />
                    <label for="send_money_public_no">No</label><br />
                </div>
            </div>
            <div class="login_content">
                <h1>Add a note to the transaction </h1>
            </div>
            <div class="signup_content">
                <textarea
                    rows="4"
                    cols="50"
                    name="transactionText"
                    value={transactionText}
                    onChange={(e) => { setTransactionText(e.target.value) }}
                >
                </textarea>
            </div>

            <div class="signup_content">
                <button onClick={handleSendMoney}>Confirm Payment</button>
            </div>
            {(result !== null) && <div class="result_message"><h2 class="_aboutus">{result.message}</h2></div>}
            <div class="padding_bottom"></div>
        </div>
    );
};

// Step 3 export default
export default SendMoney;