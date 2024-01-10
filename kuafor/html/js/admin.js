$(document).ready(function () {
    $('#doğumTarihi').datepicker({
        format: 'dd.mm.yyyy',
        autoclose: true,
        language: 'tr'
    });



    $('.edit-button').click(function () {
        var row = $(this).closest('tr');

        row.find('td:not(:last-child)').each(function () {
            var value = $(this).text();
            var input = $('<input type="text">');
            input.val(value);
            $(this).html(input);
        });

        var saveButton = $('<button class="btn btn-success btn-sm save-button">Kaydet</button>');
        row.find('td:last-child').html(saveButton);

        row.find('.edit-button, .delete-button').hide();

        saveButton.click(function () {

            var updatedData = {};
            row.find('td:not(:last-child)').each(function (index) {
                updatedData['column' + index] = $(this).find('input').val();
                $(this).html($(this).find('input').val());
            });

            $(this).hide();

            row.find('.edit-button, .delete-button').show();
        });
    });

});


$('.delete-button').click(function () {
    var row = $(this).closest('tr');
    var kuaförAdi = row.find('td:eq(1)').text();
    var doğumTarihi = row.find('td:eq(2)').text();
    var egitimSeviyesi = row.find('td:eq(3)').text();
    var telefonNumarası = row.find('td:eq(4)').text();
    var adres = row.find('td:eq(5)').text();

    silModal(kuaförAdi, doğumTarihi, egitimSeviyesi, telefonNumarasi, adres);
});


$('.edit-button').click(function () {
    var row = $(this).closest('tr');
    var adSoyad = row.find('td:eq(1)').text();
    var doğumTarihi = row.find('td:eq(2)').text();
    var egitimSeviyesi = row.find('td:eq(3)').text();
    var telefonNumarasi = row.find('td:eq(4)').text();
    var adres = row.find('td:eq(5)').text();
    ekleModal(kuaförAdi, doğumTarihi, egitimSeviyesi, telefonNumarasi, adres);
});
function ekleModal() {
    Swal.fire({
        title: 'Ekleme Modalı',
        html:
            '<input id="ekleAdSoyad" class="swal2-input" placeholder="Ad Soyad">' +
            '<input id="ekleDoğumTarihi" class="swal2-input" placeholder="Doğum Tarihi">' +
            '<input id="ekleTelefonNumarasi" class="swal2-input" placeholder="Telefon Numarası">' +
            '<select id="ekleEgitimSeviyesi" class="swal2-input">' +
            '   <option value="İlkokul">İlkokul</option>' +
            '   <option value="Ortaokul">Ortaokul</option>' +
            '   <option value="Lise">Lise</option>' +
            '   <option value="Üniversite">Üniversite</option>' +
            '</select>' +
            '<input id="ekleAdres" class="swal2-input" placeholder="Adres">',
        showCancelButton: true,
        confirmButtonText: 'Ekle',
        cancelButtonText: 'İptal',
        preConfirm: () => {
            const adSoyad = Swal.getPopup().querySelector('#ekleAdSoyad').value;
            const doğumTarihi = Swal.getPopup().querySelector('#ekleDoğumTarihi').value;
            const telefonNumarası = Swal.getPopup().querySelector('#ekleTelefonNumarasi').value;
            const egitimSeviyesi = Swal.getPopup().querySelector('#ekleEgitimSeviyesi').value;
            const adres = Swal.getPopup().querySelector('#ekleAdres').value;

            if (!adSoyad || !doğumTarihi || !telefonNumarasi || !egitimSeviyesi || !adres) {
                Swal.showValidationMessage(`Lütfen tüm alanları doldurun`);
            }

            return { adSoyad, doğumTarihi, telefonNumarasi, egitimSeviyesi, adres };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const adSoyad = result.value.adSoyad;
            const doğumTarihi = result.value.doğumTarihi;
            const telefonNumarası = result.value.telefonNumarası;
            const egitimSeviyesi = result.value.egitimSeviyesi;
            const adres = result.value.adres;

            const table = document.querySelector('.table tbody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `<th scope="row">${table.children.length + 1}</th>
                                    <td>${adSoyad}</td>
                                    <td>${doğumTarihi}</td>
                                    <td>${egitimSeviyesi}</td>
                                    <td>${telefonNumarası}</td>
                                    <td>${adres}</td>
                                    <td>
                                        <button type="button" class="btn btn-warning btn-sm" onclick="duzenleModal()">Düzenle</button>
                                        <button type="button" class="btn btn-danger btn-sm" onclick="silModal()">Sil</button>
                                    </td>`;
            table.appendChild(newRow);

            Swal.fire(
                'Eklendi!',
                'Kuaför başarıyla eklendi.',
                'success'
            );
        }
    });
}


function duzenleModal() {
    Swal.fire({
        title: 'Düzenleme Modalı',
        text: 'Düzenleme işlemleri burada gerçekleşir.',
        icon: 'info',
        confirmButtonText: 'Tamam'
    });
}

function silModal(kuaförAdi, doğumTarihi, egitimSeviyesi, telefonNumarasi, adres) {
    Swal.fire({
        title: 'Silmek istediğinize emin misiniz?',
        text: 'Bu işlemi geri alamazsınız!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Evet, sil!',
        cancelButtonText: 'İptal'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Silindi!',
                'Kuaför başarıyla silindi.',
                'success'
            );

            var table = document.querySelector('.table tbody');
            var rows = table.getElementsByTagName('tr');
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].cells[1].innerHTML === kuaförAdi &&
                    rows[i].cells[2].innerHTML === doğumTarihi &&
                    rows[i].cells[3].innerHTML === egitimSeviyesi &&
                    rows[i].cells[4].innerHTML === telefonNumarasi &&
                    rows[i].cells[5].innerHTML === adres) {
                    table.deleteRow(i);
                    break;
                }
            }
        }
    });

}



