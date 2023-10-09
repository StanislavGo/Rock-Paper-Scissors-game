/**
 * 1. Зробити відкриття модального вікна
 *  - Зробити клік по кнопці "Правила" 
 *  - Додати клас "modal--isActive" блоку div.modal
 * 
 * 2. Зробити закриття модального вікна
 *  - Прибрати клас "modal--isActive" блоку div.modal
 * 
 * 3. При обиранні фігури
 *  - Додати клас "gameContent--isActive" блоку div.gameContent
 *      <!-- GAME CHOICES-->
 *  - При виборі паперу - gameContent__gameChoice gameContent__gameChoice--isPaper gameContent__gameChoice--isActive
 *  - При виборі каменю - gameContent__gameChoice gameContent__gameChoice--isRock gameContent__gameChoice--isActive
 *  - При виборі ножиць - gameContent__gameChoice gameContent__gameChoice--isScissors ||gameContent__gameChoice--isActive||
 * 
 *   - gameContent__gameChoice gameContent__gameChoice--isComputer 
 *          - Запустити таймер
 *          - Після закінченнб=ю таймеру
 *              - Обрати випадкову фігуру
 *                  - Додати клас що вибрав комп'ютер {{gameContent__gameChoice--isRock}}
 *                  - gameContent__gameChoiceImage прописати src(шлях до картинки)
 *
 * 4. Після завершення гри
 *  - Додати клас "gameContent gameContent--isActive gameContent--revealResult" блоку div.gameContent
 *  - gameContent__resultText прописка текст
 *      - Draw
 *      - Win
 *      - Lose
 *  - header__scoreNumber додавати/віднімати очки
 * 
 * 5. Після перезапуску гри
 *  - Видаляти всі класи блоку div.gameContent
 * 
 * ==================
 * Modal functionality
 */
let btnOpenModal = document.querySelector('.container__rules');

// Зони для закриття модального вікна
let btnCloseModal = document.querySelector('.modal__closeIcon');
let modalOverlay = document.querySelector('.modal__overlay');

btnOpenModal.onclick = function() {
    let modalWindow = document.querySelector('.modal');
    modalWindow.classList.add('modal--isActive');
    // modalWindow.className = "modal modal--isActive";
}
btnCloseModal.onclick = closeModal;
modalOverlay.onclick = closeModal;

function closeModal() {
    let modalWindow = document.querySelector('.modal');
    modalWindow.classList.remove('modal--isActive');
    // modalWindow.className = 'modal';
}

/**
 * Робимо клік по фігурах
 */
// -------------
// Обираємо фігури
// -------------
let gameChoicePaper = document.querySelector('.gameContent__gameChoice--isPaper');
let gameChoiceScissors = document.querySelector('.gameContent__gameChoice--isScissors');
let gameChoiceRock = document.querySelector('.gameContent__gameChoice--isRock');
let playerChoice = 0;
let computerChoice = 0;
let gameContent = document.querySelector('.gameContent');
let gameScore = 0;

//-------------
//Функціонал кліків по кнопкам
//-------------
// Робимо клік по Папіру
gameChoicePaper.onclick = function(event) {
    startChoice(event.target);
    playerChoice = 1;
}

// Робимо клік по ножицям
gameChoiceScissors.onclick = function(event) {
    startChoice(event.target);
    playerChoice = 2;
}

// Робимо клік по каменю
gameChoiceRock.onclick = function(event) {
    startChoice(event.target);
    playerChoice = 3;
}

function startChoice(element) {
    gameContent.classList.add('gameContent--isActive');
    element.classList.add('gameContent__gameChoice--isActive');
    /** ========
     * Запускаємо таймер
     *  ========
     */
    let countdownText = document.querySelector('.gameContent__countdownText');
    let timer = 3;
    let timerID = setInterval(function() {
        timer--; // timer = timer - 1;
        countdownText.innerText = timer;
        if(timer == 0) {
            countdownText.innerText = "";
            finish();
            clearInterval(timerID);
        }
    }, 1000);
}

