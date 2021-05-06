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
        res.render('tangram-r');
    });
    app.get('/tangram-l', (req, res) => {
        res.render('tangram-l');
    });
}