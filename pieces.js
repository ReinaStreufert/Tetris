(function() {
	window.pieces = {};

	window.pieces.l_left = {};
	let l_left = window.pieces.l_left;
	l_left.color = "#0000F0";
	l_left.uisvg = document.getElementById("piece_icon_l_left");
	l_left.shape = [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 1, y: 0}];

	window.pieces.l_right = {};
	let l_right = window.pieces.l_right;
	l_right.color = "#F0A000";
	l_right.uisvg = document.getElementById("piece_icon_l_right");
	l_right.shape = [{x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: 1, y: -1}];

	window.pieces.mountain = {};
	let mountain = window.pieces.mountain;
	mountain.color = "#A000F0";
	mountain.uisvg = document.getElementById("piece_icon_mountain");
	mountain.shape = [{x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}];

	window.pieces.square = {};
	let square = window.pieces.square;
	square.color = "#F0F000";
	square.uisvg = document.getElementById("piece_icon_square");
	square.shape = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 1, y: -1}];

	window.pieces.straight = {};
	let straight = window.pieces.straight;
	straight.color = "#00F0F0";
	straight.uisvg = document.getElementById("piece_icon_straight");
	straight.shape = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}];

	window.pieces.zigzag_left = {};
	let zigzag_left = window.pieces.zigzag_left;
	zigzag_left.color = "#F00000";
	zigzag_left.uisvg = document.getElementById("piece_icon_zigzag_left");
	zigzag_left.shape = [{x: -1, y: -1}, {x: 0, y: -1}, {x: 0, y: 0}, {x: 1, y: 0}];

	window.pieces.zigzag_right = {};
	let zigzag_right = window.pieces.zigzag_right;
	zigzag_right.color = "#00F000";
	zigzag_right.uisvg = document.getElementById("piece_icon_zigzag_right");
	zigzag_right.shape = [{x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}, {x: 1, y: -1}];

	let pieces = [l_left, l_right, mountain, square, straight, zigzag_left, zigzag_right];

	window.pieces.randompiece = function() {
		return pieces[utils.randint(0, pieces.length)];
		//return straight;
	};
})();
