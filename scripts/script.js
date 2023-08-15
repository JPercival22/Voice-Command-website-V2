function toggleMenu() {
    const e = document.getElementById("navMenu");
    e.classList.toggle("show")
}

function toggleModal() {
    const e = document.getElementById("modal");
    e.classList.toggle("show"); 
}


// $(document).ready(function () {
   
    


    // var modal = document.getElementById('help-modal');
    // var span = document.getElementsByClassName('close')[0];


    // $(".toggle").on("click", function () {
    //     if ($(".item").hasClass("active")) {
    //         $(".item").removeClass("active");
    //     } else {
    //         $(".item").addClass("active");
    //     }
    // });
    // Help Center Modal 

    // span.onclick = function () {
    //     modal.style.display = "none";
    // }

    // window.onclick = function (e) {
    //     if (e.target == modal || span) {
    //         modal.style.display = "none";
    //     }
    // };

    // scroll to the top button 
    // window.onscroll = function () {
    //     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //         document.getElementById("scroll-btn").style.display = "block";
    //     } else {
    //         document.getElementById("scroll-btn").style.display = "none";
    //     }
    // };

    // var top = document.getElementById("scroll-btn");
    // top.addEventListener("click", toTheTop);

    // function toTheTop() {
    //     document.documentElement.scrollTop = 0;
    // }

    // guitar tuner 
    // var string1 = $("#highE")[0];
    // var string2 = $("#B")[0];
    // var string3 = $("#G")[0];
    // var string4 = $("#D")[0];
    // var string5 = $("#A")[0];
    // var string6 = $("#lowE")[0];
    // var lowE = $(".tuner-E");
    // var lowEImage = $(".e_note-signifyer");
    // var noteA = $(".tuner-A");
    // var noteAImage = $(".a_note-signifyer");
    // var noteD = $(".tuner-D");
    // var noteDImage = $(".d_note-signifyer");
    // var noteG = $(".tuner-G");
    // var noteGImage = $(".g_note-signifyer");
    // var noteB = $(".tuner-B");
    // var noteBImage = $(".b_note-signifyer");
    // var highE = $(".tuner-high-E");
    // var highEImage = $(".high-e_note-signifyer");

    // highE.click(function () {
    //     highEImage.show();
    //     string1.play();
    // });
    // noteB.click(function () {
    //     noteBImage.show();
    //     string2.play();

    // });
    // noteG.click(function () {
    //     noteGImage.show();
    //     string3.play();

    // });
    // noteD.click(function () {
    //     noteDImage.show();
    //     string4.play();

    // });
    // noteA.click(function () {
    //     noteAImage.show();
    //     string5.play();

    // });
    // lowE.innerHTML = "E",
    //     lowE.click(function () {
    //         lowEImage.show();
    //         string6.play();

    //     });

    // carousel functionality 
    // const testimonials = document.querySelector('.open-chord-carousel');
    // const scroller = testimonials.querySelector('.scroller');
    // const nextBtn = testimonials.querySelector('.btn.next');
    // const prevBtn = testimonials.querySelector('.btn.prev');
    // const itemWidth = testimonials.querySelector('.scroller-item').clientWidth;

    // nextBtn.addEventListener('click', scrollToNextItem);
    // prevBtn.addEventListener('click', scrollToPrevItem);

    // function scrollToNextItem() {
    //     if (scroller.scrollLeft < (scroller.scrollWidth - itemWidth))
    //         // The scroll position is not at the beginning of last item
    //         scroller.scrollBy({
    //             left: itemWidth,
    //             top: 0,
    //             behavior: 'smooth'
    //         });
    //     else
    //         // Last item reached. Go back to first item by setting scroll position to 0
    //         scroller.scrollTo({
    //             left: 0,
    //             top: 0,
    //             behavior: 'smooth'
    //         });
    // }

    // function scrollToPrevItem() {
    //     if (scroller.scrollLeft != 0)
    //         // The scroll position is not at the beginning of first item
    //         scroller.scrollBy({
    //             left: -itemWidth,
    //             top: 0,
    //             behavior: 'smooth'
    //         });
    //     else
    //         // This is the first item. Go to last item by setting scroll position to scroller width
    //         scroller.scrollTo({
    //             left: scroller.scrollWidth,
    //             top: 0,
    //             behavior: 'smooth'
    //         });
    // }

    // Voice command 

//     if (annyang) {

//         var commands = {
//             //Opens the voice command phrase menu
//             'open help center': function () {
//                 $("#help-modal").toggleClass('help-center')
//             },
//             'close': function () {
//                 $("#help-modal").toggleClass('help-center')
//             },
//             //commands to open pages
//             'go back': function () {
//                 window.history.back(1)
//             },
//             'go forward': function () {
//                 window.history.go(1);
//             },
//             'home': function () {
//                 window.location.assign("/index.html")
//             },
//             'open basics': function () {
//                 window.location.assign("/basics.html")
//             },
//             'open frets': function () {
//                 window.location.assign("/frets.html")
//             },
//             'open chords': function () {
//                 window.location.assign("/chords.html")
//             },
//             'open rhythm': function () {
//                 window.location.assign("/rhythm.html")
//             },
//             'open lead': function () {
//                 window.location.assign("/lead.html")
//             },
//             'open second basics lesson': function () {
//                 window.location.assign("/basics2.html")
//             },
//             'finger positioning': function () {
//                 window.location.assign("/frets2.html")
//             },
//             'the power chord': function () {
//                 window.location.assign("/chords2.html")
//             },
//             'first music lesson': function () {
//                 window.location.assign("/rhythm2.html")
//             },
//             'reading music': function () {
//                 window.location.assign("/lead2.html")
//             },

//             'go to the top': function () {
//                 $('html, body').animate({
//                     scrollTop: 0
//                 }, 0);
//             },
//             'go to the bottom': function () {
//                 $('html, body').animate({
//                     scrollTop: 9999
//                 }, 0);
//             },
//             //opens the mobile menu
//             'open menu': function () {
//                 $("#mobile-menu").toggleClass('mobile-navigation')
//             },
//             'scroll up': function () {
//                 $('html, body').animate({
//                     scrollTop: $("html").scrollTop() - 540
//                 }, 'easeInOutBack');
//             },
//             'scroll down': function () {
//                 $('html, body').animate({
//                     scrollTop: $("html").scrollTop() + 540
//                 }, 'easeInOutBack');

//             },
//             'E': function () {
//                 $('tuner-E').click('')
//             }
//         };
//         annyang.addCommands(commands);
//         annyang.start();
//         //       // Tell KITT to use annyang
//         SpeechKITT.annyang();
//         //   // Define a stylesheet for KITT to use
//         // SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/1.0.0/themes/flat.css');
//         //   // Render KITT's interface
//         SpeechKITT.vroom();
//     }
//     $("#skitt-listening-text__instructions").text("say \"open help center\"");

// });