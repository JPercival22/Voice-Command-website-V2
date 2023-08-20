document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const needle = document.querySelector(".needle");

    let isTuning = false;
    let currentNote = "C";

    let audioContext = null;
    let analyser = null;
    let microphone = null;

    startButton.addEventListener("click", async () => {
        if (!isTuning) {
            startButton.textContent = "Stop Tuner";
            isTuning = true;
            await startMicrophone();
            updateNeedleRotation(currentNote);
        } else {
            startButton.textContent = "Start Tuner";
            isTuning = false;
            stopMicrophone();
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
        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

        setInterval(() => {
            if (isTuning && analyser) {
                analyser.getFloatTimeDomainData(dataArray);
                const pitch = getPitch(dataArray); // Replace with actual pitch detection logic
                if (pitch) {
                    currentNote = notes[Math.floor(pitch) % 12];
                    updateNeedleRotation(currentNote);
                }
            }
        }, 100);
    }

    function getPitch(dataArray) {
        // Simulated pitch detection logic for demonstration
        // In a real application, use a proper pitch detection algorithm
        const sum = dataArray.reduce((acc, value) => acc + value, 0);
        const average = sum / dataArray.length;
        const pitch = Math.abs(440 + average * 100);
        return pitch;
    }

    function updateNeedleRotation(note) {
        const noteIndex = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(note);
        const rotation = (noteIndex * 30);
        needle.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
    }
    
});