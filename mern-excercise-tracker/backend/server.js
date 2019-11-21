/*importar librerias*/

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// me toco agregar el path:.env por q esa vuelta parece q no reconoce el .env directamente
require('dotenv').config({ path: '.env' });

const app= express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

//conecta la bd y si la conexion es exitosa me vota el mensaje
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Se conecto exitosamente con la bd");
});
//traer las rutas de user y exercise
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


//que me diga en q puerto esta corriendo
app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto: ${port}`);
});
