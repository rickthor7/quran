$.ajax({
	url: 'https://al-quran-8d642.firebaseio.com/data.json?print=pretty',
    method: "GET",
    success: ((response)=>{
  	    // console.log(response);
        var a;
        for(a=0; a <= response.length; a++) {
            $('.quran').append(`
                <div class="quran__wrap">
                    <div class="surat text-center">${response[a].nama} - <span class="arab">${response[a].asma}</span></div>
                    <div class="arti text-center">${response[a].arti}</div>
                    <div class="urutan">${response[a].nomor}</div>
                    <div class="hiding" onclick="playSound(${response[a].nomor});fixedTop(${response[a].nomor}); changeImage(${response[a].nomor});">
                        <img src="assets/img/play-button.svg" id="image-${response[a].nomor}" alt="button" title="button" />
                    </div>
                    <div class="play" >
                        
                        <audio controls preload="none" class="audio_" id="audio-${response[a].nomor}">
                            <source src="${response[a].audio}" type="audio/ogg">
                            <source src="${response[a].audio}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                  
                    </div>
                            <div class="ayat">${response[a].ayat} Ayat</div>
                            <div class="type">Diturunkan di <span class="font-capitalize">${response[a].type}</span></div>
                    </div>
                </div>
            `)

            
        }
  })
})

$("#scroll-top").hide();
// fade in #back-top
$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#scroll-top').fadeIn();
        } else {
            $('#scroll-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#scroll-top button').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 300);
    });

});

function changeImage(val) {
var image = document.getElementById('image-'+val+'');
    if (image.src.match("pause")) {
        image.src = "assets/img/play-button.svg";
    } else {
        image.src = "assets/img/pause.svg";
    }
}
var playing = false;

function playSound(val) {
    var audio = document.getElementById('audio-'+val+'');
    if (playing === false) {
      audio.play();
      playing = true;
    } else {
      audio.pause();
      playing = false;
    }
}

function fixedTop(val) {
    console.log(val);
    $("#quran").append(`
        <div class="fixed__">Anda sedang mendengarkan surat ke ${val}</div>
    `)
}

$(document).on('click', '.fixed__',function(){
    $('.fixed__').fadeOut();
})