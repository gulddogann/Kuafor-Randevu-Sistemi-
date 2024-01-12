function handleSubmit(event) {
    event.preventDefault();

    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const userType = event.target.elements.userType.value;



    showSuccessMessage(firstName);
}

function showSuccessMessage(userName) {
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success';
    successMessage.innerHTML = `<strong>Üyelik Başarılı!</strong> Hoş geldin, ${userName}!`;

    const appContainer = document.querySelector('.app-container');
    appContainer.appendChild(successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

