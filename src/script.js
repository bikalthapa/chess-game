import { useState } from "react";

let pcsSelect = false;
const pieces = {
	'King': '♔',
	'Queen': '♕',
	'Rook': '♖',
	'Bishop': '♗',
	'Knight': '♘',
	'Pawn': '♙',
};
function get_pcs(set_type, type) {
	let pcs_type = type;
	if (set_type === "head") {
		return [
			{ pcs: pieces.Rook, typ: pcs_type },
			{ pcs: pieces.Knight, typ: pcs_type },
			{ pcs: pieces.Bishop, typ: pcs_type },
			{ pcs: pieces.King, typ: pcs_type },
			{ pcs: pieces.Queen, typ: pcs_type },
			{ pcs: pieces.Bishop, typ: pcs_type },
			{ pcs: pieces.Knight, typ: pcs_type },
			{ pcs: pieces.Rook, typ: pcs_type }
		];
	} else if (set_type === "pawn") {
		return Array(8).fill({ pcs: pieces.Pawn, typ: pcs_type });
	}

}
// Initialising the board
const initialBoard = [
	// get_pcs("head", false),
	// get_pcs("pawn", false),
	Array(8).fill({ pcs: '', typ: '' }),
	Array(8).fill({ pcs: '', typ: '' }),

	Array(8).fill({ pcs: '', typ: '' }),
	Array(8).fill({ pcs: '', typ: '' }),
	Array(8).fill({ pcs: '', typ: '' }),
	Array(8).fill({ pcs: '', typ: '' }),

	Array(8).fill({ pcs: '', typ: '' }),
	Array(8).fill({ pcs: '', typ: '' })

	// get_pcs("pawn", true),
	// get_pcs("head", true)
];


class Moves {
	constructor(board) {
		this.position = { x: '', y: '' };
		this.possibleMoves = [];
		this.bord = board;
		this.indicate_off_delay = 3000;
	}
	setInitPos(posx, posy) {
		this.position = { x: posx, y: posy };
	}
	can_moved(mover, movPos) {
		if (this.bord[movPos.x][movPos.y].pcs === '') {// Possible Moves is empty so you can move there
			return true;
		} else if (this.bord[movPos.x][movPos.y].typ === mover) {// Possible Moves contains own pieces so can't move
			return false;
		} else {// Possible moves isn't empty and doesn't contains own pieces so it can be moved
			return true;
		}
	}
	isJumpAllowed(player, posx) {
		if (player === false && posx === 1) {
			return true;
		} else if (player === true && posx === 6) {
			return true;
		}
	}
	is_empty(pos) {
		if (this.bord[pos.x][pos.y].pcs === '') {
			return true;
		}
		return false;
	}
	isPosExists(pos) {
		if (pos.x > 7 || pos.x < 0) {
			return false;
		} else if (pos.y > 7 || pos.y < 0) {
			return false;
		}
		return true;
	}
	isPromoted(player, posx) {
		if (player === false && posx === 7) {
			return true;
		} else if (player === true && posx === 0) {
			return true;
		}
		return false;
	}
	indicateMoves(status) {
		let mov_id;
		if (status === true) {
			for (let i = 0; i < this.possibleMoves.length; i++) {
				mov_id = "x" + this.possibleMoves[i].y + "_y" + this.possibleMoves[i].x;
				document.getElementById(mov_id).classList.add("possible");
			}
			setTimeout(() => {// Removing the color after delay
				this.indicateMoves(false);
			}, this.indicate_off_delay);
		} else {
			for (let i = 0; i < this.possibleMoves.length; i++) {
				mov_id = "x" + this.possibleMoves[i].y + "_y" + this.possibleMoves[i].x;
				document.getElementById(mov_id).classList.remove("possible");
			}
		}
	}
	isMovExists(mov) {
		var isExists = this.possibleMoves.some((pos) => pos.x === mov.x && pos.y === mov.y);
		return isExists;
	}
	movePcsTo(pos) {
		this.bord[pos.x][pos.y] = this.bord[this.position.x][this.position.y];
		this.bord[this.position.x][this.position.y] = {pcs: '', typ: ''};
		console.log("Inside the class");
		console.log(this.bord);		
	}
	set_valid_moves(plyr, tempPos){
		if(this.isPosExists(tempPos) && this.can_moved(plyr, tempPos)){
			this.possibleMoves.push(tempPos);
		}
		return 0;
	}


