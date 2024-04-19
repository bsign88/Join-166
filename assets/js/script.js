async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let element of includeElements) {
        let file = element.getAttribute("w3-include-html");
        try {
            let response = await fetch(file);
            if (response.ok) {
                element.innerHTML = await response.text();
            } else {
                element.innerHTML = 'Page not found';
            }
        } catch (error) {
            element.innerHTML = 'Error loading the page';
        }
    }
}

document.addEventListener("DOMContentLoaded", includeHTML);

function loadContent(newContent) {
    let contentDiv = document.getElementById('includeHtml');
    contentDiv.setAttribute('w3-include-html', newContent);
    includeHTML(); 
}

