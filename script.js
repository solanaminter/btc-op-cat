document.addEventListener('DOMContentLoaded', function() {
    const stack = [];
    const stackDisplay = document.getElementById('stack-display');
    const quizResults = document.getElementById('quiz-results');
    const quizQuestions = document.getElementById('quiz-questions');
    const celebrationBanner = document.getElementById('celebration-banner');

    // Add an item to the stack and update the display
    function pushToStack(item) {
        stack.push(item);
        updateStackDisplay();
    }

    // Initialize or reset the stack with default items
    function initializeStack() {
        stack.length = 0; // Clear the stack
        pushToStack('Item1');
        pushToStack('Item2');
    }

    // OP_DUP: Duplicate the top item on the stack
    document.getElementById('op_dup').addEventListener('click', function() {
        if (stack.length > 0) {
            const topItem = stack[stack.length - 1];
            pushToStack(topItem);
        }
    });

    // OP_CAT: Concatenate the top two items on the stack
    document.getElementById('op_cat').addEventListener('click', function() {
        if (stack.length > 1) {
            const item1 = stack.pop();
            const item2 = stack.pop();
            pushToStack(item2 + item1); // Ensure correct concatenation order
        }
    });

    // Reset: Clear the stack and re-initialize with default items
    document.getElementById('reset').addEventListener('click', function() {
        initializeStack();
    });

    // Update the visual display of the stack
    function updateStackDisplay() {
        stackDisplay.textContent = stack.length > 0 ? stack.join('\n') : 'Stack is empty';
    }

    // Handle quiz submission
    document.getElementById('submit-quiz').addEventListener('click', function() {
        let score = 0;
        const totalQuestions = 5;
        const selectedAnswers = quizQuestions.querySelectorAll('input[type="radio"]:checked');

        selectedAnswers.forEach(answer => {
            if (answer.value === 'Concatenates two strings' && answer.name === 'question1') {
                score++;
            } else if (answer.value === 'Exponential memory usage' && answer.name === 'question2') {
                score++;
            } else if (answer.value === 'OP_DUP' && answer.name === 'question3') {
                score++;
            } else if (answer.value === 'Enforcing recursive covenants' && answer.name === 'question4') {
                score++;
            } else if (answer.value === 'Concerns about potential bugs and exploits' && answer.name === 'question5') {
                score++;
            }
        });

        const resultText = `You got ${score} out of ${totalQuestions} correct!`;
        quizResults.textContent = resultText;
        quizResults.style.display = 'block';
        quizResults.style.backgroundColor = score === totalQuestions ? '#C8E6C9' : '#FFCDD2';

        // Show celebration banner and confetti if all answers are correct
        if (score === totalQuestions) {
            celebrationBanner.classList.remove('hidden');
            createConfetti();
        } else {
            celebrationBanner.classList.add('hidden');
        }
    });

    // Function to create confetti
    function createConfetti() {
        const confettiCount = 100;
        const confetti = document.getElementById('celebration-banner');

        for (let i = 0; i < confettiCount; i++) {
            let confetto = document.createElement('div');
            confetto.className = 'confetti';
            confetto.style.left = `${Math.random() * 100}%`;
            confetto.style.animationDelay = `${Math.random() * 2}s`;
            confetto.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.appendChild(confetto);
        }
    }

    // Initialize the stack with default items on page load
    initializeStack();
});
