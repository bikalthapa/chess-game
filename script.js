
var bElephant = "<img src='bElephant.png' class='knight Dark'>";
var bHorse =  "<img src='bHorse.png' class='knight Dark'>";
var bCamel =  "<img src='bCamel.png' class='knight Dark'>";
var bQueen =  "<img src='bQueen.png' class='knight Dark'>";
var bKing =  "<img src='bKing.png' class='knight Dark'>";
var bPawn =  "<img src='bPawn.png' class='knight Dark'>";

// Declaring variables for white chess knight //
var wElephant = "<img src='wElephant.png' class='knight Light'>";
var wHorse =  "<img src='wHorse.png' class='knight Light'>";
var wCamel =  "<img src='wCamel.png' class='knight Light'>";
var wQueen =  "<img src='wQueen.png' class='knight Light'>";
var wKing =  "<img src='wKing.png' class='knight Light'>";
var wPawn =  "<img src='wPawn.png' class='knight Light'>";


x1_y1.innerHTML = wElephant;
x2_y1.innerHTML = wHorse;
x3_y1.innerHTML = wCamel;
x4_y1.innerHTML = wQueen;
x5_y1.innerHTML = wKing;
x6_y1.innerHTML = wCamel;
x7_y1.innerHTML = wHorse;
x8_y1.innerHTML = wElephant;
x1_y2.innerHTML = wPawn;
x2_y2.innerHTML = wPawn;
x3_y2.innerHTML = wPawn;
x4_y2.innerHTML = wPawn;
x5_y2.innerHTML = wPawn;
x6_y2.innerHTML = wPawn;
x7_y2.innerHTML = wPawn;
x8_y2.innerHTML = wPawn;


x1_y8.innerHTML = bElephant;
x2_y8.innerHTML = bHorse;
x3_y8.innerHTML = bCamel;
x4_y8.innerHTML = bQueen;
x5_y8.innerHTML = bKing;
x6_y8.innerHTML = bCamel;
x7_y8.innerHTML = bHorse;
x8_y8.innerHTML = bElephant;
// x1_y7.innerHTML = bPawn;
// x2_y7.innerHTML = bPawn;
// x3_y7.innerHTML = bPawn;
// x4_y7.innerHTML = bPawn;
// x5_y7.innerHTML = bPawn;
// x6_y7.innerHTML = bPawn;
// x7_y7.innerHTML = bPawn;
// x8_y7.innerHTML = bPawn;

// x4_y5.innerHTML = wQueen;
// x4_y6.innerHTML = wPawn;
// x1_y3.innerHTML = bPawn;
// x7_y6.innerHTML = bCamel;
// x8_y6.innerHTML = wPawn;

// testing knight



