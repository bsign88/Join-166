
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
                let outerDiv = document.createElement('div');
                outerDiv.classList.add('outerDiv');


                let firstInnerDiv = document.createElement('div');
                firstInnerDiv.classList.add('firstInnerDiv');
                firstInnerDiv.style.backgroundColor = contact.color;
                firstInnerDiv.innerHTML = 'O';

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

// Aufruf der Funktion zum Rendern der Kontaktliste
renderContacts();