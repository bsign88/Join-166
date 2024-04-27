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

function init() {
    includeHTML();
} 

document.addEventListener("DOMContentLoaded", includeHTML);

function loadContent(newContent, clickedId) {
    let contentDiv = document.getElementById('includeHtml');
    contentDiv.setAttribute('w3-include-html', newContent);
    includeHTML(); 
    updateSelectedMenuPoint(clickedId);
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

// Öffnet das dropdown "Assignet to" bei Addtask

function openDropdown() {
    var checkList = document.getElementById("list1");
    checkList.getElementsByClassName("anchor")[0].onclick = function (evt) {
      if (checkList.classList.contains("visible"))
        checkList.classList.remove("visible");
      else checkList.classList.add("visible");
    };
  }