var body = document.getElementById("content");
var square = document.getElementsByClassName("box");
var turn_area = document.getElementById("turn");
var turn = "White";
var temp = [];
var possible_Moves;
var clicked_knight_img = [];
var clicked_element_square = [];
turn_area.innerHTML = turn + " Turns";
// Adding function when user click on any square button //
for(const x of square){
	x.addEventListener('click',()=>{
turn_area.innerHTML = turn + " Turns";
		let clk_Ele_id = x.getAttribute("id");
		var clk_square = document.getElementById(clk_Ele_id);
		var bCondition = clk_square.innerHTML.includes("bElephant") || clk_square.innerHTML.includes("bCamel") || clk_square.innerHTML.includes("bHorse") || clk_square.innerHTML.includes("bQueen") || clk_square.innerHTML.includes("bKing") || clk_square.innerHTML.includes("bPawn");
		var wCondition = clk_square.innerHTML.includes("wElephant") || clk_square.innerHTML.includes("wCamel") || clk_square.innerHTML.includes("wHorse") || clk_square.innerHTML.includes("wQueen") || clk_square.innerHTML.includes("wKing") || clk_square.innerHTML.includes("wPawn");		

		// Storing clk_square temporary for changing colour //
		// Changing the colour of squares when user press on any key //
		if(clk_square.innerHTML != ""){
		temp.push(clk_Ele_id);
		document.getElementById(temp[0]).style.backgroundColor = "";
		clk_square.style.backgroundColor = "cyan";
			if(temp.length >1){
				temp.shift();
			}
		};
		// putting clikcked element id in array if it contains any knight //
		if(document.getElementById(clk_Ele_id).innerHTML != ""){
			clicked_knight_img.push(clk_square.innerHTML);
			clicked_element_square.push(clk_square);
			// Deleting first index of an aaray if its length is greater than 1 //
			if(clicked_knight_img.length>1){
				clicked_knight_img.shift();
			};
			// Deleting first index of an array if its length is geater than 1 //
			if(clicked_element_square.length>1){
				clicked_element_square.shift();
			}			
		}

		// Checking whose turn is and running the function according to the turn //
		if(turn=="White" && clk_square.innerHTML != "" && clk_square.innerHTML.includes('Light')){
			if(clk_square.innerHTML.includes("wElephant")){
				elephant(clk_Ele_id , "white");
			}else if(clk_square.innerHTML.includes("wHorse")){
				horse(clk_Ele_id , "white");
			}else if(clk_square.innerHTML.includes("wCamel")){
				camel(clk_Ele_id , "white");
			}else if(clk_square.innerHTML.includes("wKing")){
				king(clk_Ele_id , "white");
			}else if(clk_square.innerHTML.includes("wQueen")){
				queen(clk_Ele_id , "white");
			}else if(clk_square.innerHTML.includes("wPawn")){
				pawn(clk_Ele_id , "white");
			};
			turn = "Black";
		}else if(turn=="Black" && clk_square.innerHTML != "" && clk_square.innerHTML.includes("Dark")){
		// Determining what is inside square //
			if(clk_square.innerHTML.includes("bElephant")){
				elephant(clk_Ele_id , "black");
			}else if(clk_square.innerHTML.includes("bHorse")){
				horse(clk_Ele_id , "black");
			}else if(clk_square.innerHTML.includes("bCamel")){
				camel(clk_Ele_id , "black");
			}else if(clk_square.innerHTML.includes("bKing")){
				king(clk_Ele_id , "black");
			}else if(clk_square.innerHTML.includes("bQueen")){
				queen(clk_Ele_id , "black");
			}else if(clk_square.innerHTML.includes("bPawn")){
				pawn(clk_Ele_id , "black");
			};
			turn = "White";
		};
		for(let i = 0; i<possible_Moves.length; i++){
			if(possible_Moves[i] == clk_Ele_id){
				document.getElementById(possible_Moves[i]).innerHTML = clicked_knight_img[0];
				clicked_element_square[0].innerHTML = "";
				possible_Moves.length = 0;
				clicked_knight_img.length = 0;
				clicked_element_square.length = 0;
			}else if(clk_Ele_id == ""){
				possible_Moves.length = 0;
				clicked_element_square.length = 0;
				clicked_knight_img.length = 0;
			};
		}
		});
}

// This function runs when user clicks on elephant //
function elephant(new_id, type){
	var x = parseInt(new_id.charAt(1));
	var y = parseInt(new_id.charAt(4));
	let moves = straight(x,y,type,new_id);
	removeColor(moves,null);
	possible_Moves = moves;
}

// This function runs when user clicks on queen //
function queen(new_id, type){
	var x = parseInt(new_id.charAt(1));
	var y = parseInt(new_id.charAt(4));
	let moves = straight(x,y,type);
	let moves2 = zigzag(x,y,type);
	removeColor(moves,moves2);
}

// This function runs when user clicks on camel //
function camel(new_id, type){
	var x = parseInt(new_id.charAt(1));
	var y = parseInt(new_id.charAt(4));
	var moves = zigzag(x,y,type);
	possible_Moves = moves;
	removeColor(moves);
}

// This function runs when user clicks on horse //
function horse(new_id,type){
	var x = parseInt(new_id.charAt(1));
	var y = parseInt(new_id.charAt(4));
	var moves = lmoves(x,y,type);
	possible_Moves = moves;
	removeColor(moves);
}

