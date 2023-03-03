# Moneyish
Moneyish is a mock online payment website similar to Venmo. However, real money is not used. \
Moneyish allows for users to create accounts, add and withdraw funds from their account balance, send/pay money to other users, and view one's payment history. There is also a live feed of payments other users have made, if they choose to make the payment public.

Moneyish uses Java for the back end, MongoDB for the database, and React for the front end.

Moneyish was created for my university's Software Development course in Fall 2021, where I worked on the website with another student. Our roles are listed in the table below:
| Student Name     | GitHub Username  | Role                 |
| :---:            | :---:            | :---:                |
| Anthony Zhang    | anthonyzhang1    | Back End Developer   |
| Patrick Celedio  | PatrickCeledio   | Front End Developer  |

#### Moneyish is purely a project for learning, and does not follow best security practices.

# Installation Instructions
You will need Java, MongoDB, and Node.js to run the servers.

**Step 1:** Build the Java back end, then run `back-end/src/main/java/Spark.java` to start the back end server. You may see a warning in the console, but you can safely ignore it. \
**Step 2:** Enter `npm i` into the terminal from the `front-end` folder and wait for the dependencies to install. \
**Step 3:** Enter `npm start` into the terminal from the `front-end` folder to start the front end server.

#### Once your browser opens a new tab showing Moneyish's homepage, the installation is finished and you can begin using Moneyish. If your browser did not open a new tab, you can go to Moneyish's home page directly at http://localhost:3000/.

After the first-time install, you can start Moneyish's servers again by running `Spark.java` to start the back end server, and entering `npm start` into the terminal from the `front-end` folder to start the front end server.
