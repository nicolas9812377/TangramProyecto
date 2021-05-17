const hsb = require('hbs');
hsb.registerHelper('getColor', (x) => {
    let resp = `<div id="paleta" class="col">
                    <div class="card mb-3 text-center shadow border-0" style="max-width: 21rem;">
                        <div class="card-header bg-default" style="color: white;">Colores</div>
                            <div class="card-body">`;
    x.forEach(element => {

        resp += `<div style="float: left; margin-right: 25px; margin-left:  ${(element['colores'].length > 3)?'57px':'25px'}">
                            <h5 class="card-title">${element['tipo']}</h5>`;
        for (let index = 0; index < element['colores'].length; index++) {

            if (element['colores'].length > 3) {
                if (index == 0) {
                    resp += `<div style="display:flex; margin-top: -15px"><div>
                                <div class="paletaColores" style="background-color: ${element['colores'][index]};"></div>`;
                } else if (index == 2) {
                    resp += `
                                <div class="paletaColores" style="background-color: ${element['colores'][index]};"></div>
                                </div><div>`;
                } else if (index == 5) {
                    resp += `<div class="paletaColores" style="background-color: ${element['colores'][index]};"></div>
                                </div>
                                </div>`;
                } else {
                    resp += `<div class="paletaColores" style="background-color: ${element['colores'][index]};"></div>`;
                }
            } else {
                resp += `<div class="paletaColores" style="background-color: ${element['colores'][index]};"></div>`;
            }
        }
        resp += `</div>`;

    });
    resp += `       </div>
                    </div>
               </div>`;

    return resp;
});

hsb.registerHelper('getPaletas', () => {
    let { get3Colors } = require('./../controller/controller-colors');
    let g = get3Colors();
    let codigohtml = '';
    g.forEach(element => {
        codigohtml += `<div class="card mb-3 text-center shadow border-0" style="max-width: 16rem;" id="cardcolor" onclick="cardClicked('${element[0]}','${element[1]}','${element[2]}','${element[3]}')">
                                    <div class="card-header bg-default" style="color:  white;">Colores</div>
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

hsb.registerHelper('ifm', (msg, tipo) => {
    let resp = "";

    if (msg)
        resp += `<div class="alert alert-${tipo}" role="alert">${msg}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
            </button>
        </div>`;

    return resp;
});