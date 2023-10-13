let targetNumber;
let attempts = 0;

function startGame() {
    targetNumber = Math.floor(Math.random() * 10) + 1;
    attempts = 0;
    playGame();
}

function playGame() {
    const userGuess = prompt("Введите число:");

    if (userGuess === null) {
        alert("Игра окончена. Ждем вас снова!");
        return;
    }

    const guess = parseInt(userGuess);

    if (isNaN(guess)) {
        alert("Введите число!");
        playGame();
    } else if (guess < targetNumber) {
        attempts++;
        alert("Искомое число больше!");
        playGame();
    } else if (guess > targetNumber) {
        attempts++;
        alert("Искомое число меньше!");
        playGame();
    } else {
        attempts++;
        const playAgain = confirm(`Вы угадали! Количество попыток: ${attempts}. Начать заново?`);
        if (playAgain) {
            startGame();
        } else {
            alert("Игра окончена. Ждем вас снова!");
        }
    }
}

document.getElementById("startButton").addEventListener("click", startGame);
