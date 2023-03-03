// Step 1 import react
import React from 'react';
import { Link } from 'react-router-dom' // third party library found in package.json

// Step 2 create a component func that returns an element
const SignUp = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordFinal, setFinalPassword] = React.useState('');
    const [tosResult, setTOS] = React.useState('tosNo');
    const [result, setResult] = React.useState(null);

    const handleSignUp = () => {
        const body = {
            username: username,
            email: email,
            password: password,
            passwordFinal: passwordFinal,
            tosResult: tosResult,
        };
        // Make an http call to java
        const settings = {
            method: 'post',
            body: JSON.stringify(body), // convert body to string
        };
        fetch('/api/sign-up', settings) // built in
            .then(res => res.json())
            .then(data => {
                setResult(data);
            })
            .catch(console.log); // async try/catch
    };

    if (result !== null && result.isSuccess) {
        return (
            <div>
                <h1 class="_aboutus">Welcome {username}! You have successfully registered!</h1>
                <div>
                    <ul>
                        <li class="home_li">
                            <div>
                                <p class="home_p">
                                    <Link class="p_link_tc" to={"/log-in"}><b>Log In</b></Link></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div class="login_content">
            <h1 class="login_content">Sign Up to Moneyish</h1>
            <div class="login_field">
                <label for="sign_up_username"><b>Username: </b></label>
                <input
                    id="sign_up_username"
                    type="text"
                    name="username"
                    value={username} // Connects to the const, // e represents DOM event
                    onChange={e => setUsername(e.target.value)} />
            </div>
            <div class="login_field">
                <label for="sign_up_email"><b>E-Mail Address: </b></label>
                <input
                    id="sign_up_email"
                    type="email"
                    name="email"
                    value={email} // Connects to the const, // e represents DOM event
                    onChange={e => setEmail(e.target.value)} />
            </div>
            <div class="login_field">
                <label for="sign_up_password"><b>Password: </b></label>
                <input
                    id="sign_up_password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div class="login_field">
                <label for="sign_up_passwordFinal"><b>Please confirm your password: </b></label>
                <input
                    id="sign_up_passwordFinal"
                    type="password"
                    name="passwordFinal"
                    value={passwordFinal}
                    onChange={e => setFinalPassword(e.target.value)}
                />
            </div>
            <div class="signup_radio_btns">
                <div class="signup_content">
                    <p>Do you agree with the <Link class="terms_and_condition" to={"/terms_and_conditions"} target="_blank"><b>Terms and Conditions?</b></Link></p>
                    <input
                        id="sign_up_tos_yes"
                        type="radio"
                        name="tosVerification"
                        checked={tosResult === "tosYes"}
                        value="tosYes"
                        onChange={(e) => { setTOS(e.target.value) }}
                        required
                    />
                    <label for="sign_up_tos_yes">Yes</label>

                    <input
                        id="sign_up_tos_no"
                        type="radio"
                        name="tosVerification"
                        checked={tosResult === "tosNo"}
                        value="tosNo"
                        onChange={(e) => { setTOS(e.target.value) }}
                    />
                    <label for="sign_up_tos_no">No</label>
                </div>
            </div>
            <div class="signup_content">
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
            {(result !== null && !result.isSuccess) && <div class="result_message">
                <h2 class="_aboutus">{result.message}</h2></div>}
        </div>
    );
};

// Step 3 export default
export default SignUp; // equivalent to "public" in java