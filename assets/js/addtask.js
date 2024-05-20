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
        <li id="listItem${index}" onclick="selectName(${index}), ${profile['initials']}, ${profile['color']}">
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

    /*
      let selecteditems = document.getElementById('selecteditems');
    selecteditems.innerHTML += `
    <div id="selectedprofile${index}" class="profile">${initials}</div>
    `;
    document.getElementById(`selectedprofile${index}`).style.backgroundColor = color;
    */
    }
  
  // Toggles the class and checkbox state when the checkbox is clicked
  function toggleCheckbox(index, event) {
    event.stopPropagation(); // Verhindert das Auslösen des Listenelement-Click-Events
    let listItem = document.getElementById(`listItem${index}`);
    listItem.classList.toggle('ul-item-select');
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