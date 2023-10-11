const navigateButton = document.getElementById("navigateButton");

let lang = localStorage.getItem('lang') || 'de';

const languageText = {
    de: {
        headingStart: "Europareise",
        navigateButton: "Spiel starten",
        gameStartText: "Spielstart",
    },
    en: {
        headingStart: "Journey through Europe",
        navigateButton: "Start Game",
        gameStartText: "Game Start",
    }
};

// Add an event listener for the unload event
window.addEventListener('unload', () => {
    localStorage.setItem('lang', lang);
});

// Add a click event listener to the button
navigateButton.addEventListener("click", function () {
    // Change the window location to page2.html
    window.location.href = "/";
});

const playerNameCheck = {};

function changeLanguage() {
    document.getElementById('headingStart').textContent = languageText[lang].headingStart;
    document.getElementById('navigateButton').textContent = languageText[lang].navigateButton;
    document.getElementById('gameStartText').textContent = languageText[lang].gameStartText;
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
      langSelectElement.value = savedLang;
  } else {
      langSelectElement.value = lang;
  }
  langChange(); // Aufruf der changeLanguage Funktion nach dem Setzen der Sprache
});