/*Script for diplaying card questions questions are in a JSON format 
Will go through these questions to find the correct answer*/
const questions = [
    {
        "question": "A flashing red traffic light signifies that a driver should do what?",
        "A": "stop",
        "B": "speed up",
        "C": "proceed with caution",
        "D": "honk the horn",
        "answer": "A"
    },

    {
        "question": "A knish is traditionally stuffed with what filling?",
        "A": "potato",
        "B": "creamed corn",
        "C": "lemon custard",
        "D": "raspberry jelly",
        "answer": "A"

    },

    {
        "question": "A pita is a type of what?",
        "A": "fresh fruit",
        "B": "flat bread",
        "C": "French tart",
        "D": "friend bean dip",
        "answer": "B"
    },

    {
        "question": "A portrait that comically exaggerates a person's physical traits is called a what?",
        "A": "landscape",
        "B": "caricature",
        "C": "still life",
        "D": "Impressionism",
        "answer": "B"
    }

]

let currentQ = 0;

function displayQuestion() {
    //Creating the question text.
    console.log("Method Called");

    let questionData = questions[currentQ]
    const container = document.getElementById("question_bank");

    //Testing to see if element is found
    if (!container) {
        console.error("Container element is not found");
        return;
    }

    console.log("Curr question: ", questionData)
    container.innerHTML = "";//Clear content

    const questionText = document.createElement("p");
    questionText.className = "question-text"
    questionText.innerText = questionData.question; //Question from JSON file 
    container.appendChild(questionText);// Added into the question section

    //Creating the answer buttons and text.
    const options = ["A", "B", "C", "D"]
    options.forEach(option => {
        const button = document.createElement("button");
        button.className = "question-button";
        button.innerText = `${option} ${questionData[option]}`;
        button.onclick = () => {
            selectAnswer(option, questionData.answer);//The second param confirms the correct answer.
        };
        container.appendChild(button);
    });


    //Used to create another button so long as there are queestions to answer
    if (currentQ < questions.length - 1) {
        const nextButton = document.createElement("button");
        nextButton.innerText = "Next Question";
        nextButton.className = "btn btn-success";
        nextButton.onclick = () => {
            currentQ++;//How we increment through array
            displayQuestion();
        };
        container.appendChild(nextButton);
    } else {
        const completeButton = document.createElement("button");
        completeButton.innerText = "The Quiz is Completed";
        completeButton.className = "btn btn-warning mt-3";
        completeButton.disabled = true;
        container.appendChild(completeButton);
    }

}

function selectAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        alert("Your Answer is correct");
    } else {
        alert("Your Answer is not correct, try again next time.");
    }
}

//Used to confirm that the page is fully loaded before calling displayQuestion function
window.addEventListener('DOMContentLoaded', function(){
    console.log("The DOM is loaded");
    displayQuestion()
});