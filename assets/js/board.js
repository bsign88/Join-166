
let initialsArray = [];
let colorsArray = [];
let namesArray = [];
let currentDraggedCard;

// Sammelfunktion zum rendern aller Spalten
function renderTasks() {
  renderToDo();
  renderProgress();
  renderFeedback();
  renderDone();
}

// Rendert Spalte "To Do"
function renderToDo() {
  let todo = tasks.filter((t) => t["column"] == "todo");
  document.getElementById("todo").innerHTML = "";
  for (let index = 0; index < todo.length; index++) {
    const card = todo[index];
    checkProfiles(card);
    document.getElementById("todo").innerHTML += generateCards(card);
    checkLabel(card);
    checkPriority(card);
  }
}

// Rendert Spalte "Progress"
function renderProgress() {
  let progress = tasks.filter((t) => t["column"] == "progress");
  document.getElementById("progress").innerHTML = "";
  for (let index = 0; index < progress.length; index++) {
    const card = progress[index];
    checkProfiles(card);
    document.getElementById("progress").innerHTML += generateCards(card);
    checkLabel(card);
    checkPriority(card);
  }
}

// Rendert Spalte "Feedback"
function renderFeedback() {
  let feedback = tasks.filter((t) => t["column"] == "feedback");
  document.getElementById("feedback").innerHTML = "";
  for (let index = 0; index < feedback.length; index++) {
    const card = feedback[index];
    checkProfiles(card);
    document.getElementById("feedback").innerHTML += generateCards(card);
    checkLabel(card);
    checkPriority(card);
  }
}

// Rendert Spalte "Done"
function renderDone() {
  let done = tasks.filter((t) => t["column"] == "done");
  document.getElementById("done").innerHTML = "";
  for (let index = 0; index < done.length; index++) {
    const card = done[index];
    checkProfiles(card);
    document.getElementById("done").innerHTML += generateCards(card);
    checkLabel(card);
    checkPriority(card);
  }
}

// Generiert HTML der Karten
function generateCards(card) {
  checkProfiles(card); // Ruft die Funktion auf, um das initialsArray und colorsArray zu füllen
  let profilesHTML = '';

  // Erzeugt die Profile-Divs basierend auf initialsArray und colorsArray
  for (let i = 0; i < initialsArray.length; i++) {
    let profileClass = i === 0 ? 'profile' : 'profile add-profile';
    profilesHTML += `
      <div class="${profileClass}" style="background-color: ${colorsArray[i]};">
        ${initialsArray[i]}
      </div>
    `;
  }

  return /*HTML*/ `
    <div class="card" draggable="true" ondragstart="startDragging(${card['id']})" onclick="openTask(${card['id']})">
        <div id="label${card["id"]}" class="card-label">${card["category"]}</div>
          <div class="content">
            <div class="card-title">${card["title"]}</div>
            <div class="description">${card["description"]}</div>
          </div> 

          <div class="subtasks">
            <div class="progressbar">
               <div class="fill"></div>
             </div>
             <div class="text">0/${card["subtask"].length} Subtasks</div>
            </div>

            <div class="card-footer">
              <div class="user" id="user">
                ${profilesHTML}
              </div>
              <div class="priority"><img id="prio-icon${card["id"]}" src="./assets/img/icons/prio_low_default.svg"></div>
            </div>
    </div>
  `;
}

//Überprüft die zugewiesenen Profile
function checkProfiles(card) {
  initialsArray.length = 0;
  colorsArray.length = 0;
  for (let i = 0; i < card["assigned to"].length; i++) {
      let assignedPerson = card["assigned to"][i];
      let initials = assignedPerson.initials;
      let color = assignedPerson.color;
      let names = assignedPerson.name;  
      initialsArray.push(initials);
      colorsArray.push(color);
      namesArray.push(names);
    }
}

//Überprüft die Priorität und zeigt das entsprechende Symbol an
function checkPriority(card) {
  let prioIcon = document.getElementById(`prio-icon${card["id"]}`);
  prioIcon.src = `./assets/img/icons/prio_${card["prio"]}_default.svg`;
}

//Überprüft das Label und wendet die entsprechende Klasse an
function checkLabel(card) {
  let label = document.getElementById(`label${card["id"]}`);

  if (card["category"] === "Technical Task") {
    label.classList.add("technical-task");
  } else {
    label.classList.add("user-story");
  }
}

