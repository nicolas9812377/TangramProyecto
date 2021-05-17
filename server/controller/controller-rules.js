const rules = [{
        rule: 1,
        position: [2, 4],
        condition: 'mismo color',
        msg: '2. Posiciones 2 y 4 seran del mismo color'
    },
    {
        rule: 2,
        position: [1, 5],
        condition: 'mismo color',
        msg: '2. Posiciones 1 y 5 seran del mismo color'
    },
    {
        rule: 3,
        position: [1, 3],
        condition: 'mismo color',
        msg: '2. Posiciones 1 y 3 seran del mismo color'
    }
];

let getRules = (max = 2, min = 0) => {
    let pos = Math.random() * (max - min) + min;
    return rules[Math.round(pos)];
};

module.exports = {
    getRules
}