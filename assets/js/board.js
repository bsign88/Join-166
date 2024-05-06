let currentDraggedCard;

/*
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
*/

function renderTasks() {
  let todo = tasks.filter(t => t['column'] == 'todo');

  document.getElementById('todo').innerHTML = '';

  for (let index = 0; index < todo.length; index++) {
      const card = todo[index];
      document.getElementById('todo').innerHTML += generateCards(card);
      checkLabel(card);
  }

  let progress = tasks.filter(t => t['column'] == 'progress');

  document.getElementById('progress').innerHTML = '';

  for (let index = 0; index < progress.length; index++) {
      const card = progress[index];
      document.getElementById('progress').innerHTML += generateCards(card);
      checkLabel(card);
  }

  let feedback = tasks.filter(t => t['column'] == 'feedback');

  document.getElementById('feedback').innerHTML = '';

  for (let index = 0; index < feedback.length; index++) {
      const card = feedback[index];
      document.getElementById('feedback').innerHTML += generateCards(card);
      checkLabel(card);
  }

  let done = tasks.filter(t => t['column'] == 'done');

  document.getElementById('done').innerHTML = '';

  for (let index = 0; index < done.length; index++) {
      const card = done[index];
      document.getElementById('done').innerHTML += generateCards(card);
      checkLabel(card);
  }


}

// Generiert HTML der Karten
function generateCards(card) {
  return /*HTML*/ `
  <div class="card" draggable="true" ondragstart="startDragging(${card['id']})">
      <div id="label${card["id"]}" class="label">${card["category"]}</div>
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
            <div class="priority"><img src="./assets/img/icons/prio_low_default.svg"></div>
          </div>
  </div>
`;
}

//Überprüft welches Label definiert ist und wendet die entsprechende Klasse an
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