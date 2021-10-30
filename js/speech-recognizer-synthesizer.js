var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition,
  SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList,
  speechSynthesizer = window.speechSynthesis,
  utterance = new SpeechSynthesisUtterance();

const speechRecognizer = new SpeechRecognition(),
  speechGrammarList = new SpeechGrammarList(),
  grammar =
    "#JSGF V1.0; grammar colors; public <color> = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | / |";

speechGrammarList.addFromString(grammar, 1);
speechRecognizer.interimResults = true;
speechRecognizer.grammar = speechGrammarList;

window.addEventListener("click", eventHandler);
function eventHandler() {
  speechRecognizer.start();
}

let temp = "";
speechRecognizer.onresult = (event) => {
  temp = event.results[0][0].transcript;

  // Separate other words from mathematical operators and numbers:
  temp = temp.trim();
  temp = temp.replace(/Plus/gi, "+");
  temp = temp.replace(/Divided by/gi, "÷");
  temp = temp.replaceAll("/", "÷");
  temp = temp.replace(/x/gi, "×");
  temp = temp.replace(/Times/gi, "×");
  temp = temp.replace(/multiplication/gi, "×");
  temp = temp.replace(/Subtract/gi, "−");
  temp = temp.replace(/Minus/gi, "-");
  temp = temp.replace(/ /gi, "");
  displayArea.textContent = temp;
};

// When speech recognition has disconnected, operate the operation:
utterance.rate = 0.6;
utterance.volume = 1;
speechRecognizer.onend = () => {
  operateTheValues(displayArea.textContent, "displayArea");
  utterance.text = temp + " is equal to " + displayArea.textContent;
  speechSynthesizer.speak(utterance);
};
