(() => {
    document.addEventListener('DOMContentLoaded', () => {
        hentProdukter();
    });

})();
function hentProdukter() {
console.log("kør hentprodukter")

    fetch('http://localhost:1337/produkter')
        .then((response) => {
            // grib svarets indhold (body) og send det som et json objekt til næste .then()
            return response.json();
        })
        .then((data) => {
            console.log("then")
            var produkter = document.getElementById("udskriv_produkter");
            console.log(produkter)
            data.forEach(function (element, index) {
                produkter.innerHTML += `
                
                <div class="col-lg-4 col-sm-6 portfolio-item">
                    <div class="card">
                     <div id="img" src="img/cd_afspillere/creek_classic_cd.jpg" ></div>
                        <div class="card-body">
                            <h4 class="card-title">
                                <a class="prudukt_title" href="#">cd anspilder</a>
                            </h4>
                            <h4 class="prudukt_pris">400kr</h4>
                            <p class="card-text"></p>
                        </div>
                    </div>
                </div>`;




                // // nu er json objektet lagt ind i data variablen, udskriv data
                // console.log(element);
                // document.getElementsByClassName("prudukt_title")[index].innerHTML += element.navn;
                // document.getElementsByClassName("prudukt_pris")[index].innerHTML += element.pris;
                // document.getElementsByClassName("prudukt_img")[index].innerHTML += "<img style='width: 275px; height: 200px;' src=" + element.img + ">" ;
                // document.getElementsByClassName("card-text")[index].innerHTML += element.beskrivelse;
            }, this);
        })
}