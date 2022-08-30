document.getElementById("ingreso").addEventListener("click" , function(){
    let email = document.getElementById("user_email").value;
    localStorage.setItem("user", email);
    SubmitEvent();
})