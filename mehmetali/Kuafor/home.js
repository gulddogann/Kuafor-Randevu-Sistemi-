//-------------------------------------------
//-- home.js
//-------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    toggleButtons();
});

function handleRandevuAlClick() {
    var storedUserType = getCookie('currentUserType');

    // Eğer kullanıcı Ziyaretçi ise uyarı mesajını göster
    if (storedUserType !== 'Musteri') {
        alert('Önce üye olmalısınız!');
    } else {
        // Ziyaretçi değilse, randevu al sayfasına yönlendir
        window.location.href = 'randevuAl.html';
    }
}



// Diğer fonksiyonlar burada devam eder...


function toggleButtons() {
    var storedUserType = getCookie('currentUserType');

    if (storedUserType && storedUserType !== 'Ziyaretci') {
        toggleButtonVisibility('adminButton', storedUserType === 'Admin')
        toggleButtonVisibility('kuaforButton', storedUserType === 'Kuafor')
        toggleButtonVisibility('hizmetlerButton', storedUserType === 'Musteri');
        toggleButtonVisibility('randevuAlButton', storedUserType === 'Musteri');
        toggleButtonVisibility('galeriButton', storedUserType === 'Musteri');
        toggleButtonVisibility('uyeOlButton', false);
        toggleButtonVisibility('kuaforGirisButton', false);

        // Kullanıcı tipini ekrana yazdır
        var userTypeDiv = document.getElementById('userType');
        userTypeDiv.textContent = storedUserType;
    } else {
        // Ziyaretçi ise tüm butonları göster
        toggleButtonVisibility('adminButton', false);
        toggleButtonVisibility('kuaforButton', false)
        toggleButtonVisibility('hizmetlerButton', true);
        toggleButtonVisibility('randevuAlButton', true);
        toggleButtonVisibility('galeriButton', true);
        toggleButtonVisibility('uyeOlButton', true);
        toggleButtonVisibility('kuaforGirisButton', true);

        // Kullanıcı tipini ekrana yazdır
        var userTypeDiv = document.getElementById('userType');
        userTypeDiv.textContent = 'Ziyaretci';
    }
}

function toggleButtonVisibility(buttonId, shouldShow) {
    var button = document.getElementById(buttonId);
    if (button) {
        button.style.display = shouldShow ? 'inline-block' : 'none';
    }
}
