let array = [];
let array2 = [];

fetch(CART_INFO_URL + '25801' + EXT_TYPE)
    .then(res => res.json())
    .then(data => {
        let htmlContentToAppend = `
            <table class="table">
        <thead>
            <tr>
            <th scope="col"></th>
            <th scope="col">Nombre</th>
            <th scope="col">Costo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Subtotal</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody id="elements">
        </tbody>
        </table>`


        document.getElementById("container").innerHTML += htmlContentToAppend;
        showProdInCart(data.articles);
        array.push(data.articles);

    })
if (localStorage.length > 3) {
    let htmlContentToAppend = "";
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes('productToCart')) {
            fetch(PRODUCT_INFO_URL + localStorage.getItem(localStorage.key(i)) + EXT_TYPE)
                .then(res => res.json())
                .then(data2 => {
                    htmlContentToAppend = `
                            <tr id="${localStorage.key(i)}">
                            <td scope="row"><img src="${data2.images[0]}" class="img-thumbnail" style="max-width: 50%"></td>
                            <td>${data2.name}</td>
                            <td>${data2.currency + ` ` + data2.cost}</td>   
                            <td><input value="1" type="number" min="0" id="cant`+ i + `" onchange="subtotalArt(${localStorage.getItem(localStorage.key(i))}, ${i}); sumOfSubtotals(); shippingCostAndTotal()" ></td>
                            <td id="subtotal`+ i + `" class="cartElement">${data2.currency + ` ` + data2.cost}</td>
                            <td id="eliminar">
                            <button class="btn btn-link" onclick="deleteProduct(${localStorage.key(i)})">
                            <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                            </td>
                            </tr>
                            `
                    document.getElementById("elements").innerHTML += htmlContentToAppend;
                    sumOfSubtotals();

                })

        }


    }

}

//funcion para el desafiate 6
function deleteProduct(product){
    console.log(product);
    product.remove();
    localStorage.removeItem(product.id);
}



function showProdInCart(Articles) {
    let htmlContentToAppend2 = '';
    let articulo = Articles[0];
    htmlContentToAppend2 += `
    
        <tr>
            <td scope="row"><img src="${articulo.image}" class="img-thumbnail" style="max-width: 50%"></td>
            <td>${articulo.name}</td>
            <td>${articulo.currency + ` ` + articulo.unitCost}</td>   
            <td><input value="1" type="number" min="0" id="cant" onchange="subtotal(); sumOfSubtotals(); shippingCostAndTotal();"></td>
            <td id="subtotal" class="cartElement">${articulo.currency + ` ` + articulo.unitCost}</td>
            <td></td>
        </tr>
        `

    document.getElementById("elements").innerHTML = htmlContentToAppend2;


}

function subtotal() {
    let art = array[0];
    document.getElementById("subtotal").innerHTML = art[0].currency + ' ' + document.getElementById("cant").value * art[0].unitCost;

}


//esta funcion calcula el subtotal de los articulos añadidos
function subtotalArt(id, index) {
    fetch(PRODUCT_INFO_URL + id + EXT_TYPE)
        .then(res => res.json())
        .then(data => {
            document.getElementById("subtotal" + index).innerHTML = data.currency + ' ' + document.getElementById("cant" + index).value * data.cost;

        })
}


//calcular el subtotal de todos los articulos
function sumOfSubtotals() {
    let subtotal1 = 0;
    let elemsInCart = document.getElementsByClassName("cartElement");
    for (let i = 0; i < elemsInCart.length; i++) {
        let element = elemsInCart[i].innerHTML;
        if (element.includes("US")) {
            element = element.slice(4);
            element = parseFloat(element);
        } else {
            element = element.slice(3);
            element = parseFloat(element);
            element = convertUYtoUSD(element);
        }
        subtotal1 += element;

    }
    document.getElementById("finalSubtotal").innerHTML = "USD " + subtotal1.toFixed(2);
    shippingCostAndTotal();

}

function convertUYtoUSD(price) {
    price = price / 40;
    return price;
}

function shippingCostAndTotal() {
    let subtotal = parseFloat(document.getElementById("finalSubtotal").innerHTML.slice(3));
    let cost;
    if (document.getElementById("standard").checked) {
        cost = subtotal * 0.05;
    } else if (document.getElementById("express").checked) {
        cost = subtotal * 0.07;
    } else {
        cost = subtotal * 0.15;
    }
    let total = cost + subtotal;
    document.getElementById("finalshippingCost").innerHTML = "USD " + cost.toFixed(2);
    document.getElementById("total").innerHTML = "USD " + total.toFixed(2);
}

document.getElementById("creditCardPaymentRadio").addEventListener("change", function () {
    document.getElementById("creditCardNumber").disabled = false;
    document.getElementById("creditCardSecurityCode").disabled = false;
    document.getElementById("dueDate").disabled = false;
    document.getElementById("bankAccountNumber").disabled = true;
    document.getElementById("paymentType").innerHTML = "Ha seleccionado tarjeta de crédito"
    document.getElementById("selectPaymentMethod").innerHTML = "Modificar";
})

document.getElementById("bankingRadio").addEventListener("change", function () {
    document.getElementById("creditCardNumber").disabled = true;
    document.getElementById("creditCardSecurityCode").disabled = true;
    document.getElementById("dueDate").disabled = true;
    document.getElementById("bankAccountNumber").disabled = false;
    document.getElementById("paymentType").innerHTML = "Ha seleccionado cuenta bancaria"
    document.getElementById("selectPaymentMethod").innerHTML = "Modificar";
})

function alertOfSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function checkPaymentMethod() {
    if (document.getElementById("paymentType").innerText.includes("No")) {
        document.getElementById("paymentTypeFeedback").classList.add("d-block");
    } else {
        document.getElementById("paymentTypeFeedback").classList.remove("d-block");
    }
}






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
    document.getElementById('remove_user').addEventListener("click", function () {
        let htmlContentToAppend = "";
        htmlContentToAppend = `
        <a class="nav-link" href="login.html">Ingresar</a>
        `
        document.getElementById("User_place").innerHTML = htmlContentToAppend;
        localStorage.removeItem("user");
        window.location = "index.html";
    })
}