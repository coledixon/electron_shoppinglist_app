// import libraries // see notes on const
const electron = require('electron');
const url = require('url');
const path = require('path');
// require.main.require("./module_javascript/addItem.js")

// get obejcts from Electron
const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENVIRONMENT
process.env.NODE_ENV = 'production';

// this is the main window being displayed // see notes on let
let mainWindow;

// additional windows
let addItemWindow;

// Listen for the app to be ready, then do something
app.on('ready', function() {

    // create new window
    mainWindow = new BrowserWindow({}); // 'new' required to instantiate object

    // load HTML file into window 
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './html/mainWindow.html'), // current directory
        protocol: 'file:', // file in directory
        slashes: true // adds slashes to the directory path when located by loadURL
    }));

    // Quit app on close
    mainWindow.on('closed', function(){
        app.quit();
    });

    // build titlebar menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemp);
    // insert the titlebar menu
    Menu.setApplicationMenu(mainMenu);

});

// handle create add window
function createAddItemWindow() {

    addItemWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Item to List'
    });

    // load HTML file into window 
    addItemWindow.loadURL(url.format({
        pathname: path.join(__dirname, './html/addItemWindow.html'), 
        protocol: 'file:',
        slashes: true 
    }));

    // Garbage collection
    addItemWindow.on('closed', function(){
        addItemWindow = null;
    });
};

// catch item:add data
ipcMain.on('item:add', function(e, item){
    // console.log(item); // debug
    mainWindow.webContents.send('item:add', item);
    addItemWindow.close();
});

// create titlebar menu template // menus are an array
const mainMenuTemp = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                accelerator: process.platform == 'darwin' ? 'Command+B' : 'Ctrl+B',
                click(){
                    createAddItemWindow();
                }
            },
            {
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label: 'Quit',
                accelerator: process.platfrom == 'darwin' ? 'Command+Q' : 'Ctrl+Q', // delineate between iOS & Windows
                click() { // add click event
                    app.quit();
                }
            }
        ]
    }
];

// if iOS, add empty object to titlebar menu
if (process.platform == 'darwin') {
    mainMenuTemp.unshift({}); // array method that adds onto beginning of array
}

// add dev tools if not PROD
if (process.env.NODE_ENV != 'production'){
    mainMenuTemp.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platfrom == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){ // instatiate focus on open window
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload' // reload the form
            }
        ]
    });
}


