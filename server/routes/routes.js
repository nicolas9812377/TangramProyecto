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
    app.get('/tangram-r', (req, res) => {
        let colora = req.query.colora || undefined;
        let colorb = req.query.colorb || undefined;
        let colorc = req.query.colorc || undefined;
        let nombre = req.query.nombre || undefined;
        if (colora === undefined || colorb === undefined || colorc === undefined || nombre === undefined)
            return res.redirect('/tangram-colors')
        res.render('tangram-r', { colora: "#" + colora, colorb: "#" + colorb, colorc: "#" + colorc, nombre, titulo: 'Tangram R' });
    });
    app.get('/tangram-l', (req, res) => {
        let { coloresT } = require('../controller/controller-colors');
        res.render('tangram-l', { coloresT, titulo: 'Tangram L' });
    });
    app.get('/tangram-colors', (req, res) => {
        res.render('tangram-colors', { titulo: 'Tangram Colors' });
    });
}