//drag and drop
function startDragging(id) {
  currentDraggedCard = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(columnId) {
  tasks[currentDraggedCard-1]['column'] = columnId;
  await setItem('tasks', tasks);
  renderTasks();
}

function highlight(column) {
  document.getElementById(column).classList.add("cards-highlight");
  //document.getElementById(id).innerHTML += '<div class="card-empty"></div>';
}

function removeHighlight(column) {
  document.getElementById(column).classList.remove("cards-highlight");
}

//Öffnet den jeweiligen Task
function openTask(id) {
  let window = document.getElementById("task");
  let overlay = document.getElementById("background-overlay");
  window.style.display = "flex";
  overlay.style.display = "block";

  let task = tasks.find((task) => task.id === id);
  renderTask(task);
  checkLabelBig(task);
}

//Rendert den Task in der großen Ansicht
function renderTask(task) {
  document.getElementById("label-big").innerHTML = task.category;
  document.getElementById("taskcontent").innerHTML = "";
  document.getElementById("taskcontent").innerHTML = generateTaskContent(task);
  checkPriority(task);
}

function generateTaskContent(task) {
  //Bringt das Datum in das richtige Format
  let str = task.duedate;
  let arr = str.split('-');
  let date = arr[2] + '/' + arr[1] + '/' + arr[0];

  checkProfiles(task);
  let profilesHTML = '';
  // Erzeugt die Profile-Divs basierend auf initialsArray und colorsArray
  for (let i = 0; i < initialsArray.length; i++) {
    let profileClass = i === 0 ? 'profile' : 'profile add-profile';
    profilesHTML += `
      <div class="${profileClass}" style="background-color: ${colorsArray[i]};">
        ${initialsArray[i]}
      </div>
      ${namesArray[i]}
    `;
  }

  return /*HTML*/ `
  <h1 id="title-big">${task["title"]}</h1>
    <div class="text">
      <p id="description-big">${task["description"]}</p> 
      <p>Due date: <span class="taskdata" id="date-big">${date}</span></p>
      <p>Priority: <span class="taskdata" id="prio-big">${task["prio"]}<img id="prio-icon${task["id"]}" src="./assets/img/icons/prio_low_default.svg">
</span></p>
      <p>Assigned to: <span class="taskdata" id="user"><div class="user" id="user">${profilesHTML}</div></span></p>
      <p>Subtasks: <span class="taskdata" id="subtasks-big"></span>${task["subtask"]}</p>
    </div>

    <div class="options">
      <div class="option-btn" id="DeleteBtn"><img class="contacts-change-icons" src="./assets/img/icons/trash-icon.svg">Delete</div>
      |
      <div class="option-btn"><img class="contacts-change-icons" src="./assets/img/icons/pen-icon.svg">Edit</div>
    </div>
`;
}

//Rendert die Daten des jeweiligen Tasks
function checkLabelBig(task) {
  let label = document.getElementById(`label-big`);
  if (task["category"] === "Technical Task") {
    label.classList.add("technical-task");
  } else {
    label.classList.add("user-story");
  }
}

//Schließt den jeweiligen Task
function closeTask() {
  let window = document.getElementById("task");
  let overlay = document.getElementById("background-overlay");
  window.style.display = "none";
  overlay.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  // Event-Listener für das Overlay hinzufügen
  let overlay = document.getElementById("background-overlay");
  if (overlay) { // Überprüfe, ob das Overlay-Element gefunden wurde
    overlay.addEventListener("click", function(event) {
      if (event.target === this) { // Prüfe, ob das Overlay direkt geklickt wurde (nicht seine Kinder)
        closeTask(); // Schließe das Fenster
      }
    });
  }
});

//Suchfunktion
function search() {
  let searchTerm = document.getElementById('findtask').value.toLowerCase(); // Suchbegriff in Kleinbuchstaben konvertieren
  let allCards = document.querySelectorAll('.card'); // Alle Karten auswählen

  if (searchTerm.length >= 3) { // Prüfen, ob der Suchbegriff mindestens 3 Zeichen lang ist
    showResults(searchTerm, allCards); // Ergebnisse anzeigen
  } else {
    allCards.forEach(function(card) {
      card.style.display = 'block'; // Alle Karten anzeigen, wenn der Suchbegriff zu kurz ist
    });
  }
}

function showResults(searchTerm, allCards) {
  allCards.forEach(function(card) {
    let cardTitle = card.querySelector('.card-title').textContent.toLowerCase(); // Titel der Karte in Kleinbuchstaben konvertieren
    if (cardTitle.includes(searchTerm)) { // Überprüfen, ob der Titel der Karte den Suchbegriff enthält
      card.style.display = 'block'; // Karte anzeigen, wenn sie den Suchkriterien entspricht
    } else {
      card.style.display = 'none'; // Karte ausblenden, wenn sie nicht den Suchkriterien entspricht
    }
  });
}

/*
Task löschen in Console

tasks.splice(1, 0);
await setItem('tasks', tasks);
renderTasks();

*/