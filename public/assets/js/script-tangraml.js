let colorFiguras = [];
let cant = 5; //cantidad de figuras
let colorchoose;
let vectangrams = [];
let width = 400;
let height = 400;
$(document).ready(function() {




    $.ajax({
        url: '/tangram-id',
        data: {},
        type: 'GET',
        success: function(msg) {
            console.log(msg);
            vectangrams = msg.tangram;
            let codigohtml = "";
            vectangrams.forEach(element => {
                figuras = [];
                codigohtml += '<div class ="ti shadow border-0">';
                codigohtml += `<h3 class="heading mb-0" >${element['nombre']}</h3>`;
                codigohtml += `<svg width="80" height="80"  style="border: 1px solid rgb(0, 0, 0);">`;

                for (let i = 1; i <= cant; i++) {
                    figuras.push(element[`figuras${i}`].split(';'));
                }
                console.log(colorFiguras);

                for (let j = 0; j < cant; j++) {
                    if (figuras[j].length == 3) {
                        codigohtml += `<polygon points="${lspolygon(figuras[j][0])} ${lspolygon(figuras[j][1])} ${lspolygon(figuras[j][2])}" stroke="#000" fill="#fff"/> `;
                    } else if (figuras[j].length == 4) {
                        punto1 = figuras[j][0].split(',');
                        punto2 = figuras[j][1].split(',');
                        punto3 = figuras[j][2].split(',');
                        w = Math.sqrt(Math.pow((parseInt(punto2[0]) - parseInt(punto1[0])), 2) + Math.pow((parseInt(punto2[1]) - parseInt(punto1[1])), 2))
                        h = Math.sqrt(Math.pow((parseInt(punto3[0]) - parseInt(punto1[0])), 2) + Math.pow((parseInt(punto3[1]) - parseInt(punto1[1])), 2))
                        console.log("Wih: " + lowscale(w) + " H: " + lowscale(h));
                        codigohtml += `<rect x="${lowscale(punto1[0])}" y="${lowscale(punto1[1])}" width="${lowscale(w)}" height="${lowscale(h)}" stroke="#000" fill="#fff"/>`;
                    }
                }
                codigohtml += `</div>`;

            });

            $('#muestra').html(codigohtml);
            $('.ti').on('click', function() {
                $('#tablerol').html(codigohtml);
                colorFiguras = [];
                let nombre = $(this).find('h3').text();
                let index = vectangrams.findIndex((e) => { return e.nombre == nombre });
                tangram(vectangrams[index]);
            });

        },
        error: function(err) {
            console.log(err);
        }
    });



    $('.paletaColores').on('click', function() {
        colorchoose = $(this).css("background-color");
    });

    $('#btnEnviar').click(function() {
        let temp = colorFiguras.filter(x => x.color != '');
        if (temp.length != cant)
            alert("Asegurese de pintar todos");
        else {
            //enviar al servidor pendiente login
            console.log("Enviando al servidor login------");
            //console.log(colorFiguras)
            //console.log($('#tangramname').text());
            $.ajax({
                url: '/login-tangram',
                data: {
                    'tangramname': $('#tangramname').text(),
                    'colorFiguras': JSON.stringify(colorFiguras)
                },
                type: 'POST',
                success: function(msg) {
                    console.log(msg);
                    if (msg.ok)
                        location.href = `/home`;
                    else
                        location.href = `/tangram-l?msg=${msg.msg}&tipo=danger`;
                },
                error: function(error) {
                    console.log(error);
                }
            });

        }
    });
});

let rgb2hex = c => '' + c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join ``;

function tangram(element) {
    //msg.tangram.forEach((element, index) => {
    figuras = [];

    let codigohtml = `<h3 class="display-5" id="tangramname">${element['nombre']}</h3>`;
    codigohtml += `<svg width="${width}" height="${height}"  style="border: 1px solid rgb(0, 0, 0);">`;

    for (let i = 1; i <= cant; i++) {
        figuras.push(element[`figuras${i}`].split(';'));
        colorFiguras.push({
            figuras: `figuras${i-1}`,
            color: ''
        });
    }
    console.log(colorFiguras);

    for (let j = 0; j < cant; j++) {
        if (figuras[j].length == 3) {
            codigohtml += `<polygon class="fig" id="figuras${j}" points="${figuras[j][0]} ${figuras[j][1]} ${figuras[j][2]}" stroke="#000" fill="#fff"/> `;
        } else if (figuras[j].length == 4) {
            punto1 = figuras[j][0].split(',');
            punto2 = figuras[j][1].split(',');
            punto3 = figuras[j][2].split(',');
            w = Math.sqrt(Math.pow((parseInt(punto2[0]) - parseInt(punto1[0])), 2) + Math.pow((parseInt(punto2[1]) - parseInt(punto1[1])), 2))
            h = Math.sqrt(Math.pow((parseInt(punto3[0]) - parseInt(punto1[0])), 2) + Math.pow((parseInt(punto3[1]) - parseInt(punto1[1])), 2))
            console.log("Wih: " + w + " H: " + h);
            codigohtml += `<rect class="fig" id="figuras${j}" x="${punto1[0]}" y="${punto1[1]}" width="${w}" height="${h}" stroke="#000" fill="#fff"/>`;
        }
    }
    $('#tablerol').html(codigohtml);
    //});
    $('.fig').on('click', function() {
        if (colorchoose == undefined) {
            alert("Eliga un color primero");
        } else {
            let temp = $(this).attr('id');
            console.log(" id:  " + temp + " colorelegido: " + colorchoose);
            $(this).attr('fill', colorchoose);
            colorFiguras.map(function(x) {
                if (x.figuras == temp) {
                    x.color = rgb2hex(colorchoose);
                    return x;
                }
            });
            console.log(colorFiguras);
        }
    });
}

function lowscale(num) {
    return parseInt(num * 80 / width);
}

function lspolygon(num) {
    let number = num.split(',');
    return lowscale(number[0]) + "," + lowscale(number[1]);
}