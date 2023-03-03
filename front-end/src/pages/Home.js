// Necessary imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

// Home.jsx
const Home = () => {
    const [data, setData] = useState([]);

    // This code handles the feed of public transactions
    const getTransactions = () => {
        // fetch('/api/') makes a call to the backend to return all the documents from TransactionCollection from the database 
        fetch('/api/',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setData(myJson)
            });
    }

    // This tells React that we need to call getTransactions() after rendering the page 
    useEffect(() => {
        getTransactions()
    }, [])

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

    // Home returns these elements to the webpage
    return (
        <div>
            <div class="home_content">
                <img class="home_p" src={'/images/Logo2.png'} alt="Moneyish Logo" />
                <p class="home_p">Transfer funds to your friends and family with Moneyish. </p>
                <p class="home_p">Sign up now and refer a friend!</p>
            </div>
            <div>
                <ul>
                    <li class="home_li">
                        <div>
                            <p class="home_p">
                                <Link class="p_link_tc" to={"/log-in"}><b>Log In</b></Link></p>
                        </div>
                    </li>

                    <li class="home_li">
                        <div>
                            <p class="home_p">
                                <Link class="p_link_tc" to={"/sign-up"}><b>Sign Up</b></Link></p>
                        </div>
                    </li>
                </ul>
            </div>
            <div >
                {data.length > 0 && <h1 class="transaction_header">See how people are using Moneyish!</h1>}
            </div>
            <div class="transaction_post" dangerouslySetInnerHTML={populateTransactionList()}></div>
        </div>
    );
};

// Step 3 export default
export default Home;