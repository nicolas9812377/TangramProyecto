const express = require('express');
const _ = require('underscore');
const { equalsColors } = require('../controller/controller-colors');
const Usuario = require('../model/user');

const app = express();


app.post('/Inser-user', (req, res) => {

    let body = req.body;


    let user = new Usuario({
        name: body.name,
        lastname: body.lastname,
        username: body.username,
        idcard: body.idcard,
        email: body.email,
        password: body.password,
        tangramname: body.tangramname,
        colors: JSON.parse(body.colorFiguras),
        telephone: body.telephone,
        phone: body.phone,
        birthday: body.birthday,
        direction: body.direction,
        country: body.country,
        province: body.province,
        city: body.city,
        civilstatus: body.civilstatus,
        gender: body.gender,
        ruleid: body.ruleid
    });

    user.save((err, userBD) => {
        if (err) {
            return res.status(200).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Registro Exitoso'
        });
    });
});

app.post('/login-tangram', (req, res) => {
    let body = req.body;
    let ucolors = JSON.parse(body.colorFiguras).map(function(x) {
        return x.color
    });;
    Usuario.findOne({ email: req.session.usuario.email }, (err, usuarioBD) => {
        //if (usuarioBD.tangramname == body.tangramname) {
        let bdcolors = JSON.parse(JSON.stringify(usuarioBD.colors)).map(function(x) {
            return x.color
        });;
        if (equalsColors(bdcolors, ucolors))
            return res.status(200).json({
                ok: true
            });
        //}

        return res.status(200).json({
            ok: false,
            msg: 'Tangram Incorrecto'
        });
    });
});

app.post('/login-user', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioBD) => {

        if (err) {
            return res.redirect('/login?msg=Ha%20ocurrido%20un%20error&tipo=danger');
        }
        if (!usuarioBD) {
            return res.redirect('/login?msg=Credenciales%20Incorrectas&tipo=danger');
        }
        if (usuarioBD.password == body.password) {
            req.session.usuario = usuarioBD;
            return res.redirect('tangram-l');
        }
        return res.redirect('/login?msg=Credenciales%20Incorrectas&tipo=danger');
    })
});


module.exports = app;