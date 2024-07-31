const url = 'https://join-166-default-rtdb.europe-west1.firebasedatabase.app/item/contacts.json';
let users = [];

async function addContactsToFirebase(users) {

    for (let user of users) {
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error('Failed to add contact to Firebase: ' + response.statusText);
            }

            let data = await response.json();
            console.log('Contact added successfully:', data);
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    }
}

// // Example usage:

// let users = [
//     {
//         color: "var(--color1)",
//         email: "adrian@kolb.de",
//         initials: "AK",
//         name: "Adrian Kolb",
//         phone: 35799936209,
//         timestamp: 5454154
//     },
//     {
//         color: "var(--color2)",
//         email: "jane@doe.com",
//         initials: "JD",
//         name: "Jane Doe",
//         phone: 1234567890,
//         timestamp: 9876543
//     }
//     // Add more user objects as needed
// ];

addContactsToFirebase(users);



async function loadContacts() {
    window.users = [];

    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to load contacts from Firebase: ' + response.statusText);
        }

        let data = await response.json();

        if (data) {
            // Firebase returns an object where keys are unique IDs
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    window.users.push(data[key]);
                }
            }
        }

        console.log('Users loaded successfully:', window.users);
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Example usage: Call init on page load
window.onload = init;