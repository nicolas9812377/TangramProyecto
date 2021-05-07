require('./config/config')
const express = require('express');
const app = express();
const hsb = require('hbs');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

//codificar parametros
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + './../public'));
//hsb.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//requiere helper
require('./helper/helper.js');

//incluir rutas
require('./routes/routes.js')(app);

//incluir controller-tangram
app.use(require('./controller/rutas-tangram').app);



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