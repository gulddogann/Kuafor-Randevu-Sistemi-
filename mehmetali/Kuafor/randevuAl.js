//-------------------------------------------
//-- randevuAl.js
//-------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    // Sayfa yüklendiğinde çalışacak olan fonksiyon
    getAllHizmetler(); // Tüm hizmetleri getir

    // Email adresini otomatik olarak getir ve kutucuğa yerleştir
    var storedEmail = getCookie('currentUserEmail');
    if (storedEmail) {
        // Daha önce giriş yapmış bir kullanıcı var
        var emailInput = document.getElementById('email');
        emailInput.value = storedEmail;
        emailInput.readOnly = true; // Email kutucuğunu tıklanamaz hale getir
    }
});

// Tüm hizmetleri getirme fonksiyonu
function getAllHizmetler() {
    var servicesSelect = document.getElementById('services');
    var kuaforSelect = document.getElementById('kuaforSecimi');

    // Hizmetleri combobox'a ekle
    fetch('http://localhost:8080/api/hizmetler')
        .then(response => response.json())
        .then(data => {
            console.log("Tüm Hizmetler:", data);

            data.forEach(hizmet => {
                var option = document.createElement("option");
                option.value = hizmet.hizmetAd;
                option.text = hizmet.hizmetAd;
                servicesSelect.add(option);
            });
        })
        .catch(error => console.error("Hizmet Getirme Hatası:", error));

    // Kuaförleri combobox'a ekle
    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(data => {
            // Sadece isKuafor değeri true olanları filtrele
            const kuaforlar = data.filter(user => user.isKuafor);

            kuaforlar.forEach(kuafor => {
                var option = document.createElement("option");
                option.value = kuafor.userAd;
                option.text = kuafor.userAd;
                kuaforSelect.add(option);
            });
        })
        .catch(error => console.error("Kuaför Getirme Hatası:", error));
}




function kaydet() {
    var email = document.getElementById('email').value;
    var service = document.getElementById('services').value;
    var kuaforSecimi = document.getElementById('kuaforSecimi').value;
    var tarih = document.getElementById('tarih').value;
    var saat = document.getElementById('saat').value;
    var not = document.getElementById('not').value;

    if (service === "--Seçiniz--" || kuaforSecimi === "--Seçiniz--") {
        alert("Lütfen bir hizmet ve kuaför seçiniz.");
        return;
    }

    // Kullanıcı listesini çek
    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(userList => {
            // Kullanıcı listesinde döngü yap
            for (const user of userList) {
                // E-posta adresini kontrol et
                if (user.userEmail === email) {
                    // Kullanıcının adını al
                    var userAd = user.userAd;

                    // Randevu bilgilerini içeren bir JSON objesi oluştur
                    var randevuData = {
                        randevuEmail: email,
                        randevuMusteriAd: userAd, // Kullanıcının adını ekle
                        randevuKuafor: kuaforSecimi,
                        randevuHizmet: service,
                        randevuTarih: tarih,
                        randevuSaat: saat,
                        randevuNot: not
                    };

                    // HTTP POST isteği gönder
                    fetch('http://localhost:8080/api/randevular', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(randevuData)
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert('Randevu başarıyla kaydedildi!');
                            document.getElementById('savedEmail').innerText = data.randevuEmail;
                            document.getElementById('savedService').innerText = data.randevuHizmet;
                            document.getElementById('savedKuafor').innerText = data.randevuKuafor;
                            document.getElementById('savedTarih').innerText = data.randevuTarih;
                            document.getElementById('savedSaat').innerText = data.randevuSaat;
                            document.getElementById('savedNot').innerText = data.randevuNot;
                            getAllRandevular();
                        })
                        .catch(error => {
                            console.error('Randevu kaydetme hatası:', error);
                            alert('Randevu kaydedilemedi. Lütfen tekrar deneyin.');
                        });

                    // Eğer eşleşme bulunduysa döngüyü sonlandır
                    break;
                }
            }
        })
        .catch(error => console.error('Kullanıcı listesi çekme hatası:', error));
}



