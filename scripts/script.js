$(document).ready(function() {
    $(".burger-button").click(function () { //applies click event to the burger button
        $(".mobile-navigation,.mobile-navigation ul li ul li").toggle(0);//toggles it on or off
    });
});

// #Hover effect over the page navigation
    $(function() { 
            $('#touch-nav-content a img').hover(function() {
          $(this).fadeTo(50,.6);
              }, function() {
            $(this).fadeTo(400,1);
        });
    });
    
    if (annyang) {

        var commands = {
            //Opens the voice command phrase menu
            'open help': function() { 
                $("#dialog").toggleClass('help-box')
            },
            'close help': function() { 
                $("#dialog").toggleClass('help-box')
            },
            //commands to open pages
            'go back': function() {window.history.back(1)},
            'go forward': function() {window.history.go(1);},
            'home': function() { window.location.assign("/index.html") },
            'open basics': function() { window.location.assign("/basics.html") },
            'open frets': function() { window.location.assign("/frets.html") },
            'open chords': function() { window.location.assign("/chords.html")},
            'open rhythm': function() { window.location.assign("/rhythm.html") },
            'open lead': function() { window.location.assign("/lead.html") },
            'open second basics lesson': function() {window.location.assign("/basics2.html") },
            'finger positioning': function() {window.location.assign("/frets2.html") },
            'the power chord': function() { window.location.assign("/chords2.html") },
            'first music lesson': function() { window.location.assign("/rhythm2.html") },
            'reading music': function() { window.location.assign("/lead2.html") },
        
            'go to the top': function() {$('html, body').animate({ scrollTop: 0 }, 0);},
            'go to the bottom': function() {$('html, body').animate({ scrollTop: 9999 }, 0);},
            //opens the mobile menu
             'open menu': function() { $("#mobile-menu").toggleClass('mobile-navigation')},
            'scroll up': function() {$('html, body').animate({ scrollTop: $("html").scrollTop() - 540 },'easeInOutBack');},
            'scroll down': function() {$('html, body').animate({ scrollTop: $("html").scrollTop() + 540 },'easeInOutBack');
                
            },
    };
    
    //       // Tell KITT to use annyang
    //   SpeechKITT.annyang();
    
    //   // Define a stylesheet for KITT to use
    //   SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/1.0.0/themes/flat.css');
    
    //   // Render KITT's interface
    //   SpeechKITT.vroom();
    // }

    // Add our commands to annyang
    annyang.addCommands(commands);
    
    // Start listening.`
    annyang.start();
    }