    
function ValidateForEmpty(id,errorid,errormsg){
    var refToControl = document.getElementById(id);
    var refToErrorControl = document.getElementById(errorid);

    if(refToControl.value ==""){
        refToErrorControl.innerText = errormsg;
    }
    else{
        refToErrorControl.innerText = "";
        console.log(refToControl.value);
    }
}

function ValidateForPayment(inputName,errorid,erromsg){
    var refToControl = document.getElementsByName(inputName);
    var refToErrorControl = document.getElementById(errorid);

    var selectGender = false;

    for(var i=0;i<refToControl.length;i++){
        if(refToControl[i].checked){
            selectGender = true;
            break;
        }
    }

    if(!selectGender){
        refToErrorControl.innerText = erromsg;
    }
    else{
        refToErrorControl.innerText = "";
    }
}

function InnerTextEmpty(){

}