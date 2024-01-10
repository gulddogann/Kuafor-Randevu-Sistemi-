//-------------------------------------------
//-- uyeOl.js
//-------------------------------------------


function tumKullanicilariGetir() {
    fetch('http://localhost:8080/api/users')  // Kullanıcıları çeken endpoint'i kullanın
        .then(response => {
            if (!response.ok) {
                throw new Error('Kullanıcı listesi bulunamadı');
            }
            return response.json();
        })
        .then(data => {
            // Tüm kullanıcıları console'a yazdır
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

    // Burada alınan bilgileri SignupController'a POST isteği ile gönderebilirsiniz
    // Örneğin, XMLHttpRequest veya fetch API kullanarak

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
            console.log("Üye Olma İşlemi Başarılı:");
            console.log("Ad: " + ad);
            console.log("Soyad: " + soyad);
            console.log("E-posta: " + email);
            console.log("Şifre: " + sifre);

            // İsterseniz burada başka bir sayfaya yönlendirme yapabilirsiniz
            // window.location.href = "giris.html";
        } else {
            console.error("Üye Olma İşlemi Başarısız:", response.status);
            return response.text().then(errorMsg => console.error("Hata Mesajı:", errorMsg));
        }
    })
    .catch(error => console.error("Bir hata oluştu:", error));
}
