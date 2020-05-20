const audioContext = new AudioContext();
const gainNode = new GainNode(audioContext);
const pannerNode = new StereoPannerNode(audioContext, { pan: 0 });
const audioElement = document.querySelector('audio');
const track = audioContext.createMediaElementSource(audioElement);

const playbackButton = document.querySelector('i');
const volumeControl = document.querySelector('#volume');
const pannerControl = document.querySelector('#panner');

track.connect(gainNode).connect(pannerNode).connect(audioContext.destination);

playbackButton.addEventListener('click', function() {
	
	if (audioContext.state === 'suspended') {
		audioContext.resume();
	}

	if (this.classList.contains('fa-play')) {
		audioElement.play();
	} else {
		audioElement.pause();
	}

	this.classList.toggle('fa-play');
	this.classList.toggle('fa-pause');

}, false);

audioElement.addEventListener('ended', () => {
	playbackButton.classList.toggle('fa-play');
	playbackButton.classList.toggle('fa-pause');
}, false);

volumeControl.addEventListener('input', function() {
	gainNode.gain.value = this.value;
});

pannerControl.addEventListener('input', function() {
	pannerNode.pan.value = this.value;
});

