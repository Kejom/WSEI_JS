const addButton = document.getElementById("add");
const searchBar = document.getElementById("search");
const modal = document.getElementById("myModal");
const modalTagContainer = document.getElementById("tags-container");
const closeModalButton = document.getElementById("close-modal")
const submitModalButton = document.getElementById("submit-note");
const addTagButton = document.getElementById("add-tag");

let notesList = StorageManager.GetData();

if(notesList)
    renderNotes();

addButton.addEventListener('click', () => {
    modal.style.display = "block";
})

closeModalButton.addEventListener('click', closeModal);

addTagButton.addEventListener("click", addTag);

searchBar.addEventListener("input", onSearchInputChange);

submitModalButton.addEventListener('click', submitNoteForm);

function submitNoteForm() {
    let note = {
        id: Date.now(),
        created: new Date().toLocaleString(),
        title: document.getElementById("note-title").value,
        content: document.getElementById("note-content").value,
        color: document.getElementById("note-color").value,
        isPinned: document.getElementById("note-pin").checked,
        tags: getTags()
    }
    notesList.push(note);

    StorageManager.SaveData(notesList);

    renderNotes();
    closeModal();
}

function addTag(){
    let newTag = document.getElementById("tag-form").value;

    if(!newTag)
        return;
    
    console.log(tagExists(newTag));
    if(tagExists(newTag))
        return;

    let newTagSpan = NotesManager.CreateTagElement(newTag);
    newTagSpan.classList.add("tag-removable");
    newTagSpan.addEventListener("click", function(){
        this.remove();
    })

    modalTagContainer.appendChild(newTagSpan);
}

function getTags(){
    let childArray = [...modalTagContainer.children]
    return childArray.map(c => c.innerHTML)
}

function tagExists(tagText){
    let filterResult =  getTags().filter(tag => tag.toLowerCase() === tagText.toLowerCase());
    console.log(filterResult);
    return filterResult.length > 0;
}

function closeModal(){
    modal.style.display = "none";
    document.getElementById("note-title").value = "";
    document.getElementById("note-content").value = "...";
    document.getElementById("note-color").value = "#ffffff";
    document.getElementById("note-pin").checked = false;
    modalTagContainer.replaceChildren();
}

function onSearchInputChange(){
    renderNotes();
}

function filterNotes(){
    let searchVal = searchBar.value;

    if(!searchVal)
        return notesList;
    
    var filteredList = notesList.filter( note => filterNote(note, searchVal))

    return filteredList
}
function filterNote(note, searchVal){
    if(checkValue(note.title, searchVal))
    return true;

    if(checkValue(note.created, searchVal))
        return true;

    if(checkValue(note.content, searchVal))
        return true;

    if(checkTags(note.tags, searchVal))
        return true;

    return false;
}

function checkValue(val, searchValue){
    return val.toLowerCase().includes(searchValue.toLowerCase());
}

function checkTags(tags, searchVal){
    if(!tags)
        return false;

    for (let i = 0; i < tags.length; i++) {
        if(checkValue(tags[i], searchVal))
            return true;     
    }
    return false;
}

function renderNotes(){
    NotesManager.ClearNotes();

    var notesToRender = filterNotes();

    let pinnnedNotes = [];
    let otherNotes = [];
    notesToRender.forEach(note => {
        if(note.isPinned)
            return pinnnedNotes.push(note);
        otherNotes.push(note);
    });

    pinnnedNotes.forEach(note => renderNote(note));
    otherNotes.forEach(note => renderNote(note));
}

function renderNote(note){
    let noteElement = NotesManager.RenderNote(note);
    let deleteButton = noteElement.children[1];
    deleteButton.addEventListener("click", () => {
        RemoveNote(note.id);
    })
}

function RemoveNote(Id){
    notesList = notesList.filter((note) => note.id != Id);
    StorageManager.SaveData(notesList);
    renderNotes();
}



