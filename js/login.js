document.getElementById("ingreso").addEventListener("click" , function(){
    let email = document.getElementById("user_email").value;
    let emailAnalizado = /^([^]+)@(\w+).(\w+)$/.exec(email);
    localStorage.setItem("user", emailAnalizado[1]);
    SubmitEvent();
})