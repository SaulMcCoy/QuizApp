const toggle = document.getElementById('mode-toggle');

toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});


const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorMessage = document.getElementById('error-message');
const welcomeUser = document.getElementById('welcome-user');


loginForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    //Username and password inputs. 
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!pattern.test(password)) {
        errorMessage.textContent = "Password must be at least 6 characters, include 1 uppercase letter, and 1 special character.";
    } else if (password !== confirmPassword){
        errorMessage.textContent = 'The passwords do not match, please try again.';
    }else{
    errorMessage.textContent = '';
    sessionStorage.setItem('username', username);
    //After confirming the sign up redirect to quiz. 
    window.location.href = 'quiz'
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


if (welcomeUser) {
    const savedUser = sessionStorage.getItem('username');
    if (savedUser) {
        welcomeUser.textContent = `Welcome, ${savedUser}!`;
    }
}

// Waits for a click to get to the quiz page. 
const guestButton = document.getElementById('guest-btn');
guestButton.addEventListener('click', ()=> {
    sessionStorage.setItem('isGuest', 'true');
    window.location.href = 'quiz';
})

