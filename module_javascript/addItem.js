// import electron
const electron = require('electron');
const {ipcRenderer} = electron;

 module.exports = function() {
    // submit
    function submitItem(e){
        console.log(e); // debug
        e.preventDefault(); // prevent default of writing to file

        const item = document.querySelector('#item').value; // grab element from DOM
        ipcRenderer.send('item:add', item);
    }
};
