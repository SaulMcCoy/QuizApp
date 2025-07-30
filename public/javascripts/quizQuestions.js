/*Script for diplaying card questions questions are in a JSON format 
Will go through these questions to find the correct answer*/
let questions = []; 
let selectedQuestions = [];

fetch('./questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    // Shuffle and pick 10 questions
    selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    currentQ = 0;
    displayQuestion(); // start the quiz
  })
  .catch(err => console.error("Error loading questions:", err));


//Starts the questions from the beginning of the array.
let currentQ = 0;
let score = 0;
function displayQuestion() {
    //Creating the question text.
    console.log("Method Called");

    let questionData = selectedQuestions[currentQ]
    const container = document.getElementById("question_bank");

    //Testing to see if element is found
    if (!container) {
        console.error("Container element is not found");
        return;
    }

    console.log("Curr question: ", questionData)
    container.innerHTML = "";

    const questionText = document.createElement("p");
    questionText.className = "question-text"
    questionText.innerText = questionData.question; //Question from JSON file 
    container.appendChild(questionText);// Added into the question section
    
    //creating a div for the buttons
    // const buttonGrid = document.createElement('div');
    // buttonGrid.className = 'button-grid'

    //Creating the answer buttons and text.
    const options = ["A", "B", "C", "D"]
    options.forEach(option => {
        const button = document.createElement("button");
        button.className = "question-button";//Creates class name question-button
        button.innerText = `${option}.    ${questionData[option]}`;
        button.onclick = () => {
            selectAnswer(option, questionData.answer);//The second param confirms the correct answer.
        };
       // buttonGrid.appendChild(button);
        container.appendChild(button);
        
        
    });


    //Used to create another button so long as there are queestions to answer
    //The onclick is used to go to the next number in the array.
    if (currentQ < selectedQuestions.length - 1) {
        const nextButton = document.createElement("button");
        nextButton.innerText = "Next Question";
        nextButton.className = "btn btn-success next-button";
        nextButton.onclick = () => {
            currentQ++;
            displayQuestion();
        };
        container.appendChild(nextButton);
    } else {

    const completeButton = document.createElement("button");
    completeButton.innerText = "View Results";
    completeButton.className = "btn btn-warning mt-3";
    completeButton.onclick = () => {
    sessionStorage.setItem("finalScore", score);
    window.location.href = "result.html";
};
container.appendChild(completeButton);

    }

}

function selectAnswer(selectedOption, correctAnswer) {

    const buttons = document.querySelectorAll(".question-button");  
    //Going through each button
    buttons.forEach(button => {
        const option = button.innerText.charAt(0); // First character (A, B, C, D)
 
        if (option === correctAnswer) {
            button.style.backgroundColor = "green";
            button.style.color = "white";
        } else {
            button.style.backgroundColor = "red";
            button.style.color = "white";
        }
 
        // Disable all buttons after selection
        button.disabled = true;
    });
 
    if (selectedOption === correctAnswer) {
        console.log("Correct!");
        score++;
        console.log("Score now:", score);

    } else {
        console.log("Incorrect!");
    }
}



//Confirm the user is logged in
window.addEventListener('load', () =>{
    //Checks to make sure the user/guest is logged in when the page loads
    const username = sessionStorage.getItem("username");
    const guest = sessionStorage.getItem('isGuest');

    if(!username && !guest){
        alert('Please log in or play as a guest first to play the quiz.');
        window.location.href = 'signup';
        return;
    }

    //Displays a welcome message based on if you are a guest or not. 
    console.log(guest);
    if(username){
        document.getElementById("welcome-message").textContent = `Hello ${username}.`;
        
    }else{
         document.getElementById("welcome-message").textContent = 'Welcome, Guest';
    }

   
});

/*This is a sign out section.*/
const logoutButton = document.getElementById('logout-btn');
logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('guest');

    //Check to make sure they want to log out
    if(confirm('Are you sure you want to logout?')){
        window.location.href = 'signup.ejs';
    }
});

//Disable leader board for guests of the website.
function guestRestrictedFeatures(){
    const leaderboardLink = document.querySelector('a[href*="Leaderboard"]');
    if(leaderboardLink){
        leaderboardLink.style.display = 'none';
    }
}