	pawnPossibleMoves(plyr) {
		let dir = plyr === false ? 1 : -1;
		var temp = {
			front: { x: this.position.x + dir * 1, y: this.position.y },
			jump: { x: this.position.x + dir * 2, y: this.position.y },
			right: { x: this.position.x + dir * 1, y: this.position.y + dir * 1 },
			left: { x: this.position.x + dir * 1, y: this.position.y - dir * 1 }
		}
		// 1 step  & 2 step forward moves //
		if (this.isPosExists(temp.front) === true) {
			if (this.is_empty(temp.front) && this.can_moved(plyr, temp.front)) {
				this.possibleMoves.push(temp.front);

				// 2 setp forward moves can't jump if it contains an element//
				let firstStepEmpty = this.is_empty(temp.front);
				if(this.isPosExists(temp.jump)){
					if (this.is_empty(temp.jump) && this.isJumpAllowed(plyr, this.position.x) && firstStepEmpty && this.can_moved(plyr, temp.jump)) {
						this.possibleMoves.push(temp.jump);
					}
				}

			}
		}

		// Right Diagonal Moves //
		if (this.isPosExists(temp.right) === true) {
			if (this.can_moved(plyr, temp.right) && !this.is_empty(temp.right)) {
				this.possibleMoves.push(temp.right);
			}
		}

		// left Diagonal Moves//
		if (this.isPosExists(temp.left) === true) {
			if (this.can_moved(plyr, temp.left) && !this.is_empty(temp.left)) {
				this.possibleMoves.push(temp.left);
			}
		}
	}
	rookPossibleMoves(plyr){
		let temp;

		// from current position to the top
		for(let i = 1; i<(8-this.position.y); i++){
			temp = {x: this.position.x, y: this.position.y + i};
			this.set_valid_moves(plyr,temp);
			if(!this.is_empty(temp)){
				break;
			}
		}
		// From current position to the bottom
		for(let i = 1; i<=this.position.y; i++){
			temp = {x: this.position.x, y: this.position.y -i};
			this.set_valid_moves(plyr,temp);
			if(!this.is_empty(temp)){
				break;
			}
		}
		// From current position to the right side 
		for(let i = 1; i<=this.position.x; i++){
			temp = {x: this.position.x-i, y: this.position.y};
			this.set_valid_moves(plyr,temp);
			if(!this.is_empty(temp)){
				break;
			}
		}
		// From current position to the left side
		for(let i = 1; i<(8-this.position.x); i++){
			temp = {x: this.position.x+i, y: this.position.y};
			this.set_valid_moves(plyr,temp);
			if(!this.is_empty(temp)){
				break;
			}
		}
	}
	knightPossibleMoves(plyr){
		let Vx = 1, Vy = 1, Z = 1, Zd;
		let temp_position = { x: '', y: '' };
		if (Z === 1)
			Zd = 0;

		for (let i = 0; i < 8; i++) {
			Vy = i%2===0?1:-1;
			temp_position = { x: this.position.x + Vx * (2 * Z + Zd), y: this.position.y + Vy * (2 * Zd + Z) };

			this.set_valid_moves(plyr, temp_position);


			if (Vy === (-1)) {
				Vx = Vx * (-1);
			}

			if (Vx === (-1) && Vy === (-1)) {
				if (Z === 1) {
					Z = 0;
					Zd = 1;
				} else {
					Z = 1;
					Zd = 0;
				}
			}
		}
	}
	bishopPossibleMoves(plyr){
		let temp_position = { x: '', y: '' };


		for (let i = 1; i <(8 - this.position.x); i++) {// for the top left diagonal
			temp_position = {x: this.position.x + i, y: this.position.y + i };
			if(this.isPosExists(temp_position)){
				this.set_valid_moves(plyr,temp_position);
				if(!this.is_empty(temp_position)){
						break;
				}
			}
		}
		for(let i = 1; i<=this.position.x; i++){// For the top right diagonal
			temp_position = {x: this.position.x - i, y: this.position.y+i};
			if(this.isPosExists(temp_position)){
				this.set_valid_moves(plyr,temp_position);
				if(!this.is_empty(temp_position)){
					break;
				}
			}
		}
		for(let i = 1; i<=this.position.x; i++){// for the bottom right diagonal //
			temp_position = {x: this.position.x-i,y: this.position.y-i};
			if(this.isPosExists(temp_position)){
				this.set_valid_moves(plyr,temp_position);
				if(!this.is_empty(temp_position)){
					break;
				}
			}
		}
		for(let i = 1; i<(8-this.position.x); i++){// for the bottom left diagonal //
			temp_position = {x: this.position.x+i,y: this.position.y-i};
			if(this.isPosExists(temp_position)){
				this.set_valid_moves(plyr,temp_position);
				if(!this.is_empty(temp_position)){
					break;
				}
			}
		}
	}
}


