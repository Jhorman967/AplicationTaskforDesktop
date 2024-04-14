const { app, BrowserWindow, ipcMain, Notification  } = require('electron')
const path = require('path')
// const isDev = require('electron-is-dev');
// const { sequelize } = require('../src/models');
// const userController = require('../public/');
const status = process.env.NODE_ENV
const isDev = process.env.NODE_ENV !== 'development';
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
    frame: true,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // },
    
  }
    
  );

  const expressServerPath = path.join(__dirname,  'backend', 'server.js');

  // Cargar y ejecutar tu aplicación Express
  require(expressServerPath);

  mainWindow.loadURL(
    isDev ?
   "http://localhost:3000" 
   : `file://${path.join(__dirname, "../build/index.html")}`
  );
    

//sqqlize
  // sequelize.sync().then(()=>{
  //   console.log('Conection synced successfully')
  // })
  // userController.newUser()
  // const mainMenu = Menu.buildFromTemplate(templateMenu)
  // Menu.setApplicationMenu(true)
  
    console.log(status)
  mainWindow.on('closed',()=> {
    app.quit()
  } )
//  mainWindow.on("closed", () => (mainWindow = null));
}

ipcMain.on('show-notification', (event, args) => {
  const { title, body } = args;
  const notification = new Notification({ title, body });
  notification.show();
});
// function createNewTarea() {
//     const addTareasWindows = new BrowserWindow({
//       width: 640,
//       height: 720,
//       title: "Agregar Tarea",
//       webPreferences: {
//         preload: path.join(__dirname, 'preload.js'),
//         contextIsolation: false,
//         nodeIntegration: true
//       },
//     })
//     addTareasWindows.setMenu(null)
//     addTareasWindows.loadFile('src/views/nuevaTarea.html')

// }


// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// // esta función cuando se ha creado electron llama la funcion crear windows
// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     // if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// //cuando todas las ventanas se han cerrado nos saca
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// })




app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});