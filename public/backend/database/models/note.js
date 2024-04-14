const express = require('express');
const sqlite3 = require('sqlite3');

const router = express.Router();
const app = express();
//conexion con la base de datos
const db = new sqlite3.Database('database.sqlite', (err)=>{
    if(err) {
        console.log('Error al conectar la base de datos',err.message)
    }else{
        console.log('conexion con la base de datos exitosa');
    }
})

// Crear tabla de notas si no existe
db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    date DATETIME,
    statusN TEXT,
    content TEXT,
    usuario_id INTEGER,
    FOREIGN KEY(usuario_id) REFERENCES users(id)
  )`);






// Crear nota para un usuario específico
router.post('/usuarios/:usuario_id/notas', (req, res) => {
    const { titulo, date, statusN, content } = req.body;
    db.run('INSERT INTO notes (usuario_id, titulo, date, statusN,content) VALUES (?, ?, ?, ?, ?)', [req.params.usuario_id, titulo, date, statusN, content], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            id: this.lastID,
            titulo: titulo,
            date: date,
            statusN:statusN,
            content: content
        });
    });
});

// Obtener todas las notas de un usuario específico
router.get('/usuarios/:usuario_id/notas', (req, res) => {
    db.all('SELECT * FROM notes WHERE usuario_id=?', req.params.usuario_id, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Actualizar nota por ID de usuario y ID de nota
router.put('/usuarios/:usuario_id/notas/:nota_id', (req, res) => {
    const {titulo, date, statusN, content } = req.body;
    db.run('UPDATE notes SET titulo=?, date=?, statusN=?, content=? WHERE id=? AND usuario_id=?', [titulo, date, statusN, content, req.params.nota_id, req.params.usuario_id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Nota actualizada' });
    });
});

// Eliminar nota por ID de usuario y ID de nota
router.delete('/usuarios/:usuario_id/notas/:nota_id', (req, res) => {
    db.run('DELETE FROM notes WHERE id=? AND usuario_id=?', [req.params.nota_id, req.params.usuario_id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Nota eliminada' });
    });
});

module.exports = router;