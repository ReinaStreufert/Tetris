(function() {
	window.utils = {};

	utils.randint = function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};
	utils.transformshape = function(shape, rotate, translatex, translatey) {
		let newshape = [];
		for (let i = 0; i < shape.length; i++) {
			let pixel = shape[i];
			let newpixel = {};
			if (rotate == 0) {
				newpixel.x = pixel.x;
				newpixel.y = pixel.y;
			} else if (rotate == 1) {
				newpixel.x = pixel.y;
				newpixel.y = -pixel.x;
			} else if (rotate == 2) {
				newpixel.x = -pixel.x;
				newpixel.y = -pixel.y;
			} else if (rotate == 3) {
				newpixel.x = -pixel.y;
				newpixel.y = pixel.x;
			}
			newpixel.x += translatex;
			newpixel.y += translatey;
			newshape.push(newpixel);
		}
		return newshape;
	};
})();
