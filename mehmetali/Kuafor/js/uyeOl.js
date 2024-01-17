//-------------------------------------------
//-- uyeOl.js
//-------------------------------------------


function tumKullanicilariGetir() {
    fetch('http://localhost:8080/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Kullanıcı listesi bulunamadı');
            }
            return response.json();
        })
        .then(data => {
            console.log('Başarıyla kaydedilen kullanıcılar:');
            console.log(data);
        })
        .catch(error => {
            console.error('Veri çekme hatası:', error.message);
        });
}

function uyeOl() {
    var ad = document.getElementById('adInput').value;
    var soyad = document.getElementById('soyadInput').value;
    var email = document.getElementById('emailInput').value;
    var sifre = document.getElementById('sifreInput').value;

    var userData = {
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
                window.location.href = "home.html";
            } else {
                console.error("Üye Olma İşlemi Başarısız:", response.status);
                return response.text().then(errorMsg => console.error("Hata Mesajı:", errorMsg));
            }
        })
        .catch(error => console.error("Bir hata oluştu:", error));
}
