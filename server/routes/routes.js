module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index', { titulo: 'Inicio', msg: req.query.msg, tipo: req.query.tipo });
    });
    app.get('/login', (req, res) => {
        res.render('login', { titulo: 'Iniciar Sesion', msg: req.query.msg, tipo: req.query.tipo });
    });
    app.get('/register', (req, res) => {
        res.render('register', { titulo: 'Registro' });
    });
    app.get('/tangram-l', (req, res) => {
        if (req.session.usuario != null) {
            let { coloresT } = require('../controller/controller-colors');
            res.render('tangram-l', { coloresT, titulo: 'Tangram L', msg: req.query.msg, tipo: req.query.tipo });
        } else {
            res.redirect('/login');
        }
    });
    app.get('/home', (req, res) => {
        res.render('home', { titulo: 'Home', nombre: req.session.usuario.name + " " + req.session.usuario.lastname });
    });
    app.get('/logout', (req, res) => {
        req.session.usuario = undefined;
        res.redirect('/');
    });
}