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
        'assigned to': assignedto,
        'date': date,
        'category': category,
        'duedate': duedate,
        'prio': prio,
        'category': category,
        'subtask': subtask,
        'column': todo
    }
    tasks.push(task);
}

// Öffnet das dropdown "Assigned to" bei Addtask
function openDropdown() {
    let checkList = document.getElementById("assignedto");
    checkList.getElementsByClassName("anchor")[0].onclick = function (evt) {
      if (checkList.classList.contains("visible"))
        checkList.classList.remove("visible");
      else checkList.classList.add("visible");
    };
    showProfilesDropdown()
  }

  function showProfilesDropdown() {
    let items = document.getElementById('items');

    for (let index = 0; index < contacts.length; index++) {
      const profile = contacts[index];

      items.innerHTML += `
        <li>
          <span class="profile">${profile['initials']}</span>${profile['name']}<input type="checkbox" />
        </li>
      `;   
    }
  }

  // Ersetzt jeweils das Icon bei der Prio-Auswahl
  function changeUrgentIcon() {
    let urgent = document.getElementById('urgent');
    if (urgent.checked) {
      document.getElementById('urgent-icon').src = "./assets/img/icons/prio_urgent_active.svg";
      document.getElementById('medium-icon').src = "./assets/img/icons/prio_medium_default.svg";
      document.getElementById('low-icon').src = "./assets/img/icons/prio_low_default.svg";
    }
  }

  function changeMediumIcon() {
    let medium = document.getElementById('medium');
    if (medium.checked) {
      document.getElementById('medium-icon').src = "./assets/img/icons/prio_medium_active.svg";
      document.getElementById('urgent-icon').src = "./assets/img/icons/prio_urgent_default.svg";
      document.getElementById('low-icon').src = "./assets/img/icons/prio_low_default.svg";
    }
  }

  function changeLowIcon() {
    let low = document.getElementById('low');
    if (low.checked) {
      document.getElementById('low-icon').src = "./assets/img/icons/prio_low_active.svg";
      document.getElementById('urgent-icon').src = "./assets/img/icons/prio_urgent_default.svg";
      document.getElementById('medium-icon').src = "./assets/img/icons/prio_medium_default.svg";
    }
  }