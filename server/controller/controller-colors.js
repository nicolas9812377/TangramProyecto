const coloresT = [{
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

let get3Colors = () => {
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
    return treecolors;
};

let equalsColors = (colorA, colorB) => {
    for (let index = 0; index < colorA.length; index++) {
        if (colorA[index] != colorB[index])
            return false;
    }
    return true;
};

module.exports = {
    get3Colors,
    coloresT,
    equalsColors
};