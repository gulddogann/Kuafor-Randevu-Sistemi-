//-------------------------------------------
//-- kuaforPanel.js
//-------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    getCombinedData();
});

function getCombinedData() {
    // storedEmail'ı al
    var storedEmail = getCookie('currentUserEmail');

    // Eğer storedEmail bilgisi yoksa işlemi sonlandır
    if (!storedEmail) {
        console.error("Kullanıcı bilgisi bulunamadı.");
        return;
    }

    // API'den kullanıcıları çek
    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(users => {
            var matchingUser = users.find(user => user.userEmail === storedEmail);

            if (matchingUser) {
                fetch('http://localhost:8080/api/randevular')
                    .then(response => response.json())
                    .then(data => {
                        var found = false;

                        // Her bir randevuyu kontrol et
                        data.forEach(randevu => {
                            // Eğer eşleşen kullanıcı ve randevuKuafor değerleri aynıysa "Bulundu" yazdır
                            if (matchingUser.userAd === randevu.randevuKuafor) {
                                found = true;
                                // "Bulundu" koşulu sağlandığında randevuyu sayfaya yazdır
                                var randevuListesiDiv = document.getElementById('randevuListesi');
                                var randevuCard = createRandevuCard(randevu);
                                randevuListesiDiv.appendChild(randevuCard);
                            }
                        });

                        // Eğer hiç "Bulundu" koşulu sağlanmazsa "Randevunuz Yok" alert'i göster
                        if (!found) {
                            alert("Randevunuz Yok");
                        }
                    })
                    .catch(error => console.error("Randevu Getirme Hatası:", error));
            } else {
                console.log("Eşleşen kullanıcı bulunamadı.");
            }
        })
        .catch(error => console.error("Kullanıcı Getirme Hatası:", error));
}


// Sayfaya randevu kartı eklemek için kullanılan fonksiyon
function createRandevuCard(randevu) {
    var card = document.createElement('div');
    card.classList.add('card', 'mb-3');
    card.style.maxWidth = '300px'; // Kartın maksimum genişliğini ayarla
    card.style.margin = '0 auto'; // Kartı ortala

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center');

    var emailHeader = document.createElement('h5');
    emailHeader.classList.add('card-title');
    emailHeader.textContent = randevu.randevuEmail;

    var kuaforText = document.createElement('p');
    kuaforText.classList.add('card-text');
    kuaforText.textContent = 'Kuaför: ' + randevu.randevuKuafor;

    var hizmetText = document.createElement('p');
    hizmetText.classList.add('card-text');
    hizmetText.textContent = 'Hizmet: ' + randevu.randevuHizmet;

    var notText = document.createElement('p');
    notText.classList.add('card-text');
    notText.textContent = 'Not: ' + randevu.randevuNot;

    var deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Sil';
    deleteButton.addEventListener('click', function () {
        // Sil butonuna basıldığında silme işlemini gerçekleştir
        deleteRandevu(randevu.id);
    });

    cardBody.appendChild(emailHeader);
    cardBody.appendChild(kuaforText);
    cardBody.appendChild(hizmetText);
    cardBody.appendChild(notText);
    cardBody.appendChild(deleteButton);

    card.appendChild(cardBody);

    return card;
}


// Randevu silme fonksiyonu
function deleteRandevu(randevuId) {
    // Silme isteği için fetch kullanarak API'ye isteği gönder
    fetch(`http://localhost:8080/api/randevular/${randevuId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                alert("Randevu silme işlemi başarılı");
                location.reload();
            } else {
                alert("Randevu silme işlemi başarısız.");
            }
        })
        .catch(error => console.error("Randevu silme hatası:", error));
}


