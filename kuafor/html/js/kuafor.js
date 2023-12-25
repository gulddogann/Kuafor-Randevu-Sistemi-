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
    var observerInserted = new MutationObserver(function () {
        kapatButonlari();
    });
    observerInserted.observe(onaylananList, { childList: true });

    var onaylananContainer = document.getElementById("onaylananRandevular");
    var observerRemoved = new MutationObserver(function () {
        gosterButonlari();
    });
    observerRemoved.observe(onaylananContainer, { childList: true });
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
document.addEventListener("DOMContentLoaded", function () {
    var calismaSaatleriForm = document.getElementById('calismaSaatleriForm');
    var kaydedilenCalismaSaatleri = document.getElementById('kaydedilenCalismaSaatleri');

    calismaSaatleriForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var calismaGunleri = document.getElementById('calismaGunleri').value;
        var baslangicSaat = document.getElementById('baslangicSaat').value;
        var bitisSaat = document.getElementById('bitisSaat').value;

        var newRow = kaydedilenCalismaSaatleri.insertRow();

        var cellGunleri = newRow.insertCell(0);
        var cellBaslangicSaat = newRow.insertCell(1);
        var cellBitisSaat = newRow.insertCell(2);

        cellGunleri.textContent = calismaGunleri;
        cellBaslangicSaat.textContent = baslangicSaat;
        cellBitisSaat.textContent = bitisSaat;

        calismaSaatleriForm.reset();
    });
});

