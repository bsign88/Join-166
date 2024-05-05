let currentDraggedCard;

function renderTasks() {
  for (let index = 0; index < tasks.length; index++) {
    const task = tasks[index];

    let notasks = document.getElementById("notasks");
    let cardsToDo = document.getElementById("todo");
    let cardsProgress = document.getElementById("progress");
    let cardsFeedback = document.getElementById("feedback");
    let cardsDone = document.getElementById("done");
    
    if (task["column"] === "todo") {
      cardsToDo.innerHTML += generateCards(task, index);
      notasks.classList.remove("d-none");
    } else {
      notasks.classList.add("d-none");
    }
    if (task["column"] === "progress") {
      cardsProgress.innerHTML += generateCards(task, index);
    }
    if (task["column"] === "feedback") {
      cardsFeedback.innerHTML += generateCards(task, index);
    }
    if (task["column"] === "done") {
      cardsDone.innerHTML += generateCards(task, index);
    }
    checkLabel(index, task);
  }
}

// Generiert HTML der Karten in Spalte "To do"
function generateCards(task, index) {
  return /*HTML*/ `
    <div class="card" draggable="true" ondragstart="startDragging(${task['id']})">
        <div id="label${index}" class="label">${task["category"]}</div>
            <div class="content">
                <div class="card-title">${task["title"]}</div>
                <div class="description">${task["description"]}</div>
            </div> 
    </div>
  `;
}

//Überprüft welches Label definiert ist und wendet die entsprechende Klasse an
function checkLabel(index, task) {
  let label = document.getElementById(`label${index}`);

  if (task["category"] === "Technical Task") {
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

function moveTo(column) {
  tasks[currentDraggedCard]['column'] = column;
  renderTasks();
}

function highlight(id) {
  document.getElementById(id).classList.add('cards-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('cards-highlight');
}