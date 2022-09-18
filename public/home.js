'use strict'
window.addEventListener('load', () => {

    const modalErase = new bootstrap.Modal(document.querySelector('#modalErase'));
    const modalConfirm = new bootstrap.Modal(document.querySelector('#successModal'));
    const modalEdit = new bootstrap.Modal(document.querySelector('#modalEdit'));
    const serverErrorModal = new bootstrap.Modal(document.querySelector('#serverErrorModal'));

    const forms = document.querySelector('.needs-validation');

    document.querySelector('#logOut').addEventListener('click', (e) => {
        (e).preventDefault();
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "./logout");
        xhttp.onreadystatechange = function(){
            if(this.readyState !== 4) return;
            if(this.status === 200){
                window.open('/', '_self');
                return true
            }else{
                serverErrorModal.show()
            }
        };
        xhttp.send();
    });
    
    document.querySelector('#submitOperation').addEventListener('click', function(e) {
        const operationList = document.querySelector('#typeOfOperation');
        const selectedOperation = operationList.options[operationList.selectedIndex].value;
        const categoryList = document.querySelector('#categoryOperation');
        const seletedCategory = categoryList.options[categoryList.selectedIndex].value;
        const amount = document.querySelector('#amountOfOperation').value;
        const description = document.querySelector('#descriptionOfOperation').value;
        const date = document.querySelector('#dateOfOperation').value;
        const arrayOfValues = [seletedCategory,selectedOperation,amount,description,date]

        if(forms.checkValidity() === true){
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "./add-item");
        xhttp.onreadystatechange = function(){
            if(this.readyState !== 4) return;
            if(this.status === 200){
                const modalForm = new bootstrap.Modal(document.querySelector('#addItemModal'));
                const modalConfirm = new bootstrap.Modal(document.querySelector('#successModal'));
                modalForm.hide();
                modalConfirm.show();
                return true
            }else{
                serverErrorModal.show()
            }
        };
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`selectedOperation=${selectedOperation}&amount=${amount}&description=${description}&date=${date}`);
            }else{
                forms.classList.add('was-validated');
            }

    });

    document.querySelector('#closeSuccessModal').addEventListener('click', () => {
        document.location.reload() ;
    });

    document.querySelector('#earningsItems').addEventListener('click', function() {
        const balance = document.querySelector('#balance').innerText;
        window.open('../type/?type=ingreso&balance='+balance, '_self')
    });

    document.querySelector('#expenseItems').addEventListener('click', function() {
        const balance = document.querySelector('#balance').innerText;
        window.open('../type/?type=egreso&balance=' + balance, '_self')
    });


    document.querySelectorAll(".btn-outline-danger").forEach(function(ele){
        ele.addEventListener('click', (e) => {
            const id = ele.getAttribute('name', '')
            const idButtou = document.querySelector('#confirmErase').setAttribute('name', id);
            modalErase.show();
        });
    });

    document.querySelector('#confirmErase').addEventListener('click', (e) => {
        const id = e.target.getAttribute('name', '');
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", '/delete-item');
        xhttp.onreadystatechange = function(){
            if(this.readyState !== 4) {
                return;
            }
            if(this.status === 200){
                modalErase.hide();
                modalConfirm.show();
            }else{
                serverErrorModal.show()
            }
        }
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`id=${id}`);
    })

    document.querySelectorAll(".btn-outline-success").forEach(function(ele){
        ele.addEventListener('click', (e) => {
            const id = ele.getAttribute('name', '')
            const idButtou = document.querySelector('#confirmEdit').setAttribute('name', id);
            modalEdit.show();
        });
    });

    
    const alertPlaceholder = document.getElementById('alertDanger')
    const alertDiv = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div><strong>${message}</strong></div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('')
        alertPlaceholder.append(wrapper)
      }


    document.querySelector('#confirmEdit').addEventListener('click', (e) => {
        const id = e.target.getAttribute('name', '');
        const amount = document.querySelector('#amountOfOperationEdit').value;
        const description = document.querySelector('#descriptionOfOperationEdit').value;
        const date = document.querySelector('#dateOfOperationEdit').value;
        const stringValues = [amount, description, date];
        const xhttpSendValues = [] ;
        stringValues.forEach(function(ele, index){
            const names = ['amount', 'description', 'date'];
            if(ele === undefined || ele === '' || ele === null) return false
            xhttpSendValues.push(`${names[index]}=${ele}&`);
        });
        if(xhttpSendValues.length === 0){
            alertDiv('Error: Debe completar al menos una opción antes de continuar!', 'danger')
        }else{
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", '/update-item');
        xhttp.onreadystatechange = function(){
            if(this.readyState !== 4) {
                return;
            }
            if(this.status === 200){
                modalEdit.hide();
                modalConfirm.show();
            }else{
                serverErrorModal
            }
        }
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`id=${id}&${xhttpSendValues}`);
        }
    })

});