function handleLogin(event) {
    event.preventDefault();

    var username = document.querySelector('[name="username"]').value;
    var password = document.querySelector('[name="password"]').value;
    var userType = document.querySelector('[name="userType"]').value;

    if (userType === 'admin') {
        window.location.href = 'adminPage.html';
    } else if (userType === 'kuafor') {
        window.location.href = 'kuaforPage.html';
    } else if (userType === 'musteri') {
        window.location.href = 'musteriPage.html';
    } else {
        alert('Geçersiz giriş türü');
    }
}
