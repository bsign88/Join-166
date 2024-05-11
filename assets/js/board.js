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
    document.getElementById("done").innerHTML += generateCards(card);
    checkLabel(card);
    checkPriority(card);
  }
}

// Generiert HTML der Karten
function generateCards(card) {
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
           <div class="text">1/2 Subtasks</div>
          </div>

          <div class="card-footer">
            <div class="user">
              <div class="profile">BB</div>
              <div class="profile add-profile">TB</div>
            </div>
            <div class="priority"><img id="prio-icon${card["id"]}" src="./assets/img/icons/prio_low_default.svg"></div>
          </div>
  </div>
`;
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

function moveTo(id) {
  tasks[currentDraggedCard]['column'] = id;
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

//Überprüft das Label in der großen Ansicht und wendet die entsprechende Klasse an
function renderTask(task) {
  if (task) {
    document.getElementById("title-big").innerHTML = task.title;
    document.getElementById("description-big").innerHTML = task.description;
    document.getElementById("date-big").innerHTML = task.duedate;
    document.getElementById("prio-big").innerHTML = task.prio;
  }
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