'use strict';
window.addEventListener('load', () => {


const serverErrorModal = new bootstrap.Modal(document.querySelector('#serverErrorModal'));

function main (email, password){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/login");
    xhttp.onreadystatechange = function(){
        if(this.readyState !== 4) return;
        if(this.status === 200){
            window.open('/home', '_self');
        
        }else if(this.status === 403){
            document.querySelector('#errorMessage').innerHTML = 'Error de autenticación: nombre de usuario y/o contraseña incorrecta'
            serverErrorModal.show()
        }else{
            serverErrorModal.show()
        }
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`email=${email}&password=${password}`);
};

    const forms = document.querySelector('.needs-validation');
    document.querySelector('#submitLogin').addEventListener('click',function(e) {
        e.preventDefault();
        if(forms.checkValidity() === true){
            const email = document.querySelector('#emailInput').value;
            const password = document.querySelector('#passwordInput').value;
            main(email, password);
        }else{
            document.querySelector('#validate-form').classList.add('was-validated');
        }

    })


});