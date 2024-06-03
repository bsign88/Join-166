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
  
  // Selektiert das angeklickte Profil oder entfernt die Klasse bei erneutem Klick
  function selectName(index, initials, color) {
    let listItem = document.getElementById(`listItem${index}`);
    let checkbox = document.getElementById(`checkbox${index}`);
    listItem.classList.toggle('ul-item-select');
    checkbox.checked = !checkbox.checked;
    updateAssignedProfiles(index, initials, color, checkbox.checked);
  }
  
  // Toggles the class and checkbox state when the checkbox is clicked
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
    // Implement your logic to handle the submission of the subtask
    //alert(`Subtask submitted: ${subtasksInput.value}`);

    subtaskText.innerHTML += `
    <li>${subtasksInput.value}</li>
    `;
    clearInput();
  }
}