function finish() {
    choiceComputer();    
    result();
}

function result() {
    // win
    // lose
    // draw
    /**
     * 1 - isPaper
     * 2 - isScissors
     * 3 - isRock
     * 1 > 3
     * 2 > 1
     * 3 > 2
     */
    let resultText = document.querySelector('.gameContent__resultText');
    if(playerChoice == computerChoice) {
        resultText.innerText = "Draw";
    } else if(
        (playerChoice == 1 && computerChoice == 3) ||
        (playerChoice == 2 && computerChoice == 1) ||
        (playerChoice == 3 && computerChoice == 2)
    ) {
        resultText.innerText = "Win";
        changeScore(1);
    } else {
        resultText.innerText = "Lose";
        changeScore(-1);
    }
    gameContent.classList.add('gameContent--revealResult');
}

function changeScore(score) {
/**
 * 1. Якщо score < 0 і очки == 0, то нічого не робити 
 */
    if(score < 0 && gameScore == 0) {
        return 0;
    }
    gameScore = gameScore + score; // 1 + -1 = 0
    let scoreBlockText = document.querySelector('.header__scoreNumber'); 
    scoreBlockText.innerText = gameScore;
}

// Функція вибору фігури комп'ютером
function choiceComputer() {
    computerChoice = random(1, 3);
    let image = "";
    let className = "";
    /**
     * 1. Якщо choice = 1
     * image = "images/icon-paper.svg"
     * className = "gameContent__gameChoice--isPaper"
     * gameChoiceCompute.classList.add(className)
     * Замінити картинку .gameContent__gameChoiceImage = image
     */
/*
    if(choice == 1) {
        image = "images/icon-paper.svg";
        className = "gameContent__gameChoice--isPaper";
    } else if(choice == 2) {
        image = "images/icon-scissors.svg"
        className = "gameContent__gameChoice--isScissors";
    } else if(choice == 3) {
        image = "images/icon-rock.svg"
        className = "gameContent__gameChoice--isRock";
    }
*/

    switch(computerChoice) {
        case 1:
            image = "images/icon-paper.svg";
            className = "gameContent__gameChoice--isPaper";
            break;

        case 2:
            image = "images/icon-scissors.svg"
            className = "gameContent__gameChoice--isScissors";
            break;

        case 3:
            image = "images/icon-rock.svg"
            className = "gameContent__gameChoice--isRock";
            break;
    }


    // Міняємо клас комп'ютеру
    let gameChoiceComputer = document.querySelector('.gameContent__gameChoice--isComputer');
    gameChoiceComputer.classList.add(className);

    // Міняємо картинку 
    let gameChoiceComputerImage = document.querySelector('.gameContent__gameChoiceImage');
    gameChoiceComputerImage.src = image;
}


function random(min, max) {
    // рандомне число від min до max
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

/**
 * Перезапуск гри
 */
let reloadButton = document.querySelector('.gameContent__resultButton');
reloadButton.onclick = reload;

// Функція перезапуску гри
function reload() {

    gameContent.classList.remove('gameContent--isActive', 'gameContent--revealResult');
    let activeElement = document.querySelector('.gameContent__gameChoice--isActive');
  
    // Очищаємо вибір опонента
    activeElement.classList.remove('gameContent__gameChoice--isActive');
    let gameChoiceComputerImage = document.querySelector('.gameContent__gameChoiceImage');
    gameChoiceComputerImage.src = '';

    let gameChoiceComputer = document.querySelector('.gameContent__gameChoice--isComputer');
    // gameChoiceComputer.classList.add(className);
    gameChoiceComputer.className = 'gameContent__gameChoice gameContent__gameChoice--isComputer';

    let countdownText = document.querySelector('.gameContent__countdownText');
    countdownText.innerText = 3;
}
