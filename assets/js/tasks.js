let tasks = [
    {
      "title": "1 Test Kochweltpage",
      "description": "1 Build start page...",
      "category": "User Story",
    },
    {
      "title": "2 Test Kochweltpage",
      "description": "3 Build start page...",
      "category": "Technical Task",
    },
    {
      "title": "3 Test Kochweltpage",
      "description": "3 Build start page...",
      "category": "User Story",
    },
    {
      "title": "4 Test Kochweltpage",
      "description": "4 Build start page...",
      "category": "Technical Task",
    },
  ];
  

function renderTasks() {
    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];

    let cardsToDo = document.getElementById('cards-todo');

    cardsToDo.innerHTML += `
    <div class="card" draggable="true">
        <div id="label${index}" class="label">${task["category"]}</div>
            <div class="content">
                <div class="card-title">${task["title"]}</div>
                <div class="description">${task["description"]}</div>
            </div> 
    </div>
    `;
        
        if (task["description"] == "Technical Task") {
            document.getElementById(`label${index}`).classList.add('technical-task');
            
        }

    }
}