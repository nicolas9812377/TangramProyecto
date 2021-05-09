module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index', { titulo: 'Inicio' });
    });
    app.get('/login', (req, res) => {
        res.render('login', { titulo: 'Iniciar Sesion' });
    });
    app.get('/register', (req, res) => {
        res.render('register', { titulo: 'Registro' });
    });
    app.get('/tangram-l', (req, res) => {
        let { coloresT } = require('../controller/controller-colors');
        res.render('tangram-l', { coloresT, titulo: 'Tangram L' });
    });
}