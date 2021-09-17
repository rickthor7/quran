$.ajax({
    url: 'https://kutipanmuslim.com/alqurans/1',
    method: 'GET',
    success: ((response) => {
        // console.log(response.Surah);
        var a;
        for (a = 0; a < response.Surah.length; a++) {
            // console.log(response.Surah[a].name);
            $('.name-surah').append(`
                <option value="${response.Surah[a].number}">${response.Surah[a].number}. ${response.Surah[a].name} - (${response.Surah[a].numberOfAyahs} ayat)</option>
            `);

        }
    })
})

$("#set").click(() => {
    var value_ = $(".name-surah").val();
    var real = parseInt(value_)
    var newVal = real + 1
    var url_ = `https://kutipanmuslim.com/alqurans/${newVal}`
        // alert(newVal)
    $.ajax({
        url: url_,
        method: 'GET',
        beforeSend: function() {
            $("#loading").show();
            $('.alquran').hide();
            $('.judul').hide()
        },
        complete: function() {
            $("#loading").hide();
            $('.alquran').show();
            $('.judul').show()
        },
        success: ((response) => {
            // console.log(response.Surah.ayahs.length);
            var a;
            $('.alquran').html('');
            $('.saatini').html('');
            $('.judul-title').html('');
            $('.artinya').html('')
            $('.detail-quran').html('')
            $('.modal-quran-all').html('')
            $('body').append(`
                <div class="saatini">Anda Membaca Surah: <strong>${response.Surah.name}</strong></div>
                `)

            $('.alquran').removeClass().addClass('alquran id-' + newVal + '')

            var alfatihah = 'id-2';
            var attaubah = 'id-10';
            if ($('.alquran').hasClass(alfatihah) || $('.alquran').hasClass(attaubah)) {
                // console.log('dedi');
            } else {
                $('.alquran').append(`
                    <div class="shadow">
                        <div class="ayat bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
                        <div class="arti">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.</div>
                    </div>
                `)
            }

            $('.judul').append(`
                <h2 class="text-center judul-title"><strong>${response.Surah.name}</strong> <strong class="ayat">${response.Surah.asma}</strong></h2>
                <div class="text-center artinya">${response.Surah.translationId}</div>

            `)
            for (a = 0; a < response.Surah.ayahs.length; a++) {

                $('.alquran').append(`
                    <div class="shadow">
                        <div class="ayat">${response.Surah.ayahs[a].ayahText} <div class="ayat-ke">${response.Surah.ayahs[a].verseId}</div></div>
                        <div class="arti">${response.Surah.ayahs[a].indoText}</div>
                        <button class="btn btn-sm btn-link" data-toggle="modal" data-target="#exampleModal-${response.Surah.ayahs[a].verseId}">Detail</button>
                    </div>
                `)

                var id_ = `exampleModal-${response.Surah.ayahs[a].verseId}`
                    // $(".modal-quran").attr('id', id_)
                var test = `
                        <div class="modal fade modal-quran" id="${id_}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        Surat ${response.Surah.name} Ayat ke ${response.Surah.ayahs[a].verseId}
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                    </div>
                                    <div class="modal-body detail-quran">
                                        <div class="ayat text-right">
                                            ${response.Surah.ayahs[a].ayahText} 
                                        </div>
                                        <audio controls>
                                            <source src="${response.Surah.ayahs[a].audio}" type="audio/mp3">
                                        </audio>
                                        <div class="indo grey"><i>${response.Surah.ayahs[a].readText}</i></div>
                                        <br>
                                        <div class="indo">${response.Surah.ayahs[a].indoText}</div>
                                        <hr>
                                        <div class="turun">Diturunkan di <strong>${response.Surah.typeId}</strong></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `

                $('.modal-quran-all').append(test)


            }
        })
    })
})


// var id_ = $('.nama-surah').val();
// var url_ = 'https://kutipanmuslim.com/alqurans/' + id_ + '';

// console.log(id);
// console.log(url_);


$(() => {
    $('.name-surah').select2({
        "language": {
            "noResults": function() {
                return "<span style=font-family:'Poppins'>Surah tidak ditemukan</span>";
            }
        },
        escapeMarkup: function(markup) {
            return markup;
        }
    });
})

$(".scroll").hide();
$(".saatini").hide();
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.scroll').fadeIn();
        $(".saatini").fadeIn();
    } else {
        $('.scroll').fadeOut();
        $(".saatini").fadeOut();
    }
});
$('.scroll').click(function() {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
});

$(document).on('click', '.saatini', function() {
    $(this).fadeOut()
})