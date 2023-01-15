const addButton = document.getElementById("add");
const modal = document.getElementById("myModal")
const closeModalButton = document.getElementById("close-modal")
const submitModalButton = document.getElementById("submit-note");

let notesList = StorageManager.GetData();

if(notesList)
    renderNotes();

addButton.addEventListener('click', () => {
    modal.style.display = "block";
})

closeModalButton.addEventListener('click', closeModal)

// window.addEventListener('click', (event) => {
//     if (event.target == modal)
//         modal.style.display = "none";
// })

submitModalButton.addEventListener('click', submitNoteForm)

function submitNoteForm() {
    var note = {
        id: Date.now(),
        created: new Date().toLocaleString(),
        title: document.getElementById("note-title").value,
        content: document.getElementById("note-content").value,
        color: document.getElementById("note-color").value,
        isPinned: document.getElementById("note-pin").checked
    }
    notesList.push(note);

    StorageManager.SaveData(notesList);

    renderNotes();
    closeModal();
}

function closeModal(){
    modal.style.display = "none";
    document.getElementById("note-title").value = "";
    document.getElementById("note-content").value = "...";
    document.getElementById("note-color").value = "#ffffff";
    document.getElementById("note-pin").checked = false;
}

function renderNotes(){
    NotesManager.ClearNotes();

    var pinnnedNotes = [];
    var otherNotes = [];
    notesList.forEach(note => {
        if(note.isPinned)
            return pinnnedNotes.push(note);
        otherNotes.push(note);
    });

    pinnnedNotes.forEach(note => renderNote(note));
    otherNotes.forEach(note => renderNote(note));
}

function renderNote(note){
    var noteElement = NotesManager.RenderNote(note);
    var button = noteElement.children[1];
    button.addEventListener("click", () => {
        RemoveNote(note.id);
    })
}

function RemoveNote(Id){
    notesList = notesList.filter((note) => note.id != Id);
    StorageManager.SaveData(notesList);
    renderNotes();
}



