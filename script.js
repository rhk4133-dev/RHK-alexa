const output = document.getElementById("output");

/* SPEECH RECOGNITION */
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";

/* SEND TEXT TO BACKEND */
async function sendText(textFromVoice) {
  const input = textFromVoice || document.getElementById("text").value;

  output.textContent = "Thinking...";

  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input })
  });

  const data = await res.json();
  output.textContent = data.reply || "Error occurred";

  speak(data.reply);
}

/* VOICE INPUT */
function startVoice() {
  recognition.start();
}

recognition.onresult = (e) => {
  const text = e.results[0][0].transcript;
  document.getElementById("text").value = text;
  sendText(text);
};

/* VOICE OUTPUT */
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.volume = 1;
  msg.rate = 1;
  msg.pitch = 1;
  speechSynthesis.speak(msg);
}
