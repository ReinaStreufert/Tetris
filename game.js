(function() {
	window.game = {};

	game.currentpiece = null;
	game.currentrotation = 0;
	game.currentx = 0;
	game.currenty = 0;
	game.score = 0;
	game.timeoffset = 0;

	let laststep = 0;
	let currentinterval = settings.slowfallinginterval;
	let wastetris = false;

	let confineshape = function(shape) {
		let minx = Number.MAX_SAFE_INTEGER;
		let maxx = -Number.MAX_SAFE_INTEGER;
		for (let i = 0; i < shape.length; i++) {
			let pixel = shape[i];
			if (pixel.x < minx) {
				minx = pixel.x;
			}
			if (pixel.x > maxx) {
				maxx = pixel.x;
			}
		}
		if (minx < 0) {
			return -minx;
		} else if (maxx >= settings.blockresolution) {
			return -(maxx - (settings.blockresolution - 1));
		} else {
			return 0;
		}
	}

	let shiftx = function(shape) {
		if (!board.shapeintersects(shape)) {
			return 0;
		}
		let rightshift = 0;
		for (;;) {
			let translatedshape = utils.transformshape(shape, 0, rightshift, 0);

			let minx = Number.MAX_SAFE_INTEGER;
			let maxx = -Number.MAX_SAFE_INTEGER;
			for (let i = 0; i < translatedshape.length; i++) {
				let pixel = translatedshape[i];
				if (pixel.x < minx) {
					minx = pixel.x;
				}
				if (pixel.x > maxx) {
					maxx = pixel.x;
				}
			}
			if (maxx >= settings.blockresolution) {
				rightshift = 0;
				break;
			}
			if (board.shapeintersects(translatedshape)) {
				break;
			} else {
				rightshift++;
			}
		}
		let leftshift = 0;
		for (;;) {
			let translatedshape = utils.transformshape(shape, 0, leftshift, 0);

			let minx = Number.MAX_SAFE_INTEGER;
			let maxx = -Number.MAX_SAFE_INTEGER;
			for (let i = 0; i < translatedshape.length; i++) {
				let pixel = translatedshape[i];
				if (pixel.x < minx) {
					minx = pixel.x;
				}
				if (pixel.x > maxx) {
					maxx = pixel.x;
				}
			}
			if (minx < 0) {
				leftshift = 0;
				break;
			}
			if (board.shapeintersects(translatedshape)) {
				break;
			} else {
				leftshift--;
			}
		}
		if (leftshift == 0 && rightshift == 0) {
			return null;
		} else if (leftshift == 0) {
			return rightshift;
		} else if (rightshift == 0) {
			return leftshift
		} else if (Math.abs(leftshift) < Math.abs(rightshift)) {
			return leftshift;
		} else if (Math.abs(rightshift) <= Math.abs(leftshift)) {
			return rightshift;
		}
	}

	let findx = function(shape) {
		let xtranslate = 0;
		let wrapped = false;
		for (;;) {
			let translatedshape = utils.transformshape(shape, 0, xtranslate, 0);

			let minx = Number.MAX_SAFE_INTEGER;
			let maxx = -Number.MAX_SAFE_INTEGER;
			for (let i = 0; i < translatedshape.length; i++) {
				let pixel = translatedshape[i];
				if (pixel.x < minx) {
					minx = pixel.x;
				}
				if (pixel.x > maxx) {
					maxx = pixel.x;
				}
			}
			if (maxx >= settings.blockresolution || minx < 0) {
				if (wrapped) {
					return null;
				} else {
					wrapped = true;
					xtranslate -= minx;
					continue;
				}

			}
			if (board.shapeintersects(translatedshape)) {
				xtranslate++;
			} else {
				break;
			}
		}
		return xtranslate;
	};

	let nextshape = function(time) {
		if (game.currentpiece) {
			board.addshape(utils.transformshape(game.currentpiece.shape, game.currentrotation, game.currentx, game.currenty), game.currentpiece.color);
			let clearcount = 0;
			for (let y = 0; y < settings.blockresolution; y++) {
				if (board.islinefull(y)) {
					clearcount++;
					board.clearline(y);
				}
			}
			if (clearcount == 4) {
				if (wastetris) {
					game.score += 1200;
				} else {
					game.score += 800;
				}
				wastetris = true;
			} else {
				wastetris = false;
				game.score += clearcount * 100;
			}
		}
		game.currentpiece = pieces.randompiece();
		game.currentrotation = 0;
		game.currenty = 0;
		game.currentx = utils.randint(0, settings.blockresolution);
		let xoffset = findx(utils.transformshape(game.currentpiece.shape, 0, game.currentx, game.currenty));
		if (xoffset == null) {
			gameover(time);
			return;
		}
		game.currentx += xoffset;
	};
	let gameover = function(time) {
		board.clear();
		game.score = 0;
		game.timeoffset = time;
		game.currentpiece = null;
		wastetris = false;
		nextshape(time);
	}
	game.onframe = function(time) {
		let elapsed = time - laststep;
		if (elapsed > currentinterval) {
			laststep = time;
			game.currenty++;
			let transformedshape = utils.transformshape(game.currentpiece.shape, game.currentrotation, game.currentx, game.currenty);
			if (board.shapeintersects(transformedshape)) {
				game.currenty--;
				nextshape(time);
				return;
			}
			let maxy = -Number.MAX_SAFE_INTEGER;
			for (let i = 0; i < transformedshape.length; i++) {
				let pixel = transformedshape[i];
				if (pixel.y > maxy) {
					maxy = pixel.y
				}
			}
			if (maxy >= settings.blockresolution) {
				game.currenty--;
				nextshape(time);
			}
		}
	};
	document.addEventListener("keydown", function(e) {
		let oldx = game.currentx;
		let oldrotation = game.currentrotation;
		let changemade = false;

		let key = e.key.toLowerCase();

		if (key == "a") {
			changemade = true;
			game.currentx--;
		} else if (key == "d") {
			changemade = true;
			game.currentx++;
		} else if (key == "arrowright") {
			changemade = true;
			game.currentrotation--;
			if (game.currentrotation < 0) {
				game.currentrotation = 3;
			}
		} else if (key == "arrowleft") {
			changemade = true;
			game.currentrotation++;
			if (game.currentrotation > 3) {
				game.currentrotation = 0;
			}
		} else if (key == "s") {
			currentinterval = settings.fastfallinginterval;
		}
		if (changemade) {
			
			game.currentx += confineshape(utils.transformshape(game.currentpiece.shape, game.currentrotation, game.currentx, game.currenty));
			let xshift = shiftx(utils.transformshape(game.currentpiece.shape, game.currentrotation, game.currentx, game.currenty));
			if (xshift == null) {
				game.currentx = oldx;
				game.currentrotation = oldrotation;
			} else {
				game.currentx += xshift;
			}
		}
	});
	document.addEventListener("keyup", function(e) {
		if (e.key == "s") {
			currentinterval = settings.slowfallinginterval;
		}
	});

	nextshape();
	draw.startdrawing();
})();