function Board() {


	// const [bord, setbord] = useState(initialBoard);


	var mov = new Moves(initialBoard);
	var bord = mov.bord;
	mov.bord[7][Math.ceil(Math.random()*7)] = {pcs: pieces.Knight, typ: false};
	mov.bord[6][Math.ceil(Math.random()*7)] = {pcs: pieces.Knight, typ: true};
	mov.bord[5][Math.ceil(Math.random()*7)] = {pcs: pieces.Knight, typ: false};
	mov.bord[4][Math.ceil(Math.random()*7)] = {pcs: pieces.Knight, typ: true};

	mov.bord[3][Math.ceil(Math.random()*7)] = {pcs: pieces.Knight, typ: false};
	mov.bord[2][Math.ceil(Math.random()*7)] = {pcs: pieces.Knight, typ: true};
	mov.bord[1][Math.ceil(Math.random()*7)] = {pcs: pieces.Knight, typ: false};
	mov.bord[0][Math.ceil(Math.random()*7)] = {pcs: pieces.Knight, typ: true};

	// Main Logic Starts here
	function identify_pieces(position) {
		var inside_box = bord[position.x][position.y];

		if (pcsSelect === true) {
			let clk_position = { x: position.x, y: position.y };
			if (mov.isMovExists(clk_position) === true) {
				// bord[clk_position.x][clk_position.y] = bord[position.x][position.y];
				// bord[position.x][position.y] = {pcs: '',typ: ''};
				mov.movePcsTo(clk_position);
				console.log("from outside");
				console.log(bord);
				pcsSelect = false;
			} else {// clear possible Moves if it is clk on other box
				mov.possibleMoves = [];
				pcsSelect = false;
			}
		} else {
			if (inside_box.pcs === pieces.Pawn) {
				pcsSelect = true;
				pawn(position, inside_box.typ);
			}else if(inside_box.pcs === pieces.Rook){
				pcsSelect = true;
				rook(position, inside_box.typ);
			}else if(inside_box.pcs === pieces.Knight){
				pcsSelect = true;
				knight(position, inside_box.typ);
			}else if(inside_box.pcs === pieces.Bishop){
				pcsSelect = true;
				bishop(position, inside_box.typ);
			}
		}
	}

	// Pawn moves
	function pawn(position, player) {
		mov.setInitPos(position.x, position.y);
		mov.possibleMoves = [];
		mov.pawnPossibleMoves(player);
		mov.indicateMoves(true);
	}
	// For Rook Moves
	function rook(position, player){
		mov.setInitPos(position.x, position.y);
		mov.possibleMoves = [];
		mov.rookPossibleMoves(player);
		mov.indicateMoves(true);
	}
	// For Knight Moves
	function knight(position, player){
		mov.setInitPos(position.x, position.y);
		mov.possibleMoves = [];
		mov.knightPossibleMoves(player);
		mov.indicateMoves(true);
	}
	// For bishop moves //
	function bishop(position, player){
		mov.setInitPos(position.x, position.y);
		mov.possibleMoves = [];
		mov.bishopPossibleMoves(player);
		mov.indicateMoves(true);
	}
	// Handeling the click events //
	const boxEvent = (e) => {
		var selected = e.target;
		if (selected.classList.contains('box')) {
			var clk = {
				id: selected.id,
				x: parseInt(selected.id.charAt(4)),
				y: parseInt(selected.id.charAt(1))// x and y are interchanged //
			}
			identify_pieces(clk);
		}
	}

	function color(typ) {
		if (typ === true) {
			return 'black';
		}
		return 'white';
	}


	return (
		<>
			<div className="container chessboard" onClick={boxEvent}>
				<div className="box_row">
					<div className="black box" style={{ color: color(bord[7][0].typ) }} id="x0_y7">{bord[7][0].pcs}</div>
					<div className="white box" style={{ color: color(bord[7][1].typ) }} id="x1_y7">{bord[7][1].pcs}</div>
					<div className="black box" style={{ color: color(bord[7][2].typ) }} id="x2_y7">{bord[7][2].pcs}</div>
					<div className="white box" style={{ color: color(bord[7][3].typ) }} id="x3_y7">{bord[7][3].pcs}</div>
					<div className="black box" style={{ color: color(bord[7][4].typ) }} id="x4_y7">{bord[7][4].pcs}</div>
					<div className="white box" style={{ color: color(bord[7][5].typ) }} id="x5_y7">{bord[7][5].pcs}</div>
					<div className="black box" style={{ color: color(bord[7][6].typ) }} id="x6_y7">{bord[7][6].pcs}</div>
					<div className="white box" style={{ color: color(bord[7][7].typ) }} id="x7_y7">{bord[7][7].pcs}</div>
				</div>
				<div className="box_row">
					<div className="white box" style={{ color: color(bord[6][0].typ) }} id="x0_y6">{bord[6][0].pcs}</div>
					<div className="black box" style={{ color: color(bord[6][1].typ) }} id="x1_y6">{bord[6][1].pcs}</div>
					<div className="white box" style={{ color: color(bord[6][2].typ) }} id="x2_y6">{bord[6][2].pcs}</div>
					<div className="black box" style={{ color: color(bord[6][3].typ) }} id="x3_y6">{bord[6][3].pcs}</div>
					<div className="white box" style={{ color: color(bord[6][4].typ) }} id="x4_y6">{bord[6][4].pcs}</div>
					<div className="black box" style={{ color: color(bord[6][5].typ) }} id="x5_y6">{bord[6][5].pcs}</div>
					<div className="white box" style={{ color: color(bord[6][6].typ) }} id="x6_y6">{bord[6][6].pcs}</div>
					<div className="black box" style={{ color: color(bord[6][7].typ) }} id="x7_y6">{bord[6][7].pcs}</div>
				</div>
				<div className="box_row">
					<div className="black box" style={{ color: color(bord[5][0].typ) }} id="x0_y5">{bord[5][0].pcs}</div>
					<div className="white box" style={{ color: color(bord[5][1].typ) }} id="x1_y5">{bord[5][1].pcs}</div>
					<div className="black box" style={{ color: color(bord[5][2].typ) }} id="x2_y5">{bord[5][2].pcs}</div>
					<div className="white box" style={{ color: color(bord[5][3].typ) }} id="x3_y5">{bord[5][3].pcs}</div>
					<div className="black box" style={{ color: color(bord[5][4].typ) }} id="x4_y5">{bord[5][4].pcs}</div>
					<div className="white box" style={{ color: color(bord[5][5].typ) }} id="x5_y5">{bord[5][5].pcs}</div>
					<div className="black box" style={{ color: color(bord[5][6].typ) }} id="x6_y5">{bord[5][6].pcs}</div>
					<div className="white box" style={{ color: color(bord[5][7].typ) }} id="x7_y5">{bord[5][7].pcs}</div>
				</div>
				<div className="box_row">
					<div className="white box" style={{ color: color(bord[4][0].typ) }} id="x0_y4">{bord[4][0].pcs}</div>
					<div className="black box" style={{ color: color(bord[4][1].typ) }} id="x1_y4">{bord[4][1].pcs}</div>
					<div className="white box" style={{ color: color(bord[4][2].typ) }} id="x2_y4">{bord[4][2].pcs}</div>
					<div className="black box" style={{ color: color(bord[4][3].typ) }} id="x3_y4">{bord[4][3].pcs}</div>
					<div className="white box" style={{ color: color(bord[4][4].typ) }} id="x4_y4">{bord[4][4].pcs}</div>
					<div className="black box" style={{ color: color(bord[4][5].typ) }} id="x5_y4">{bord[4][5].pcs}</div>
					<div className="white box" style={{ color: color(bord[4][6].typ) }} id="x6_y4">{bord[4][6].pcs}</div>
					<div className="black box" style={{ color: color(bord[4][7].typ) }} id="x7_y4">{bord[4][7].pcs}</div>
				</div>
				<div className="box_row">
					<div className="black box" style={{ color: color(bord[3][0].typ) }} id="x0_y3">{bord[3][0].pcs}</div>
					<div className="white box" style={{ color: color(bord[3][1].typ) }} id="x1_y3">{bord[3][1].pcs}</div>
					<div className="black box" style={{ color: color(bord[3][2].typ) }} id="x2_y3">{bord[3][2].pcs}</div>
					<div className="white box" style={{ color: color(bord[3][3].typ) }} id="x3_y3">{bord[3][3].pcs}</div>
					<div className="black box" style={{ color: color(bord[3][4].typ) }} id="x4_y3">{bord[3][4].pcs}</div>
					<div className="white box" style={{ color: color(bord[3][5].typ) }} id="x5_y3">{bord[3][5].pcs}</div>
					<div className="black box" style={{ color: color(bord[3][6].typ) }} id="x6_y3">{bord[3][6].pcs}</div>
					<div className="white box" style={{ color: color(bord[3][7].typ) }} id="x7_y3">{bord[3][7].pcs}</div>
				</div>
				<div className="box_row">
					<div className="white box" style={{ color: color(bord[2][0].typ) }} id="x0_y2">{bord[2][0].pcs}</div>
					<div className="black box" style={{ color: color(bord[2][1].typ) }} id="x1_y2">{bord[2][1].pcs}</div>
					<div className="white box" style={{ color: color(bord[2][2].typ) }} id="x2_y2">{bord[2][2].pcs}</div>
					<div className="black box" style={{ color: color(bord[2][3].typ) }} id="x3_y2">{bord[2][3].pcs}</div>
					<div className="white box" style={{ color: color(bord[2][4].typ) }} id="x4_y2">{bord[2][4].pcs}</div>
					<div className="black box" style={{ color: color(bord[2][5].typ) }} id="x5_y2">{bord[2][5].pcs}</div>
					<div className="white box" style={{ color: color(bord[2][6].typ) }} id="x6_y2">{bord[2][6].pcs}</div>
					<div className="black box" style={{ color: color(bord[2][7].typ) }} id="x7_y2">{bord[2][7].pcs}</div>
				</div>
				<div className="box_row">
					<div className="black box" style={{ color: color(bord[1][0].typ) }} id="x0_y1">{bord[1][0].pcs}</div>
					<div className="white box" style={{ color: color(bord[1][1].typ) }} id="x1_y1">{bord[1][1].pcs}</div>
					<div className="black box" style={{ color: color(bord[1][2].typ) }} id="x2_y1">{bord[1][2].pcs}</div>
					<div className="white box" style={{ color: color(bord[1][3].typ) }} id="x3_y1">{bord[1][3].pcs}</div>
					<div className="black box" style={{ color: color(bord[1][4].typ) }} id="x4_y1">{bord[1][4].pcs}</div>
					<div className="white box" style={{ color: color(bord[1][5].typ) }} id="x5_y1">{bord[1][5].pcs}</div>
					<div className="black box" style={{ color: color(bord[1][6].typ) }} id="x6_y1">{bord[1][6].pcs}</div>
					<div className="white box" style={{ color: color(bord[1][7].typ) }} id="x7_y1">{bord[1][7].pcs}</div>
				</div>
				<div className="box_row">
					<div className="white box" style={{ color: color(bord[0][0].typ) }} id="x0_y0">{bord[0][0].pcs}</div>
					<div className="black box" style={{ color: color(bord[0][1].typ) }} id="x1_y0">{bord[0][1].pcs}</div>
					<div className="white box" style={{ color: color(bord[0][2].typ) }} id="x2_y0">{bord[0][2].pcs}</div>
					<div className="black box" style={{ color: color(bord[0][3].typ) }} id="x3_y0">{bord[0][3].pcs}</div>
					<div className="white box" style={{ color: color(bord[0][4].typ) }} id="x4_y0">{bord[0][4].pcs}</div>
					<div className="black box" style={{ color: color(bord[0][5].typ) }} id="x5_y0">{bord[0][5].pcs}</div>
					<div className="white box" style={{ color: color(bord[0][6].typ) }} id="x6_y0">{bord[0][6].pcs}</div>
					<div className="black box" style={{ color: color(bord[0][7].typ) }} id="x7_y0">{bord[0][7].pcs}</div>
				</div>
			</div>
		</>
	);
}
export default Board;