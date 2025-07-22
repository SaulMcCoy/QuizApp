const toggle = document.getElementById('mode-toggle');

toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});


const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const password = passwordInput.value;


    const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!pattern.test(password)) {
        errorMessage.textContent = "Password must be at least 6 characters, include 1 uppercase letter, and 1 special character.";
    } else {
        errorMessage.textContent = "";
        alert("Login successful! (This is just a demo)");

    }
});


/*Script for diplaying card questions
Options section is for what the text options are going to be for the user to see.*/
const questions = [
    {
        text: "Who is your charcter in the game Elden Ring?",
        options: [
            {
                text: "Unkindled",
                correct: false
            },

            {
                text: "Honored One",
                correct: false
            },


            {
                text: "Tarnished",
                correct: true
            },


            {
                text: "Fire Keeper",
                correct: false
            }
        ]
    },

    {
        text: "What is Super-Mans real name?",
        options: [
            {
                text: "Clark Kent",
                correct: false
            },

            {
                text: "Kal-El",
                correct: true
            },


            {
                text: "Lex Luthor",
                correct: false
            },


            {
                text: "Bruce Wayne",
                correct: false
            }
        ]
    },

    {
        text: "How many main line Final Fantasys are there?",
        options: [
            {
                text: "23",
                correct: false
            },

            {
                text: "18",
                correct: false
            },


            {
                text: "25",
                correct: false
            },


            {
                text: "16",
                correct: true
            }
        ]
    },

    {
        text: "What studio made Dark souls?",
        options: [
            {
                text: "Square Enix",
                correct: false
            },

            {
                text: "EA",
                correct: false
            },


            {
                text: "Black Bird",
                correct: false
            },


            {
                text: "FromSoftware",
                correct: ture
            }
        ]
    }

]

function displayQuestion() {
    //Creating the question text.
    let currentQ = 0
    let question = questions[currentQ]
    const container = document.getElementById("question_bank");
    container.innerHTML = "";
    const questionText = document.createElement("p");
    questionText.innerText = question.text
    container.appendChild(questionText);

    //Creating the answer buttons and text.
    // const answer = question.options;
    for (let i = 0; i < question.options.length; i++) {
        const answer = question.options[i];
        const button = document.createElement("button");
        button.innerText = answer.text;
        container.appendChild(button)
    }

    

}


window.onload = displayQuestion;