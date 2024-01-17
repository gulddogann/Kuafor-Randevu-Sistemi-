document.addEventListener("DOMContentLoaded", function () {
    if (storedEmail) {
        var emailInput = document.getElementById('email');
        emailInput.value = storedEmail;
        emailInput.readOnly = true;
    }

    calismaSaatleriniGetir();
});

// 1. Fonksiyon: Tarih ve email kontrolü yap
function kontrolEt() {
    // Formdan verileri al
    var calismaTarihi = document.getElementById('tarih').value;
    var calisanKuaforEmail = document.getElementById('email').value;

    // Fetch isteği ile kuaforler listesini çek
    fetch('http://localhost:8080/api/kuaforler')
        .then(response => response.json())
        .then(kuaforlerData => {
            // Tarih ve email'e göre filtrele
            var ayniCalismaTarihi = kuaforlerData.filter(kuafor => kuafor.calismaTarihi === calismaTarihi && kuafor.calisanKuaforEmail === calisanKuaforEmail);

            // Eğer eşleşen bir kuafor bulunduysa alert göster
            if (ayniCalismaTarihi.length > 0) {
                alert('Bu tarihte bir kaydınız bulunmaktadır. \nAşağıdaki panelden kaydınızı silerek yeni bir kayıt oluşturabilirsiniz.');
            } else {
                kaydet();
            }
        })
        .catch(error => console.error("Kuaforler Listesini Getirme Hatası:", error));
}

// 2. Fonksiyon: Kayıt işlemleri
function kaydet() {
    // Formdan verileri al
    var calisanKuaforEmail = document.getElementById('email').value;
    var calismaTarihi = document.getElementById('tarih').value;
    var calismaSaatleriBaslangic = document.getElementById('saat').value;
    var calismaSaatleriBitis = document.getElementById('bitisSaat').value;

    // Veriyi API'ye göndermek için bir obje oluştur
    var veri = {
        calisanKuaforEmail: calisanKuaforEmail,
        calismaTarihi: calismaTarihi,
        calismaSaatleriBaslangic: calismaSaatleriBaslangic,
        calismaSaatleriBitis: calismaSaatleriBitis
    };

    // Fetch isteği oluştur
    fetch('http://localhost:8080/api/kuaforler', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(veri),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Kayıt sırasında bir hata oluştu');
            }
            return response.json();
        })
        .then(data => {
            console.log('Kayıt başarılı:', data);

            // Sayfayı yenile
            location.reload();
        })
        .catch(error => {
            console.error('Veri çekme hatası:', error.message);
        });
}






function calismaSaatleriniGetir() {
    // API'den kullanıcıları çek
    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(users => {
            // Stored email ile eşleşen kullanıcıyı bul
            var matchingUser = users.find(user => user.userEmail === storedEmail);

            if (matchingUser) {
                // Kullanıcının emailine ait kuaforleri çek
                fetch('http://localhost:8080/api/kuaforler')
                    .then(response => response.json())
                    .then(data => {
                        // Gelen verileri kullanarak tabloyu doldur
                        var tableBody = document.getElementById('calismaTableBody');
                        tableBody.innerHTML = ''; // Tabloyu temizle

                        // Kuaforler listesinden sadece kullanıcının email'ine ait olanları filtrele
                        var matchingKuaforler = data.filter(calismaSaati => calismaSaati.calisanKuaforEmail === matchingUser.userEmail);

                        matchingKuaforler.forEach(calismaSaati => {
                            var row = tableBody.insertRow();
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);

                            // Sil butonu oluştur
                            var deleteButton = createButton('Sil', '#f44336', function () {
                                deleteCalismaSaati(calismaSaati.id);
                            });

                            cell1.innerText = calismaSaati.calismaTarihi;
                            cell2.innerText = calismaSaati.calismaSaatleriBaslangic;
                            cell3.innerText = calismaSaati.calismaSaatleriBitis;
                            cell4.appendChild(deleteButton);
                        });

                        console.log('Çalışma Saatleri Başarıyla Getirildi:', matchingKuaforler); // Başarı mesajı

                        // Tabloyu doldurduktan sonra tabloyu görünür yap
                        var calismaSaatleriPanel = document.getElementById('calismaSaatleriPanel');
                        calismaSaatleriPanel.style.display = 'block';
                    })
                    .catch(error => console.error("Çalışma Saatlerini Getirme Hatası:", error));
            } else {
                console.log("Eşleşen kullanıcı bulunamadı.");
            }

            // Yardımcı fonksiyon: Sil butonu oluştur
            function createButton(text, color, onClick) {
                var button = document.createElement('button');
                button.className = 'btn btn-sm';
                button.style.backgroundColor = color;
                button.innerText = text;
                button.onclick = onClick;
                return button;
            }

            // Silme işlemini gerçekleştiren fonksiyon
            function deleteCalismaSaati(calismaSaatiId) {
                // HTTP DELETE isteği gönder
                fetch(`http://localhost:8080/api/kuaforler/${calismaSaatiId}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (response.ok) {
                            alert('Çalışma saati başarıyla silindi!');
                            // Silme işlemi başarılı olduktan sonra tekrar çalışma saatlerini getir
                            calismaSaatleriniGetir();
                        } else {
                            alert('Çalışma saati silinemedi. Lütfen tekrar deneyin.');
                        }
                    })
                    .catch(error => console.error('Çalışma Saati Silme Hatası:', error));
            }
        })
        .catch(error => console.error("Kullanıcı Getirme Hatası:", error));
}
