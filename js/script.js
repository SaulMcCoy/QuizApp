const toggle = document.getElementById('mode-toggle');

toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});


const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const welcomeUser = document.getElementById('welcome-user');

let score = 0;
let timerInterval;

loginForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    //Username and password inputs. 
    const username = usernameInput.value;
    const password = passwordInput.value;
    const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!pattern.test(password)) {
        errorMessage.textContent = "Password must be at least 6 characters, include 1 uppercase letter, and 1 special character.";
    } else {
        errorMessage.textContent = "";
        // alert("Login successful! (This is just a demo)");
        
        //stores username in sessionStorage. Works like local host.  
        sessionStorage.setItem('username', username)
        
        //This will redirect it to the quiz page.
        window.location.href = 'quiz.html'

    }
});

const timerElement = document.getElementById('timer');
if (timerElement) {
    let timeLeft = 60;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}

// Show results (quiz complete or timer ends)
function showResults() {
    clearInterval(timerInterval);
    const quizSection = document.getElementById('quiz-questions');
    if (quizSection) quizSection.style.display = 'none';

    const resultPage = document.createElement('div');
    resultPage.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p id="final-score">Your score: ${score}/10</p>
        <button onclick="window.location.href='index.html'">Play Again</button>
    `;

    document.body.appendChild(resultPage);
}


if (welcomeUser) {
    const savedUser = sessionStorage.getItem('username');
    if (savedUser) {
        welcomeUser.textContent = `Welcome, ${savedUser}!`;
    }
}

window.finishQuiz = function(currentScore) {
    score = currentScore;
    showResults();
};


