// --- Game Data: Questions and Scenarios ---
// Each object represents a question/scenario with its options, correct answer, and explanation.
const questions = [
  {
    topic: "Phishing",
    scenario:
      "You receive an email from 'PayPal' stating your account has been suspended due to suspicious activity. It asks you to click a link to 'verify your account immediately' or it will be closed. The sender's email address is 'paypal-support@secure-update.net'.",
    options: [
      "Click the link immediately to prevent account closure.",
      "Reply to the email asking for more information.",
      "Go directly to the official PayPal website (by typing the URL) and log in to check your account status.",
      "Forward the email to a friend to see if they got it too.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Phishing emails often use urgency and fake sender addresses. Always go directly to the official website by typing the URL yourself, or use a trusted bookmark, rather than clicking links in suspicious emails.",
  },
  {
    topic: "Password Strength",
    scenario:
      "You need to create a new password for an important online banking account. Which of these options would be the strongest and most secure password?",
    options: ["MyBirthday1990", "password123", "P@ssw0rd_Str0ng!", "ilovecats!"],
    correctAnswerIndex: 2,
    explanation:
      "A strong password is long, uses a mix of uppercase and lowercase letters, numbers, and symbols. 'P@ssw0rd_Str0ng!' is the best option as it meets these criteria and is harder to guess or crack.",
  },
  {
    topic: "Data Privacy",
    scenario:
      "You're signing up for a new social media app. It asks for access to your contacts, location, and microphone. You only plan to use it to share photos with friends.",
    options: [
      "Grant all permissions; it's probably just how the app works.",
      "Grant only the permissions absolutely necessary for sharing photos (e.g., camera/photos).",
      "Skip the app entirely, it's too intrusive.",
      "Grant permissions but delete them later.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Always review and limit app permissions to only what's necessary for its core function. Granting excessive permissions can compromise your privacy and data security.",
  },
  {
    topic: "Malware",
    scenario:
      "You're browsing the internet and a pop-up appears, claiming your computer is infected with 10 viruses and tells you to download 'Antivirus Pro' immediately to fix it.",
    options: [
      "Click the 'Download Now' button to clean your computer.",
      "Close the pop-up by clicking the 'X' button or closing the browser tab/window.",
      "Call the phone number provided in the pop-up for technical support.",
      "Restart your computer immediately.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "These are often 'screwer' or 'adware' tactics. Never click on such pop-ups or download software from untrusted sources. Close the pop-up or browser window immediately.",
  },
  {
    topic: "Safe Browsing",
    scenario:
      "You visit a website, and your browser shows a 'Not Secure' warning next to the website address. The address starts with 'http://' instead of 'https://'.",
    options: [
      "It's probably fine; proceed with browsing.",
      "Enter your personal information, like login credentials, if prompted.",
      "Avoid entering any sensitive information and consider leaving the site.",
      "Install a browser extension to force it to be secure.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "The 'Not Secure' warning and 'http://' indicate that the connection is not encrypted. This means any data you send (like passwords) could be intercepted. Avoid sensitive actions on such sites.",
  },
];

// --- Game State Variables ---
let currentQuestionIndex = 0; // Tracks the current question being displayed
let score = 0; // Tracks the player's score
let totalQuestions = questions.length; // Total number of questions in the game

// --- DOM Elements ---
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const startGameBtn = document.getElementById("start-game-btn");
const scenarioText = document.getElementById("scenario-text");
const answerOptionsDiv = document.getElementById("answer-options");
const feedbackArea = document.getElementById("feedback-area");
const feedbackMessage = document.getElementById("feedback-message");
const explanationText = document.getElementById("explanation-text");
const nextQuestionBtn = document.getElementById("next-question-btn");
const scoreDisplay = document.getElementById("score-display");
const questionNumberSpan = document.getElementById("question-number");
const totalQuestionsSpan = document.getElementById("total-questions");

const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const finalMessage = document.getElementById("final-message");
const restartGameBtn = document.getElementById("restart-game-btn");

// Modal elements
const customModal = document.getElementById("custom-modal");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalOkBtn = document.getElementById("modal-ok-btn");

// --- Game Functions ---

/**
 * Initializes the game by setting up the total questions display and showing the start screen.
 */
function initializeGame() {
  totalQuestionsSpan.textContent = totalQuestions;
  showScreen("start");
}

/**
 * Displays the specified game screen and hides others.
 * @param {string} screenName - 'start', 'game', or 'end'
 */
function showScreen(screenName) {
  startScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  endScreen.classList.add("hidden");

  if (screenName === "start") {
    startScreen.classList.remove("hidden");
  } else if (screenName === "game") {
    gameScreen.classList.remove("hidden");
  } else if (screenName === "end") {
    endScreen.classList.remove("hidden");
  }
}

/**
 * Starts the game, resets state, and loads the first question.
 */
function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.textContent = score;
  showScreen("game");
  loadQuestion();
}

/**
 * Loads and displays the current question/scenario.
 */
function loadQuestion() {
  // Hide feedback and next button for the new question
  feedbackArea.classList.add("hidden");
  nextQuestionBtn.classList.add("hidden");

  // Check if there are more questions
  if (currentQuestionIndex < totalQuestions) {
    const currentQ = questions[currentQuestionIndex];
    questionNumberSpan.textContent = currentQuestionIndex + 1;
    scenarioText.textContent = currentQ.scenario;
    answerOptionsDiv.innerHTML = ""; // Clear previous options

    // Create buttons for each answer option
    currentQ.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.classList.add("answer-button", "flex", "items-center", "gap-3");
      button.innerHTML = `
                <span class="text-xl font-bold">${String.fromCharCode(
                  65 + index
                )}.</span> <!-- A, B, C, D -->
                <span>${option}</span>
            `;
      button.dataset.index = index; // Store the option index
      button.addEventListener("click", handleAnswerClick);
      answerOptionsDiv.appendChild(button);
    });
    // Update score display in case it was hidden or needed refresh
    scoreDisplay.textContent = score;
  } else {
    // If no more questions, end the game
    endGame();
  }
}

/**
 * Handles a user's click on an answer option.
 * @param {Event} event - The click event.
 */
function handleAnswerClick(event) {
  // Disable all answer buttons after a choice is made
  Array.from(answerOptionsDiv.children).forEach((button) => {
    button.removeEventListener("click", handleAnswerClick);
    button.disabled = true; // Visually disable
  });

  const selectedAnswerIndex = parseInt(event.currentTarget.dataset.index);
  const currentQ = questions[currentQuestionIndex];
  const correctAnswerIndex = currentQ.correctAnswerIndex;

  // Show feedback area
  feedbackArea.classList.remove("hidden");

  // Check if the answer is correct
  if (selectedAnswerIndex === correctAnswerIndex) {
    score++; // Increment score
    scoreDisplay.textContent = score; // Update score display
    feedbackMessage.textContent = "Correct! Well done, Cyber Guardian!";
    feedbackMessage.classList.remove("wrong");
    feedbackMessage.classList.add("correct");
    event.currentTarget.classList.add("correct"); // Highlight correct button
  } else {
    feedbackMessage.textContent = "Incorrect. Let's learn from this!";
    feedbackMessage.classList.remove("correct");
    feedbackMessage.classList.add("wrong");
    event.currentTarget.classList.add("wrong"); // Highlight wrong button
    // Also highlight the correct answer
    answerOptionsDiv.children[correctAnswerIndex].classList.add("correct");
  }

  // Display explanation
  explanationText.textContent = currentQ.explanation;
  nextQuestionBtn.classList.remove("hidden"); // Show next button
}

/**
 * Advances to the next question or ends the game.
 */
function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion(); // Attempt to load next question
}

