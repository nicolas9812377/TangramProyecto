require('./config/config')
const express = require('express');
const app = express();
const hsb = require('hbs');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const bodyParser = require('body-parser');

//codificar parametros
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));
hsb.registerPartials(path.join(__dirname, '../views/partials'));
app.set('view engine', 'hbs');

//Sesiones
app.use(session({
    secret: process.env.SEED,
    resave: false,
    saveUninitialized: true
}));

//requiere helper
require('./helper/helper.js');

//incluir rutas
require('./routes/routes.js')(app);

//incluir controller-tangram
app.use(require('./routes/routes-tangram'));

//incluir user
app.use(require('./routes/routes-user'));

// Conectar con MongoDB
mongoose.connect(process.env.URLDB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw err;
        console.log("Base de Datos ONLINE!");
    });

//Express Server
app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT);
});