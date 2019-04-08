// import electron
const electron = require('electron');
const ipc = electron.ipcRenderer; // inter-process communication
const remote = electron.remote;

// grab form reference from DOM
const form = document.querySelector('form'); 
form.addEventListener('submit', submitItem);

// accessible refs to HTML button elems
const addBtn = document.getElementById('addBtn')
const clsBtn = document.getElementById('closeBtn');

// close button event logic
clsBtn.addEventListener('click', function(event) {
    
    var window = remote.getCurrentWindow(); // close current window only
    window.close();

});

// add button event logic
addBtn.addEventListener('click', function(e) {

    submitItem();

});

// submit item through ipc
function submitItem(e) {

    e.preventDefault(); // prevent default of writing to file
    
    const item = document.querySelector('#item').value; // grab element from DOM
    ipc.send('item:add', item);

}