function handleSubmit() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const successMessage = document.getElementById('successMessage');

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        alert('Lütfen bütün alanları doldurun.');
        return;
    }
    if (!/\d/.test(password)) {
        alert('Şifrenizde en az bir rakam kullanmalısınız.');
        return;
    }
    successMessage.textContent = 'Başarıyla üye oldunuz!';
}

