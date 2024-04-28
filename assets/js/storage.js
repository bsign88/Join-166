const STORAGE_TOKEN = 'MIIEDSNHP1WLD4CM84PW1A7YLVKDMMJ5BQRZ6PYI';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let users = [];
// let contacts = []; Einschalten wenn Storage Online

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

async function loadContacts(){
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch(e){
        console.error('Loading error:', e);
    }
}
