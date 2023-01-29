const channelsContainer = document.querySelector(".channels-container");
const soundsContainer = document.querySelector(".sounds-container");
const addChannelButton = document.getElementById("add-channel");
const removeChannelButton = document.getElementById("remove-channel");
const playSelectedButton = document.getElementById("play-selected");
const playAllButton = document.getElementById("play-all");
const beatInputField = document.querySelector(".beat-input");

var soundsJson = [];
var keySoundMap = {};
var channels = [];

async function Init(){
    await getSounds();
    renderSounds();
    mapSounds();
    mapButtons();
}

function mapButtons(){
    addChannelButton.addEventListener("click", addChannel);
    removeChannelButton.addEventListener("click", removeSelectedChannels);
    playSelectedButton.addEventListener("click", playSelectedChannels);
    playAllButton.addEventListener("click", playAllChannels);
    beatInputField.addEventListener("change", onBeatInputChange)
}
async function getSounds(){
    const response = await fetch("./assets/sounds.json")
    soundsJson = await response.json();
    document.addEventListener('keypress', onKeyPress)
}

function renderSounds(){
    soundsJson.forEach(sound => renderSound(sound));
}

function renderSound(sound){
    let soundElement = elementsFactory.CreateSoundElement(sound);
    soundElement.addEventListener("click", () => onButtonPress(sound))
    soundsContainer.appendChild(soundElement);
}

function renderChannelSound(sound, channelId){
    let channelDiv = document.getElementById(channelId);
    let soundsContainer = channelDiv.children[0];
    let soundElement = elementsFactory.CreateSoundElement(sound);
    soundElement.addEventListener("click", ()=>{
        soundElement.remove();
        let channel = channels.filter(c => c.id === channelId)[0];
        channel.sounds = channel.sounds.filter(s => s.id !== sound.id);
    })
    soundsContainer.appendChild(soundElement);
}

function renderChannels(){
    channels.forEach(channel => renderChannel(channel));
}

function renderChannel(channel){
    let channelElement = elementsFactory.CreateChannelElement(channel);

    if(channel.sounds){
        let soundsContainer = channelElement.children[0];
        channel.sounds.forEach(sound => {
            let soundElement = elementsFactory.CreateSoundElement(sound);
            soundsContainer.appendChild(soundElement);
        })
    }
    channelsContainer.appendChild(channelElement);
}

function addChannel(){
    let newChannel = {
        id : Date.now().toString(),
        sounds : []
    };

    channels.push(newChannel);
    renderChannel(newChannel);
}

function removeSelectedChannels(){
    let channelToRemove = getSelectedChannelsIds();
    channelToRemove.forEach(c => removeChannelById(c));
}

function getSelectedChannels(){
    let channels = document.querySelectorAll(".channel-select");
    let selectedChannels = [...channels].filter(channel => channel.checked);
    return selectedChannels;
}

function getSelectedChannelsIds(){
    let channels = document.querySelectorAll(".channel-select");
    let selectedChannelsIds = [...channels].filter(channel => channel.checked).map(channel => channel.value);
    return selectedChannelsIds;
}

function removeChannelById(channelId){
    channels = channels.filter(c => c.id !== channelId);
    let channelToRemove = document.getElementById(channelId);
    channelToRemove.remove();
}

function addSoundToSelectedChannels(sound){
    if(!sound)
        return;

    let newSound = structuredClone(sound);
    newSound.id = Date.now().toString();
    let selectedChannelsIds = getSelectedChannelsIds();

    if(!selectedChannelsIds)
        return;

    let selectedChannels = channels.filter(c => selectedChannelsIds.includes(c.id));

    selectedChannels.forEach(c => {
        c.sounds.push(newSound);
        renderChannelSound(newSound, c.id);
    })
}

function playAllChannels(){
    playChannels(channels);
}

function playSelectedChannels(){
    selectedChannels = getSelectedChannels();
    playChannels(channels);
}
async function playChannels(channels){
    let beatValue = 60000 / Number(beatInputField.value)
    let beatCount = 0;
    channels.forEach(c => {
        if(c.sounds.length > beatCount)
            beatCount = c.sounds.length
    })

    for(let i = 0; i < beatCount; i++){
        channels.forEach(c=> playSound(c.sounds[i]))
        await sleep(beatValue);
    }
}

function mapSounds(){
    soundsJson.forEach(sound => keySoundMap[sound.key.toLowerCase()]= sound)
}

function onKeyPress(event){
    let sound = keySoundMap[event.key];
    playSound(sound);
    addSoundToSelectedChannels(sound);
}

function onButtonPress(sound){
    playSound(sound);
    addSoundToSelectedChannels(sound);
}

function onBeatInputChange(){
    let beatValue = Number(beatInputField.value)

    if(beatValue < 0)
        beatValue = 1;
    
    if(beatValue >600)
        beatValue = 600;

    beatInputField.value = beatValue;
}

function playSound(sound){
    if(!sound)
        return;
    
    const audio = new Audio("./assets/sounds/" + sound.fileName);
    audio.play();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
document.addEventListener("DOMContentLoaded", Init)