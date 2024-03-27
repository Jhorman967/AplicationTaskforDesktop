// const { DataTypes } = require( 'sequelize');
// const { Sequelize, sequelize } = require('../models');
// const { ipcMain } = require('electron');

// const newUser = ()=> {
//     ipcMain.on('new-user', async(event, data) =>{
//         const Users = require ('../models/users')(sequelize,DataTypes)
//         const name = data.name;
//         const email = data.email;
//         const password = data.password;
//         try {
//             Users.create({name, email, password})   
//         } catch (error) {
//             console.error(error)
//         }
    


//     })
// };


// module.exports = newUser;

// import User from '../models/index.tsx';

// async function createUser(name: string): Promise<void> {
//   try {
//     await User.create({ name, email, password });
//     console.log('Usuario creado correctamente');
//   } catch (error) {
//     console.error('Error al crear usuario:', error);
//   }
// }

// export { createUser };
