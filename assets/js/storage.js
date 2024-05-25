const STORAGE_TOKEN = 'MIIEDSNHP1WLD4CM84PW1A7YLVKDMMJ5BQRZ6PYI';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const BASE_URL = 'https://join-166-default-rtdb.europe-west1.firebasedatabase.app/'
FIREBASE_URL = 'https://join-166-default-rtdb.europe-west1.firebasedatabase.app/item'
let contacts;
let userId;
let foundContact;
//let tasks;

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

async function loadContacts(){
    try {
        contactsAsText = await getItem('contacts');
        contacts = JSON.parse(contactsAsText.data.value);
    } catch(e){
        console.error('Loading error:', e);
    }
}

async function loadUserId(){
    try {
        userIdAsText = await getItem('userId');
        userId = JSON.parse(userIdAsText.data.value);
    } catch(e){
        console.error('Loading error:', e);
    }
}

/*
async function loadTasks(){
    try {
        tasksAsText = await getItem('tasks');
        contacts = JSON.parse(tasksAsText.data.value);
    } catch(e){
        console.error('Loading error:', e);
    }
}
*/




// async function loadData(path="") {
//     let response = await fetch(BASE_URL + path + ".json");
//     let responseToJson = await response.json();
//     console.log(responseToJson);
//     contacts = JSON.parse(responseToJson);
// }

// async function postData(path="", data={}){
//     let response = await fetch(BASE_URL + path + ".json", {
//         method: "POST",
//         header: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });
//     return responseToJson = await response.json();
// }

// async function deleteData(path=""){
//     let response = await fetch(BASE_URL + path + ".json", {
//         method: "DELETE",
//     });
//     return responseToJson = await response.json();
// }

// async function updateContact(path="", data={}) {
//     let response = await fetch(BASE_URL + path + ".json", {
//         method: "PUT",
//         header: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });
//     return responseToJson = await response.json();
// }