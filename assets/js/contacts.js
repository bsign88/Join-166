// Funktion zur Anzeige der Kontaktliste
function renderContacts() {
    // Sort contacts alphabetically by name
    let sortedContacts = contacts.toSorted();

    // Clear previous content
    const contactsDiv = document.getElementById('contacts-list');
    const contactInformation = document.getElementById('contacts-content');
    contactsDiv.innerHTML = '';

    // Group contacts by the first letter of their name
    const contactsByLetter = {};
    sortedContacts.forEach(contact => {
        const firstLetter = contact.name.charAt(0).toLowerCase();
        if (!contactsByLetter[firstLetter]) {
            contactsByLetter[firstLetter] = [];
        }
        contactsByLetter[firstLetter].push(contact);
    });

    // Render contacts for each letter
    Object.entries(contactsByLetter).forEach(([letter, sortedContacts]) => {
        const alphabetDiv = createAlphabetDiv(letter.toUpperCase())
        const seperatorDiv = createAlphabetSeperator();
        const contactsByLetterDiv = createContactsByLetterDiv(letter);
        sortedContacts.forEach(contact => {
            const outerDiv = createOuterDiv(contact);
            contactsByLetterDiv.appendChild(outerDiv);
        });
        contactsDiv.appendChild(alphabetDiv);
        contactsDiv.appendChild(seperatorDiv);
        contactsDiv.appendChild(contactsByLetterDiv);
    });
    
    // Function to create alphabet div
    function createAlphabetDiv(letter) {
        const alphabetDiv = document.createElement('div');
        alphabetDiv.classList.add('contacts-list-alphabet');
        alphabetDiv.textContent = letter;
        return alphabetDiv;
    }

    // Create the Seperator
    function createAlphabetSeperator() {
        const seperatorDiv = document.createElement('div');
        seperatorDiv.classList.add('contacts-list-separator');
        return seperatorDiv;
    }

    // Function to create contacts by letter div
    function createContactsByLetterDiv(letter) {
        const contactsByLetterDiv = document.createElement('div');
        contactsByLetterDiv.id = `${letter}-contacts`;
        return contactsByLetterDiv;
    }

    // Function to create outer div for each contact
    function createOuterDiv(contact) {
        const outerDiv = document.createElement('div');
        outerDiv.classList.add('outerDiv');
        outerDiv.setAttribute('id', `contact${contact.id}`);
        outerDiv.addEventListener('click', () => {
            openContact(contactInformation, contact);
        });

        const firstInnerDiv = document.createElement('div');
        firstInnerDiv.classList.add('firstInnerDiv');
        firstInnerDiv.style.backgroundColor = contact.color;
        firstInnerDiv.innerHTML = getInitials(contact.name);

        const secondInnerDiv = document.createElement('div');
        secondInnerDiv.classList.add('secondInnerDiv');

        const contactDivName = document.createElement('div');
        contactDivName.classList.add('contactDivName');
        contactDivName.textContent = contact.name;

        const contactDivEmail = document.createElement('div');
        contactDivEmail.classList.add('contactDivEmail');
        contactDivEmail.textContent = contact.email;

        secondInnerDiv.appendChild(contactDivName);
        secondInnerDiv.appendChild(contactDivEmail);

        outerDiv.appendChild(firstInnerDiv);
        outerDiv.appendChild(secondInnerDiv);

        return outerDiv;
    }
}


//zeigt die Kontaktdaten des ausgewählten Kontakt
function openContact(contactInformation, contact) {
    

    // Aktuell ausgewählten Kontakt hervorheben
    let selectedContactDiv = document.getElementById(`contact${contact.id}`);
    if (selectedContactDiv.classList.contains('selectedContact')) {
        // If already selected, remove the class and animation
        selectedContactDiv.classList.remove('selectedContact');
        removeAnimation();
        contactInformation.innerHTML = "";
    } else {
        // Alle Kontakte zurücksetzen
        resetAllSelectedContacts();

    selectedContactDiv.classList.add('selectedContact');
    if (!contactInformation) {
        console.error('contactInformation element is not found!');
        return;
    }
    insertContactInformation(contactInformation, contact);
    document.getElementById(`user-initials-icon-${contact.id}`).style.backgroundColor = `${contact.color}`;
    addAnimation();
    checkScreenWidthForLayoutSwitch(contact);
}}

