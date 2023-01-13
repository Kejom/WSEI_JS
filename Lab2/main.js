const template = document.getElementById("template");
const container = document.getElementById("items");
const linksContainer = document.getElementById("links");
const previousBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const toggleBtn = document.getElementById("toggle");

const items = [
    {
        type: "img",
        url: "http://picsum.photos/seed/picsum1/600/400",
        caption: "zdjęcie numer 1"
    },
    {
        type: "img",
        url: "http://picsum.photos/seed/picsum2/600/400",
        caption: "zdjęcie numer 2"
    },
    {
        type: "img",
        url: "http://picsum.photos/seed/picsum3/600/400",
        caption: "zdjęcie numer 3"
    },
    {
        type: "img",
        url: "http://picsum.photos/seed/picsum4/600/400",
        caption: "zdjęcie numer 4"
    },
    {
        type: "img",
        url: "http://picsum.photos/seed/picsum5/600/400",
        caption: "zdjęcie numer 5"
    },
    {
        type: "img",
        url: "http://picsum.photos/seed/picsum6/600/400",
        caption: "zdjęcie numer 6"
    },
    {
        type: "youtube",
        url: "https://www.youtube.com/embed/aXOChLn5ZdQ",
        caption: "video numer 1"
    }
]

let index = 0;
let isAutoPlayOn = false;
let interval;

function init(){
    items.forEach(item => addItem(item));
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

function addItem(item){
    if(item.type === "img")
        return addImage(item);

    if(item.type === "youtube")
        return addVideo(item);
}
function addImage(image){
    let imageDiv = template.cloneNode(true);
    imageDiv.style.display = "block";
    imageDiv.childNodes[1].childNodes[1].src = image.url;
    imageDiv.childNodes[1].childNodes[3].innerHTML = image.caption;
    container.appendChild(imageDiv);
}

function addVideo(video){
    let videoDiv = template.cloneNode(true);
    videoDiv.style.display = "block";
    let iframe = document.createElement("iframe");
    iframe.height = "400px";
    iframe.width = "600px";
    iframe.src = video.url;

    
    let figureElement = videoDiv.childNodes[1];
    figureElement.replaceChild(iframe, figureElement.childNodes[1]);

    videoDiv.childNodes[1].childNodes[3].innerHTML = video.caption;
    container.appendChild(videoDiv);
}

function onPrevNextButtonClick(indexChange){
    index+=indexChange;
    changeImage();
    resetInterval();
}

function addIndexButtons(){
    for (let i = 0; i < items.length; i++) {
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
    if(index >= items.length)
        index = 0;
    else if(index < 0)
        index = items.length-1;

    container.style.transform = `translateX(${-index*600}px)`
    markSelectedImageButton();
}

function markSelectedImageButton(){
    linksContainer.childNodes.forEach(child => {
        if(child.nodeName === "BUTTON")
            child.classList.remove("selected")
    });
    linksContainer.children[index].classList += " selected";
}

init();