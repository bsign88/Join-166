async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let element of includeElements) {
        let file = element.getAttribute("w3-include-html");
        try {
            let response = await fetch(file);
            if (response.ok) {
                element.innerHTML = await response.text();
            } else {
                element.innerHTML = 'Page not found';
            }
        } catch (error) {
            element.innerHTML = 'Error loading the page';
        }
    }
}

async function init() {
    includeHTML();
    loadContacts();
} 

document.addEventListener("DOMContentLoaded", includeHTML);

let previousContent = {}; // Dieses Objekt speichert den Inhalt und die ID

async function loadContent(newContent, clickedId) {
    let contentDiv = document.getElementById('includeHtml');

    // Speichern des aktuellen Inhalts und der aktuellen ID vor dem Laden neuer Inhalte
    previousContent = {
        html: contentDiv.innerHTML,
        id: clickedId || null
    };

    contentDiv.setAttribute('w3-include-html', newContent);
    await includeHTML();
    updateSelectedMenuPoint(clickedId);

    if (newContent === 'contacts.html') {
        renderContacts();
    }
    if (newContent === 'board.html') {
        renderTasks();
    }
}

function goBack() {
    let contentDiv = document.getElementById('includeHtml');

    // Überprüfen, ob zuvor gespeicherter Inhalt vorhanden ist
    if (previousContent && previousContent.html) {
        contentDiv.innerHTML = previousContent.html; // Wiederherstellung des gespeicherten Inhalts
        updateSelectedMenuPoint(previousContent.id); // Aktualisieren des hervorgehobenen Menüpunktes
    } else {
        // Optional: Standardverhalten oder Weiterleitung, wenn kein gespeicherter Inhalt vorhanden ist
        contentDiv.innerHTML = '<p>Kein vorheriger Inhalt verfügbar.</p>';
    }
}
// Diese Funktion erstellt eine Markierung durch eine CSS Klasse für den Aktullen Menüpunkt

function updateSelectedMenuPoint(newSelectedId) {
    let currentSelected = document.querySelector('.selected-menu-point');
    if (currentSelected) {
        currentSelected.classList.remove('selected-menu-point');
    }
    let newSelected = document.getElementById(newSelectedId);
    if (newSelected) {
        newSelected.classList.add('selected-menu-point');
    }
}

// Diese Funktion öffnet oder schließt das Drop-Down-Menu

function toggleMenu() {
    let menu = document.getElementById("dropOutMenu");
    menu.classList.toggle("d-none");
}

// Diese Funktion öffnet die Seite die ausgewählt wurde und startet die Funktion closeMenu()

function menuPointClicked(page) {
    loadContent(page);
    closeMenu(); 
}

// Diese Funktion schließt das Drop-Down-Menu nachdem man einen Punkt ausgewählt hat

function closeMenu() {
    let menu = document.getElementById("dropOutMenu");
    if (!menu.classList.contains("d-none")) {
        menu.classList.add("d-none");
    }
}

function togglePasswordVisibility() {
  let passwordInput = document.getElementById('password-input');
  let passwordIcon = document.getElementById('password-icon');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordIcon.src = './assets/img/icons/visibility.png'; 
  } else {
    passwordInput.type = 'password';
    passwordIcon.src = './assets/img/icons/visibility_off.png'; 
  }
}

function autoFillEmail() {
  let emailInput = document.getElementById('email-input');
  let passwordInput = document.getElementById('password-input');
  let passwordIcon = document.getElementById('password-icon');

  emailInput.value = 'sofiam@gmail.com'; 
  passwordInput.value = 'mypassword123'; 
  passwordInput.type = 'password';
  passwordIcon.src = './assets/img/icons/visibility_off.png'; 
}