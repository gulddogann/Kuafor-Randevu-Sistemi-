//-------------------------------------------
//-- girisYap.js
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



function updateUserType(userEmail) {
    // Kullanıcı türünü almak için istek gönder
    fetch(`http://localhost:8080/api/users/userType?userEmail=${encodeURIComponent(userEmail)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Kullanıcı türü belirlenemiyor');
            }
            return response.text();
        })
        .then(userType => {
            console.log(userType);

            // Kullanıcı türünü ekrana yazdır
            var userTypeDiv = document.getElementById('userType');
            userTypeDiv.textContent = userType;

            // Kullanıcı türünü bir cookie'e kaydet
            document.cookie = `currentUserType=${userType}; expires=Sat, 31 Dec 9999 23:59:59 GMT`;

        })
        .catch(error => {
            console.error('Kullanıcı türü belirlenemiyor:', error);
        });
}





function kontrolEt() {
    var emailGirildi = document.getElementById('emailText');
    var currentEmail = emailGirildi.textContent;

    if (currentEmail) {
        // Eğer zaten bir email varsa uyarı ver ve işlemi durdur
        alert('Zaten bir kullanıcı girişi yapılmış.');
        return;
    }

    var userEmail = document.getElementById('emailInput').value;
    var userPassword = document.getElementById('passwordInput').value;

    var formData = new FormData();
    formData.append('userEmail', userEmail);
    formData.append('userPassword', userPassword);

    fetch('http://localhost:8080/api/login/login', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // JSON olmayan bir şekilde direk metni al
        } else {
            return response.text().then(err => Promise.reject(err));
        }
    })
    .then(data => {
        console.log(data);
        // Giriş başarılı mesajını göster veya yönlendirme yapabilirsiniz
        alert('Giriş başarılı!');
        
        // Cookie'e email bilgisini kaydet
        document.cookie = `currentUserEmail=${userEmail}; expires=Sat, 31 Dec 9999 23:59:59 GMT`;

        var emailGirildi = document.getElementById('emailText');
        emailGirildi.textContent = userEmail;

        updateUserType(userEmail);


    })
    .catch(error => {
        console.error('Giriş hatası:', error);
        // Hata mesajını göster
        alert('Kullanıcı adı veya şifre hatalı!');
    });
}   


function ekleYeniButon() {
    var userTypeDiv = document.getElementById('userType');

    if (userTypeDiv.textContent === "Kuafor") {
        console.log("1")
        denemeButton.innerHTML = 'Kuafor';
    } else if (userTypeDiv.textContent === "Musteri") {
        console.log("2")
        denemeButton.innerHTML = 'Musteri';
    } else {
        console.log("3")
        denemeButton.innerHTML = 'Ziyaretci';
    }
}



















function cikisYap() {
    // Cookie'den email bilgisini al
    var userEmail = getCookie('currentUserEmail');

    // Çıkış yapma isteğini gönder
    fetch(`http://localhost:8080/api/login/logout?userEmail=${encodeURIComponent(userEmail)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            console.log(userEmail);
            // Cookie'den email bilgisini sil
            document.cookie = 'currentUserEmail=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            document.cookie = 'currentUserType=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            location.reload(true);
        } else {
            // Çıkış başarısız ise hata mesajını console'a yazdır
            console.error('Çıkış yapılamadı');
            alert('Çıkış yapılamadı');
        }
    })
    .catch(error => {
        console.error('Çıkış yapılamadı', error);
        alert('Çıkış yapılamadı');
    });
}