const { app, BrowserWindow } = require("electron");
require("./backend/server.ts");

function createWindow() {
  // Create the browser window.
  let window = new BrowserWindow({
    width: 1024,
    height: 768,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  window.loadFile("index.html");
}

app.on("ready", createWindow);

