# CSCI355-Project-2
Creating a quiz website that loads a random amount of questions and communicates with a server for questiosn, answers, and leaderboards
Website is deployed at: https://app.netlify.com/projects/iqquizapp/overview
Ivan:
|Created the basic html and css files for the website using a random pallete picker for the colors
|Basic navbar items: home, about, leaderboard: home could be the login later on but currently its where the quiz begins
|content box is working for both displaying the question section and the answer selection
|fixed the display box incorrectly rendering the answers 
|fixed the light/dark mode button in the center of nav
|added a footer and created a button for resetting quiz if needed
|fixed more bugs for the website

Roel:
Added light mode and darkmode in javascript. 
Created the login form for the user and password.
The password is required to be 6 characters long and have special symbols. Added timer, result page, and username displaying. Made sure the score is being displayed and showing how many questions were answered correctly.
Made the quiz randomly select 10 questions from the json file and created a result page that displays score. Changed the background with a space gif and change the quiz card box for the questions to blend in with the background. Made the navbar background transparent for the buttons to blend in with the background.

Saul:
From the questions given to us, made sure that the questions are either correct or incorrect based on the user input and based on the answer the selected the button will either glow green for the correct answer or it will glow red for the incorrect answer.
Connecting the login menu to the quiz page after the user has inputted their log in info. Also including a log out button for when they want to logout. 
Created a guest button for the user to select if they do not want to sign in and a welcome to either the user baseed on the user name that they used to sign in or welcome the guest to our quiz app.
Made sure that the user was either logged into our game as a guest for created an account in order to play our quiz app.
Connecting what we have with mongodb so we have a database with all logged in players
Created a team email and team mongodb account where we all have access to our "Central" DB and am able to connect to the db that was created. 