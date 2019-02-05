document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById("sidebar-ul")
  const showNote = document.getElementById("show-note")
  const createButton = document.getElementById("create-button")

  function addToSidebar(noteObject) {
    const string = `
    <li data-id = "${noteObject.id}" class="sidebar-preview">${noteObject.title}</li>`
    sidebar.innerHTML += string;
  }

  function getNotes() {
    fetch("http://localhost:3000/api/v1/notes")
    .then (res => res.json())
    .then (data => {
      data.forEach(addToSidebar)

    })
}
getNotes();

sidebar.addEventListener("click", showNoteInBox)

function showNoteInBox(event) {
  if (event.target.classList.contains("sidebar-preview")) {
    fetch(`http://localhost:3000/api/v1/notes/${event.target.dataset.id}`)
    .then(res => res.json())
    .then(function(data) {showNoteOnDom(data)})
    // .then(data => showNoteOnDom(data))
  }
}

const showNoteOnDom = (note) => {
  string = `
  <h1>${note.title}</h1>
  <p>${note.body}</p>`
  showNote.innerHTML = string;
  showNote.dataset.id = note.id;
}


const showForm = (event) => {
  console.log("hi")
  string = `<form id="creation-form">
      <label for="title">Title:</label>
      <input type="text" placeholder="Title..."><br />
      <label for="description">Description:</label>
      <textarea placeholder="Description..."></textarea>
      <br>
      <input type="submit">
    </form>`
    showNote.innerHTML = string
}

createButton.addEventListener("click", showForm)
})
