function sletItem(event) {
    if(confirm('er du sikker')) {
        let id = (isNaN(event.target.dataset['id']) ? 0 : event.target.dataset['id']);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let init = {
            method: 'delete',
            headers: headers,
            cache: 'no-cache'
        };
        let request = new Request(`http://localhost:3000/produkter/${id}`, init);

        fetch(request)
        .then(response => {
            if (response.status == 204) {
                window.location.replace(`admin.html`);
            } else{
                throw new Error('Produkt blev ikke slettet');
            }
        }).catch(err => {
            console.log(err);
        });
    }  
}

document.addEventListener("DOMContentLoaded", event => {

    if(getParameterByName('action') == "edit") {
        let produkterId = (getParameterByName('id') != null ? getParameterByName('id') : 0);

        fetch(`http://localhost:1337/produkter/${produkterId}`)
          .then((response) => {
              if (response) {
                  return response.json();
              }
          })
          .then((json) => {
              let price = json[0].product_price;
              price = price.replace('.',',');

              document.querySelector('#productform').innerHTML = `
                 <h2>Rediger produkt</h2>
                 <label>Produkt navn</label>
                 <input type="text" name="productName" id="productName" value"${json[0].product_name}">
                 <br>
                 <label>produkt beskrivelse</label>
                 <input type="text" name="productBeskrivlse" id="productBeskrivlse" value="${json[0].product_beskrivlse}">
                 <br>
                 <label>produkt pris</label>
                 <input type="text" name="produktpris" id="produktpris" value="${price}">

                 <button>gem</button>
                 <a href="index.html" class="button">anuller</a> 
                <hr>`;

                let productFormButton = document.querySelector("#productForm button");
                
                            productFormButton.addEventListener('click', function (event) {
                               let name = document.querySelector('#productName').value;
                               let description = document.querySelector('#productDescription').value;
                               let price = document.querySelector('#productPrice').value;
                               let id = (getParameterByName('id') != null ? getParameterByName('id') : 0);
                
                               // erstat komma med punkt, så isNaN funktionen fungerer hensigtsmæssigt
                               price = price.replace(',', '.');
                
                               if (id != 0 && name != '' && description != '' && !isNaN(price) && id > 0) {
                                  document.querySelector('#productsFormError').innerHTML = "";
                                  let url = `http://localhost:1337/produkter/${id}`;
                                  let headers = new Headers();
                                  headers.append('Content-Type', 'application/json');
                
                                  let init = {
                                     method: 'put',
                                     headers: headers,
                                     body: JSON.stringify({
                                        id: id,
                                        name: name,
                                        description: description,
                                        price: price
                                     }),
                                     cache: 'no-cache',
                                     cors: 'cors'
                                  };
                                  let request = new Request(url, init);
                
                                  fetch(request)
                                     .then(response => {
                
                                        if (response.status == 200) {
                                           window.location.replace(`index.html`);
                                        } else {
                                           throw new Error('Produkt blev ikke opdateret')
                                        }
                                     }).catch(err => {
                                        console.log(err);
                                     });
                
                               } else {
                                  document.querySelector('#produkterFormError').innerHTML = "Udfyld venligst alle felter korrekt";
                               }
                            });
                         })
                         .catch((err) => {
                            console.log(err);
                         });
                
                   }

          })
