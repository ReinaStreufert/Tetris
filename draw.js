(function() {
	window.draw = {};
	draw.canvas = document.getElementById("canvas");

	if (!window.devicePixelRatio) {
		window.devicePixelRatio = 1;
	}
	draw.canvas.width = 800 * window.devicePixelRatio;
	draw.canvas.height = 800 * window.devicePixelRatio;

	let canvas = draw.canvas;
	let ctx = canvas.getContext("2d");

	let drawblock = function(x, y, color) {
		ctx.fillStyle = color;
		let blocksize = canvas.width / settings.blockresolution;
		let blockmargin = settings.blockmargin * window.devicePixelRatio;
		ctx.fillRect(x * blocksize, y * blocksize, blocksize - blockmargin, blocksize - blockmargin);
	}

	let ondraw = function(time) {
		game.onframe(time);
		ui.onframe(time);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let transformedshape = utils.transformshape(game.currentpiece.shape, game.currentrotation, game.currentx, game.currenty);
		for (let i = 0; i < transformedshape.length; i++) {
			let pixel = transformedshape[i];
			drawblock(pixel.x, pixel.y, game.currentpiece.color);
		}
		board.enumeratepixels(drawblock);
		requestAnimationFrame(ondraw);
	};

	draw.startdrawing = function() {
		requestAnimationFrame(ondraw);
	}
})();
