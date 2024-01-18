# Kuaför Randevu Sistemi Projesi

# Website Projemiz
## Projemiz Hakkında
Öncelikle projemizin çalışması için "pbys" adında bir adet veritabanı oluşturmanız gerekiyor. Ardından Intellij üzerinden back-end'i çalıştırınca gerekli tüm tablolar oluşuyor. Bu tablolar sırasıyla "hizmetler","kuaforler","loggeduser","randevular","user" şeklindedir. "user" tablosuna bir adet admin tanımlamamız gerekiyor. Ardından da "hizmetler" tablosuna gerekli hizmetleri ekliyoruz. Bu aşamadan sonra kalan tüm işlemleri websitemiz üzerinden yapabiliyoruz.

## Ana Sayfa
![Screenshot 2024-01-18 144059](https://github.com/gulddogann/Kuafor-Randevu-Sistemi-/assets/46106355/2ac79f54-c54c-4672-b24f-b31dbdc43428)
Projemiz bir kadın kuaförü tanıtım ve randevu alma sitesidir. Bu siteden müşteriler üye olabilir, hizmetleri görüntüleyebilir, randevu alabilir, kuaförler bu randevuları görüntüleyebilir, kendilerine saat seçebilirler... 

# Admin Paneli
![Screenshot 2024-01-18 143104](https://github.com/gulddogann/Kuafor-Randevu-Sistemi-/assets/46106355/81a891b7-890d-4122-ab9e-c4e8ab700d33)

Admin giriş yaptıktan sonra bu sayfada yeni kuaför ekleyebilir. Önce kuaförlerin, Üye Ol sayfasından üye olması gerekmektedir. Ardından bu ekleme işlemini kuaförün kaydolurken kullandığı emailini kullanarak yapar. Kuaför Bilgileri kısmında mevcut kuaförlerin Ad, Soyad, Email ve Şifre bilgilerini görüntüleyebilir ve düzenleyebilir. 

# Kuaför Paneli
![Screenshot 2024-01-18 143135](https://github.com/gulddogann/Kuafor-Randevu-Sistemi-/assets/46106355/165a19f1-21ca-45cc-a22f-16d21507aca8)
Kuaför giriş yaptıktan sonra ilk önce mevcut randevularına bakar eğer randevusu varsa sayfada gözükür. Kuaför burada kendisine atanmış randevuları iptal edebilir.

# Çalışma Saatleri
![Screenshot 2024-01-18 143147](https://github.com/gulddogann/Kuafor-Randevu-Sistemi-/assets/46106355/6361fdee-168f-4974-bccc-86b9c777a2d9)
Kuaför çalışma gününü, başlangıç saatini ve bitiş saatini seçip kaydeder. Email, giriş yapılan kullanıcının emaili olarak otomatik gelir. Müşteri randevu alacağı zaman bu uygun gün ve saatlere göre seçim yapabilir.

# Randevu Al
![Screenshot 2024-01-18 143222](https://github.com/gulddogann/Kuafor-Randevu-Sistemi-/assets/46106355/b5c6a115-27b8-494b-a853-9e79dd6483f4)
Müşteriler giriş yaptıktan sonra bu sayfadan randevularını alabilirler. Email adresi kullanıcı giriş yaptıktan sonra otomatik olarak sayfada yüklenir. Almak istediği hizmeti, kuaförü, tarihi ve saati seçebilir. Eğer isterse not ekleyebilir. Ancak tarih ve saati seçerken kuaförün uygunluk durumuna göre seçebilir. Tüm bu işlemleri gerçekleştirdikten sonra kaydedip, kaydedilen randevular butonuna basarak aldığı randevuyu görebilir.

## Galeri Sayfası
![Screenshot 2024-01-18 143233](https://github.com/gulddogann/Kuafor-Randevu-Sistemi-/assets/46106355/7aad0557-c80e-4627-944c-16abfb24fa5e)
Bu sayfada müşteriler, kuaförün verdiği hizmetlerin görsellerini görebilirler.

## Üye Ol Sayfası
![Screenshot 2024-01-18 143237](https://github.com/gulddogann/Kuafor-Randevu-Sistemi-/assets/46106355/a3b2a365-08ed-4838-8002-4b4aeaef24cb)
Eğer bir müşteri, bu kuaför salonunun işlerini beğenirse, randevu almak için; adlarını, soyadlarını, emaillerini ve şifrelerini girerek siteye kaydolabilirler.

## Giriş Yap Sayfası
![Screenshot 2024-01-18 143246](https://github.com/gulddogann/Kuafor-Randevu-Sistemi-/assets/46106355/74caea55-bab1-479f-9275-377d5d2cbbad)
Kayıt olduktan sonra randevu almak, halihazırdaki randevularını görmek için giriş yapabilirler.

## Araçlar
Back-End kısmı için [spring boot initializr](https://start.spring.io) kullandık ve kodlarımızı Java ile yazdık. Bunun yanısıra Front-End için kullandığımız araçlar aşağıdadır.
- [Javascript]
- [HTML] ve
- [CSS]
