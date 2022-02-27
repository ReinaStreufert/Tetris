(function() {
	window.settings = {
		blockresolution: 20,
		blockmargin: 4,
		slowfallinginterval: 500,
		fastfallinginterval: 50
	};
	document.body.style.setProperty("--block-margin", settings.blockmargin.toString() + "px");
})();