function checkScreenWidthForLayoutSwitch(contact) {
    // Check the screen width and switch layout if necessary
    if (window.innerWidth <= 1220) {
        document.querySelector('.contacts-aside').style.display = 'none';
        document.querySelector('.contacts-main').classList.add('show');
        changeContactsHeader(contact);
    }
}


function resetAllSelectedContacts() {
    let allContactDivs = document.querySelectorAll('.outerDiv');
            allContactDivs.forEach(div => {
            div.classList.remove('selectedContact');
        });
}


function addAnimation() {
    if (window.innerWidth > 1220) {
        let move = document.getElementById('contacts-content');
        move.classList.add('animation-slideIn');    
    }
}


function removeAnimation() {
    let move = document.getElementById('contacts-content');
    move.classList.remove('animation-slideIn');
}


function insertContactInformation(contactInformation, contact) {
    contactInformation.innerHTML = `
    <div class="contact-box">
                <div class="user-initials-icon" id="user-initials-icon-${contact.id}">${contact.initials}</div>
                <div class="user-edit-delete">
                    <span class="contacts-name">${contact.name}</span>
                    <div class="contacts-change-link">
                        <div class="contacts-icon-text" onclick="openEditContact(${contact.id})">
                            <img class="contacts-change-icons" src="./assets/img/icons/pen-icon.svg">Edit
                        </div>
                        <div class="contacts-icon-text" onclick="areYouSureToDelete(${contact.id})">
                            <img class="contacts-change-icons" src="./assets/img/icons/trash-icon.svg">Delete
                        </div>
                    </div>
                </div>
            </div>
            <p class="contact-info-headline">Contact information</p>
            <div class="contacts-information-box">
                <div class="contact-details-box">
                    <p class="contacts-info-object-headline">Email</p>
                    <a class="contacts-info-object-email" href="mailto:${contact.email}">${contact.email}</a>
                </div>
                <div class="contact-details-box">
                    <p class="contacts-info-object-headline">Phone</p>
                    <a class="contacts-info-object-phone" href="tel:${contact.phone}">${contact.phone}</a>
                </div>
            </div>
    `;
}


function resetInputs() {
    let editName = document.getElementById('edit-input-name');
    let editEmail = document.getElementById('edit-input-email');
    let editPhone = document.getElementById('edit-input-phone');
    let addName = document.getElementById('add-input-name');
    let addEmail = document.getElementById('add-input-email');
    let addPhone = document.getElementById('add-input-phone');
    editName.value = '';
    editEmail.value = '';
    editPhone.value = '';
    addName.value = '';
    addEmail.value = '';
    addPhone.value = '';
}


function getUser(id) {
    foundContact = contacts.find(function (contact) {
        return contact.id === id;
    });
    return foundContact;
}


async function deleteContact(contactId) {
    foundContact = getUser(contactId);
    // Find the index of the foundContact object
    let index = contacts.findIndex(function (contact) {
        return contact.id === foundContact.id;
    });
    // If the contact is found, delete it from the array
    if (index !== -1) {
        contacts.splice(index, 1);
    } else {
        console.log("Contact not found in the contacts array.");
    }
    await setItem('contacts', contacts);
    renderContacts();
    let contactInformation = document.getElementById('contacts-content');
    contactInformation.innerHTML = '';
}


function getInitials(name) {
    let nameParts = name.split(' ');
    let initials = '';
    nameParts.forEach(part => { initials += part.charAt(0); });
    return initials;
}

