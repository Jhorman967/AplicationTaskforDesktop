const { app, BrowserWindow, Menu } = require('electron')
const path = require('node:path')
const isDev = require('@juliangumenita/electron-is-dev');
// const { sequelize } = require('../src/models');
// const userController = require('../src/controllers/userControllers');


const templateMenu = [
  {
    label: 'Archivo',
    submenu: [
      {
        label: 'Nueva Tarea',
        accelerator: 'CmdOrCtrl+N',
        click: function () {
          createNewTarea();  
        }
      }
    ]
  },
  {
    label: 'Developer',
    submenu: [
      {
        role: 'toggleDevTools'
      },
      {
        role:'reload'
      }
    ]
  }
]



function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // },
    
  }
    
  );

  mainWindow.loadURL(
    isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`
  );

//sqqlize
  // sequelize.sync().then(()=>{
  //   console.log('Conection synced successfully')
  // })
  // userController.newUser()
  const mainMenu = Menu.buildFromTemplate(templateMenu)
  Menu.setApplicationMenu(null)
  

  mainWindow.on('closed',()=> {
    app.quit()
  } )
//  mainWindow.on("closed", () => (mainWindow = null));
}


function createNewTarea() {
    const addTareasWindows = new BrowserWindow({
      width: 640,
      height: 720,
      title: "Agregar Tarea",
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: false,
        nodeIntegration: true
      },
    })
    addTareasWindows.setMenu(null)
    addTareasWindows.loadFile('src/views/nuevaTarea.html')

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// esta función cuando se ha creado electron llama la funcion crear windows
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
//cuando todas las ventanas se han cerrado nos saca
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// el codigo puede estar en separados procesos y requerirlos aqui