// This function runs when user clicks on king //
function king(new_id,type){
	var x = parseInt(new_id.charAt(1));
	var y = parseInt(new_id.charAt(4));
	var moves = kmoves(x,y,type);
	removeColor(moves);
	possible_Moves = moves;
}

// This function runs when user clicks on pawn //
function pawn(new_id,type){
	var x = parseInt(new_id.charAt(1));
	var y = parseInt(new_id.charAt(4));
	// Checking wether it is black or white pawn //
	if(type=="black"){
		var backward = "x" + x + "_y" + (y-1);
		if(document.getElementById(backward).innerHTML == ""){
			blackPawn(x,y,type,new_id);
		}else{
			blackPawnCheck(backward,type,x,y);
		};
	}else if(type=="white"){
		var forward = "x" + x + "_y" + (y+1);
		var mv = whitePawn(x,y,type,new_id);
	}
	possible_Moves = mv;
}






var pawnColored = [];
	// This function will check wether possible translation contains black or not//
	function whitePawnCheck(id,type,x,y){
		// This will identify black pawn in rightside //
		 var idright = "x" + (x+1) + "_y" + (y+1);
		 if(document.getElementById('content').innerHTML.includes(idright)){
		 	if(type=="white" && document.getElementById(idright).innerHTML.includes('Dark')){
					pawnColored.push(idright);
					document.getElementById(idright).style.backgroundColor = "lightblue";
		 		}else if(type=="black" && document.getElementById(idright).innerHTML.includes('Light')){
		 			pawnColored.push(idright);
		 			document.getElementById(idright).style.backgroundColor = "lightblue";
			};
		};
		// This will identify black pawn in leftside //
		 var idleft = "x" + (x-1) + "_y" + (y+1);
		 if(document.getElementById('content').innerHTML.includes(idleft)){
		 	if(type=="white" && document.getElementById(idleft).innerHTML.includes('Dark')){
				pawnColored.push(idleft);
				document.getElementById(idleft).style.backgroundColor = "lightblue";
		 	}else if(type=="black" && document.getElementById(idleft).innerHTML.includes('Light')){
		 		pawnColored.push(idleft);
		 		document.getElementById(idleft).style.backgroundColor = "lightblue";
			};
		};
		removeColor(pawnColored);
		return pawnColored;
	};

	// This function will check wether possible translation contains white or not //
	function blackPawnCheck(id,type,x,y){
		var idright = "x" + (x+1) + "_y" + (y-1);
		if(document.getElementById('content').innerHTML.includes(idright)){
				if(type=="white" && document.getElementById(idright).innerHTML.includes('Dark')){
					pawnColored.push(idright);
					document.getElementById(idright).style.backgroundColor = "lightblue";
		 		}else if(type=="black" && document.getElementById(idright).innerHTML.includes('Light')){
		 			pawnColored.push(idright);
		 			document.getElementById(idright).style.backgroundColor = "lightblue";
				};
		};

		var idleft = "x" + (x-1) + "_y" + (y-1);
		if(document.getElementById('content').innerHTML.includes(idleft)){
			 if(document.getElementById('content').innerHTML.includes(idleft)){
		 	if(type=="white" && document.getElementById(idleft).innerHTML.includes('Dark')){
				pawnColored.push(idleft);
				document.getElementById(idleft).style.backgroundColor = "lightblue";
		 	}else if(type=="black" && document.getElementById(idleft).innerHTML.includes('Light')){
		 		pawnColored.push(idleft);
		 		document.getElementById(idleft).style.backgroundColor = "lightblue";
			};
		};
		};
		removeColor(pawnColored);
	}
	// This function will execute when user clicks on white pawn //
	function whitePawn(x,y,type,new_id){
		if(y==2){
			for(let i = 1; i<=2; i++){
				var id = "x" + x + "_y" + (y+i);
				if(document.getElementById(id).innerHTML == ""){
					pawnColored.push(id);
					var mv = whitePawnCheck(id,type,x,y);
					document.getElementById(id).style.backgroundColor = "lightblue";
				}else{
					var mv = whitePawnCheck(id,type,x,y);
					break;
				};
			}
		}else{
			var id = "x" + x + "_y" + (y+1);
			if(document.getElementById(id).innerHTML == ""){
				pawnColored.push(id);
				var mv = whitePawnCheck(id,type,x,y);
				document.getElementById(id).style.backgroundColor = "lightblue";
			}else{
			var mv = whitePawnCheck(id,type,x,y);
			}
		}
		return mv;
	}


	// This function will execute when user clicks on Black pawn //
	function blackPawn(x,y,type,new_id){
		if(y==7){
			for(let i = 1; i<=2; i++){
				id = "x" + x + "_y" + (y-i);
			if(document.getElementById(id).innerHTML == ""){
					pawnColored.push(id);
					blackPawnCheck(id,type,x,y);
					document.getElementById(id).style.backgroundColor = "lightblue";
				}else{
					blackPawnCheck(id,type,x,y);
					break;
				};
			};
		}else{
			id = "x" + x + "_y" + (y-1);
			if(document.getElementById(id).innerHTML == ""){
				pawnColored.push(id);
				blackPawnCheck(id,type,x,y);
				document.getElementById(id).style.backgroundColor = "lightblue";
			}else{
				blackPawnCheck(id,type,x,y);
			}
		}
	}

