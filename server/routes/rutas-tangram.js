const express = require('express');
const _ = require('underscore');

const Tangram = require('../model/tangram');

const app = express();



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
            });

        })
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