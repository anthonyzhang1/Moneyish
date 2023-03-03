import './css/App.css';
import { Link, Switch, Route } from 'react-router-dom' // third party library found in package.json

// 1) To create a new webpage, create a new file in './src/pages'
// 2) Name it "[whatever name].js"
// 3) Edit App.js file, and write import [whatever name] and provide path to it
// 4) Add appropriate <li> element and <Link to="[whatever path]"... etc
// 5) Add under <Switch> block too

// Relative paths
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import TermsConditions from './pages/TermsConditions';
import SendMoney from './pages/SendMoney';
import ManageAccountBalance from './pages/ManageAccountBalance';
import CheckBalance from './pages/CheckBalance';
import Dashboard from './pages/Dashboard';
import CheckTransactions from './pages/CheckTransactions';

function App() {
    return (
        <div>
            <ul class="app_ul">
                <Link class="home_logo" to={"/"}><img class="home_logo" src={'/images/Logo3.png'} alt="Moneyish Logo" height="30px" /></Link>
                <li class="app_li"><Link class="app_link" to="/">Home</Link></li>
                <li class="app_li"><Link class="app_link" to="/about">About</Link></li>
            </ul>

            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/log-in" component={LogIn} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/about" component={About} />
                <Route path="/terms_and_conditions" component={TermsConditions} />
                <Route path="/manage-account-balance" component={ManageAccountBalance} />
                <Route path="/send-money" component={SendMoney} />
                <Route path="/check-balance" component={CheckBalance} />
                <Route path="/check-transactions" component={CheckTransactions} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    );
}

export default App;