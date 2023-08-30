document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggle-tuner");
    var correlation_worker = new Worker("scripts/correlation_worker.js");
    var isTunerRunning = false;

    correlation_worker.addEventListener("message", interpret_correlation_result);

    toggleButton.addEventListener("click", function () {
        if (isTunerRunning) {
            correlation_worker.terminate();
            toggleButton.textContent = "Start Tuner";
            isTunerRunning = false;
        } else {
            initialize();
            toggleButton.textContent = "Stop Tuner";
            isTunerRunning = true;
        }
    });

    function initialize() {
        var get_user_media = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        get_user_media.call(navigator, { "audio": true }, use_stream, function () { });
    }

    function use_stream(stream) {
        var audio_context = new AudioContext();
        var microphone = audio_context.createMediaStreamSource(stream);
        window.source = microphone; // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=934512
        var script_processor = audio_context.createScriptProcessor(1024, 1, 1);

        script_processor.connect(audio_context.destination);
        microphone.connect(script_processor);

        var buffer = [];
        var sample_length_milliseconds = 100;
        var recording = true;

        window.capture_audio = function (event) {
            if (!recording)
                return;

            buffer = buffer.concat(Array.prototype.slice.call(event.inputBuffer.getChannelData(0)));

            if (buffer.length > sample_length_milliseconds * audio_context.sampleRate / 1000) {
                recording = false;

                correlation_worker.postMessage({
                    "timeseries": buffer,
                    "test_frequencies": test_frequencies,
                    "sample_rate": audio_context.sampleRate
                });

                buffer = [];
                setTimeout(function () { recording = true; }, 250);
            }
        };

        script_processor.onaudioprocess = window.capture_audio;
    }

    function interpret_correlation_result(event) {
        var timeseries = event.data.timeseries;
        var frequency_amplitudes = event.data.frequency_amplitudes;

        var magnitudes = frequency_amplitudes.map(function (z) { return z[0] * z[0] + z[1] * z[1]; });

        var maximum_index = -1;
        var maximum_magnitude = 0;
        for (var i = 0; i < magnitudes.length; i++) {
            if (magnitudes[i] <= maximum_magnitude)
                continue;

            maximum_index = i;
            maximum_magnitude = magnitudes[i];
        }

        var average = magnitudes.reduce(function (a, b) { return a + b; }, 0) / magnitudes.length;
        var confidence = maximum_magnitude / average;
        var confidence_threshold = 10;
        if (confidence > confidence_threshold) {
            var dominant_frequency = test_frequencies[maximum_index];
            document.getElementById("note-name").textContent = dominant_frequency.name;
            document.getElementById("frequency").textContent = dominant_frequency.frequency;
        }
    }

    // Define the set of test frequencies that we'll use to analyze microphone data.
    var C2 = 65.41; // C2 note, in Hz.
    var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var test_frequencies = [];
    for (var i = 0; i < 30; i++) {
        var note_frequency = C2 * Math.pow(2, i / 12);
        var note_name = notes[i % 12];
        var note = { "frequency": note_frequency, "name": note_name };
        var just_above = { "frequency": note_frequency * Math.pow(2, 1 / 48), "name": note_name + " (a bit sharp)" };
        var just_below = { "frequency": note_frequency * Math.pow(2, -1 / 48), "name": note_name + " (a bit flat)" };
        test_frequencies = test_frequencies.concat([just_below, note, just_above]);
    }
});