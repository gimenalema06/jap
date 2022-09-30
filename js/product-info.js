
fetch(PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE)
.then(res => res.json())
.then(data =>{
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <div class="container" style="border-bottom-style:dotted; border-bottom-color:black;"><h3 style="padding:25px">${data.name}</h3></div>
    <div class="container" style="padding: 25px; border-bottom-style:dotted; border-bottom-color:black;">
        <strong>Precio</strong>
        <p>${data.currency} &nbsp ${data.cost}</p>
        <strong>Descripción</strong>
        <p>${data.description}</p>
        <strong>Categoria</strong>
        <p>${data.category}</p>
        <strong>Cantidad de Vendidos</strong>
        <p>${data.soldCount}</p>
        <strong>Imágenes ilustrativas</strong>
        <div id="images"></div>
    </div>
    `
    document.getElementById('contenedor').innerHTML += htmlContentToAppend;
    for (let i=0; i<data.images.length; i++){
        htmlContentToAppend = `
        <img src=${data.images[i]} style="width:300px" class="zoom">`
        document.getElementById('images').innerHTML += htmlContentToAppend;
    }
    for (let i=0; i<data.relatedProducts.length; i++){
        htmlContentToAppend = `
        <div class="relImg">
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



