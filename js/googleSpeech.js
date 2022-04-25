const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const microphoneIcon = document.querySelector('.microfon');
const serchInput = document.querySelector('.search__input');

const mass = [];

var recognizer = new webkitSpeechRecognition();

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = false;

// Какой язык будем распознавать?
recognizer.lang = 'ru-Ru';

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
   var result = event.results[event.resultIndex];
   // console.log('Промежуточный результат: ', result[0].transcript);
   const text = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
   // console.log(text[0]);
   serchInput.value = text[0].toUpperCase() + text.substring(1);
   // if (result.isFinal) {
   //    alert('Вы сказали: ' + result[0].transcript);
   // } else {
   //    console.log('Промежуточный результат: ', result[0].transcript);
   // }
};
microphoneIcon.onclick = speech;
function speech() {
   // Начинаем слушать микрофон и распознавать голос
   recognizer.start();
}

var synth = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance('How about we say this now? This is quite a long sentence to say.');

function talk() {
   synth.speak(utterance);
}

function stop() {
   synth.pause();
}