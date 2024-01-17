function cikisYap() {

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
                    alert("Çıkış yapılan kullanıcı: " + storedEmail);
                    localStorage.clear();
                    window.location.href="home.html";
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