// This function will remove style attribute for possible translation //
function removeColor(moves, moves2){
	if(moves.length>0){
	setTimeout(()=>{
		for(let i = 0; i<=moves.length-1; i++){
			if(moves[i] != null){
				document.getElementById(moves[i]).removeAttribute("style");
			};
		}
	},1000);
	};
	if(moves2 != null){
	if(moves2.length>0){
		setTimeout(()=>{
			for(let i = 0; i<=moves2.length; i++){
				if(moves2[i] != null){
					document.getElementById(moves2[i]).removeAttribute("style");
				};
			}			
		},1000);
	}
	}
}

function check(id,type){
	var a = document.getElementById(id);
	if(type=="white" && a.innerHTML.includes("Dark")){
		a.style.backgroundColor = "lightblue";
		return id;
	}else if(type=="black" && a.innerHTML.includes("Light")){
		a.style.backgroundColor = "lightblue";
		return id;
	}else{
		return 0;
	}
}

// This is straight moves //
function straight(x,y,type,new_id){
	var colouredId = [];
	// positive Horizontal moves
	for(let h = x+1; h<=8; h++){
		var id = "x"+h+"_y"+y;
		// Checking wether id is present or not //
		if(document.getElementById('content').innerHTML.includes(id)){
			// alert(document.getElementById(id).innerHTML + h);
			if(document.getElementById(id).innerHTML == ""){
				document.getElementById(id).style.backgroundColor = "lightblue";
				colouredId.push(id);
			}else{
				// Putting id in colouredId arrays if it contains strings as an array //
				if(check(id,type) != 0){
					colouredId.push(check(id, type));
				};
				break;
			}
		};
	}
	// Negative Horizontal moves //
	for(let h = x-1; h>=1; h--){
		id = "x"+h+"_y"+y;
		// Checking wether id exists or not //
		if(document.getElementById('content').innerHTML.includes(id)){
			if(document.getElementById(id).innerHTML == ""){
			document.getElementById(id).style.backgroundColor = "lightblue";
			colouredId.push(id);
			}else{
				// Putting id in colouredId arrays if it contains strings as an array //
				if(check(id,type) != 0){
					colouredId.push(check(id, type));
				};
				break;           
			}
		};
	}
	// Positive Vertical moves
	for(let v = y+1; v<=8; v++){
		id = "x"+x+"_y"+v;
		// Checking wether id exists or not in a body //
		if(document.getElementById("content").innerHTML.includes(id)){
		if(document.getElementById(id).innerHTML == ""){
			colouredId.push(id);
			document.getElementById(id).style.backgroundColor = "lightblue";
		}else{
				// Putting id in colouredId arrays if it contains strings as an array //
				if(check(id,type) != 0){
					colouredId.push(check(id, type));
				};
			break;
		};
		};
	}
	// Negative Vertical moves
	for(let v = y-1; v>=1; v--){
		id = "x"+x+"_y"+v;
		// Checking wether id exists or not //
		if(document.getElementById('content').innerHTML.includes(id)){
		if(document.getElementById(id).innerHTML == ""){
			colouredId.push(id);
			document.getElementById(id).style.backgroundColor = "lightblue";
		}else{
			// Putting id in colouredId arrays if it contains strings as an array //
			if(check(id,type) != 0){
				colouredId.push(check(id, type));
			};
			break;
		};
		};
	}
	return colouredId;
}

