// Fügt Aufgaben hinzu

let prio = [];
let selectedProfiles = [];
let subtask = [];

async function addTask() {
  event.preventDefault();
  await initTasks();
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let date = document.getElementById('date').value;
  let category = document.getElementById('category').value;
  let id = tasks.length + 1;

    let task = {
        'id': id,
        'title': title,
        'description': description,
        'assigned to': selectedProfiles,
        'duedate': date,
        'prio': prio,
        'category': category,
        'subtask': subtask,
        'column': 'todo'
    }

    // Hinzufügen der neuen Aufgabe zum Board
    tasks.push(task);

    // Aktualisieren der Aufgaben in der Datenbank
    await setItem('tasks', tasks);

    // Aktualisieren der Aufgaben-ID in der Datenbank
    await setItem('taskId', id);
}

async function initTasks() {
    // Lade vorhandene Aufgaben, falls noch nicht geschehen
    if (!tasks) {
      await loadTasks(); // Diese Funktion lädt die Aufgaben von der API
      if (!tasks) {
          tasks = []; // Falls keine Aufgaben vorhanden sind, initialisiere ein leeres Array
      }
  }
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

  // Zeigt alle verfübaren Profile aus dem Kontaktbuch
  function showProfilesDropdown() {
    let items = document.getElementById('items');
  
    for (let index = 0; index < contacts.length; index++) {
      const profile = contacts[index];
  
      items.innerHTML += `
        <li id="listItem${index}" onclick="selectName(${index}, '${profile['initials']}', '${profile['color']}')">
          <span id="profile${index}" class="profile">${profile['initials']}</span>
          ${profile['name']}
          <input type="checkbox" id="checkbox${index}" value="${profile['name']}" onclick="toggleCheckbox(${index}, event)" />
        </li>
      `;
      document.getElementById(`profile${index}`).style.backgroundColor = `${profile['color']}`;
    }
  }
  
  function selectName(index, initials, color) {
    let listItem = document.getElementById(`listItem${index}`);
    let checkbox = document.getElementById(`checkbox${index}`);
    listItem.classList.toggle('ul-item-select');
    checkbox.checked = !checkbox.checked;
    updateAssignedProfiles(index, initials, color, checkbox.checked);
  }
  
  function toggleCheckbox(index, event) {
    event.stopPropagation(); // Verhindert das Auslösen des Listenelement-Click-Events
    let listItem = document.getElementById(`listItem${index}`);
    listItem.classList.toggle('ul-item-select');
  
    let checkbox = document.getElementById(`checkbox${index}`);
    checkbox.checked = !checkbox.checked;
  
    // Update assigned profiles section
    updateAssignedProfiles(index, contacts[index]['initials'], contacts[index]['color'], checkbox.checked);
  }
  
  function updateAssignedProfiles(index, initials, color, isChecked) {
    let assignedProfiles = document.getElementById('assignedprofiles');
    let profileDiv = document.getElementById(`assignedProfile${index}`);
    
    if (isChecked) {
      // Wenn das Profil ausgewählt ist, zum Array 'selectedProfiles' hinzufügen
      selectedProfiles.push(contacts[index]);
  
      if (!profileDiv) {
        let newProfileDiv = document.createElement('div');
        newProfileDiv.id = `assignedProfile${index}`;
        newProfileDiv.className = 'assigned-profile';
        newProfileDiv.innerHTML = `
          <span class="profile" style="background-color: ${color};">${initials}</span>
        `;
        assignedProfiles.appendChild(newProfileDiv);
      }
    } else {
      // Wenn das Profil abgewählt ist, aus dem Array 'selectedProfiles' entfernen
      const assignedIndex = selectedProfiles.findIndex(profile => profile.name === contacts[index].name);
      if (assignedIndex > -1) {
        selectedProfiles.splice(assignedIndex, 1);
      }
  
      if (profileDiv) {
        assignedProfiles.removeChild(profileDiv);
      }
    }
  }

  // Ersetzt jeweils das Icon bei der Prioritäts-Auswahl
  function changeUrgentIcon() {
    let urgent = document.getElementById('urgent');
    if (urgent.checked) {
      document.getElementById('urgent-icon').src = "./assets/img/icons/prio_urgent_active.svg";
      document.getElementById('medium-icon').src = "./assets/img/icons/prio_medium_default.svg";
      document.getElementById('low-icon').src = "./assets/img/icons/prio_low_default.svg";
      prio = [];
      prio.push('urgent');    
    }
  }

  function changeMediumIcon() {
    let medium = document.getElementById('medium');
    if (medium.checked) {
      document.getElementById('medium-icon').src = "./assets/img/icons/prio_medium_active.svg";
      document.getElementById('urgent-icon').src = "./assets/img/icons/prio_urgent_default.svg";
      document.getElementById('low-icon').src = "./assets/img/icons/prio_low_default.svg";
      prio = [];
      prio.push('medium');    
    }
  }

  function changeLowIcon() {
    let low = document.getElementById('low');
    if (low.checked) {
      document.getElementById('low-icon').src = "./assets/img/icons/prio_low_active.svg";
      document.getElementById('urgent-icon').src = "./assets/img/icons/prio_urgent_default.svg";
      document.getElementById('medium-icon').src = "./assets/img/icons/prio_medium_default.svg";
      prio = [];
      prio.push('low');
    }
  }

//Subtasks
function showOptions() {
  const subtasksInput = document.getElementById('subtasks');
  const iconContainer = document.querySelector('.icon-container');
  
  if (subtasksInput.value.trim() !== '') {
    subtasksInput.classList.add('show-options');
    iconContainer.style.display = 'flex';
  } else {
    subtasksInput.classList.remove('show-options');
    iconContainer.style.display = 'none';
  }
}

function clearInput() {
  const subtasksInput = document.getElementById('subtasks');
  subtasksInput.value = '';
  subtasksInput.classList.remove('show-options');
  const iconContainer = document.querySelector('.icon-container');
  iconContainer.style.display = 'none';
}

function submitSubtask() {
  const subtasksInput = document.getElementById('subtasks');
  const subtaskText = document.getElementById('subtaskstext');
  if (subtasksInput.value.trim() !== '') {
    subtask.push(subtasksInput.value);
    const listItem = document.createElement('div');
    listItem.className = 'list-content';
    listItem.innerHTML = `
      <li>${subtasksInput.value}<img src="./assets/img/icons/trash-icon.svg" alt="Delete" class="trash-icon" onclick="deleteSubtask(this)" /></li>
    `;
    subtaskText.appendChild(listItem);
    clearInput();
  }
}

function deleteSubtask(element) {
  const listItem = element.parentElement;
  listItem.remove();
}