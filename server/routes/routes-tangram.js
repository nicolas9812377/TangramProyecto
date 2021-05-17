const express = require('express');
const _ = require('underscore');

const Tangram = require('../model/tangram');

const app = express();
const { getRules } = require('../controller/controller-rules');



app.get('/tangram', (req, res) => {
    Tangram.aggregate([{ $sample: { size: 1 } }])

    .exec((err, tangram) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tangram,
            rule: getRules()
        });

    })
});

app.get('/tangram-id', async(req, res) => {
    let resp = [];
    await Tangram.findOne({ nombre: req.session.usuario.tangramname }, (err, tangramBD) => {
        resp.push(tangramBD);
    });
    await Tangram.aggregate([{ $match: { nombre: { $ne: req.session.usuario.tangramname } } }, { $sample: { size: 2 } }])
        .exec((err, tangramBD) => {
            tangramBD.forEach(element => {
                resp.push(element);
            });
            resp.sort(() => Math.random() - 0.5);
            res.json({ tangram: resp });
        });
});



app.post('/tangram', (req, res) => {

    let body = req.body

    let tangram = new Tangram({
        nombre: body.nombre,
        figuras1: body.figuras1,
        figuras2: body.figuras2,
        figuras3: body.figuras3,
        figuras4: body.figuras4,
        figuras5: body.figuras5,
    });

    tangram.save((err, tangramBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tangram: tangramBD
        });
    });
});


module.exports = app;