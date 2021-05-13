let colorFiguras = [];
let cant = 5; //cantidad de figuras
let width = 400;
let height = 400;
let colorchoose;
$(document).ready(function() {
    var form_count = 1,
        previous_form, next_form, total_forms;
    total_forms = $("fieldset").length;

    $(".next-form").click(function() {
        previous_form = $(this).parent();
        next_form = $(this).parent().next();
        next_form.show();
        previous_form.hide();
        setProgressBarValue(++form_count);
    });
    $(".previous-form").click(function() {
        previous_form = $(this).parent();
        next_form = $(this).parent().prev();
        next_form.show();
        previous_form.hide();
        setProgressBarValue(--form_count);
        colorFiguras = [];
        $('#tablero').html('');
        newTangram();
        colorchoose = undefined;
    });
    setProgressBarValue(form_count);

    function setProgressBarValue(value) {
        var percent = parseFloat(100 / total_forms) * value;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
            .html(percent + "%");
    }
    newTangram();
    $('#btnNuevo').on('click', () => {
        colorFiguras = [];
        $('#tablero').html('');
        newTangram();
    });

    // Validacion
    $("#btnEnviar").click(function(event) {
        var error_message = '';
        if (!$("#email").val()) {
            error_message += "Por favor escribe email";
        }
        if (!$("#password").val()) {
            error_message += "<br>Por favor escribe contraseña";
        }
        if (!$("#name").val()) {
            error_message += "<br>Por favor escribe nombre";
        }
        if (!$("#lastname").val()) {
            error_message += "<br>Por favor escribe apellido";
        }

        let temp = colorFiguras.filter(x => x.color != '');
        if (temp.length != cant)
            error_message += "<br>Asegurese de pintar todos";


        // Display error if any else submit form
        if (error_message) {
            $('.alert-danger').removeClass('d-none').html(error_message);
            location.href = '/register#msg';
            return;
        } else {

            console.log("Enviando al servidor: ");
            $.ajax({
                url: '/Inser-user',
                data: {
                    'name': $('#name').val(),
                    'lastname': $('#lastname').val(),
                    'email': $('#email').val(),
                    'password': $('#password').val(),
                    'tangramname': $('#tangramname').text(),
                    'colorFiguras': JSON.stringify(colorFiguras)
                },
                type: 'POST',
                success: function(msg) {
                    if (msg.ok)
                        location.href = `/?msg=${msg.msg}&tipo=success`;
                    else {
                        $('.alert-danger').removeClass('d-none').html('Usuario ya registrado');
                        location.href = '/register#msg';
                    }

                },
                error: function(error) {
                    console.log(error);
                }
            });

            return;
        }
    });

});



function cardClicked(n, ca, cb, cc) {
    let colora = ca;
    let colorb = cb;
    let colorc = cc;
    let nombre = n;
    $('#cs').attr('disabled', false);
    $('.alert-primary').removeClass('d-none').html(`Color Elegido: ${nombre}`);
    $('#cc').html(`<h5 class="card-title">${nombre}</h5>
    <div class="paletaColor" style="background-color: ${colora}"></div>
    <div class="paletaColor" style="background-color: ${colorb}"></div>
    <div class="paletaColor" style="background-color: ${colorc}"></div>`);
    //console.log(colora + " " + colorb + " " + colorc);
    $('.paletaColor').click(function() {
        colorchoose = $(this).css("background-color");
    });
}

function newTangram() {
    $.ajax({
        url: '/tangram',
        data: {},
        type: 'GET',
        success: function(msg) {
            msg.tangram.forEach((element, index) => {
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
                $('#tablero').html(codigohtml);
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
                    console.log(colorFiguras);
                }
            });
        },
        error: function(err) {
            console.log(err);
        }
    });
}

let rgb2hex = c => '' + c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join ``;