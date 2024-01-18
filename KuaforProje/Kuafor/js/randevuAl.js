
document.addEventListener("DOMContentLoaded", function () {
    getAllHizmetler();

    if (storedEmail) {
        var emailInput = document.getElementById('email');
        emailInput.value = storedEmail;
        emailInput.readOnly = true;
    }

    var kuaforSelect = document.getElementById('kuaforSecimi');
    kuaforSelect.addEventListener('change', function () {
        var selectedKuafor = kuaforSelect.value;
        if (selectedKuafor !== "--Seçiniz--") {
            getKuaforlerList(selectedKuafor);
        }
    });
});

function getKuaforlerList(selectedKuafor) {
    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(usersData => {
            var selectedUser = usersData.find(user => user.userAd === selectedKuafor);

            if (selectedUser) {
                var selectedUserEmail = selectedUser.userEmail;

                fetch('http://localhost:8080/api/kuaforler')
                    .then(response => response.json())
                    .then(kuaforlerData => {
                        var filteredKuaforler = kuaforlerData.filter(kuafor => kuafor.calisanKuaforEmail === selectedUserEmail);
                        var availableDates = [];
                        var availableTimeIntervals = [];

                        filteredKuaforler.forEach(kuafor => {
                            if (!availableDates.includes(kuafor.calismaTarihi)) {
                                availableDates.push(kuafor.calismaTarihi);
                            }
                            var startTime = (kuafor.calismaSaatleriBaslangic);
                            var endTime = (kuafor.calismaSaatleriBitis);
                            availableTimeIntervals.push({
                                startTime: startTime,
                                endTime: endTime
                            });
                        });
                        updateDateAndTimePickr(availableDates, availableTimeIntervals);
                    })
                    .catch(error => console.error("Kuaforler Listesini Getirme Hatası:", error));
            } else {
                console.error("Seçilen kullanıcı bulunamadı.");
            }
        })
        .catch(error => console.error("Users Listesini Getirme Hatası:", error));
}

function updateDateAndTimePickr(availableDates, availableTimeIntervals) {
    var datePick = document.getElementById('tarih');
    var timePick = document.getElementById('saat');

    flatpickr(datePick, {
        enableTime: false,
        dateFormat: 'Y-m-d',
        enable: availableDates
    });

    flatpickr(timePick, {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: true,
        onClose: function () {
            console.log("kapandi")
            var selectedTime = timePick.value;
            var minTime = getMinTime(availableTimeIntervals);
            var maxTime = getMaxTime(availableTimeIntervals);

            console.log(maxTime)
            console.log(minTime)

            var maxTime = maxTime.slice(0, 5);
            var minTime = minTime.slice(0, 5);

            if (selectedTime < minTime || selectedTime > maxTime) {
                alert("Girdiğiniz saat, seçtiğiniz kuaförün çalışma saatleri dışındadır." + "\nKuaförün çalışma saatleri: " + minTime + " - " + maxTime + " aralığındadır.")
            }
        }
    });
}

function getMinTime(timeIntervals) {
    return timeIntervals.reduce((min, interval) => {
        return interval.startTime < min ? interval.startTime : min;
    }, timeIntervals[0].startTime);
}

function getMaxTime(timeIntervals) {
    return timeIntervals.reduce((max, interval) => {
        return interval.endTime > max ? interval.endTime : max;
    }, timeIntervals[0].endTime);
}

function getAllHizmetler() {
    var servicesSelect = document.getElementById('services');
    var kuaforSelect = document.getElementById('kuaforSecimi');

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

    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(data => {
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

    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(userList => {
            for (const user of userList) {
                if (user.userEmail === email) {
                    var userAd = user.userAd;

                    var randevuData = {
                        randevuEmail: email,
                        randevuMusteriAd: userAd,
                        randevuKuafor: kuaforSecimi,
                        randevuHizmet: service,
                        randevuTarih: tarih,
                        randevuSaat: saat,
                        randevuNot: not
                    };

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

                    break;
                }
            }
        })
        .catch(error => console.error('Kullanıcı listesi çekme hatası:', error));
}

function getAllRandevular() {
    var existingDetailsDiv = document.getElementById('detailsDiv');
    if (existingDetailsDiv) {
        existingDetailsDiv.remove();
    }

    fetch('http://localhost:8080/api/randevular')
        .then(response => response.json())
        .then(data => {
            var tableBody = document.getElementById('randevuTableBody');
            tableBody.innerHTML = '';

            data.forEach(randevu => {
                if (randevu.randevuEmail === localStorage.getItem('storedEmail')) {
                    var row = tableBody.insertRow();
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);

                    var detailsButton = createButton('Detayları Göster', '#4CAF50', function () {
                        showDetails(randevu);
                    });

                    var deleteButton = createButton('Sil', '#f44336', function () {
                        deleteRandevu(randevu.id);
                    });

                    cell1.appendChild(detailsButton);
                    cell2.appendChild(deleteButton);
                    cell3.innerText = randevu.randevuEmail;
                    cell4.innerText = randevu.randevuKuafor;
                }
            });
        })
        .catch(error => console.error("Tüm Randevuları Getirme Hatası:", error));
}


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
    button.addEventListener('mouseover', function () {
        button.style.backgroundColor = lightenColor(color, 20);
        button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseout', function () {
        button.style.backgroundColor = color;
        button.style.transform = 'scale(1)';
    });
    button.onclick = clickHandler;
    return button;
}

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

function showDetails(randevu) {

    var savedEmailElement = document.getElementById('savedEmail');
    var savedServiceElement = document.getElementById('savedService');
    var savedKuaforElement = document.getElementById('savedKuafor');
    var savedTarihElement = document.getElementById('savedTarih');
    var savedSaatElement = document.getElementById('savedSaat');
    var savedNotElement = document.getElementById('savedNot');

    savedEmailElement.innerText = randevu.randevuEmail;
    savedServiceElement.innerText = randevu.randevuHizmet;
    savedKuaforElement.innerText = randevu.randevuKuafor;
    savedTarihElement.innerText = randevu.randevuTarih;
    savedSaatElement.innerText = randevu.randevuSaat;
    savedNotElement.innerText = randevu.randevuNot;
}

function deleteRandevu(randevuId) {
    fetch(`http://localhost:8080/api/randevular/${randevuId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Randevu başarıyla silindi!');
                getAllRandevular();
            } else {
                alert('Randevu silinemedi. Lütfen tekrar deneyin.');
            }
        })
        .catch(error => console.error('Randevu Silme Hatası:', error));
}

function editRandevu(randevuId) {
    fetch(`http://localhost:8080/api/randevular/${randevuId}`)
        .then(response => response.json())
        .then(data => {
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