
fetch(PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE)
.then(res => res.json())
.then(data =>{
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <div class="container" style="border-bottom-style:dotted; border-bottom-color:black;"><h3 style="padding:25px">${data.name}</h3></div>
    <div class="container" style="padding: 25px; border-bottom-style:dotted; border-bottom-color:black;">
        <button type="button" class="btn btn-success" style="float: right" onclick="addToCart(${data.id})" id="buy">Comprar</button>
        <strong>Precio</strong>
        <p>${data.currency} &nbsp ${data.cost}</p>
        <strong>Descripción</strong>
        <p>${data.description}</p>
        <strong>Categoria</strong>
        <p>${data.category}</p>
        <strong>Cantidad de Vendidos</strong>
        <p>${data.soldCount}</p>
        <strong>Imágenes ilustrativas</strong>
        <div id="images" class="container">
        <figure class="icon-cards">
        <div class="icon-cards__content" onclick="pause_start()" id="carrusel"> 
            <div class="icon-cards__item d-flex align-items-center justify-content-center"><span class="h1"><img src=${data.images[0]} style="width:460px"></span></div>
            <div class="icon-cards__item d-flex align-items-center justify-content-center"><span class="h1"><img src=${data.images[1]} style="width:460px"></span></div>
            <div class="icon-cards__item d-flex align-items-center justify-content-center"><span class="h1"><img src=${data.images[2]} style="width:460px"></span></div>
            <div class="icon-cards__item d-flex align-items-center justify-content-center"><span class="h1"><img src=${data.images[3]} style="width:460px"></span></div>
        </div>
        </figure>
    
        </div>
    </div>
    `
    document.getElementById('contenedor').innerHTML += htmlContentToAppend;
    for (let i=0; i<data.relatedProducts.length; i++){
        htmlContentToAppend = `
        <div class="relImg" style="margin-bottom: 50px">
            <img src=${data.relatedProducts[i].image} style="width:300px;" onclick="redirectFunction(${data.relatedProducts[i].id})"> <br><br>
            <p class="relName">${data.relatedProducts[i].name}</p>
        </div>
        `
        document.getElementById('relatedImg').innerHTML += htmlContentToAppend;
    }

})

function redirectFunction(id){
    localStorage.setItem("productID", id); 
    window.location = "product-info.html";
}

function pause_start(){
    let elemento = document.getElementById("carrusel");
    if (!elemento.classList.contains("paused")) elemento.className += " paused"
    else elemento.classList.remove("paused");
}


fetch(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE)
.then(resp => resp.json())
.then(data2 =>{
    let htmlContentToAppend2 = "";
    for (let i=0; i<data2.length ; i++){
        htmlContentToAppend2 = `
        <div class="text-bg-light p-3 border border-secondary" style="border-radius: 50px">
        <div id="score${i}" style="float:right ; margin-right:15px"></div>
        <p style="margin-left:20px"> <strong>${data2[i].user}</strong> dice: &nbsp</p>
        <div class="row" style="margin-left:20px">
          <div class="col"><p  style="font-family:sans; font-style:oblique; font-size:120%"> "${data2[i].description}"</p></div>
        </div>
        <div class="row">
            <div class="col">
                <p class="text-end text-muted" style="margin-right:15px">Publicado el ${data2[i].dateTime}</p>
            </div>
        </div>
        
        </div>
        <br>`
        document.getElementById('comments').innerHTML += htmlContentToAppend2;
        htmlContentToAppend2 = `<span class="fa fa-star checked blink"></span>`;
        for (let j=0; j<data2[i].score; j++){
            document.getElementById('score'+i).innerHTML += htmlContentToAppend2;
        }
        htmlContentToAppend2 = `<span class="fa fa-star blink"></span>`
        for (let k=data2[i].score; k<5; k++){
            document.getElementById('score'+i).innerHTML += htmlContentToAppend2;
        }
         
        

    }
    
})

document.getElementById("comment").addEventListener("click" , function(){
    const d = new Date();
    const year = d.getFullYear();
    const month =('0' + d.getMonth()).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hour = ('0' +d.getHours()).slice(-2);
    const min = ('0' + d.getMinutes()).slice(-2);
    const sec = ('0' + d.getSeconds()).slice(-2);
    
    let UserName = "Anónimo";
    if (localStorage.getItem("user")) UserName = localStorage.getItem("user");

    let htmlContentToAppend3 = `
        <div style="float:right ; margin-right:15px"></div>
        <div class="text-bg-light p-3 border border-secondary" style="border-radius: 50px">
            <div id="starComment" style="float:right ; margin-right:15px"></div>
            <p style="margin-left:20px"> <strong>${UserName}</strong> dice: &nbsp</p>
            <div class="row" style="margin-left:20px">
                <div class="col"><p  style="font-family:sans; font-style:oblique; font-size:120%"> "${document.getElementById("newComment").value}"</p></div>
            </div>
            <div class="row">
                <div class="col">
                <p class="text-end text-muted" style="margin-right:15px">Publicado el ${year}-${month}-${day} ${hour}:${min}:${sec}</p>
                </div>
            </div>
        </div>
        <br>`

    document.getElementById('comments').innerHTML += htmlContentToAppend3;
    document.getElementById("newComment").value = "";
    htmlContentToAppend3 = "";
    let score = document.getElementById("comment-score").value.length;
    for (let j=0; j<score; j++){
        htmlContentToAppend3 += `<span class="fa fa-star checked blink"></span>`
    }
    for (let k= score; k<5 ; k++){
        htmlContentToAppend3 += `<span class="fa fa-star blink"></span>`
    }
    document.getElementById("starComment").innerHTML = htmlContentToAppend3;

})


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

function addToCart(ID){
    let boton = document.getElementById("buy");
    localStorage.setItem("productToCart"+localStorage.length, ID);
    boton.setAttribute("disabled", "");
    boton.innerHTML = "Añadido al carrito"

}


