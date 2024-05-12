function openEditContact(contactId) {
    let window = document.getElementById("edit-contact-window");
    let overlay = document.getElementById("background-overlay");
    window.style.display = "flex";
    overlay.style.display = "block";
    foundContact = getUser(contactId);
    let name = document.getElementById('edit-input-name');
    let email = document.getElementById('edit-input-email');
    let phone = document.getElementById('edit-input-phone');
    let userInitials = document.getElementById('user-initial-icon-edit');
    name.value = foundContact.name;
    email.value = foundContact.email;
    phone.value = foundContact.phone;
    userInitials.innerHTML = foundContact.initials;
    userInitials.style.backgroundColor = foundContact.color;

}


async function saveEditContact() {
    let name = document.getElementById('edit-input-name').value;
    let email = document.getElementById('edit-input-email').value;
    let phone = document.getElementById('edit-input-phone').value;
    let color = document.getElementById('user-initial-icon-edit').style.backgroundColor;
    let initials = getInitials(name);
    foundContact.name = name;
    foundContact.email = email;
    foundContact.phone = phone;
    foundContact.color = color;
    foundContact.initials = initials;
    updateContact();
    await setItem('contacts', contacts);
    closeEditContact();
    renderContacts();
    let contactInformation = document.getElementById('contacts-content');
    openContact(contactInformation, foundContact);
}


async function editDeleteContact() {
    contactId = foundContact.id;
    deleteContact(contactId);
    closeEditContact();
}


function updateContact() {
    // Find the index of the foundContact object
    let index = contacts.findIndex(function (contact) {
        return contact.id === foundContact.id;
    });

    // If the contact is found, update its values
    if (index !== -1) {
        contacts[index] = foundContact; // Replace the old object with the updated one
    } else {
        console.log("Contact not found in the contacts array.");
    }
}


function closeEditContact() {
    let window = document.getElementById("edit-contact-window");
    let overlay = document.getElementById("background-overlay");
    window.style.display = "none";
    overlay.style.display = "none";
    resetInputs();
}


function resetInputs() {
    let name = document.getElementById('edit-input-name');
    let email = document.getElementById('edit-input-email');
    let phone = document.getElementById('edit-input-phone');
    name.value = '';
    email.value = '';
    phone.value = '';
}


function openColorPickerEdit() {
    let colorPickerPopup = document.getElementById('color-picker-popup-edit');
    colorPickerPopup.style.display = 'flex';
}


function closeColorPickerEdit(color) {
    let colorPickerPopup = document.getElementById('color-picker-popup-edit');
    colorPickerPopup.style.display = 'none';
    let userColor = document.getElementById('user-initial-icon-edit');
    userColor.style.backgroundColor = color;
}