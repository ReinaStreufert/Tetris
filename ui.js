(function() {
	window.ui = {};

	ui.scoretext = document.getElementById("scoretext");
	ui.timetext = document.getElementById("timetext");

	let oldscore = 0;
	let oldtime = 0;
	let oldpiece = null;

	ui.onframe = function(time) {
		if (game.score != oldscore) {
			oldscore = game.score;
			ui.scoretext.textContent = game.score.toString();
		}
		let seconds = Math.floor((time - game.timeoffset) / 1000);
		if (oldtime != seconds) {
			oldtime = seconds;
			let clockhours = Math.floor(seconds / 60);
			let clockseconds = seconds % 60;
			let hoursstring;
			let secondsstring;
			if (clockhours < 10) {
				hoursstring = "0" + clockhours.toString();
			} else {
				hoursstring = clockhours.toString();
			}
			if (clockseconds < 10) {
				secondsstring = "0" + clockseconds.toString();
			} else {
				secondsstring = clockseconds.toString();
			}
			ui.timetext.textContent = hoursstring + ":" + secondsstring;
		}
		if (oldpiece != game.currentpiece) {
			if (oldpiece) {
				oldpiece.uisvg.classList.toggle("hidden");
			}
			oldpiece = game.currentpiece;
			game.currentpiece.uisvg.classList.toggle("hidden");
		}
	};
})();
