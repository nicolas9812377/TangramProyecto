const express = require('express');
const _ = require('underscore');

const Usuario = require('../model/user');

const app = express();


app.post('/Inser-user', (req, res) => {

    let body = req.body
    /// ojo ojo

  
    /**
    Usuario.save((err, userBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            User: userBD
        });
    }); */
});


module.exports = app;