$(document).ready(function() {
    $.ajax({
        url: '/colors',
        data: {},
        type: 'GET',
        success: function(msg) {
            let codigohtml = '';
            msg.forEach(element => {
                codigohtml += `<div class="card mb-3 text-center" style="max-width: 16rem;" id="cardcolor" onclick="cardClicked('${element[0]}','${element[1]}','${element[2]}','${element[3]}')">
                                    <div class="card-header">Colores</div>
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
            $('#cardcolors').html(codigohtml);
        },
        error: function(err) {
            console.log(err);
        }
    });
});

function cardClicked(nombre, colora, colorb, colorc) {
    console.log(colora + " " + colorb + " " + colorc);
    location.href = `/tangram-r?colora=${colora.replace('#','')}&colorb=${colorb.replace('#','')}&colorc=${colorc.replace('#','')}&nombre=${nombre}`;
}