import { app, ipcMain, BrowserWindow } from "electron";

app.whenReady().then(main);


async function main () {
    const window = new BrowserWindow({
        width: 800, height: 650,
        show: false,
        webPreferences: {
            preload: __dirname + "/bridge.js",
            devTools: true
        }
    });

    window.loadFile(__dirname + "/renderer/index.html");
    window.on("ready-to-show", window.show);
}


ipcMain.handle("get/version", async () => {
    return app.getVersion();
});