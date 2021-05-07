let colorchoose
$(document).ready(function() {
    $('.paletaColor').on('click', function() {
        colorchoose = $(this).css("background-color");
        //$(this).css("transform", "scale(1.1)");

        $('#tablero').attr('disabled', false);
    });

    $('#btnEnviar').on('click', function() {
        let temp = colorFiguras.filter(x => x.color != '');
        if (temp.length != cant)
            alert("Asegurese de pintar todos");
        else
        //enviar al servidor pendiente
            $.ajax({
            url: '/',
            data: { 'colorFiguras': colorFiguras, 'name': $('#tangramname').text() },
            type: 'GET',
            success: function(msg) {
                console.log(msg);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});