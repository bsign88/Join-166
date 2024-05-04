// Sortiere die Kontakte alphabetisch nach dem Namen


// Funktion zur Anzeige der Kontaktliste
function renderContacts() {
    contacts.sort((a, b) => (a.name > b.name) ? 1 : -1);
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let contactsDiv = document.getElementById('contacts-list');
    let contactInformation = document.getElementById('contacts-content');
    contactsDiv.innerHTML = '';
    alphabet.forEach(letter => {
        let contactsByLetter = contacts.filter(contact => contact.name.toLowerCase().startsWith(letter));

        if (contactsByLetter.length > 0) {
            let alphabetDiv = document.createElement('div');
            alphabetDiv.classList.add('contacts-list-alphabet');
            alphabetDiv.textContent = letter.toUpperCase();
            contactsDiv.appendChild(alphabetDiv);

            let separatorDiv = document.createElement('div');
            separatorDiv.classList.add('contacts-list-separator');
            contactsDiv.appendChild(separatorDiv);

            let contactsByLetterDiv = document.createElement('div');
            contactsByLetterDiv.id = `${letter}-contacts`;
            contactsDiv.appendChild(contactsByLetterDiv);

            contactsByLetter.forEach(contact => {
                let outerDiv = document.createElement('div');
                outerDiv.classList.add('outerDiv');

                let firstInnerDiv = document.createElement('div');
                firstInnerDiv.classList.add('firstInnerDiv');
                firstInnerDiv.style.backgroundColor = contact.color;
                let initials = getInitials(contact.name);
                firstInnerDiv.innerHTML = `${initials}`;
                outerDiv.addEventListener('click', () => {
                    openContact(contactInformation, contact);
                });

                let secondInnerDiv = document.createElement('div');
                secondInnerDiv.classList.add('secondInnerDiv');

                let contactDivName = document.createElement('div');
                contactDivName.classList.add('contactDivName');
                contactDivName.textContent = contact.name;
                let contactDivEmail = document.createElement('div');
                contactDivEmail.classList.add('contactDivEmail');
                contactDivEmail.textContent = contact.email;

                secondInnerDiv.appendChild(contactDivName);
                secondInnerDiv.appendChild(contactDivEmail);

                outerDiv.appendChild(firstInnerDiv);
                outerDiv.appendChild(secondInnerDiv);

                contactsByLetterDiv.appendChild(outerDiv);
            });
        }
    });
}

//zeigt die Kontaktdaten des ausgewählten Kontakt
function openContact(contactInformation, contact) {
    if (!contactInformation) {
        console.error('contactInformation element is not found!');
        return;
    }
    contactInformation.innerHTML = `
    <div class="contact-box">
                <div class="user-initials-icon" id="user-initials-icon-${contact.id}">${contact.initials}</div>
                <div class="user-edit-delete">
                    <span class="contacts-name" id="contacts-name-${contact.id}">${contact.name}</span>
                    <div class="contacts-change-link">
                        <div class="contacts-icon-text" id="contacts-edit-${contact.id}" onclick="openEditContact(${contact.id})"><img class="contacts-change-icons"
                                src="./assets/img/icons/pen-icon.svg">Edit</div>
                        <div class="contacts-icon-text" id="contacts-delete-${contact.id}"><img class="contacts-change-icons"
                                src="./assets/img/icons/trash-icon.svg">Delete</div>
                    </div>
                </div>
            </div>
            <p class="contact-info-headline">Contact information</p>
            <div class="contacts-information-box">
                <div class="contact-details-box">
                    <p class="contacts-info-object-headline">Email</p>
                    <a class="contacts-info-object-email" id="contacts-email-${contact.id}">${contact.email}</a>
                </div>
                <div class="contact-details-box">
                    <p class="contacts-info-object-headline">Phone</p>
                    <a class="contacts-info-object-phone" id="contacts-phone-${contact.id}">${contact.phone}</a>
                </div>
            </div>
    `;
    document.getElementById(`user-initials-icon-${contact.id}`).style.backgroundColor = `${contact.color}`;
}

function openAddNewContact() {
    let window = document.getElementById("add-contact-window");
    let overlay = document.getElementById("background-overlay");
    window.style.display = "flex";
    overlay.style.display = "block";
}

function closeAddNewContact(name, phone, email) {
    let window = document.getElementById("add-contact-window");
    let overlay = document.getElementById("background-overlay");
    window.style.display = "none";
    overlay.style.display = "none";
    name.value = '';
    phone.value = '';
    email.value = '';
}

function openEditContact(id) {
    let window = document.getElementById("edit-contact-window");
    let overlay = document.getElementById("background-overlay");
    window.style.display = "flex";
    overlay.style.display = "block";
    let user = contacts[id];
    let name = document.getElementById('edit-input-name');
    let email = document.getElementById('edit-input-email');
    let phone = document.getElementById('edit-input-phone');
    let userInitials = document.getElementById('user-initial-icon-edit');
    name.value = user.name;
    email.value = user.email;
    phone.value = user.phone;
    userInitials.innerHTML = user.initials;
}

async function saveEditContact() {
    let name = document.getElementById('edit-input-name').value;
    let email = document.getElementById('edit-input-email').value;
    let phone = document.getElementById('edit-input-phone').value;
    let color = document.getElementById('user-initial-icon-edit').style.backgroundColor;;
    let initials = getInitials(name);
    let newContact = {
        "name": name,
        "email": email,
        "phone": phone,
        "color": color,
        "initials": initials
    }
    contacts.push(newContact);
    await setItem('contacts', contacts);
    closeEditContact(name, phone, email);
    renderContacts();
}

function closeEditContact(name, phone, email) {
    let window = document.getElementById("edit-contact-window");
    let overlay = document.getElementById("background-overlay");
    window.style.display = "none";
    overlay.style.display = "none";
    name.value = '';
    phone.value = '';
    email.value = '';
}

function openColorPicker() {
    let colorPickerPopup = document.getElementById('color-picker-popup');
    colorPickerPopup.style.display = 'block';
}

function closeColorPicker(color) {
    let colorPickerPopup = document.getElementById('color-picker-popup');
    colorPickerPopup.style.display = 'none';
    let userColor = document.getElementById('user-initial-icon-add');
    userColor.style.backgroundColor = color;
}

function openColorPickerEdit() {
    let colorPickerPopup = document.getElementById('color-picker-popup-edit');
    colorPickerPopup.style.display = 'block';
}

function closeColorPickerEdit(color) {
    let colorPickerPopup = document.getElementById('color-picker-popup-edit');
    colorPickerPopup.style.display = 'none';
    let userColor = document.getElementById('user-initial-icon-edit');
    userColor.style.backgroundColor = color;
}

async function createNewContact() {
    let color = document.getElementById('user-initial-icon-add').style.backgroundColor;
    let name = document.getElementById('add-input-name').value;
    let email = document.getElementById('add-input-email').value;
    let phone = document.getElementById('add-input-phone').value;
    let nameParts = name.split(' ');
    let initials = '';
    nameParts.forEach(part => { initials += part.charAt(0); });

    // Laden der Benutzer-ID und Warten, bis sie verfügbar ist
    await loadUserId().then(async (userId) => {
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
    });

    // Schließen des Formulars zur Hinzufügung neuer Kontakte
    closeAddNewContact(name, phone, email);

    // Aktualisieren der Kontaktansicht
    renderContacts();
}

function getInitials(name) {
    let nameParts = name.split(' ');
    let initials = '';
    nameParts.forEach(part => { initials += part.charAt(0); });
    return initials;
}