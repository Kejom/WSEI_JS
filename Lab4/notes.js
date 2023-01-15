const NotesManager = function(){
    const container = document.getElementById("container");

    let clearNotes = function(){
        container.innerHTML = "";
    }

    let renderNote = function(note){
        var noteElement = createNoteElement(note);
        container.appendChild(noteElement);
        return noteElement;
    }

    let createNoteElement = function(note){
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("card");
        noteDiv.style.backgroundColor = note.color;

        if(note.isPinned)
            noteDiv.style.border = "thick solid red";

        let headerElement = document.createElement("h4");
        headerElement.innerHTML = note.title;
        noteDiv.appendChild(headerElement);

        let deleteButton = document.createElement("span");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = "&times";

        noteDiv.appendChild(deleteButton);

        let creationTimeElement = document.createElement("span");
        creationTimeElement.classList.add("creation-time");
        creationTimeElement.innerHTML = note.created;
        noteDiv.appendChild(creationTimeElement);

        let contentElement = document.createElement("p")
        contentElement.innerHTML = note.content;
        noteDiv.appendChild(contentElement);

        return noteDiv
    }

    return {
        RenderNote: renderNote,
        ClearNotes: clearNotes
    }
}();