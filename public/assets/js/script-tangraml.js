let colorFiguras = [];
let cant = 5; //cantidad de figuras
$(document).ready(function() {
    width = 500;
    height = 500;


    $.ajax({
        url: '/tangram',
        data: {},
        type: 'GET',
        success: function(msg) {
            msg.tangram.forEach((element, index) => {
                figuras = [];

                let codigohtml = `<h3 id="tangramname">${element['nombre']}</h3>`;
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
            });
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
                    //console.log(colorFiguras);
                }
            });
        },
        error: function(err) {
            console.log(err);
        }
    });

});