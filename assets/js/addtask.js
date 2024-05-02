// Fügt To dos hinzu

function addTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    //let assignedto = document.getElementById('assignedto');
    let date = document.getElementById('date').value;
    //prio
    let category = document.getElementById('category').value;
    let subtask = document.getElementById('subtask').value;

    console.log('Titel: ', title);
    console.log('Beschreibung: ', description);
    console.log('Datum: ', date);
    console.log('Kategorie: ', category);
    console.log('Subtask: ', subtask);

    let task = {
        'title': title,
        'decription': description,
        'date': date,
        'category': category,
        'column': todo
    }

    tasks.push(task);
}


// Öffnet das dropdown "Assigned to" bei Addtask

function openDropdown() {
    var checkList = document.getElementById("assignedto");
    checkList.getElementsByClassName("anchor")[0].onclick = function (evt) {
      if (checkList.classList.contains("visible"))
        checkList.classList.remove("visible");
      else checkList.classList.add("visible");
    };
  }