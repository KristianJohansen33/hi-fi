(() => {
    document.addEventListener('DOMContentLoaded', () => {
        hentProdukter();
    });

})();
function hentProdukter (){
fetch('http://localhost:1337/produkter')
.then((response) => {
    // grib svarets indhold (body) og send det som et json objekt til næste .then()
    return response.json();
})
.then((data) => {
    let products = $(".row");
    let all_products = $(".portfolio-item");

    for (let d = 0; d < data.length - 1; d++) {
        products.append(all_products[0].outerHTML);
    }
    data.forEach(function(element,index) {
        // nu er json objektet lagt ind i data variablen, udskriv data
        console.log(element);
        document.getElementsByClassName("prudukt_title")[index].innerHTML += element.navn;
        document.getElementsByClassName("prudukt_pris")[index].innerHTML += element.pris;
        document.getElementsByClassName("prudukt_img")[index].innerHTML += "<img src=" + element.img + ">" ;
    }, this);
}) 
}