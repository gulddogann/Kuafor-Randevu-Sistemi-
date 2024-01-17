//-------------------------------------------
//-- girisYap.js
//-------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var storedEmail = localStorage.getItem("storedEmail");
    if (storedEmail === null){
        document.getElementById("cikisYapBTN").style.display = "none";
    }else{
        document.getElementById("cikisYapBTN").style.display = "block";
    }
    

});

function tumKullanicilariGetir() {
    fetch('http://localhost:8080/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Kullanıcı listesi bulunamadı');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Veri çekme hatası:', error.message);
        });
}

var sessionTimer;
var counter = 600;

function startSessionTimer() {
    document.getElementById("sessionTimer").style.display = "block";
    sessionTimer = setInterval(function () {
        counter--;
        updateTimerDisplay();

        if (counter <= 0) {
            clearInterval(sessionTimer);
            cikisYap();
        }
    }, 1000);
}

function resetSessionTimer() {
    counter = 600;
    clearInterval(sessionTimer);
    startSessionTimer();
    updateTimerDisplay();
}

function updateTimerDisplay() {
    document.getElementById("timerValue").textContent = counter;
}

var userEmail = document.getElementById('emailInput').value;
var userPassword = document.getElementById('passwordInput').value;
var userEmailINFO = document.getElementById('userEmailINFO');
var userTypeINFO = document.getElementById('userTypeINFO');
var storedEmail = localStorage.getItem("storedEmail");


function kontrolEt(userEmail) {

    var userEmail = document.getElementById('emailInput').value;
    var userPassword = document.getElementById('passwordInput').value;
    var storedEmail = localStorage.getItem("storedEmail");

    if (!userEmail || !userPassword) {
        alert("Lütfen Bilgilerinizi Eksiksiz Giriniz.")
    }
    else {
        if (storedEmail === userEmail) {
            alert("Bu email ile zaten giriş yapılmış");
            return;
        }

        fetch(`http://localhost:8080/api/users/loggedEmail?userEmail=${encodeURIComponent(userEmail)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Veri çekme hatası');
                }
                return response.text();
            })
            .then(loggedEmail => {
                if (loggedEmail === userEmail) {
                    alert('Bu kullanıcı zaten giriş yapmış');
                } else {
                    girisYap();
                }
            })
            .catch(error => {
                console.error('Logged Email kontrol hatası:', error);
                alert('Logged Email kontrol hatası. Lütfen tekrar deneyin.');
            });
    }

}

function girisYap() {

    var userEmail = document.getElementById('emailInput').value;
    var userPassword = document.getElementById('passwordInput').value;
    var userEmailINFO = document.getElementById('userEmailINFO');

    var formData = new FormData();
    formData.append('userEmail', userEmail);
    formData.append('userPassword', userPassword);

    fetch('http://localhost:8080/api/login/login', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                return response.text().then(err => Promise.reject(err));
            }
        })
        .then(data => {
            alert('Giriş başarılı!');
            document.getElementById("cikisYapBTN").style.display = "block";
            startSessionTimer();
            window.addEventListener("keydown", resetSessionTimer);
            window.addEventListener("mousemove", resetSessionTimer);
            window.addEventListener("click", resetSessionTimer);


            userEmailINFO.textContent = userEmail;
            localStorage.setItem("storedEmail", userEmail);
            saveUserType();
        })
        .catch(error => {
            console.error('Giriş hatası:', error);

            if (error.message.includes('invalid_credentials')) {
                alert('Bilgiler yanlış. Lütfen tekrar deneyin.');
            } else if (error.message.includes('user_not_found')) {
                alert('Böyle bir kullanıcı bulunamadı.');
            } else {
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        });
}

function saveUserType() {

    var userEmail = document.getElementById('emailInput').value;
    var userTypeINFO = document.getElementById('userTypeINFO');

    fetch(`http://localhost:8080/api/users/userType?userEmail=${encodeURIComponent(userEmail)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Kullanıcı türü belirlenemiyor');
            }
            return response.text();
        })
        .then(userType => {
            userTypeINFO.textContent = userType;
            localStorage.setItem("storedUserType", userType);
            location.reload();
        })
        .catch(error => {
            console.error('Kullanıcı türü belirlenemiyor:', error);

            if (error.message.includes('user_not_found')) {
                alert('Böyle bir kullanıcı bulunamadı.');
            } else {
                alert('Kullanıcı türü belirlenemiyor. Lütfen tekrar deneyin.');
            }
        });
}





function cikisYap() {

    var userEmail = document.getElementById('emailInput').value;
    var storedEmail = localStorage.getItem("storedEmail");

    if (storedEmail !== null) {
        fetch(`http://localhost:8080/api/login/logout?userEmail=${encodeURIComponent(storedEmail)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    alert("Çıkış yapılan kullanıcı: " + userEmail);
                    localStorage.clear();
                    location.reload();
                } else {
                    console.error('Çıkış yapılamadı');
                    alert('Çıkış yapılamadı');
                }
            })
            .catch(error => {
                console.error('Çıkış yapılamadı', error);
                alert('Çıkış yapılamadı');
            });
    }else{
        alert("Önce giriş yapmalısınız.")
    }
}
