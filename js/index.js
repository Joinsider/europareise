let lang = localStorage.getItem('lang') || 'de';

const languageText = {
    de: {
        headingStart: "Europareise",
        playerAmountText: "Spieleranzahl auswählen: ",
        checkButton: "Spiel starten",
        choosePlayerAmountMessage: "Wählen Sie aus",
        errorMessagePlayerAmount: "Bitte wählen Sie eine gültige Spieleranzahl aus. Mind. 2",
        errorMessagePlayerNames: "Bitte füllen Sie alle Spielerfelder aus.",
        player: "Spieler",
    },
    en: {
        headingStart: "Journey through Europe",
        playerAmountText: "Choose number of players: ",
        checkButton: "Start Game",
        choosePlayerAmountMessage: "Please choose",
        errorMessagePlayerAmount: "Please choose a valid number of players. Min. 2",
        errorMessagePlayerNames: "Please fill out all player fields.",
        player: "Player",
    }
};


// Importiere die Sprachtexte aus der Json Datei und speichere sie in der Konstante languageText



const playerNameCheck = {};

function changeLanguage() {
    document.getElementById('headingStart').textContent = languageText[lang].headingStart;
    document.getElementById('playerAmountText').textContent = languageText[lang].playerAmountText;
    document.getElementById('checkButton').value = languageText[lang].checkButton;
    document.getElementById('choosePlayerAmountMessage').textContent = languageText[lang].choosePlayerAmountMessage;

    const tbody = document.getElementById('playerNamesTbody');
    if (tbody.innerHTML !== '') {
        const playerAmount = parseInt(playerAmountSelect.value);
        for (let i = 1; i <= playerAmount; i++) {
            const input = document.getElementById('playerName' + i);
            if (input.value.trim() !== ''){
                input.placeholder = languageText[lang].player + " " + i;
            }
        }
    }
}

const langSelectElement = document.getElementById('langSelect');

langSelectElement.addEventListener('change', langChange);

function langChange() {
    const chosenLang = langSelectElement.value;
    if ((chosenLang !== lang) && languageText[chosenLang]) {
        lang = chosenLang;
        changeLanguage();
        localStorage.setItem('lang', lang);
        console.log("Sprache geändert zu " + chosenLang);
        const langSelectElement = document.getElementById('langSelect');
        langSelectElement.value = chosenLang;
    } else {
        console.log('Bereits ausgewählt oder nicht vorhanden');
    }
}

window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang !== null && languageText[savedLang]) {
        lang = savedLang;
    }
    langSelectElement.value = savedLang;
    langChange();
});

const removeGame = document.getElementById('removeGame');
removeGame.addEventListener('click', removeGameFromStorage);

function removeGameFromStorage() {
    localStorage.removeItem('game');
    const loadGameForm = document.getElementById('loadGameForm');
    loadGameForm.style.display = 'none';
}

const playerAmountSelect = document.getElementById('playerAmountSelect');
playerAmountSelect.addEventListener('change', playerNamesInputsChange);

function playerNamesInputsChange() {
    const playerAmount = parseInt(playerAmountSelect.value);
    const tbody = document.getElementById('playerNamesTbody');
    tbody.innerHTML = '';

    for (let i = 1; i <= playerAmount; i++) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        const input = document.createElement('input');

        input.type = 'text';
        input.id = 'playerName' + i;
        input.placeholder = languageText[lang].player + " " + i;

        input.addEventListener('change', function() {
            playerNamesInputChecker(i);
        });

        cell.appendChild(input);
        row.appendChild(cell);
        tbody.appendChild(row);
    }
}

function playerNamesInputChecker(index) {
    const input = document.getElementById('playerName' + index);
    if (input.value.trim() !== '') {
        playerNameCheck[index] = true;
        localStorage.setItem('playerName' + index, input.value.trim());
    } else {
        playerNameCheck[index] = false;
        localStorage.setItem('playerName' + index, '');
    }
}

const form = document.getElementById('playerAmountSelectForm'); // Changed the form id to 'playerAmountSelectForm'
form.addEventListener('submit', checkForm);

const errorMessage = document.getElementById('errorMessage');

function checkForm(event) {
    event.preventDefault();
    const playerAmount = parseInt(playerAmountSelect.value);
    if (playerAmount === 0) {
        errorMessage.textContent = languageText[lang].errorMessagePlayerAmount;
    } else {
        let allPlayersFilled = true;
        for (let i = 1; i <= playerAmount; i++) {
            if (!playerNameCheck[i]) {
                allPlayersFilled = false;
                break;
            }
        }
        if (!allPlayersFilled) {
            errorMessage.textContent = languageText[lang].errorMessagePlayerNames;
        } else {
            errorMessage.textContent = '';
            window.location.href = "game_start.html";
        }
    }
}

