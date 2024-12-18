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

    //zeigt ein Infofeld an, welches anzeigt das ein Kontakt erstellt wurde.
    addContactNotification();
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
}


function closeColorPicker(color) {
    let colorPickerPopup = document.getElementById('color-picker-popup-add');
    colorPickerPopup.style.display = 'none';
    let userColor = document.getElementById('user-initial-icon-add');
    userColor.style.backgroundColor = color;
    let positionIcon = document.getElementById('user-initial-icon-add');
    positionIcon.style.left = '0';
}

function addContactNotification() {
    // Create the notification container
    const notification = document.createElement('div');
    notification.textContent = "Contact successfully created";
    
    // Set styles
    notification.classList.add('notification');
    
    // Add the notification to the document
    document.body.appendChild(notification);
    
    // Trigger opacity change to fade in
    setTimeout(() => {
        notification.style.opacity = "1";
    }, 10); // Short delay to allow the transition to apply
    
    // Remove the notification after 800ms
    setTimeout(() => {
        notification.style.opacity = "0"; // Start fading out
        setTimeout(() => notification.remove(), 300); // Delay remove to allow fade-out
    }, 800);
}