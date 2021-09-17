$.ajax({
    url: 'https://kutipanmuslim.com/alqurans/1',
    method: 'GET',
    success: ((response) => {
        // console.log(response.Surah);
        var a;
        for (a = 0; a < response.Surah.length; a++) {
            // console.log(response.Surah[a].name);
            $('.name-surah').append(`
                <option value="${response.Surah[a].number}">${response.Surah[a].number}. ${response.Surah[a].name}</option>
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
        },
        complete: function() {
            $("#loading").hide();
            $('.alquran').show();
        },
        success: ((response) => {
            // console.log(response.Surah.ayahs.length);
            var a;
            $('.alquran').html('');
            $('.saatini').html('');
            $('.judul-title').html('');
            $('.artinya').html('')
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
                <h2 class="text-center judul-title"><strong>${response.Surah.name}</strong></h2>
                <div class="text-center artinya">${response.Surah.translationId}</div>
            `)
            for (a = 0; a < response.Surah.ayahs.length; a++) {

                $('.alquran').append(`
                <div class="shadow">
                    <div class="ayat">${response.Surah.ayahs[a].ayahText} <div class="ayat-ke">${response.Surah.ayahs[a].verseId}</div></div>
                    <div class="arti">${response.Surah.ayahs[a].indoText}</div>
                </div>
            `)

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