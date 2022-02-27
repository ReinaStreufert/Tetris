(function() {
	window.board = {};

	let lines = [];

	board.clear = function() {
		lines = [];
		board.lines = lines;
		for (let i = 0; i < settings.blockresolution; i++) {
			lines.push([]);
		}
		/*for (let x = 0; x < settings.blockresolution - 1; x++) {
			lines[settings.blockresolution - 1].push({x: x, color: "red"});
			lines[settings.blockresolution - 2].push({x: x, color: "red"});
			lines[settings.blockresolution - 3].push({x: x, color: "red"});
		}*/
	};
	board.enumeratepixels = function(callback) { // callback(x, y, color)
		for (let y = 0; y < lines.length; y++) {
			let line = lines[y];
			for (let i = 0; i < line.length; i++) {
				let pixel = line[i];
				callback(pixel.x, y, pixel.color)
			}
		}
	};
	board.shapeintersects = function(shape) {
		for (let i = 0; i < shape.length; i++) {
			let pixel = shape[i];
			let line = lines[pixel.y];
			if (line == null) {
				continue;
			}
			for (let linei = 0; linei < line.length; linei++) {
				let existingpixel = line[linei];
				if (pixel.x == existingpixel.x) {
					return true;
				}
			}
		}
		return false;
	};
	board.addshape = function(shape, color) {
		for (let i = 0; i < shape.length; i++) {
			let pixel = shape[i];
			let line = lines[pixel.y]
			if (line == null) {
				continue;
			}
			line.push({x: pixel.x, color: color});
		}
	};
	board.clearline = function(y) {
		lines.splice(y, 1);
		lines.unshift([]);
	};
	board.islinefull = function(y) {
		return (lines[y].length == settings.blockresolution);
	}

	board.clear();
})();
