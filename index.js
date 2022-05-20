const {app, BrowserWindow, dialog, ipcMain, Menu, Tray} = require('electron');
const path = require('path');
const fs = require('fs');
const discordRPC = require("./discordRPC");
const logger = require("./logger.js");

if(ipcMain === undefined) {
    logger.error("App is being ran by node index.js and not electron .");
    logger.info("Quiting");
    process.exit();
}

new discordRPC(ipcMain, "963368466381942814");
app.disableHardwareAcceleration();

function createWindow() {

    const win = new BrowserWindow({
        title: "PocketBlock",
        icon: "media/icon.png",
        resizable: true,
        backgroundColor: "#2f3136",
        show: false,
        darkTheme: true,
        webPreferences: {
            preload: path.join(__dirname, 'js/preload.js'),
            spellcheck: false,
        }
    });

    win.setMenuBarVisibility(false);
    win.loadFile('html/editor.html');
    win.maximize();

}

ipcMain.handle("showSaveFileDialog", async (event, args) => {

    const response = await dialog.showSaveDialog(
        {
            title: "Save PHAR file",
            "buttonLabel": "Save PHAR",
            filters: [
                { name: 'Pocketmine-MP Plugin', extensions: ['phar'] }
            ]
        }
    );

    if(response["canceled"])
        return;

    fs.writeFileSync(response["filePath"], args);

});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();

})