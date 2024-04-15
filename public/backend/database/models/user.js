const express = require('express');
const sqlite3 = require('sqlite3');	
const { route } = require('./user');
const app = express();
const router = express.Router();


//conexion con la base de datos
const db = new sqlite3.Database('database.sqlite', (err)=>{
    if(err) {
        console.log('Error al conectar la base de datos',err.message)
    }else{
        console.log('conexion con la base de datos exitosa');
      
        
    }
    
})
//crear tabla

db.on('open', () => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT, 
        securityAnswer TEXT
    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla de usuarios:', err);
        } else {
            console.log('Tabla de usuarios creada correctamente');
        }
    });
});

// const initialUser = {
//     name: 'Usuario inicial',
//     email: 'admin',
//     password: '123456789',
//     securityAnswer: 'titanic'
// };
// db.run('INSERT INTO users (name, email, password,securityAnswer) VALUES (?, ?, ?, ?)', [initialUser.name, initialUser.email, initialUser.password, initialUser.securityAnswer], function(err) {
//     if (err) {
//         console.error('Error al registrar el usuario inicial:', err);
//     } else {
//         console.log('Usuario inicial registrado correctamente');
//     }
// });
router.post('/usuarios', (req, res) => {
    const body = req.body;
    const { name, email, password, securityAnswer } = body; // Acceder a las propiedades del objeto body

    // Verificar que se hayan proporcionado name, email y password
    if (!name || !email || !password || !securityAnswer) {
        console.log("Error en campos")
        return res.status(400).json({ error: 'Faltan campos obligatorios (name, email, password, securityAnswer)' });
    }

    // Insertar el usuario en la base de datos
    db.run('INSERT INTO users (name, email, password, securityAnswer) VALUES (?, ?, ?, ?)', [name, email, password, securityAnswer], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({  
            id: this.lastID,
            name: name,   // Utilizar las variables name, email, password
            email: email,
            password: password,
            securityAnswer: securityAnswer
        }); 
    });
});


//endpoint para obtener todos los usuarios
router.get('/usuarios', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

//Actualizar usuario por ID
router.put('/usuarios/:id', (req, res) => {
    const { name, email, password, securityAnswer } = req.body;
    db.run('UPDATE users SET name=?, email=?, password=?, securityAnswer=? WHERE id=?', [name, email, password, securityAnswer, req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Usuario actualizado' });
    });
});
// Eliminar usuario por ID
router.delete('/usuarios/:id', (req, res) => {
    db.run('DELETE FROM users WHERE id=?', req.params.id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Usuario eliminado' });
    });
});


module.exports = router