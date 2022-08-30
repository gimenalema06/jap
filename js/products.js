
function listado(){ 
fetch(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE)
.then(res => res.json())
.then(data =>{
    document.getElementById("cat-name").innerHTML += data.catName;
    let htmlContentToAppend = "";
    for(let i = 0; i < data.products.length; i++){ 
        let producto = data.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ producto.name +' '+ producto.cost + producto.currency +`</h4> 
                        <p> `+ producto.description +`</p> 
                        </div>
                        <small class="text-muted">` + producto.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById('cat-list-container').innerHTML = htmlContentToAppend
    }
})
}

listado();