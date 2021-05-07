module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index');
    });
    app.get('/login', (req, res) => {
        res.render('login');
    });
    app.get('/register', (req, res) => {
        res.render('register');
    });
    app.get('/tangram-r', (req, res) => {
        let colora = req.query.colora || undefined;
        let colorb = req.query.colorb || undefined;
        let colorc = req.query.colorc || undefined;
        let nombre = req.query.nombre || undefined;
        if (colora === undefined || colorb === undefined || colorc === undefined || nombre === undefined)
            return res.redirect('/tangram-colors')
        res.render('tangram-r', { colora: "#" + colora, colorb: "#" + colorb, colorc: "#" + colorc, nombre });
    });
    app.get('/tangram-l', (req, res) => {
        let { coloresT } = require('../controller/rutas-tangram');
        res.render('tangram-l', { coloresT });
    });
    app.get('/tangram-colors', (req, res) => {
        res.render('tangram-colors');
    });
}