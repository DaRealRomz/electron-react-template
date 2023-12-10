import { app, BrowserWindow, ipcMain } from "electron";
import { resolve } from "path";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      devTools: !app.isPackaged,
      preload: resolve(__dirname, "../../dist/bundle/main/preload.js"),
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile("dist/bundle/renderer/index.html");
  } else {
    mainWindow.loadURL("http://localhost:5205");
    mainWindow.webContents.openDevTools();
  }
};

app.on("web-contents-created", (e, contents) => {
  // Disable navigation and popups to avoid loading unsecure content
  contents.on("will-navigate", (event) => event.preventDefault());
  contents.setWindowOpenHandler(() => ({ action: "deny" }));
});

app.whenReady().then(async () => {
  ipcMain.handle("ping", () => `Pong at ${new Date().toLocaleTimeString()}!`);

  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