/**
 * Ends the game and displays the final score and message.
 */
function endGame() {
  showScreen("end");
  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = totalQuestions;

  let message = "";
  const percentage = (score / totalQuestions) * 100;

  if (percentage === 100) {
    message =
      "Outstanding! You are a true Cyber Guardian. Your digital defenses are strong!";
  } else if (percentage >= 70) {
    message =
      "Great job! You have a strong understanding of cyber hygiene. Keep learning and improving!";
  } else if (percentage >= 40) {
    message =
      "Good effort! You're on your way to becoming a Cyber Guardian. Review the explanations to strengthen your knowledge.";
  } else {
    message =
      "Keep practicing, Cyber Guardian! Every step you take to learn about online safety makes a difference.";
  }
  finalMessage.textContent = message;
}

// --- Custom Modal Functions (replaces alert()) ---

/**
 * Displays a custom modal message.
 * @param {string} title - The title of the modal.
 * @param {string} message - The message content.
 */
function showModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  customModal.style.display = "flex"; // Use flex to center content
}

/**
 * Hides the custom modal.
 */
function hideModal() {
  customModal.style.display = "none";
}

// --- Event Listeners ---
window.onload = initializeGame; // Initialize game when the window loads
startGameBtn.addEventListener("click", startGame); // Start game button
nextQuestionBtn.addEventListener("click", nextQuestion); // Next question button
restartGameBtn.addEventListener("click", startGame); // Restart game button

// Modal event listeners
modalCloseBtn.addEventListener("click", hideModal);
modalOkBtn.addEventListener("click", hideModal);
// Close modal if clicking outside content
customModal.addEventListener("click", (event) => {
  if (event.target === customModal) {
    hideModal();
  }
});

// Example of how to use the custom modal:
// showModal("Welcome!", "This is a custom message box instead of alert().");
