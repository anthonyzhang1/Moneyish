// Step 1 import react
import React, { useState } from 'react';
import { Link } from 'react-router-dom' // third party library found in package.json

// Step 2 create a component func that returns an element
const CheckBalance = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [result, setResult] = React.useState(null);
    const [data, setData] = useState([]);

    const handleCheckTransactions = () => {
        const body = {
            username: username,
            password: password,
        };

        // Make an http call to java
        const settings = {
            method: 'post',
            body: JSON.stringify(body), // convert body to string
        };

        fetch('/api/get-user-transactions', settings)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setResult(myJson); // in event of error message
                setData(myJson); // when theres a transaction log to display
            })
            .catch(console.log); // async try/catch
    };

    /** Populates the transactions list with transactions. The transactions will have
      * different text depending on the type of payment method used. */
    function populateTransactionList() {
        let tempHTML = ''; // holds the HTML we will put in the transaction list div

        if (data && data.length > 0) {
            data.forEach((item) => {
                if (item.type === 'Cash') { // cash
                    tempHTML += `<p><hr/><b style="color:blue">${item.sender}</b> paid <b style="color:green">$${item.amount.toFixed(2)}</b>
                    to <b style="color:orange">${item.recipient}</b> through cash order.
                    <h1>${item.notes}</h1><hr/></p>`;
                } else if (item.type === 'Credit Card') { // credit card
                    tempHTML += `<p><hr/><b style="color:blue">${item.sender}</b> sent <b style="color:green">$${item.amount.toFixed(2)}</b>
                    to <b style="color:orange">${item.recipient}</b> via credit card.
                    <h1>${item.notes}</h1><hr/></p>`;
                } else { // account balance
                    tempHTML += `<p><hr/><b style="color:blue">${item.sender}</b> sent <b style="color:green">$${item.amount.toFixed(2)}</b>
                    to <b style="color:orange">${item.recipient}</b> using their Moneyish account balance.
                    <h1>${item.notes}</h1><hr/></p>`;
                }
            });
        }

        return { __html: tempHTML } // sets the innerHTML with our list of transactions
    }

    return (
        <div>
            <div>
                <Link to="/dashboard" className="dashboard_components"><h2 class=".back_button">Go Back</h2></Link>
                <h1 className="login_content">You are at the check-transactions page.</h1>
            </div>
            <h2 class="login_content">Enter your information to check your recent transaction history:</h2>
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
                <button onClick={handleCheckTransactions}>Check Recent Transactions</button>
            </div>
            {result !== null && <div class="result_message"><h2 class="_aboutus">{result.message}</h2></div>}
            <div class="transaction_post" dangerouslySetInnerHTML={populateTransactionList()}></div>
        </div>
    );
};

// Step 3 export default
export default CheckBalance;