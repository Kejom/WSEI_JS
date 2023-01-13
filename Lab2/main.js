const template = document.getElementById("template");
const container = document.getElementById("items");
const linksContainer = document.getElementById("links");
const previousBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const toggleBtn = document.getElementById("toggle");

const images = [
    {
        url: "http://picsum.photos/seed/picsum1/600/400",
        caption: "zdjęcie numer 1"
    },
    {
        url: "http://picsum.photos/seed/picsum2/600/400",
        caption: "zdjęcie numer 2"
    },
    {
        url: "http://picsum.photos/seed/picsum3/600/400",
        caption: "zdjęcie numer 3"
    },
    {
        url: "http://picsum.photos/seed/picsum4/600/400",
        caption: "zdjęcie numer 4"
    },
    {
        url: "http://picsum.photos/seed/picsum5/600/400",
        caption: "zdjęcie numer 5"
    },
    {
        url: "http://picsum.photos/seed/picsum6/600/400",
        caption: "zdjęcie numer 6"
    },
]

let index = 0;
let isAutoPlayOn = false;
let interval;

function init(){
    images.forEach(image => addImage(image));
    buttonsInit();
    markSelectedImageButton();
}

function buttonsInit(){
    previousBtn.addEventListener('click', ()=> {
        onPrevNextButtonClick(-1);
    });

    nextBtn.addEventListener('click', ()=> {
        onPrevNextButtonClick(1);
    })

    toggleBtn.addEventListener('click', onToggleButtonPress);

    addIndexButtons();
}
function addImage(image){
    var imageDiv = template.cloneNode(true);
    imageDiv.style.display = "block";
    imageDiv.childNodes[1].childNodes[1].src = image.url;
    imageDiv.childNodes[1].childNodes[3].innerHTML = image.caption;
    container.appendChild(imageDiv);
}


function onPrevNextButtonClick(indexChange){
    index+=indexChange;
    changeImage();
    resetInterval();
}

function addIndexButtons(){
    for (let i = 0; i < images.length; i++) {
        let linkButton = document.createElement("button");
        linkButton.classList += 'index-btn';
        
        linkButton.addEventListener('click', ()=>{
            index = i;
            changeImage();
            resetInterval();
        })
        
        linksContainer.appendChild(linkButton);
    }
}
function onToggleButtonPress(){
    if(isAutoPlayOn){

        interval = clearInterval(interval);
        toggleBtn.innerHTML = "Start";
    }

    else{
        interval = setInterval(onIntervalRun, 2000);
        toggleBtn.innerHTML = "Stop";
    }

    isAutoPlayOn = !isAutoPlayOn;
}

function resetInterval(){
    if(!isAutoPlayOn)
        return;
    clearInterval(interval);
    interval = setInterval(onIntervalRun, 2000);
}

function onIntervalRun(){
    index++;
    changeImage();
}

function changeImage(){
    if(index >= images.length)
        index = 0;
    else if(index < 0)
        index = images.length-1;

    container.style.transform = `translateX(${-index*600}px)`
    markSelectedImageButton();
}

function markSelectedImageButton(){
    linksContainer.childNodes.forEach(child => {
        if(child.nodeName === "BUTTON")
            child.classList.remove("selected")
    });
    linksContainer.childNodes[index+1].classList += " selected";
}

init();