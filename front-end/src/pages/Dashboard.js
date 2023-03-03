// Necessary imports
import React from 'react';
import { Link } from 'react-router-dom'

// Dashboard returns following HTML elements to the browser
// Header along with links to: CheckBalance.js, ManageAccountBalance.js, SendMoney.js, and CheckTransactions.js
const Dashboard = () => {
    return (
        <div>
            <div>
                <h1 class="dashboard_content_head">Your Moneyish Dashboard</h1>
            </div>
            <div>
                <ul>
                    <li class="dashboard_content">
                        <div>
                            <Link to="/check-balance" className="dashboard_link">Check Balance</Link>
                        </div>
                    </li>
                    <li class="dashboard_content">
                        <Link to="/manage-account-balance" className="dashboard_link">Manage Account Balance</Link>
                    </li>
                    <li class="dashboard_content">
                        <div>
                            <Link to="/send-money" className="dashboard_link">Send Money</Link>
                        </div>
                    </li>
                    <li class="dashboard_content">
                        <div>
                            <Link to="/check-transactions" className="dashboard_link">Check Your Transactions</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

// Export Dashboard.js
export default Dashboard;