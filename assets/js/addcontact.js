function openAddNewContact() {
    let window = document.getElementById("add-contact-window");
    let overlay = document.getElementById("background-overlay");
    window.style.display = "flex";
    overlay.style.display = "block";
    resetInputs();
}

async function createNewContact() {
    document.getElementById('save-add-contact-button').disabled = true;
    let color = document.getElementById('user-initial-icon-add').style.backgroundColor;
    let name = document.getElementById('add-input-name').value;
    let email = document.getElementById('add-input-email').value;
    let phone = document.getElementById('add-input-phone').value;
    let nameParts = name.split(' ');
    let initials = '';
    nameParts.forEach(part => { initials += part.charAt(0); });

    // Laden der Benutzer-ID und Warten, bis sie verfügbar ist
    await loadUserId()
    // Neuer Wert für die ID des neuen Kontakts
    let id = userId + 1;

    let newContact = {
        "name": name,
        "email": email,
        "phone": phone,
        "color": color,
        "id": id,
        "initials": initials
    };

    // Hinzufügen des neuen Kontakts zur Kontaktliste
    contacts.push(newContact);

    // Aktualisieren der Kontaktliste in der Datenbank
    await setItem('contacts', contacts);

    // Aktualisieren der Benutzer-ID in der Datenbank
    await setItem('userId', id);


    // Schließen des Formulars zur Hinzufügung neuer Kontakte
    closeAddNewContact();

    // Aktualisieren der Kontaktansicht
    renderContacts();

    // Setz den ausgewählten Kontakt zurück zu Leer
    let contactInformation = document.getElementById('contacts-content');
    contactInformation.innerHTML = '';
    document.getElementById('save-add-contact-button').disabled = false;
}

function closeAddNewContact() {
    let window = document.getElementById("add-contact-window");
    let overlay = document.getElementById("background-overlay");
    window.style.display = "none";
    overlay.style.display = "none";
    resetInputs();
    closeColorPicker();
}


function openColorPicker() {
    let colorPickerPopup = document.getElementById('color-picker-popup-add');
    colorPickerPopup.style.display = 'inline-block';
    let positionIcon = document.getElementById('user-initial-icon-add');
    positionIcon.style.left = '-25%';
}


function closeColorPicker(color) {
    let colorPickerPopup = document.getElementById('color-picker-popup-add');
    colorPickerPopup.style.display = 'none';
    let userColor = document.getElementById('user-initial-icon-add');
    userColor.style.backgroundColor = color;
    let positionIcon = document.getElementById('user-initial-icon-add');
    positionIcon.style.left = '0';
}