//-------------------------------------------
//-- home.js
//-------------------------------------------

var storedUserType = localStorage.getItem("storedUserType");

function adminButtonControl(){
    if (storedUserType === 'Admin'){
        window.location.href = 'admin.html';
    }else{
        alert("Admin değilsiniz.");
    }
}
function kuaforButtonControl(){
    if (storedUserType === 'Admin' || storedUserType === 'Kuafor'){
        window.location.href = 'kuaforPanel.html';
    }else{
        alert("Yetkili değilsiniz.")
    }
}
function musteriButtonControl(){
    if (storedUserType === null || storedUserType === undefined){
        alert("Önce üye olmalısınız.")
    }else if (storedUserType === 'Kuafor'){
        alert("Kuaförsünüz, randevu alamazsınız.")
    }else{
        window.location.href = 'randevuAl.html';
    }
}