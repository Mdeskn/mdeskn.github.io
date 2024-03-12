
// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const quizQuestions = [
    {
        topic: "Science: Chemistry",
        question: "What is the chemical symbol for water?",
        choices: shuffle(["H2O", "CO2", "NaCl", "Fe"]),
        correctAnswer: "H2O"
    },
    {
        topic: "Literature",
        question: "Who wrote the famous play 'Romeo and Juliet'?",
        choices: shuffle(["Jane Austen", "William Shakespeare", "Leo Tolstoy", "Charles Dickens"]),
        correctAnswer: "William Shakespeare"
    },
    {
        topic: "Geography",
        question: "What is the capital of Japan?",
        choices: shuffle(["Beijing", "Seoul", "Tokyo", "Bangkok"]),
        correctAnswer: "Tokyo"
    },
    {
        topic: "History",
        question: "Who was the first president of the United States?",
        choices: shuffle(["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"]),
        correctAnswer: "George Washington"
    },
    {
        topic: "Mathematics",
        question: "What is the value of π (pi) to two decimal places?",
        choices: shuffle(["3.14", "3.16", "3.12", "3.18"]),
        correctAnswer: "3.14"
    },
    {
        topic: "Biology",
        question: "What is the powerhouse of the cell?",
        choices: shuffle(["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic reticulum"]),
        correctAnswer: "Mitochondria"
    },
    {
        topic: "Art",
        question: "Who painted the Mona Lisa?",
        choices: shuffle(["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]),
        correctAnswer: "Leonardo da Vinci"
    },
    {
        topic: "Sports",
        question: "Which sport is played in the Wimbledon Championships?",
        choices: shuffle(["Tennis", "Golf", "Cricket", "Soccer"]),
        correctAnswer: "Tennis"
    },
    {
        topic: "Technology",
        question: "Who is known as the 'Father of Computers'?",
        choices: shuffle(["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"]),
        correctAnswer: "Charles Babbage"
    },
    {
        topic: "Movies",
        question: "Which movie won the Academy Award for Best Picture in 1994?",
        choices: shuffle(["Forrest Gump", "The Shawshank Redemption", "Pulp Fiction", "Schindler's List"]),
        correctAnswer: "Forrest Gump"
    },
];


let currentQuestion = 0;
const feedbackElement = document.getElementById("feedback");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");

function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = "";

    question.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = `${String.fromCharCode(97 + index)}) ${choice}`;
        button.setAttribute("data-answer", String.fromCharCode(97 + index));
        button.onclick = checkAnswer;
        choicesElement.appendChild(button);
    });
}


let correctAnswersCount = 0;
let incorrectAnswersCount = 0;

function checkAnswer() {
    // Extract the answer text from the button's content, which follows the ') ' pattern
    const answerPattern = /\)\s*(.*)/;
    const selectedAnswer = this.textContent.match(answerPattern)[1].trim(); // Trim whitespace from the selected answer

    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    // Compare the selected answer text with the correct answer text
    if (selectedAnswer === correctAnswer) {
        feedbackElement.textContent = "Correct!";
        correctAnswersCount++; // Increment correct answers count
    } else {
        feedbackElement.textContent = "Incorrect. The correct answer is " + correctAnswer;
        incorrectAnswersCount++; // Increment incorrect answers count
    }

    // Move to the next question or end the quiz if all questions have been answered
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
    } else {
        feedbackElement.textContent += " End of Quiz!";
        choicesElement.innerHTML = "";

        // Display the number of correct and incorrect answers
        feedbackElement.textContent += `\nCorrect Answers: ${correctAnswersCount}`;
        feedbackElement.textContent += `\nIncorrect Answers: ${incorrectAnswersCount}`;
    }
}

displayQuestion();