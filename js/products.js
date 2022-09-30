
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

    document.getElementById("search").addEventListener("click", function(){
        let array = [];
        let searched_info = document.getElementById("search_place").value;
        for (let i=0; i<productos.length ; i++){
            if (productos[i].name.toLowerCase().includes(searched_info.toLowerCase()))
                array.push(productos[i]);
            else if (productos[i].description.toLowerCase().includes(searched_info.toLowerCase()))
                array.push(productos[i]);
        }
        mostrarListado(array, min, max);
    })
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
    <div class="dropdown">
    <button class="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color:dark-grey ; color:white">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
        &nbsp ${localStorage.getItem("user")}
    </button>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
        <li><a class="dropdown-item" href="cart.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                    <path
                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13
                         12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 
                         12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1
                          1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg> Carrito</a></li>
        <li><a class="dropdown-item" href="#" id="remove_user"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 
                        1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
                    <path fill-rule="evenodd"
                        d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5
                         0 0 1-.708.708l-3-3z" />
                </svg> Cerrar sesión</a></li>
    </ul>
    </div>  
    `
    document.getElementById("User_place").innerHTML = htmlContentToAppend;
    document.getElementById('remove_user').addEventListener("click", function(){
        let htmlContentToAppend = "";
        htmlContentToAppend = `
        <a class="nav-link" href="login.html">Ingresar</a>
        `
        document.getElementById("User_place").innerHTML = htmlContentToAppend;
        localStorage.removeItem("user"); 
    })
}


