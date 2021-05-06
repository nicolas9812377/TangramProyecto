$(document).ready(function() {
    width = 400;
    height = 400;
    cant = 5;
    $.ajax({
        url: '/tangram',
        data: {},
        type: 'GET',
        success: function(msg) {
            msg.tangram.forEach((element, index) => {
                figuras = [];
                $('#tablero').append(`<canvas id="canvas${index}" width="${width}" height="${height}" style="border: 1px solid rgb(0, 0, 0);"></canvas>`);

                for (let i = 1; i <= cant; i++) {
                    figuras.push(element[`figuras${i}`].split(';'));
                }

                var canvas = document.getElementById(`canvas${index}`);
                if (canvas.getContext) {
                    var ctx = canvas.getContext('2d');
                    for (let j = 0; j < cant; j++) {
                        if (figuras[j].length == 3) {
                            punto1 = figuras[j][0].split(',');
                            punto2 = figuras[j][1].split(',');
                            punto3 = figuras[j][2].split(',');

                            ctx.beginPath();
                            ctx.moveTo(parseInt(punto1[0]), parseInt(punto1[1]));
                            ctx.lineTo(parseInt(punto2[0]), parseInt(punto2[1]));
                            ctx.lineTo(parseInt(punto3[0]), parseInt(punto3[1]));
                            ctx.closePath();
                            ctx.stroke();
                        } else if (figuras[j].length == 4) {
                            punto1 = figuras[j][0].split(',');
                            punto2 = figuras[j][1].split(',');
                            punto3 = figuras[j][2].split(',');
                            w = Math.sqrt(Math.pow((parseInt(punto2[0]) - parseInt(punto1[0])), 2) + Math.pow((parseInt(punto2[1]) - parseInt(punto1[1])), 2))
                            h = Math.sqrt(Math.pow((parseInt(punto3[0]) - parseInt(punto1[0])), 2) + Math.pow((parseInt(punto3[1]) - parseInt(punto1[1])), 2))
                            console.log("Wih: " + w + " H: " + h);

                            ctx.beginPath();
                            ctx.rect(parseInt(punto1[0]), parseInt(punto1[1]), parseInt(w), parseInt(h));
                            ctx.stroke();
                            ctx.closePath();

                        }
                    }
                }
                canvas.addEventListener('click', canvasClicked, false);

            });
            //console.log(msg);
        },
        error: function(err) {
            console.log(err);
        }
    });
});

function canvasClicked(e) {
    //console.log("name: " + name);
    console.log("Clicked x: " + e.x + " y: " + e.y + " e:  " + e.target.id);
    location.href = "/?id=" + e.target.id;
}