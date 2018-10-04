const electron = require('electron');
const ipc = electron.ipcRenderer;
const form = document.querySelector('form'); // grab form from DOM
form.addEventListener('submit', submitItem);

// MAKE THIS WORK
module.exports = function() {
    // submit
    function submitItem(e){
        console.log(e); // debug
        e.preventDefault(); // prevent default of writing to file

        const item = document.querySelector('#item').value; // grab element from DOM
        ipc.send('item:add', item);
    }
};
