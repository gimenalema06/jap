let firstName = document.getElementById("primerNombre");
let firstSurname = document.getElementById("primerApellido");
let phone = document.getElementById("telefono");
let secondName = document.getElementById("segundoNombre");
let secondSurname = document.getElementById("segundoApellido");


firstName.value = localStorage.getItem("userFirstName");
firstSurname.value = localStorage.getItem("userFirstSurname"); 
phone.value = localStorage.getItem("userPhone");
secondName.value = localStorage.getItem("userSecondName");  
secondSurname.value = localStorage.getItem("userSecondSurname"); 

let userImg= localStorage.getItem("userImage");
document.getElementById("image").src = userImg;

let email = localStorage.getItem("email");
document.getElementById("email").value = email;


function validations(){
    let verification = false;
    if (firstName.value == ""){
        firstName.classList.add('is-invalid');
        verification = true;
    } else {
        firstName.classList.remove('is-invalid');
    }
    if (firstSurname.value == ""){
        firstSurname.classList.add('is-invalid');
        verification = true;
    } else {
        firstSurname.classList.remove('is-invalid');
    }
    if (phone.value == ""){
        phone.classList.add('is-invalid');
        verification = true;
    } else {
        phone.classList.remove('is-invalid');
    }

    if (!verification){
        localStorage.setItem("userFirstName", firstName.value);
        localStorage.setItem("userFirstSurname", firstSurname.value);
        localStorage.setItem("userPhone", phone.value);
        localStorage.setItem("userSecondName", secondName.value);
        localStorage.setItem("userSecondSurname", secondSurname.value);
        localStorage.setItem("userImage", userImg);
    }
}
document.getElementById("profile-form").addEventListener("submit", e=>{
    e.preventDefault();
    e.stopPropagation();
    validations();

})

//desafiate
function encodeImageFileAsURL() {

    let filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
      let fileToLoad = filesSelected[0];

      let fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        let srcData = fileLoadedEvent.target.result; // <--- data: base64

        let newImage = document.getElementById("image");
        newImage.src = srcData;
        userImg = srcData;
        document.getElementById("image").innerHTML = newImage.outerHTML;
      }
      fileReader.readAsDataURL(fileToLoad);
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
    document.getElementById('remove_user').addEventListener("click", function(){
        let htmlContentToAppend = "";
        htmlContentToAppend = `
        <a class="nav-link" href="login.html">Ingresar</a>
        `
        document.getElementById("User_place").innerHTML = htmlContentToAppend;
        localStorage.removeItem("user"); 
        window.location = "index.html";
    })
}