// import electron
const electron = require('electron');
const ipc = electron.ipcRenderer; // inter-process communication
const remote = electron.remote;

// grab form reference from DOM
const form = document.querySelector('form'); 
form.addEventListener('submit', submitItem);

// close button event logic
const clsBtn = document.getElementById('closeBtn');

clsBtn.addEventListener('click', function(event) {
    
    var window = remote.getCurrentWindow(); // close current window only
    window.close();

});

// submit
function submitItem(e) {

    e.preventDefault(); // prevent default of writing to file
    
    const item = document.querySelector('#item').value; // grab element from DOM
    ipc.send('item:add', item);
}