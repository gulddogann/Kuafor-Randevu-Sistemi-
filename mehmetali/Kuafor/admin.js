//-------------------------------------------
//-- admin.js
//-------------------------------------------

// Sayfa yüklendiğinde çalışacak olan fonksiyon
document.addEventListener("DOMContentLoaded", function () {

    getAllHizmetler();

    // http://localhost:8080/api/users adresinden veri çekme işlemi
    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(data => {
            // Sadece isKuafor değeri true olanları filtrele
            const filteredData = data.filter(user => user.isKuafor);

            // Tabloyu doldurma işlemi
            const tabloIcerik = document.getElementById('tabloIcerik');
            filteredData.forEach(user => {
                const newRow = tabloIcerik.insertRow();

                // ID
                newRow.insertCell().appendChild(document.createTextNode(user.id));

                // isKuafor
                newRow.insertCell().appendChild(document.createTextNode(user.isKuafor));

                // Ad
                newRow.insertCell().appendChild(document.createTextNode(user.userAd));

                // Soyad
                newRow.insertCell().appendChild(document.createTextNode(user.userSoyad));

                // Email
                newRow.insertCell().appendChild(document.createTextNode(user.userEmail));

                // Şifre
                newRow.insertCell().appendChild(document.createTextNode(user.userPassword));

                // Düzenleme butonu ekle
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

// Düzenleme formunu gösterme fonksiyonu
function duzenlemeFormunuGoster(user) {
    // Düzenleme formunu gösteren div
    const duzenlePanel = document.getElementById('duzenlePanel');

    // Düzenleme formunu doldur
    document.getElementById('isKuaforInput').checked = user.isKuafor;
    document.getElementById('adInput').value = user.userAd;
    document.getElementById('soyadInput').value = user.userSoyad;
    document.getElementById('emailInput').value = user.userEmail;
    document.getElementById('sifreInput').value = user.userPassword;

    // ID gösterme bölümünü doldur
    const idGoster = document.getElementById('idGoster');
    idGoster.textContent = "ID: " + user.id;

    // Silme butonunu göster
    document.querySelector('.silButton').style.display = 'inline-block';

    // Başlık yazısını "Kuaför Düzenle" olarak değiştir
    document.getElementById('duzenlePanel').getElementsByTagName('h3')[0].textContent = 'Kuaför Düzenle';

    // Düzenleme fonksiyonunu çağırıldığında mevcut kullanıcıyı güncelleyecek
    document.getElementById('duzenleKaydet').onclick = function () {
        duzenleKuafor(user.id);
    };

    // Düzenleme formunu görünür yap
    duzenlePanel.style.display = 'block';
}


// Düzenleme işlemini gerçekleştiren fonksiyon
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
            console.log("Kuafor düzenleme işlemi başarılı:");
            console.log("isKuafor değeri: " + isKuafor);
            console.log("Ad: " + ad);
            console.log("Soyad: " + soyad);
            console.log("E-posta: " + email);
            console.log("Şifre: " + sifre);
            
            alert("Basariyla Kaydedildi");
            location.reload();

        } else {
            console.error("Düzenleme işlemi başarısız:", response.status);
            return response.text().then(errorMsg => console.error("Hata Mesajı:", errorMsg));
        }
    })
    .catch(error => console.error("Bir hata oluştu:", error));
}


// admin.js

// ... Diğer kodlar ...

// Silme fonksiyonunu çağırma fonksiyonu
function silKuafor() {

    const userEmailElement = document.getElementById('emailInput');
    const UserEmail = userEmailElement.value; // Bu satırda 'userEmail' değerini doğru bir şekilde alıyor olmalısınız

    // Kullanıcıya onay mesajı göster
    var onay = confirm("Kuaförü silmek istediğinizden emin misiniz?");
    if (onay) {
        // Silme endpoint'ine istek gönderme
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




// Tüm hizmetleri getirme fonksiyonu
function getAllHizmetler() {
    fetch('http://localhost:8080/api/hizmetler')
        .then(response => response.json())
        .then(data => {
            console.log("Tüm Hizmetler:", data);
        })
        .catch(error => console.error("Hata:", error));
}

// JavaScript
function updateIsKuafor() {
    // Kullanıcının girdiği email bilgisini al
    var userEmail = document.getElementById('emailInputGuncelle').value;

    // API'ye istek gönder
    fetch(`http://localhost:8080/api/users/duzenle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userEmail: userEmail,
            isKuafor: true,
            isMusteri: false
        })
    })
    .then(response => {
        if (response.ok) {
            console.log("Kuafor düzenleme işlemi başarılı");
            alert("Kuafor düzenleme işlemi başarılı");
            location.reload(); // Sayfayı yenile
        } else {
            console.error("Düzenleme işlemi başarısız:", response.status);
            return response.text().then(errorMsg => console.error("Hata Mesajı:", errorMsg));
        }
    })
    .catch(error => console.error("Bir hata oluştu:", error));
}



















// Düzenleme panelini temizleme fonksiyonu
function temizleDuzenlemePaneli() {
    document.getElementById('isKuaforInput').checked = false; // varsayılan değer
    document.getElementById('adInput').value = '';
    document.getElementById('soyadInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('sifreInput').value = '';
}

// Yeni kuafor ekleme panelini açma fonksiyonu
function yeniKuaforEkleUI() {
    // Kullanıcıya onay mesajı göster
    var onay = confirm("Yeni kuafor eklemek istediğinizden emin misiniz?");
    if (onay) {
        // Ekleme panelini görünür yap
        var eklePanel = document.getElementById('duzenlePanel');
        eklePanel.style.display = 'block';

        // Silme butonunu gizle
        document.querySelector('.silButton').style.display = 'none';

        // Input alanlarını temizle
        temizleDuzenlemePaneli();

        // ID gösterme bölümünü temizle
        var idGoster = document.getElementById('idGoster');
        idGoster.textContent = '';

        // Başlık yazısını "Kuaför Ekle" olarak değiştir
        document.getElementById('duzenlePanel').getElementsByTagName('h3')[0].textContent = 'Kuaför Ekle';

        // Temizleme fonksiyonu çağırıldığında yeni kuafor eklemeyi yapacak
        document.getElementById('duzenleKaydet').onclick = function () {
            yeniKuaforEkle();
        };
    }
}   

// Yeni kuafor ekleme fonksiyonu
function yeniKuaforEkle() {
    var isKuafor = document.getElementById('isKuaforInput').checked;
    var ad = document.getElementById('adInput').value;
    var soyad = document.getElementById('soyadInput').value;
    var email = document.getElementById('emailInput').value;
    var sifre = document.getElementById('sifreInput').value;

    // Burada alınan bilgileri SignupController'a POST isteği ile gönderebilirsiniz
    // Örneğin, XMLHttpRequest veya fetch API kullanarak

    var userData = {
        isKuafor : isKuafor,
        userAd: ad,
        userSoyad: soyad,
        userEmail: email,
        userPassword: sifre
    };

    fetch('http://localhost:8080/api/signup/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            console.log("Üye Olma İşlemi Başarılı:");
            console.log("isKuafor değeri: " + isKuafor);
            console.log("Ad: " + ad);
            console.log("Soyad: " + soyad);
            console.log("E-posta: " + email);
            console.log("Şifre: " + sifre);

            alert("İşlem Başarılı!")
            window.location.href = "admin.html";
        } else {
            console.error("Üye Olma İşlemi Başarısız:", response.status);
            return response.text().then(errorMsg => console.error("Hata Mesajı:", errorMsg));
        }
    })
    .catch(error => console.error("Bir hata oluştu:", error));
}










