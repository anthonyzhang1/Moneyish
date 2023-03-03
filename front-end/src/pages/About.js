// Step 1 import react
import React from 'react';

// Step 2 create a component func that returns an element
const About = () => {
    return (
        <div>
            <div class="_aboutus">
                <h1>About Us</h1>
            </div>
            <div class="_aboutus">
                <h2 class="_aboutus">Moneyish is a simple payments site where Moneyish users can send money to other Moneyish users.</h2>

                <p class="_aboutus" id="about_us_description">Anyone can register for an account and log in to it.
                    Once a user has registered, they can check their Moneyish account balance as well as deposit
                    into and withdraw from their Moneyish account.<br />
                    Users may also send and receive money to and from other Moneyish users.
                    These transactions can be set to private or public. Public transactions will
                    be visible on the home feed to everybody, while private transactions will
                    not be shown on the home feed. Private transactions can only be viewed by
                    the sender and recipient through the dashboard.</p>

                <h2 class="_aboutus">
                    <a class="_aboutus" href="https://github.com/anthonyzhang1/Moneyish">Moneyish</a> was developed
                    by <a class="_aboutus" href="https://github.com/PatrickCeledio">Patrick Celedio</a>
                    &nbsp;and <a class="_aboutus" href="https://github.com/anthonyzhang1">Anthony Zhang</a>!
                </h2>
            </div>
        </div>
    );
};

// Step 3 export default
export default About;