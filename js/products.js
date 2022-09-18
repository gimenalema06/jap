
const ORDER_ASC_BY_PRICE = "$ASC";
const ORDER_DESC_BY_PRICE = "$DESC" ; 
const ORDER_BY_RELEV = "RELEV" ; 
productos = [];
let min;
let max;

function sortByCriterio(criterio, array, min, max){
    if (criterio === ORDER_ASC_BY_PRICE){
        productos = array.sort((a,b) => {return a.cost - b.cost})
    }
    if (criterio === ORDER_DESC_BY_PRICE){
        productos = array.reverse((a,b) => {return a.cost - b.cost})
    }
    if (criterio === ORDER_BY_RELEV){
        productos = array.sort((a,b) => {return b.soldCount - a.soldCount})
    }
    document.getElementById('cat-list-container').innerHTML="";
    mostrarListado(productos, min, max);
}


function find_Max_Cost(array){
    let max = 0;
    for (let i=0; i<array.length; i++){
        if (max < array[i].cost) max = array[i].cost;
    }
    return max;
}

document.addEventListener("DOMContentLoaded", function(){ 
fetch(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE)
.then(res => res.json())
.then(data =>{
    document.getElementById("cat-name").innerHTML += data.catName;
    let productos = data.products;
    min = 0;
    max = find_Max_Cost(productos);
    mostrarListado(productos, min, max);  

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortByCriterio(ORDER_ASC_BY_PRICE, productos, min, max);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortByCriterio(ORDER_DESC_BY_PRICE, productos, min, max);
    });

    document.getElementById("relevancia").addEventListener("click", function(){
        sortByCriterio(ORDER_BY_RELEV, productos, min, max);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        if (document.getElementById("rangeFilterCountMin").value) min = document.getElementById("rangeFilterCountMin").value
        else min = 0;
        if (document.getElementById("rangeFilterCountMax").value) max = document.getElementById("rangeFilterCountMax").value
        else max = find_Max_Cost(productos);
        if (min <= max) mostrarListado(productos, min, max);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        min = 0;
        max = find_Max_Cost(productos);
        mostrarListado(productos, min, max);
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
    });
})}) 


function show_product(id){
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}


function mostrarListado(productos, min, max){
    let htmlContentToAppend = "";
    for(let i = 0; i < productos.length; i++){ 
        if (productos[i].cost >= min && productos[i].cost <= max){
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action" onclick="show_product(${productos[i].id})">
                <div class="row">
                    <div class="col-3">
                        <img src="` + productos[i].image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>`+ productos[i].name +' '+ productos[i].cost + productos[i].currency +`</h4> 
                            <p> `+ productos[i].description +`</p> 
                            </div>
                            <small class="text-muted">` + productos[i].soldCount + ` vendidos</small> 
                        </div>

                    </div>
                </div>
            </div>
            `
            document.getElementById('cat-list-container').innerHTML = htmlContentToAppend;
        }
        
}}

if (localStorage.getItem("user")) {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <a class="nav-link">`+localStorage.getItem("user")+ `</a>
    
    `
    document.getElementById("User_place").innerHTML = htmlContentToAppend;
    htmlContentToAppend=`
    <button type="button" style="background-color: black" id="remove_user">
        &#10060
    </button>`
    document.getElementById("logout").innerHTML = htmlContentToAppend;

    document.getElementById('remove_user').addEventListener("click", function(){
        let htmlContentToAppend = "";
        htmlContentToAppend = `
        <a class="nav-link" href="login.html">Ingresar</a>
        `
        document.getElementById("User_place").innerHTML = htmlContentToAppend;
        document.getElementById("logout").innerHTML = "";
        localStorage.removeItem("user"); 
    })
}


