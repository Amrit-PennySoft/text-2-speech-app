
const synth = window.speechSynthesis;


//dom
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect= document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//init voice array
let voices = [];

const getVoices = () => {
	voices = synth.getVoices();

	//looping through voices and creating an option for each voice.
	voices.forEach(voice =>{
		//option element
		const option = document.createElement('option');
		//fill option with voice and languages
		option.textContent = voice.name + '(' + voice.lang + ')';

		//set option Attr
		option.setAttribute('data-lang', voice.lang);
		option.setAttribute('data-name', voice.lang);
		voiceSelect.appendChild(option);

	});
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
	synth.onvoiceschanged = getVoices;
}

//speak
const speak = () => {
	//check
	if (synth.speaking) {
		console.error('Already speaking...');
		return;
	}
	if (textInput.value !== '') {
	//add bg animation
	 body.style.background = '#ffc259 url(wave.gif)';
	 body.style.backgroundRepeat = 'repeat-x';
	 body.style.backgroundSize = '100% 100%';

	 // get speak texxt
	 const speakText = new SpeechSynthesisUtterance(textInput.value);

	 // end of speaking
	 speakText.onend = e => {
	 	console.log('Done speaking...');
	 	body.stylee.background = 'orange';

	 };

	 // speak err
	 speakText.onerror= e => {
	 	console.error('Something went wrong');
	 };

	 // selected voice
	 const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
	 	'data-name'
	 	);

	 // looping through voices
	 voices.forEach(voice => {
	 	if (voice.name === selectedVoice) {
	 		speakText.voice = voice;
	 	}
	 });

	 // setting pitch and the rate of the voice
	 speakText.rate = rate.value;
	 speakText.pitch = pitch.value;
	 //speaj
	 synth.speak(speakText);
	}
};

// Event Listeners

// form Submit
textForm.addEventListener('submit', e => {
	e.preventDefault();
	speak();
	textInput.blur();
});

// rate vlaue change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());