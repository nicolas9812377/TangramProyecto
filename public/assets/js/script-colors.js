function cardClicked(nombre, colora, colorb, colorc) {
    console.log(colora + " " + colorb + " " + colorc);
    location.href = `/tangram-r?colora=${colora.replace('#','')}&colorb=${colorb.replace('#','')}&colorc=${colorc.replace('#','')}&nombre=${nombre}`;
}