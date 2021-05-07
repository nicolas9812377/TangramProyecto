const express = require('express');
const _ = require('underscore');

const Tangram = require('../model/tangram');

const app = express();

let coloresT = [{
        tipo: 'Primario',
        colores: ['#FFFF00', '#FF0000', '#0000FF']
    },
    {
        tipo: 'Secundario',
        colores: ['#FFA500', '#EE82EE', '#008000']
    },
    {
        tipo: 'Terciario',
        colores: ['#FBBA00', '#FF4000', '#922B3E', '#4C2882', '#009C8C', '#C6CE00']
    }
];

app.get('/tangram', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 1;
    limite = Number(limite)

    Tangram.find({}, 'nombre figuras1 figuras2 figuras3 figuras4 figuras5')
        .skip(desde)
        .limit(limite)
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


app.get('/colors', (req, res) => {
    let n = 3;
    let treecolors = coloresT.map(function(x) {
        let temporal = [x.tipo];
        while (temporal.length != n + 1) {
            var rand = x.colores[~~(Math.random() * x.colores.length)];
            if (temporal.indexOf(rand) == -1)
                temporal.push(rand)
        }
        return temporal;
    });
    res.send(treecolors);
});


module.exports = app;