function areYouSureToDelete(id) {
    let confirmDeletion = document.getElementById('questionDiv');
    let blur = document.getElementById('background-overlay');
    let yes = document.getElementById('yes');
    let no = document.getElementById('no');
    confirmDeletion.style.display = 'flex';
    blur.style.zIndex = '29';
    if (id == 'edit') {
        // Change the onclick function
        yes.onclick = function() {
            deletionChoice('edit');
        };
        no.onclick = function() {
            denyDeletion('edit');
        };
    } else {
        yes.onclick = function() {
            deletionChoice(id);
        }
        no.onclick = function() {
            denyDeletion('id');
        };
        blur.style.display = 'flex';
    }
    closeBottomMenu();
}

async function deletionChoice(id) {
        if (id == 'edit') {
        await editDeleteContact();
    } else {
        await deleteContact(id);
        goBackToContacts();
    }
    let confirmDeletion = document.getElementById('questionDiv');
    confirmDeletion.style.display = 'none';
    let blur = document.getElementById('background-overlay');
    blur.style.display = 'none';
    blur.style.zIndex = '10';
}

function denyDeletion(id) {
    let blur = document.getElementById('background-overlay');
    if (id !== 'edit') {
        blur.style.display = 'none';
    }
    let confirmDeletion = document.getElementById('questionDiv');
    confirmDeletion.style.display = 'none';
    blur.style.zIndex = '10';
}

function goBackToContacts() {
    document.querySelector('.contacts-aside').style.display = 'block';
    document.querySelector('.contacts-main').classList.remove('show');
    changeContactsHeaderBack();
}

function changeContactsHeader(contact) {
    let contactsHeader = document.getElementById('contacts-header');
    contactsHeader.innerHTML = `
    <div class="changeContactsHelperDiv">
        <div class="changeContactsHelperInnerDiv">
            <h1>Contacts</h1>
            <span class="contacts-slogan">Better with a team</span>
            <div class="contacts-seperator-mobile"></div>
        </div>
        <a id="back-button"><img src="assets/img/icons/arrow-left-line.png" class="backarrow" onclick="goBackToContacts()"></a>
    </div>
    <button class="add-contact-mobil-button" id="bottom-menu-mobile-button" onclick="openBottomMenu()">
        <img class="mobil-add-contact" src="./assets/img/icons/3-vert-dots.svg">
    </button>
    <div class="bottomMenu" id="bottomMenu">
            <a class="bottomMenuPoint" onclick="openEditContact(${contact.id})">
            <img class="p8" src="./assets/img/icons/pen-icon.svg">Edit</a>
            <a class="bottomMenuPoint" onclick="areYouSureToDelete(${contact.id})">
            <img class="p8" src="./assets/img/icons/trash-icon.svg">Delete</a>
    </div>
    `;
}


function changeContactsHeaderBack() {
    let contactsHeader = document.getElementById('contacts-header');
    contactsHeader.innerHTML = `
    <h1>Contacts</h1>
    <div class="contacts-seperator"></div>
    <span class="contacts-slogan">Better with a team</span>
    `;
    resetAllSelectedContacts();
}

function openBottomMenu() {
    let bottomMenu = document.getElementById('bottomMenu');
    bottomMenu.classList.add("active");
    addMenuAnimation();

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        let isClickInside = bottomMenu.contains(event.target);

        if (!isClickInside) {
            bottomMenu.classList.remove("active");
            removeMenuAnimation(); 
            document.removeEventListener('click', arguments.callee); // Remove event listener after closing
        }
    });
}

function closeBottomMenu() {
    let bottomMenu = document.getElementById('bottomMenu');
    bottomMenu.classList.remove("active");
    removeMenuAnimation();
}

function addMenuAnimation() {
        let move = document.getElementById('bottomMenu');
        move.classList.add('animation-slideIn');    
}

function removeMenuAnimation() {
    let move = document.getElementById('bottomMenu');
    move.classList.remove('animation-slideIn');
}