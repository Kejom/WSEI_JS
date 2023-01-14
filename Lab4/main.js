const addButton = document.getElementById("add");
const modal = document.getElementById("myModal")
const closeModal = document.getElementById("close-modal")

addButton.addEventListener('click', ()=>{
    modal.style.display = "block";
})

closeModal.addEventListener('click', ()=>{
    modal.style.display = "none";
})

window.addEventListener('click', (event)=>{
    if(event.target == modal)
        modal.style.display = "none";
})