const elementsFactory = new function(){

    let createSoundElement = function(sound){
        let soundElement = document.createElement("div");
        soundElement.classList.add("sound-button");

        let soundHeader = document.createElement("h1");
        soundHeader.innerHTML = sound.key;

        let soundName = document.createElement("p");
        soundName.innerHTML = sound.name

        soundElement.appendChild(soundHeader);
        soundElement.appendChild(soundName);

        return soundElement;
    }

    let createChannelElement = function(channel){
        let channelDiv = document.createElement("div");
        channelDiv.classList.add("channel");
        channelDiv.id = channel.id;

        let channelSelect = document.createElement("input");
        channelSelect.type = "checkbox";
        channelSelect.classList.add("channel-select");
        channelSelect.value = channel.id;

        let channelSounds = document.createElement("div");
        channelSounds.classList.add("channel-sounds");
        
        channelDiv.appendChild(channelSounds);
        channelDiv.appendChild(channelSelect);

        return channelDiv
    }

    return {
        CreateSoundElement: createSoundElement,
        CreateChannelElement: createChannelElement
    }
}();