        // import electron
        const electron = require('electron');
        const {ipcRenderer} = electron;
        const form = document.querySelector('form'); // grab form from DOM
        form.addEventListener('submit', submitItem);

        // submit
        function submitItem(e){
            e.preventDefault(); // prevent default of writing to file

            const item = document.querySelector('#item').value; // grab element from DOM
            alert(item);
            ipcRenderer.send('item:add', item);
        }