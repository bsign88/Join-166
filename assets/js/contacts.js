
// Sortiere die Kontakte alphabetisch nach dem Namen
contacts.sort((a, b) => (a.name > b.name) ? 1 : -1);

// Funktion zur Anzeige der Kontaktliste
function renderContacts() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let contactsDiv = document.getElementById('contacts-list');

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
                let contactDiv = document.createElement('div');
                contactDiv.classList.add('contact');
                contactDiv.textContent = contact.name;
                contactsByLetterDiv.appendChild(contactDiv);
            });
        }
    });
}

// Aufruf der Funktion zum Rendern der Kontaktliste
renderContacts();
