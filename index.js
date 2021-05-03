var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const synth = window.speechSynthesis;


const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", () => {
    recognition.start();
    console.log("start btn clicked. recording started")
})

recognition.onresult = function (event) {
    const r = event.results;
    const confidence = r[r.length-1][0].confidence;
    const transcript = r[r.length - 1][0].transcript.trim().toLowerCase();
    console.log(transcript + " ,  confidence: " + confidence);
    recognition.stop();

    //tell back
    const utter = new SpeechSynthesisUtterance("You said " + transcript);
    utter.onend = function () {
        recognition.start();
    }
    synth.speak(utter);
}

recognition.onerror = function (event) {
    console.log(event);
    console.log("sorry i couldn't understand what you've just said.")
}