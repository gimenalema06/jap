document.getElementById("ingreso").addEventListener("click" , function(){
    let email = document.getElementById("user_email").value;
    localStorage.setItem("email", email);
    let emailAnalizado = /^([^]+)@(\w+).(\w+)$/.exec(email);
    localStorage.setItem("user", emailAnalizado[1]);
    localStorage.setItem("userFirstName", "");
    localStorage.setItem("userFirstSurname", "");
    localStorage.setItem("userPhone", "");
    localStorage.setItem("userSecondName", "");
    localStorage.setItem("userSecondSurname", "");
    localStorage.setItem("userImage", "img/img_perfil.png");


    SubmitEvent();
})