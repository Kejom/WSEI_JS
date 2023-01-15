const StorageManager = function(){
    const storageName = "NoteKeepNotes";

    let saveData = function(data){
        var dataString = JSON.stringify(data);
        localStorage.setItem(storageName, dataString);
    }

    let getData = function(){
        var dataString = localStorage.getItem(storageName);

        if(!dataString)
            return [];

        var data = JSON.parse(dataString);
        return data;
    }

    return {
        SaveData: saveData,
        GetData: getData
    }
}();