// This is diagonal moves //
function zigzag(x,y,type){
	var zColourId = [];
	// for translation in z(x,y)--->z'(x+1,y+1) coordinate//
	for(let i = 1; i<=(8-x); i++){
		// Creating new id for possible translation //
		var id = "x"+(x+i)+"_y"+(y+i);
		// Taking exit from the loop if x coordinate or y coordinate is greate than 8 //
		if(document.getElementById("content").innerHTML.includes(id)){
			// Colouring possible translation //
			if(document.getElementById(id).innerHTML == ""){
				zColourId.push(id);
				document.getElementById(id).style.backgroundColor = "lightblue";
			}else{
				if(check(id,type) != 0){
					zColourId.push(check(id, type));
				};
				break;
			}
		}
	}
	// For translation in z(x,y)--->z'(x-1,y+1) coordinate //
	for(let i = 1; i<=x; i++){
		// creating new id for possible translation 
		id = "x"+(x-i)+"_y"+(y+i);
		// Taking exit from the loop if x coordinate is less than 1 or y coordinate is greater than 8 //
		if((x-i)<1 || (y+i)>8){
			break;
		}else{
			// Colouring possible translation //
			if(document.getElementById(id).innerHTML == ""){
				zColourId.push(id);
				document.getElementById(id).style.backgroundColor = "lightblue";
			}else{
				if(check(id,type) != 0){
					zColourId.push(check(id, type));
				};
				break;
			}
		}
	}
	// For translation in z(x,y)--->z'(x-1,y-1) coordinate //
	for(let i = 1; i<=x; i++){
		// Creating new id for possible translation //
		id = "x"+(x-i)+"_y"+(y-i);
		// taking exit from the loop if x and y coordinate is less than 1 //
		if(document.getElementById('content').innerHTML.includes(id)){
			// Colouring possible translation //
			if(document.getElementById(id).innerHTML == ""){
				zColourId.push(id);
				document.getElementById(id).style.backgroundColor = "lightblue";
			}else{
				if(check(id,type) != 0){
					zColourId.push(check(id, type));
				};
				break;
			}
		};
	}
	// For translation in z(x,y)--->z'(x+1,y-1) coordinate //
	for(let i = 1; i<=y; i++){
		// Creating new id for possible translation //
		id="x"+(x+i)+"_y"+(y-i);
		// Taking exit from the loop if x > 8 or y < 1 //
		if(document.getElementById("content").innerHTML.includes(id)){
			// Colouring possible translation //
			if(document.getElementById(id).innerHTML == ""){
				zColourId.push(id);
				document.getElementById(id).style.backgroundColor = "lightblue";
			}else{
				if(check(id,type) != 0){
					zColourId.push(check(id, type));
				};
				break;
			}
		}
	}
	return zColourId;
}



