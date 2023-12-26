document.addEventListener("DOMContentLoaded", function () {
    var resimler = document.querySelectorAll(".galeri-resim");

    resimler.forEach(function (resim) {
        resim.addEventListener("mouseenter", function () {
            resim.style.transform = "scale(1.1)";
            resim.style.transition = "transform 0.3s ease";
        });

        resim.addEventListener("mouseleave", function () {
            resim.style.transform = "scale(1)";
            resim.style.transition = "transform 0.5s ease";
        });
    });
});
