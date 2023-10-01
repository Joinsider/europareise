let lang = localStorage.getItem('lang') || 'de';

import { languageText } from './lang.js';
// Texte für verschiedene Sprachen

const playerNameCheck = {}; // Object to track whether player names are filled

// Funktion zum Ändern der Sprache und Aktualisieren des angezeigten Textes
function changeLanguage() {
    document.getElementById('headingStart').textContent = languageText[lang].headingStart;
    document.getElementById('playerAmountText').textContent = languageText[lang].playerAmountText;
    document.getElementById('checkButton').textContent = languageText[lang].checkButton;
    document.getElementById('choosePlayerAmountMessage').textContent = languageText[lang].choosePlayerAmountMessage;
    // Weitere Textelemente hier aktualisieren, wenn erforderlich
    // Check if tbody is not empty and change placeholder
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

// Event-Listener für Änderungen der Sprachauswahl
const langSelectElement = document.getElementById('langSelect');

langSelectElement.addEventListener('change', langChange);

function langChange() {
    const choosenLang = langSelectElement.value;
    if ((choosenLang !== lang) && languageText[choosenLang]) {
        lang = choosenLang;
        changeLanguage();
        localStorage.setItem('lang', lang);
        console.log("Sprache geändert zu " + lang);
    } else {
        console.log('Bereits ausgewählt oder nicht vorhanden');
    }
}

window.addEventListener('load', () => {
    // Versuche, die Sprache aus dem Local Storage abzurufen
    const savedLang = localStorage.getItem('lang');

    // Wenn eine gespeicherte Sprache gefunden wurde und sie in der Liste der unterstützten Sprachen ist, setze sie als aktuelle Sprache
    if (savedLang !== '' && languageText[savedLang]) {
        lang = savedLang;
    }

    // Aktualisiere die Sprachauswahl im Dropdown
    langSelectElement.value = savedLang;
    // Ändere die Sprache auf der Webseite
    langChange();
});

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
    }else{
        playerNameCheck[index] = false;
        localStorage.setItem('playerName' + index, '');
    }
}

// Add action listener on form submit
const form = document.getElementById('playerNamesForm');
form.addEventListener('submit', checkForm);

const errorMessage = document.getElementById('errorMessage');

function checkForm(event){
    event.preventDefault();

    const playerAmount = playerAmountSelect.value;
    errorMessage.textContent = '';
    if(playerAmount === "0"){
        errorMessage.textContent = languageText[lang].errorMessagePlayerAmount;
    }else{
        for(let i = 1; i <= playerAmount; i++){
            const input = document.getElementById('playerName' + i);
            let inputvalue = input.value.trim();

            if(inputvalue === ''){
                errorMessage.textContent = languageText[lang].errorMessagePlayerNames;
                break;
            }
        }
        if(errorMessage.textContent === ''){
            window.location.href = "game_start.html";
        }
    }
}
