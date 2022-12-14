const form = document.querySelector('.js-form'),
    input = form.querySelector('input'),
    greetings = document.querySelector('.js-greetings');
const USER_LS = 'currentUsername',
    SHOWING_CN = 'showing';

function saveUser(text) {
    localStorage.setItem(USER_LS, text);
}

function submitHundler(event) {
    event.preventDefault();
    const inputValue = input.value;
    showGreeting(inputValue)
    saveUser(inputValue)
}

function showGreeting(text) {
    greetings.innerText = `Hello, ${text}`;
    greetings.classList.add(SHOWING_CN);
    form.classList.remove(SHOWING_CN);
}

function askForUser() {
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit', submitHundler);
}


function loadUsername() {
    const currentUsername = localStorage.getItem(USER_LS);
    if (currentUsername === null) {
        askForUser()
    } else {
        showGreeting(currentUsername)
    }
}

function init() {
    loadUsername()
}

init();