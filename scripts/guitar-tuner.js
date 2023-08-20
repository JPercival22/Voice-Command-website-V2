var Settings = {
    container: document.getElementById("guitar-tuner"),
    backgroundColor: "white", // or hex colors "#ffffff"
    notOkayColor: "orange",
    okayColor: "green",
    fontColor: "black"
};

var SettingsSecondTuner = {
    container: document.getElementById("guitar-tuner"),
    backgroundColor: "white", // or hex colors "#ffffff"
    notOkayColor: "red",
    okayColor: "#69934d",
    fontColor: "black"
};

function initializeTuners() {
    // Create a single or multiple instance of tuners at time
    var tuners = [
        // First tuner
        new OnlineTuner.Controller.GuitareTuner(
            new OnlineTuner.Widget.CircleWidget(
                Settings.container, 
                Settings.backgroundColor, 
                Settings.notOkayColor, 
                Settings.okayColor, 
                Settings.fontColor
            )
        ),
        // Second Tuner
        new OnlineTuner.Controller.GuitareTuner(
            new OnlineTuner.Widget.CircleWidget(
                SettingsSecondTuner.container, 
                SettingsSecondTuner.backgroundColor, 
                SettingsSecondTuner.notOkayColor, 
                SettingsSecondTuner.okayColor, 
                SettingsSecondTuner.fontColor
            )
        )
    ];
    
    // Initialize the tuner with the callbacks
    new OnlineTuner.Analyser(tuners).install(function() {
        console.log("Succesfully initialized");
        
    }, function(errorMessage) {
        console.error("Oops, this shouldn't happen", errorMessage);
    });
}

// Render the guitar tuner on the canvas by running the function
initializeTuners();