const hsb = require('hbs');
hsb.registerHelper('getColor', (x) => {
    let resp = '';
    x.forEach(element => {
        resp += `<div id="paleta" class="col">
                    <div class="card mb-3" style="max-width: 10rem;">
                        <div class="card-header">Colores</div>
                        <div class="card-body">
                            <h5 class="card-title">${element['tipo']}</h5>`;
        for (let index = 0; index < element['colores'].length; index++) {
            resp += `<div class="paletaColor" style="background-color: ${element['colores'][index]}"></div>`;
        }
        resp += `       </div>
                    </div>
               </div>`;
    });

    return resp;
});