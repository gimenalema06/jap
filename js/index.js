document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});



if (localStorage.getItem("user")) {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <a class="nav-link" href="login.html">`+localStorage.getItem("user")+ `</a>
    `
    document.getElementById("User_place").innerHTML = htmlContentToAppend;
    localStorage.removeItem("user");
}
else {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <a class="nav-link" href="login.html">Ingresar</a>
    `
    document.getElementById("User_place").innerHTML = htmlContentToAppend;
}