// This is L moves especially for horse //
function lmoves(x,y,type){
	var lmoves = [];
	function lmovescheck(id){
		if(document.getElementById(id).innerHTML == ""){
			lmoves.push(id);
			document.getElementById(id).style.backgroundColor = "lightblue";
		}else{
			// Putting id in colouredId arrays if it contains strings as an array //
			if(check(id,type) != 0){
				lmoves.push(check(id, type));
			};
		};
	}
	// For translation in l(x,y)--->l'(x+1,y+2)
	if((x+1)<=8 && (y+2)<=8){
		let id = "x"+(x+1)+"_y"+(y+2);
		lmovescheck(id);
	};
	// for translation in l(x,y)--->l'(x-1,y-2)
	if((x-1)>=1 && (y-2)>=1){
		let id = "x"+(x-1)+"_y"+(y-2);
		lmovescheck(id);
	}
	// for translation in l(x,y)--->l'(x-1,y+2)
	if((x-1)>=1 && (y+2)<=8){
		let id = "x"+(x-1)+"_y"+(y+2);
		lmovescheck(id);
	}
	// for translation in l(x,y)--->l'(x+1,y-2)
	if((x+1)<=8 && (y-2)>=1){
		let id = "x"+(x+1)+"_y"+(y-2);
		lmovescheck(id);
	}

	// for translation in l(x,y)--->l'(x+2,y+1)
	 if((x+2)<=8 && (y+1)<=8){
		let id = "x"+(x+2)+"_y"+(y+1);
		lmovescheck(id);
	}
	// for translation in l(x,y)--->l'(x-2,y-1)
	 if((x-2)>=1 && (y-1)>=1){
		let id = "x"+(x-2)+"_y"+(y-1);
		lmovescheck(id);
	}
	// for translation in l(x,y)--->l'(x-2,y+1)
	 if((x-2)>=1 && (y+1)<=8){
		let id = "x"+(x-2)+"_y"+(y+1);
		lmovescheck(id);
	}
	// for translation in l(x,y)--->l'(x+2,y-1)
	 if((x+2)<=8 && (y-1)>=1){
		let id = "x"+(x+2)+"_y"+(y-1);
		lmovescheck(id);
	}
	return lmoves;
}

function kmoves(x,y,type){
	// For translation in k(x,y)--->k'(x,y+1)
	var kMvData = [];
	var id;
	function kMovesCheck(id){
		if(document.getElementById(id).innerHTML == ""){
		kMvData.push(id);
		document.getElementById(id).style.backgroundColor = "lightblue";
		}else{
			// Putting id in colouredId arrays if it contains strings as an array //
			if(check(id,type) != 0){
				kMvData.push(check(id, type));
			};
		};
	}
	if((x+1)<=8){
		id = "x"+(x+1)+"_y"+y;
		kMovesCheck(id);
	};

	if((y+1)<=8){
		id = "x"+x+"_y"+(y+1);
		kMovesCheck(id);
	};

	if((x-1)>=1){
		id = "x"+(x-1)+"_y"+y;
		kMovesCheck(id);
	};

	if((y-1)>=1){
		id = "x"+x+"_y"+(y-1);
		kMovesCheck(id);
	};

	if((x+1)<=8 && (y+1)<=8){
		id = "x" + (x+1) + "_y" + (y+1);
		kMovesCheck(id);
	};

	if((x-1)>=1 && (y-1)>=1){
		id = "x" + (x-1) + "_y" + (y-1);
		kMovesCheck(id);
	};

	if((x+1)<=8 && (y-1)>=1){
		id = "x" + (x+1) + "_y" + (y-1);
		kMovesCheck(id);
	};

	if((x-1)>=1 && (y+1)<=8){
		id = "x" + (x-1) + "_y" + (y+1);
		kMovesCheck(id);
	};
	return kMvData;
}



// // A program to generate Chess board //
// document.write("<div class='chessboard'>")
// for(let a = 8; a>=1; a--){
// 	document.write("<div class='row'>")
// 		for(let i = 1; i<=8; i++){
// 			var id = "x"+i+"_y"+a
// 			if(i%2==0){
// 				if(a%2==0){
// 				document.write("<div class='white' id='"+id+"'></div>")
// 				}else{
// 					document.write("<div class='black' id='"+id+"'></div>")
// 				}
// 			}else{
// 				if(a%2==0){
// 				document.write("<div class='black' id='"+id+"'></div>")
// 				}else{
// 					document.write("<div class='white' id='"+id+"'></div>")
// 				}
// 			}
// 		}
// 	document.write("</div>")
// }
// document.write("</div>")
