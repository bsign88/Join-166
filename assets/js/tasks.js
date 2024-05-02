function renderTasks() {
  for (let index = 0; index < tasks.length; index++) {
    const task = tasks[index];

    let notasks = document.getElementById("notasks");
    let cardsToDo = document.getElementById("cards-todo");
    let cardsProgress = document.getElementById("cards-progress");
    let cardsFeedback = document.getElementById("cards-feedback");
    let cardsDone = document.getElementById("cards-done");
    
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
    <div class="card" draggable="true">
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
