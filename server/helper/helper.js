const hsb = require('hbs');
hsb.registerHelper('getColor', (x) => {
    let resp = '';
    x.forEach(element => {
        resp += `<div id="paleta" class="col">
                    <div class="card mb-3 text-center shadow border-0" style="max-width: 10rem;">
                        <div class="card-header bg-default" style="color: white;">Colores</div>
                        <div class="card-body">
                            <h5 class="card-title">${element['tipo']}</h5>`;
        for (let index = 0; index < element['colores'].length; index++) {
            resp += `<div class="paletaColores" style="background-color: ${element['colores'][index]}"></div>`;
        }
        resp += `       </div>
                    </div>
               </div>`;
    });

    return resp;
});

hsb.registerHelper('getPaletas', () => {
    let { get3Colors } = require('./../controller/controller-colors');
    let g = get3Colors();
    let codigohtml = '';
    g.forEach(element => {
        codigohtml += `<div class="card mb-3 text-center shadow border-0" style="max-width: 16rem;" id="cardcolor" onclick="cardClicked('${element[0]}','${element[1]}','${element[2]}','${element[3]}')">
                                    <div class="card-header bg-secondary" style="color:  ${element[1]};">Colores</div>
                                    <div class="card-body">
                                        <h5 class="card-title">${element[0]}</h5>
                                        <div style="margin-left: 15%;">
                                                <div class="democolor" style="background-color: ${element[1]};"></div>
                                                <div class="democolor" style="background-color: ${element[2]};"></div>
                                                <div class="democolor" style="background-color: ${element[3]};"></div>
                                        </div>
                                    </div>
                                </div>`;
    });
    return codigohtml;
});

hsb.registerHelper('setActive', (li, titulo) => {
    if (li == titulo)
        return 'active';
});