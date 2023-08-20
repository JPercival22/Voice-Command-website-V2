document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const needle = document.querySelector(".needle");

    let isTuning = false;
    let currentNote = "C";

    let audioContext = null;
    let analyser = null;
    let microphone = null;

    // Initial rotation angle for the "C" note
    let centralRotation = 0;

    // Define the notes and their corresponding frequencies
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const baseFrequency = 440; // Frequency of A4 (440 Hz)

    // Create a pitch data array with the frequencies of the notes
    const pitchDataArray = notes.map((note, index) => {
        const semitoneSteps = index - 9; // Steps away from A
        const frequency = baseFrequency * Math.pow(2, semitoneSteps / 12);
        return { note, frequency };
    });

    startButton.addEventListener("click", async function () {
        if (!isTuning) {
            startButton.textContent = "Stop Tuner";
            isTuning = true;
            await startMicrophone();
        } else {
            startButton.textContent = "Start Tuner";
            isTuning = false;
            stopMicrophone();
            updateNeedleRotationCenter(); // Reset the needle to center
        }
    });

    async function startMicrophone() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.fftSize = 2048;
            const dataArray = new Float32Array(analyser.fftSize);
            analyser.getFloatTimeDomainData(dataArray);
            startPitchDetection(dataArray);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    }

    function stopMicrophone() {
        if (audioContext) {
            audioContext.close().then(() => {
                audioContext = null;
                analyser = null;
                microphone = null;
            });
        }
    }

    function startPitchDetection(dataArray) {
        setInterval(() => {
            if (isTuning && analyser) {
                analyser.getFloatTimeDomainData(dataArray);
                const pitch = getPitch(dataArray); // Replace with actual pitch detection logic
                if (pitch) {
                    currentNote = matchPitchToNote(pitch);
                    updateNeedleRotation(currentNote);
                }
            }
        }, 100);
    }

    // Define your getPitch function here, which calculates the pitch from dataArray
    function getPitch(dataArray) {
        const threshold = 0.2; // Adjust as needed
        const minSamples = 10; // Minimum number of samples per period

        let bestOffset = -1;
        let bestCorrelation = 0;

        for (let offset = minSamples; offset < dataArray.length / 2; offset++) {
            let correlation = 0;

            for (let i = 0; i < dataArray.length - offset; i++) {
                correlation += Math.abs(dataArray[i] - dataArray[i + offset]);
            }

            correlation = 1 - correlation / offset;

            if (correlation > bestCorrelation && correlation > threshold) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        }

        if (bestCorrelation > threshold) {
            const sampleRate = audioContext.sampleRate;
            const detectedFrequency = sampleRate / bestOffset;
            return detectedFrequency;
        }

        return null;
    }

    // Match the detected pitch to the closest note
    function matchPitchToNote(pitch) {
        // Find the note with the closest frequency in the pitch data array
        const closestNote = pitchDataArray.reduce((prev, curr) =>
            Math.abs(curr.frequency - pitch) < Math.abs(prev.frequency - pitch) ? curr : prev
        );

        return closestNote.note;
    }

    function updateNeedleRotation(note) {
        const noteIndex = notes.indexOf(note);
        // Calculate the rotation angle for the identified note
        const rotation = noteIndex * 30; // Adjust the rotation factor as needed
        needle.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
    }

    function updateNeedleRotationCenter() {
        // Keep one side fixed at the "C" note (center position)
        needle.style.transform = `translate(-50%, -100%) rotate(${centralRotation}deg)`;
    }
});