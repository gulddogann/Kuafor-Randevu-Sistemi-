
document.addEventListener("DOMContentLoaded", function () {
    getCombinedData();
});

function getCombinedData() {

    if (!storedEmail) {
        console.error("Kullanıcı bilgisi bulunamadı.");
        return;
    }

    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(users => {
            var matchingUser = users.find(user => user.userEmail === storedEmail);

            if (matchingUser) {
                fetch('http://localhost:8080/api/randevular')
                    .then(response => response.json())
                    .then(data => {
                        var found = false;
                        data.forEach(randevu => {
                            if (matchingUser.userAd === randevu.randevuKuafor) {
                                found = true;
                                var randevuListesiDiv = document.getElementById('randevuListesi');
                                var randevuCard = createRandevuCard(randevu);
                                randevuListesiDiv.appendChild(randevuCard);
                            }
                        });
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

function createRandevuCard(randevu) {
    var card = document.createElement('div');
    card.classList.add('card', 'mb-3');
    card.style.maxWidth = '300px';
    card.style.margin = '0 auto';
    card.style.backgroundColor = '#532055';

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-left');

    var musteriAdHeader = document.createElement('h5');
    musteriAdHeader.classList.add('card-title');
    musteriAdHeader.textContent = 'Müşteri Adı: ' + randevu.randevuMusteriAd;

    var kuaforText = document.createElement('p');
    kuaforText.classList.add('card-text');
    kuaforText.textContent = 'Kuaför: ' + randevu.randevuKuafor;

    var hizmetText = document.createElement('p');
    hizmetText.classList.add('card-text');
    hizmetText.textContent = 'Hizmet: ' + randevu.randevuHizmet;

    var tarihText = document.createElement('p');
    tarihText.classList.add('card-text');
    tarihText.textContent = 'Tarih: ' + randevu.randevuTarih;

    var saatText = document.createElement('p');
    saatText.classList.add('card-text');
    saatText.textContent = 'Saat: ' + randevu.randevuSaat;

    var notText = document.createElement('p');
    notText.classList.add('card-text');
    notText.textContent = 'Not: ' + randevu.randevuNot;

    var deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Sil';
    deleteButton.addEventListener('click', function () {
        deleteRandevu(randevu.id);
    });

    cardBody.appendChild(musteriAdHeader);
    cardBody.appendChild(kuaforText);
    cardBody.appendChild(hizmetText);
    cardBody.appendChild(tarihText);
    cardBody.appendChild(saatText);
    cardBody.appendChild(notText);
    cardBody.appendChild(deleteButton);

    card.appendChild(cardBody);
    return card;
}

function deleteRandevu(randevuId) {
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