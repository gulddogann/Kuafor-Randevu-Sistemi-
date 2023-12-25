document.addEventListener("DOMContentLoaded", function () {

    var onaylaButtons = document.querySelectorAll(".onayla-button");
    onaylaButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            onaylaRandevu(button);
        });
    });

    var iptalEtButtons = document.querySelectorAll(".iptal-et-button");
    iptalEtButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            onaylamayiIptalEt(button);
        });
    });

    var onaylananiIptalEtButtons = document.querySelectorAll(".onaylanani-iptal-et-button");
    onaylananiIptalEtButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            onaylananiIptalEt(button);
        });
    });

    var onaylananList = document.getElementById("onaylananRandevular");
    onaylananList.addEventListener("DOMNodeInserted", function () {
        kapatButonlari();
    });

    var onaylananContainer = document.getElementById("onaylananRandevular");
    onaylananContainer.addEventListener("DOMNodeRemoved", function () {
        gosterButonlari();
    });
});

function onaylaRandevu(button) {
    var listItem = button.closest("li");

    var onaylananList = document.getElementById("onaylananRandevular");
    onaylananList.appendChild(listItem);

    button.disabled = true;
    listItem.querySelector(".iptal-et-button").disabled = true;

    kapatButonlari();
}

function onaylamayiIptalEt(button) {
    var listItem = button.closest("li");

    var istekList = document.getElementById("randevuIstekleri");
    istekList.appendChild(listItem);

    button.disabled = true;
    listItem.querySelector(".onayla-button").disabled = true;

    kapatButonlari();
}

function onaylananiIptalEt(button) {
    var listItem = button.closest("li");

    var istekList = document.getElementById("randevuIstekleri");
    istekList.appendChild(listItem);

    button.disabled = true;
    listItem.querySelector(".onayla-button").disabled = true;

    kapatButonlari();
}

function kapatButonlari() {
    var onaylaButtons = document.querySelectorAll(".onayla-button");
    var iptalEtButtons = document.querySelectorAll(".iptal-et-button");
    var onaylananiIptalEtButtons = document.querySelectorAll(".onaylanani-iptal-et-button");

    onaylaButtons.forEach(function (button) {
        button.style.display = "none";
    });

    iptalEtButtons.forEach(function (button) {
        button.style.display = "none";
    });

    onaylananiIptalEtButtons.forEach(function (button) {
        button.style.display = "none";
    });
}

function gosterButonlari() {
    var onaylaButtons = document.querySelectorAll(".onayla-button");
    var iptalEtButtons = document.querySelectorAll(".iptal-et-button");
    var onaylananiIptalEtButtons = document.querySelectorAll(".onaylanani-iptal-et-button");

    onaylaButtons.forEach(function (button) {
        button.style.display = "inline-block";
    });

    iptalEtButtons.forEach(function (button) {
        button.style.display = "inline-block";
    });

    onaylananiIptalEtButtons.forEach(function (button) {
        button.style.display = "inline-block";
    });
}
