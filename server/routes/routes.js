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
        let colora = "#" + req.query.colora;
        let colorb = "#" + req.query.colorb;
        let colorc = "#" + req.query.colorc;
        let nombre = req.query.nombre;
        res.render('tangram-r', { colora, colorb, colorc, nombre });
    });
    app.get('/tangram-l', (req, res) => {
        res.render('tangram-l');
    });
    app.get('/tangram-colors', (req, res) => {
        res.render('tangram-colors');
    });
}