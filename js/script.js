const toggle = document.getElementById('mode-toggle');

toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});


const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    //Username and password inputs. 
    const username = usernameInput.value;
    const password = passwordInput.value;


    const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!pattern.test(password)) {
        errorMessage.textContent = "Password must be at least 6 characters, include 1 uppercase letter, and 1 special character.";
    } else {
        errorMessage.textContent = "";

        //stores username in sessionStorage. Works like local host.  
        sessionStorage.setItem('username', username)
        
        //This will redirect it to the quiz page.
         window.location.href = 'quiz.html'

    }
});

//Waits for a click to get to the quiz page. 
const guestButton = document.getElementById('guest-btn');
guestButton.addEventListener('click', ()=> {
    sessionStorage.setItem('isGuest', 'true');
    window.location.href = 'quiz.html';
})

