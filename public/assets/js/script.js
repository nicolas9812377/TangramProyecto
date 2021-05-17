let colorFiguras = [];
let cant = 5; //cantidad de figuras
let width = 400;
let height = 400;
let colorchoose;
let ruleposition = [];
let paletacolor = [];
let ruleid;
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
            error_message += "Por favor escribe su email<br>";
        }
        if (!$("#password").val()) {
            error_message += "Por favor escribe su contraseña<br>";
        }
        if (!$("#name").val()) {
            error_message += "Por favor escribe su nombre<br>";
        }
        if (!$("#lastname").val()) {
            error_message += "Por favor escribe su apellido<br>";
        }
        if (!$("#idcard").val()) {
            error_message += "Por favor escribe su cédula<br>";
        }
        if (!$("#username").val()) {
            error_message += "Por favor escribe su nombre usuario<br>";
        }
        if (!$("#telephone").val()) {
            error_message += "Por favor escribe su teléfono<br>";
        }
        if (!$("#phone").val()) {
            error_message += "Por favor escribe su celular<br>";
        }
        if (!$("#birthday").val()) {
            error_message += "Por favor escribe su fecha de nacimiento<br>";
        }
        if (!$("#direction").val()) {
            error_message += "Por favor escribe su dirección<br>";
        }
        if (!$("#country").val()) {
            error_message += "Por favor escribe su pais<br>";
        }
        if (!$("#province").val()) {
            error_message += "Por favor escribe su provincia<br>";
        }
        if (!$("#city").val()) {
            error_message += "Por favor escribe su ciudad<br>";
        }
        if (!$("#civilstatus").val()) {
            error_message += "Por favor seleccione su estado civil<br>";
        }
        if (!$("#gender").val()) {
            error_message += "Por favor seleccione su género<br>";
        }


        let temp = colorFiguras.filter(x => x.color != '');
        if (temp.length != cant)
            error_message += "Asegurate de pintar todos<br>";
        else {
            //rega principal
            let rptemp = [...new Set(colorFiguras.map((x) => { return x.color; }))];
            if (rptemp.length != 3)
                error_message += "Asegurate de utilizar todos los colores<br>";

            //reglas aleatoria
            let rtemp = colorFiguras[ruleposition[0] - 1].color == colorFiguras[ruleposition[1] - 1].color;
            if (!rtemp)
                error_message += "No se ha cumplido con la regla<br>";
        }
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
                    'username': $('#username').val(),
                    'idcard': $('#idcard').val(),
                    'email': $('#email').val(),
                    'password': $('#password').val(),
                    'tangramname': $('#tangramname').text(),
                    'colorFiguras': JSON.stringify(colorFiguras),
                    'telephone': $('#telephone').val(),
                    'phone': $('#phone').val(),
                    'birthday': $('#birthday').val(),
                    'direction': $('#direction').val(),
                    'country': $('#country').val(),
                    'province': $('#province').val(),
                    'city': $('#city').val(),
                    'civilstatus': $('#civilstatus option:selected').val(),
                    'gender': $('#gender option:selected').val(),
                    'rule': ruleid
                },
                type: 'POST',
                success: function(msg) {
                    if (msg.ok) {
                        let mhtml = `<p> <strong>No olvides</strong> que estos son los colores elegidos de cada figura:</p><div class="text-center"> <h4 class="mb-0">${$('#cc').find('h5').text()}</h4><br>`;
                        let tempcolor = colorFiguras.map((x) => { return x.color; });
                        for (let i = 0; i < paletacolor.length; i++) {
                            let temp = []
                            for (let j = 0; j < tempcolor.length; j++) {
                                if (("#" + tempcolor[j]).toUpperCase() == paletacolor[i])
                                    temp.push(j)
                            }
                            mhtml += `<div class="mb-3" style="display: inline-flex;">Figuras: `;
                            temp.forEach((element, i) => {
                                mhtml += `${parseInt(element)+1} ${( i < temp.length-1)?'y' :''} `;
                            });
                            mhtml += ` Color: <div class="ml-3" style="width: 25px; height: 25px; border-radius: 15px; background-color: ${paletacolor[i]}"> </div></div> <br>`;
                        }
                        mhtml += "</div>"
                        $('.modal-body').html(mhtml);
                        $('#modal').modal('show');

                        $('#modal').on('hidden.bs.modal', function(e) {
                            location.href = `/?msg=${msg.msg}&tipo=success`;
                        })
                    } else {
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
    paletacolor.push([ca], [cb], [cc]);
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
                ruleposition = msg.rule.position;
                ruleid = msg.rule.rule;
                let codigohtml = `<h3 class="display-5" id="tangramname">${element['nombre']}</h3>`;
                codigohtml += `<svg width="${width}" height="${height}"  style="border: 1px solid rgb(0, 0, 0);">`;

                for (let i = 1; i <= cant; i++) {
                    figuras.push(element[`figuras${i}`].split(';'));
                    colorFiguras.push({
                        figuras: `figuras${i}`,
                        color: ''
                    });
                }
                console.log(colorFiguras);

                for (let j = 0; j < cant; j++) {
                    if (figuras[j].length == 3) {
                        codigohtml += `<polygon class="fig" id="figuras${parseInt(j)+1}" points="${figuras[j][0]} ${figuras[j][1]} ${figuras[j][2]}" stroke="#000" fill="#fff"/> 
                        <text x="${(parseInt(figuras[j][0].split(',')[0])+ parseInt(figuras[j][1].split(',')[0])+ parseInt(figuras[j][2].split(',')[0])) /3}" y="${(parseInt(figuras[j][0].split(',')[1])+ parseInt(figuras[j][1].split(',')[1])+ parseInt(figuras[j][2].split(',')[1])) /3}" style="font: bold 0.8em arial;" fill="#000" class="__web-inspector-hide-shortcut__">Fig: ${parseInt(j)+1}</text>`;
                    } else if (figuras[j].length == 4) {
                        punto1 = figuras[j][0].split(',');
                        punto2 = figuras[j][1].split(',');
                        punto3 = figuras[j][2].split(',');
                        w = Math.sqrt(Math.pow((parseInt(punto2[0]) - parseInt(punto1[0])), 2) + Math.pow((parseInt(punto2[1]) - parseInt(punto1[1])), 2))
                        h = Math.sqrt(Math.pow((parseInt(punto3[0]) - parseInt(punto1[0])), 2) + Math.pow((parseInt(punto3[1]) - parseInt(punto1[1])), 2))
                        console.log("Wih: " + w + " H: " + h);
                        codigohtml += `<rect class="fig" id="figuras${parseInt(j)+1}" x="${punto1[0]}" y="${punto1[1]}" width="${w}" height="${h}" stroke="#000" fill="#fff"/>
                        <text x="${(parseInt(punto1[0])+(parseInt(w)/2))}" y="${(parseInt(punto1[1])+(parseInt(h)/2))}" style="font: bold 0.8em arial; " fill="#000" class="__web-inspector-hide-shortcut__">Fig: ${parseInt(j)+1}</text>`;
                    }
                }
                $('#tablero').html(codigohtml);
                $('#rule').html(msg.rule.msg);
            });
            $('.fig').on('click', function() {
                if (colorchoose == undefined) {
                    alert("Eliga un color primero");
                } else {
                    let temp = $(this).attr('id');
                    console.log(" id:  " + temp + " colorelegido: " + colorchoose);
                    $(this).attr('fill', colorchoose);
                    $(this).next().attr('fill', 'white');
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