// Tüm randevuları getirme fonksiyonu
function getAllRandevular() {
    // Detayları içeren div varsa sil
    var existingDetailsDiv = document.getElementById('detailsDiv');
    if (existingDetailsDiv) {
        existingDetailsDiv.remove();
    }

    fetch('http://localhost:8080/api/randevular')
        .then(response => response.json())
        .then(data => {
            // Gelen verileri kullanarak tabloyu doldur
            var tableBody = document.getElementById('randevuTableBody');
            tableBody.innerHTML = ''; // Tabloyu temizle

            // Her bir randevunun özelliklerini tabloya ekle
            data.forEach(randevu => {
                var row = tableBody.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3); // Yeni hücre

                // Detayları Göster butonu oluştur
                var detailsButton = createButton('Detayları Göster', '#4CAF50', function () {
                    showDetails(randevu);
                });

                // Düzenle butonu oluştur
                var editButton = createButton('Düzenle', '#4285F4', function () {
                    editRandevu(randevu.id);
                });

                // Sil butonu oluştur
                var deleteButton = createButton('Sil', '#f44336', function () {
                    deleteRandevu(randevu.id);
                });

                cell1.appendChild(detailsButton);
                cell2.appendChild(editButton); // Düzenle butonunu hücreye ekle
                cell2.appendChild(deleteButton);
                cell3.innerText = randevu.randevuEmail;
                cell4.innerText = randevu.randevuKuafor;
            });
        })
        .catch(error => console.error("Tüm Randevuları Getirme Hatası:", error));
}

// Genel buton oluşturma fonksiyonu
function createButton(text, color, clickHandler) {
    var button = document.createElement('button');
    button.innerText = text;
    button.style.backgroundColor = color;
    button.style.color = 'white';
    button.style.padding = '6px 12px';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.transition = 'background-color 0.3s, transform 0.2s';

    // Hover durumunda renk değişimi ve butonun büyüklüğünü artırma
    button.addEventListener('mouseover', function() {
        button.style.backgroundColor = lightenColor(color, 20);
        button.style.transform = 'scale(1.05)';
    });

    // Normal duruma geri dönme
    button.addEventListener('mouseout', function() {
        button.style.backgroundColor = color;
        button.style.transform = 'scale(1)';
    });

    // Tıklandığında belirtilen işlevi çağırma
    button.onclick = clickHandler;

    return button;
}

// Renk tonunu açma (lighten) işlevi
function lightenColor(color, percent) {
    var num = parseInt(color.replace("#", ""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;

    return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
}

// Detayları gösterme fonksiyonu
function showDetails(randevu) {
    // Detayları gösteren elementleri bul
    var savedEmailElement = document.getElementById('savedEmail');
    var savedServiceElement = document.getElementById('savedService');
    var savedKuaforElement = document.getElementById('savedKuafor');
    var savedTarihElement = document.getElementById('savedTarih');
    var savedSaatElement = document.getElementById('savedSaat');
    var savedNotElement = document.getElementById('savedNot');

    // Detayları gösteren elementleri güncelle
    savedEmailElement.innerText = randevu.randevuEmail;
    savedServiceElement.innerText = randevu.randevuHizmet;
    savedKuaforElement.innerText = randevu.randevuKuafor;
    savedTarihElement.innerText = randevu.randevuTarih;
    savedSaatElement.innerText = randevu.randevuSaat;
    savedNotElement.innerText = randevu.randevuNot;
}




// Silme işlemini gerçekleştiren fonksiyon
function deleteRandevu(randevuId) {
    // HTTP DELETE isteği gönder
    fetch(`http://localhost:8080/api/randevular/${randevuId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Randevu başarıyla silindi!');
                // Silme işlemi başarılı olduktan sonra tekrar randevuları getir
                getAllRandevular();
            } else {
                alert('Randevu silinemedi. Lütfen tekrar deneyin.');
            }
        })
        .catch(error => console.error('Randevu Silme Hatası:', error));
}


// Düzenle butonu oluştur
var editButton = createButton('Düzenle', '#4285F4', function () {
    editRandevu(randevu.id);
});

function editRandevu(randevuId) {
    // Belirli bir randevuyu getir
    fetch(`http://localhost:8080/api/randevular/${randevuId}`)
        .then(response => response.json())
        .then(data => {
            // Sol taraftaki formu doldur
            var emailInput = document.getElementById('email');
            emailInput.value = data.randevuEmail;

            var servicesSelect = document.getElementById('services');
            servicesSelect.value = data.randevuHizmet;

            var kuaforSelect = document.getElementById('kuaforSecimi');
            kuaforSelect.value = data.randevuKuafor;

            var tarihInput = document.getElementById('randevuTarih');
            tarihInput.value = data.randevuTarih;

            var saatInput = document.getElementById('randevuSaat');
            saatInput.value = data.randevuSaat;

            var notTextarea = document.getElementById('not');
            notTextarea.value = data.randevuNot;
        })
        .catch(error => console.error('Düzenleme Formu Oluşturma Hatası:', error));
}