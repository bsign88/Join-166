
// Sortiere die Kontakte alphabetisch nach dem Namen
contacts.sort((a, b) => (a.name > b.name) ? 1 : -1);

// Funktion zur Anzeige der Kontaktliste
function renderContacts() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let contactsDiv = document.getElementById('contacts-list');
    let content = document.getElementById('contacts-content');

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
                let name = contact.name;
                let nameParts = name.split(' ');
                let initials = '';
                nameParts.forEach (part => { initials += part.charAt(0);});
                firstInnerDiv.innerHTML = `${initials}`;
                outerDiv.addEventListener('click', function() {
                    openContact(content, contact, initials);
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
function openContact(content, contact, initials) {
    content.innerHTML = `
    <div class="contact-box">
                <div class="user-initials-icon" id="user-initials-icon-${contact.id}">${initials}</div>
                <div class="user-edit-delete">
                    <span class="contacts-name" id="contacts-name-${contact.id}">${contact.name}</span>
                    <div class="contacts-change-link">
                        <div class="contacts-icon-text" id="contacts-edit-${contact.id}"><img class="contacts-change-icons"
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
}