const express = require('express');
const { request, Server } = require('http');
const sqlite3 = require('sqlite3');
const userRouter = require('./database/models/user');
const noteRouter = require('./database/models/note');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;



//Middleware para usar json
app.use(express.json());

app.use(cors());
//conexion con la base de datos
const db = new sqlite3.Database('./src/backend/database.sqlite', (err)=>{
    if(err) {
        console.log('Error al conectar la base de datos',err.message)
    }else{
        console.log('conexion con la base de datos exitosa');
    }
})


app.get('/', (request, response)=>{
    response.send('<h1>hello world!</h1>');
})



//Rutas para usuarios y notas
app.use('/', userRouter);
app.use('/', noteRouter);

//iniciar server

const server = app.listen(PORT, ()=>{
    const actualPort = server.address().port;
    console.log(`servidor escuchando en el puerto ${actualPort}`);
    
})

