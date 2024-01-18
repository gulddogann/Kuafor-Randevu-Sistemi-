document.addEventListener("DOMContentLoaded", function () {
    if (storedEmail) {
        var emailInput = document.getElementById('email');
        emailInput.value = storedEmail;
        emailInput.readOnly = true;
    }

    calismaSaatleriniGetir();
});

function kontrolEt() {
    var calismaTarihi = document.getElementById('tarih').value;
    var calisanKuaforEmail = document.getElementById('email').value;

    fetch('http://localhost:8080/api/kuaforler')
        .then(response => response.json())
        .then(kuaforlerData => {
            var ayniCalismaTarihi = kuaforlerData.filter(kuafor => kuafor.calismaTarihi === calismaTarihi && kuafor.calisanKuaforEmail === calisanKuaforEmail);

            if (ayniCalismaTarihi.length > 0) {
                alert('Bu tarihte bir kaydınız bulunmaktadır. \nAşağıdaki panelden kaydınızı silerek yeni bir kayıt oluşturabilirsiniz.');
            } else {
                kaydet();
            }
        })
        .catch(error => console.error("Kuaforler Listesini Getirme Hatası:", error));
}

function kaydet() {
    var calisanKuaforEmail = document.getElementById('email').value;
    var calismaTarihi = document.getElementById('tarih').value;
    var calismaSaatleriBaslangic = document.getElementById('saat').value;
    var calismaSaatleriBitis = document.getElementById('bitisSaat').value;
    var veri = {
        calisanKuaforEmail: calisanKuaforEmail,
        calismaTarihi: calismaTarihi,
        calismaSaatleriBaslangic: calismaSaatleriBaslangic,
        calismaSaatleriBitis: calismaSaatleriBitis
    };

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
            location.reload();
        })
        .catch(error => {
            console.error('Veri çekme hatası:', error.message);
        });
}






function calismaSaatleriniGetir() {
    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(users => {
            var matchingUser = users.find(user => user.userEmail === storedEmail);

            if (matchingUser) {
                fetch('http://localhost:8080/api/kuaforler')
                    .then(response => response.json())
                    .then(data => {
                        var tableBody = document.getElementById('calismaTableBody');
                        tableBody.innerHTML = '';
                        var matchingKuaforler = data.filter(calismaSaati => calismaSaati.calisanKuaforEmail === matchingUser.userEmail);

                        matchingKuaforler.forEach(calismaSaati => {
                            var row = tableBody.insertRow();
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);

                            var deleteButton = createButton('Sil', '#f44336', function () {
                                deleteCalismaSaati(calismaSaati.id);
                            });

                            cell1.innerText = calismaSaati.calismaTarihi;
                            cell2.innerText = calismaSaati.calismaSaatleriBaslangic;
                            cell3.innerText = calismaSaati.calismaSaatleriBitis;
                            cell4.appendChild(deleteButton);
                        });

                        console.log('Çalışma Saatleri Başarıyla Getirildi:', matchingKuaforler);

                        var calismaSaatleriPanel = document.getElementById('calismaSaatleriPanel');
                        calismaSaatleriPanel.style.display = 'block';
                    })
                    .catch(error => console.error("Çalışma Saatlerini Getirme Hatası:", error));
            } else {
                console.log("Eşleşen kullanıcı bulunamadı.");
            }

            function createButton(text, color, onClick) {
                var button = document.createElement('button');
                button.className = 'btn btn-sm';
                button.style.backgroundColor = color;
                button.innerText = text;
                button.onclick = onClick;
                return button;
            }

            function deleteCalismaSaati(calismaSaatiId) {
                fetch(`http://localhost:8080/api/kuaforler/${calismaSaatiId}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (response.ok) {
                            alert('Çalışma saati başarıyla silindi!');
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
