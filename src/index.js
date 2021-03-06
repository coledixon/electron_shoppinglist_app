const electron = require('electron');
const {ipcRenderer} = electron;
const ul = document.querySelector('ul');

// add item
ipcRenderer.on('item:add', function(e, item){

    const li = document.createElement('li'); // create li element through DOM manipulation
    const itemText = document.createTextNode(item); // create the text var from item passed

    // dynamically set classes (for Materialize CSS)
    ul.className = 'collection';
    li.className = 'collection-item'; 
    li.appendChild(itemText); // add to li
    ul.appendChild(li); // add li to ul

});

// clear all items
ipcRenderer.on('item:clear', function(e){

    ul.innerHTML = ''; // wipe the li(s) from the ul element
    ul.className = ''; // reset class 

});

// remove individual item
ul.addEventListener('dblclick', removeItem); // dblclick = doubleclick

function removeItem(e){

    e.target.remove(); // remove target item from DOM
    if (ul.children.length == 0) { ul.className = ''; } // reset class 

};