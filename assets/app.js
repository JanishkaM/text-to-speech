const clearTextBtn = document.querySelector('[data-clear-text-btn]')
const submitTextBtn = document.querySelector('[data-submit-text-btn]')
const pauseVoiceBtn = document.querySelector('[data-pause-voice-btn]')
const resumeVoiceBtn = document.querySelector('[data-resume-voice-btn]')
const stopVoiceBtn = document.querySelector('[data-stop-voice-btn]')
const popup = document.querySelector('[data-popup]')
const app = document.querySelector('[data-app]')
const popupBtn = document.querySelector('[data-popup-btn]')
const speedof = document.querySelector('[data-speed]')
const pasteBtn = document.querySelector('[data-paste-btn]')
const textArea = document.querySelector('[data-text-input]')
const select = document.querySelector('[data-select]')
let utterance
let voices

// Close Popup Button Function
popupBtn.addEventListener('click',() => {
    popup.style = 'top: -300%;'
    app.classList.remove('d-none')
})
// Paste Button Function
pasteBtn.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText()
        textArea.value += text;
    } catch (error) {
        textArea.value = "Not working try again. Maybe Permission denied";
    }
})

// Submit Button Function
submitTextBtn.addEventListener('click', () => {
    speechSynthesis.cancel()
    utterance = new SpeechSynthesisUtterance(textArea.value)
    utterance.voice = voices[select.value]
    utterance.rate = speedof.value
    speechSynthesis.speak(utterance)
    clearTextBtn.disabled = true
    pasteBtn.disabled = true
    select.disabled = true
    speedof.disabled = true
    textArea.disabled = true
    utterance.addEventListener('end', () => {
        textArea.disabled = false
        speedof.disabled = false
        select.disabled = false
        pasteBtn.disabled = false
        clearTextBtn.disabled = false
    })

})
// Clear Button function
clearTextBtn.addEventListener('click', () => {
    textArea.value = ""
})
// Stop Button Function
stopVoiceBtn.addEventListener('click', () => {
    speechSynthesis.resume()
    speechSynthesis.cancel()
    textArea.disabled = false
    speedof.disabled = false
    select.disabled = false
    pasteBtn.disabled = false
    clearTextBtn.disabled = false
})

// pause Button Function
pauseVoiceBtn.addEventListener('click', () => {
    speechSynthesis.pause(utterance)
    pauseVoiceBtn.classList.add('d-none')
    resumeVoiceBtn.classList.remove('d-none')
})
// Resume Button Function
resumeVoiceBtn.addEventListener('click', () => {
    speechSynthesis.resume(utterance)
    pauseVoiceBtn.classList.remove('d-none')
    resumeVoiceBtn.classList.add('d-none')
})


// Wait for the SpeechSynthesis API to be ready
window.speechSynthesis.onvoiceschanged = function () {
    // Get a list of all available voices
    voices = window.speechSynthesis.getVoices();
    // Log the list of voices to the console
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === 'Google UK English Male') {
            select.innerHTML += `<option value="${i}" selected>${voices[i].name}</option>`
        } else {
            select.innerHTML += `<option value="${i}">${voices[i].name}</option>`
        }
    }
};


