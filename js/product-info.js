
fetch(PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE)
.then(res => res.json())
.then(data =>{
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <div class="container" style="border-bottom-style:dotted; border-bottom-color:black;"><h3 style="padding:25px">${data.name}</h3></div>
    <div class="container" style="padding: 25px">
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
        <img src=${data.images[i]} style="width:200px; margin:5px; border-radius:10px;" >`
        document.getElementById('images').innerHTML += htmlContentToAppend;
    }
})



