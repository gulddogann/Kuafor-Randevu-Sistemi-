document.addEventListener("DOMContentLoaded", function () {

    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(user => user.isKuafor);
            const tabloIcerik = document.getElementById('tabloIcerik');
            filteredData.forEach(user => {
                const newRow = tabloIcerik.insertRow();
                newRow.insertCell().appendChild(document.createTextNode(user.id));
                newRow.insertCell().appendChild(document.createTextNode(user.isKuafor));
                newRow.insertCell().appendChild(document.createTextNode(user.userAd));
                newRow.insertCell().appendChild(document.createTextNode(user.userSoyad));
                newRow.insertCell().appendChild(document.createTextNode(user.userEmail));
                newRow.insertCell().appendChild(document.createTextNode(user.userPassword));
                const editButton = document.createElement("button");
                editButton.textContent = "Düzenle";
                editButton.onclick = function () {
                    duzenlemeFormunuGoster(user);
                };
                newRow.insertCell().appendChild(editButton);
            });
        })
        .catch(error => console.error("Veri çekme hatası:", error));
});


function duzenlemeFormunuGoster(user) {
    const duzenlePanel = document.getElementById('duzenlePanel');

    document.getElementById('isKuaforInput').checked = user.isKuafor;
    const isKuaforInput = document.getElementById('isKuaforInput');
    isKuaforInput.checked = user.isKuafor;
    isKuaforInput.disabled = true;

    document.getElementById('adInput').value = user.userAd;
    document.getElementById('soyadInput').value = user.userSoyad;
    document.getElementById('emailInput').value = user.userEmail;
    document.getElementById('sifreInput').value = user.userPassword;
    const idGoster = document.getElementById('idGoster');
    idGoster.textContent = "ID: " + user.id;

    document.querySelector('.silButton').style.display = 'inline-block';
    document.getElementById('duzenlePanel').getElementsByTagName('h3')[0].textContent = 'Kuaför Düzenle';
    document.getElementById('duzenleKaydet').onclick = function () {
        duzenleKuafor(user.id);
    };
    duzenlePanel.style.display = 'block';
}


function duzenleKuafor(userEmail) {
    const isKuafor = document.getElementById('isKuaforInput').checked;
    const ad = document.getElementById('adInput').value;
    const soyad = document.getElementById('soyadInput').value;
    const email = document.getElementById('emailInput').value;
    const sifre = document.getElementById('sifreInput').value;

    const updatedUserData = {
        userEmail: userEmail,
        isKuafor: isKuafor,
        userAd: ad,
        userSoyad: soyad,
        userEmail: email,
        userPassword: sifre
    };

    fetch(`http://localhost:8080/api/users/duzenle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUserData)
    })
        .then(response => {
            if (response.ok) {
                alert("Basariyla Kaydedildi");
                location.reload();

            } else {
                console.error("Düzenleme işlemi başarısız:", response.status);
                return response.text().then(errorMsg => console.error("Hata Mesajı:", errorMsg));
            }
        })
        .catch(error => console.error("Bir hata oluştu:", error));
}

function silKuafor() {
    const userEmailElement = document.getElementById('emailInput');
    const UserEmail = userEmailElement.value;

    var onay = confirm("Kuaförü silmek istediğinizden emin misiniz?");
    if (onay) {
        fetch('http://localhost:8080/api/users/sil?userEmail=' + UserEmail, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    alert("Kuaför Silme İşlemi Başarılı");
                    window.location.reload();
                } else {
                    console.error("Kuaför Silme İşlemi Başarısız:", response.status);
                    return response.text().then(errorMsg => console.error("Hata Mesajı:", errorMsg));
                }
            })
            .catch(error => console.error("Bir hata oluştu:", error));
    }
}

function updateIsKuafor() {
    var userEmail = document.getElementById('emailInputGuncelle').value;

    fetch(`http://localhost:8080/api/users/duzenle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userEmail: userEmail
        })
    })
        .then(response => {
            if (response.ok) {
                console.log("Kuafor düzenleme işlemi başarılı");
                alert("Kuafor düzenleme işlemi başarılı");
                location.reload();
            } else {
                console.error("Düzenleme işlemi başarısız:", response.status);
                return response.text().then(errorMsg => console.error("Hata Mesajı:", errorMsg));
            }
        })
        .catch(error => console.error("Bir hata oluştu:", error));
}