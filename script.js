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


var bElephant = "<img src='bElephant.png' class='knight'>";
var bHorse =  "<img src='bHorse.png' class='knight'>";
var bCamel =  "<img src='bCamel.png' class='knight'>";
var bQueen =  "<img src='bQueen.png' class='knight'>";
var bKing =  "<img src='bKing.png' class='knight'>";
var bPawn =  "<img src='bPawn.png' class='knight'>";

// Declaring variables for white chess knight //
var wElephant = "<img src='wElephant.png' class='knight'>";
var wHorse =  "<img src='wHorse.png' class='knight'>";
var wCamel =  "<img src='wCamel.png' class='knight'>";
var wQueen =  "<img src='wQueen.png' class='knight'>";
var wKing =  "<img src='wKing.png' class='knight'>";
var wPawn =  "<img src='wPawn.png' class='knight'>";


x1_y1.innerHTML = wElephant;
x2_y1.innerHTML = wHorse;
x3_y1.innerHTML = wCamel;
x4_y1.innerHTML = wQueen;
x5_y1.innerHTML = wKing;
x6_y1.innerHTML = wCamel;
x7_y1.innerHTML = wHorse;
x8_y1.innerHTML = wElephant;
// x1_y2.innerHTML = wPawn;
// x2_y2.innerHTML = wPawn;
// x3_y2.innerHTML = wPawn;
// x4_y2.innerHTML = wPawn;
// x5_y2.innerHTML = wPawn;
// x6_y2.innerHTML = wPawn;
// x7_y2.innerHTML = wPawn;
// x8_y2.innerHTML = wPawn;


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
x4_y4.innerHTML = wElephant;
// x6_y2.innerHTML = wCamel;
// x4_y4.innerHTML = wQueen;

// testing knight



var body = document.getElementById("content");
var square = document.getElementsByClassName("box");
var temp = [];
// Adding function when user click on any square button //
for(const x of square){
	x.addEventListener('click',()=>{
		var clk_Ele_id = x.getAttribute("id");
		var clk_square = document.getElementById(clk_Ele_id);
		var bCondition = clk_square.innerHTML.includes("bElephant") || clk_square.innerHTML.includes("bCamel") || clk_square.innerHTML.includes("bHorse") || clk_square.innerHTML.includes("bQueen") || clk_square.innerHTML.includes("bKing") || clk_square.innerHTML.includes("bPawn");
		var wCondition = clk_square.innerHTML.includes("wElephant") || clk_square.innerHTML.includes("wCamel") || clk_square.innerHTML.includes("wHorse") || clk_square.innerHTML.includes("wQueen") || clk_square.innerHTML.includes("wKing") || clk_square.innerHTML.includes("wPawn");		

		// Storing clk_square temporary for changing colour //
		// Changing the colour of squares when user press on any key //
		if(clk_square.innerHTML != ""){
		temp.push(clk_Ele_id);
		document.getElementById(temp[0]).style.backgroundColor = "";
		clk_square.style.backgroundColor = "green";
			if(temp.length >1){
				temp.shift();
			}
		};

		// Determining what is inside square //
		if(clk_square.innerHTML.includes("wElephant")){
			elephant(clk_Ele_id , "white");
		}else if(clk_square.innerHTML.includes("bElephant")){
			elephant(clk_Ele_id , "black");
		}else if(clk_square.innerHTML.includes("wHorse")){
			horse(clk_Ele_id , "white");
		}else if(clk_square.innerHTML.includes("bHorse")){
			horse(clk_Ele_id , "black");
		}else if(clk_square.innerHTML.includes("wCamel")){
			camel(clk_Ele_id , "white");
		}else if(clk_square.innerHTML.includes("bCamel")){
			camel(clk_Ele_id , "black");
		}else if(clk_square.innerHTML.includes("wKing")){
			king(clk_Ele_id , "white");
		}else if(clk_square.innerHTML.includes("bKing")){
			king(clk_Ele_id , "black");
		}else if(clk_square.innerHTML.includes("wQueen")){
			queen(clk_Ele_id , "white");
		}else if(clk_square.innerHTML.includes("bQueen")){
			queen(clk_Ele_id , "black");
		}else if(clk_square.innerHTML.includes("wPawn")){
			pawn(clk_Ele_id , "white");
		}else if(clk_square.innerHTML.includes("bPawn")){
			pawn(clk_Ele_id , "black");
		};

		});
}

// This function runs when user clicks on elephant //
function elephant(new_id, type){
	var x = parseInt(new_id.charAt(1));
	var y = parseInt(new_id.charAt(4));
	let moves = straight(x,y,type);
	removeColor(moves);
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
	zigzag(x,y,type);
}

// This function runs when user clicks on horse //
function horse(new_id,type){
	var x = parseInt(new_id.charAt(1));
	var y = parseInt(new_id.charAt(4));
	lmoves(x,y,type);
}

// This function runs when user clicks on king //
function king(new_id,type){
	var x = parseInt(new_id.charAt(1));
	var y = parseInt(new_id.charAt(4));
}

// This function will remove style attribute for possible translation //
function removeColor(moves, moves2){
	if(moves.length>0){
	setTimeout(()=>{
		for(let i = 0; i<=moves.length; i++){
			document.getElementById(moves[i]).removeAttribute("style");
		}
	},1000);
	};
	if(moves2.length>0){
		setTimeout(()=>{
			for(let i = 0; i<=moves2.length; i++){
				document.getElementById(moves2[i]).removeAttribute("style");
			}			
		},1000);
	}
}

// This is straight moves //
function straight(x,y,type){
	var colouredId = [];
	// positive Horizontal moves
	for(let h = x+1; h<=8; h++){
		var id = "x"+h+"_y"+y;
		// alert(document.getElementById(id).innerHTML + h);
		if(document.getElementById(id).innerHTML == ""){
		document.getElementById(id).style.backgroundColor = "cyan";
		colouredId.push(id);
		}else{
			break;
		}
	}
	// Negative Horizontal moves //
	for(let h = x-1; h>=1; h--){
		id = "x"+h+"_y"+y;
		if(document.getElementById(id).innerHTML == ""){
		document.getElementById(id).style.backgroundColor = "cyan";
		colouredId.push(id);
		}else{
			break;           
		}
	}
	// Positive Vertical moves
	for(let v = y+1; v<=8; v++){
		id = "x"+x+"_y"+v;
		if(document.getElementById(id).innerHTML == ""){
			colouredId.push(id);
			document.getElementById(id).style.backgroundColor = "cyan";
		}else{
			break;
		};
	}
	// Negative Vertical moves
	for(let v = y-1; v>=1; v--){
		id = "x"+x+"_y"+v;
		if(document.getElementById(id).innerHTML == ""){
			colouredId.push(id);
			document.getElementById(id).style.backgroundColor = "cyan";
		}else{
			break;
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
		if((x+i)>8 || (y+i)>8){
			break;
		}else{
			// Colouring possible translation //
			if(document.getElementById(id).innerHTML == ""){
				zColourId.push(id);
				document.getElementById(id).style.backgroundColor = "cyan";
			}else{
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
				document.getElementById(id).style.backgroundColor = "cyan";
			}else{
				break;
			}
		}
	}
	// For translation in z(x,y)--->z'(x-1,y-1) coordinate //
	for(let i = 1; i<=x; i++){
		// Creating new id for possible translation //
		id = "x"+(x-i)+"_y"+(y-i);
		// taking exit from the loop if x and y coordinate is less than 1 //
		if((x-i)<1 || (y-i)<1){
			break;
		}else{
			// Colouring possible translation //
			if(document.getElementById(id).innerHTML == ""){
				zColourId.push(id);
				document.getElementById(id).style.backgroundColor = "cyan";
			}else{
				break;
			}
		}
	}
	// For translation in z(x,y)--->z'(x+1,y-1) coordinate //
	for(let i = 1; i<=y; i++){
		// Creating new id for possible translation //
		id="x"+(x+i)+"_y"+(y-i);
		// Taking exit from the loop if x > 8 or y < 1 //
		if((x+i)>8 || (y-i)<1){
			break;
		}else{
			// Colouring possible translation //
			if(document.getElementById(id).innerHTML == ""){
				zColourId.push(id);
				document.getElementById(id).style.backgroundColor = "cyan";
			}else{
				break;
			}
		}
	}
	return zColourId;
}



// This is L moves especially for horse //
function lmoves(x,y,type){
	// For translation in l(x,y)--->l'(x+1,y+2)
	if((x+1)<=8 && (y+2)<=8){
		let id = "x"+(x+1)+"_y"+(y+2);
		document.getElementById(id).style.backgroundColor = "cyan";
	};
	// for translation in l(x,y)--->l'(x-1,y-2)
	if((x-1)>=1 && (y-2)>=1){
		let id = "x"+(x-1)+"_y"+(y-2);
		document.getElementById(id).style.backgroundColor = "cyan";
	}
	// for translation in l(x,y)--->l'(x-1,y+2)
	if((x-1)>=1 && (y+2)<=8){
		let id = "x"+(x-1)+"_y"+(y+2);
		document.getElementById(id).style.backgroundColor = "cyan";
	}
	// for translation in l(x,y)--->l'(x+1,y-2)
	if((x+1)<=8 && (y-2)>=1){
		let id = "x"+(x+1)+"_y"+(y-2);
		document.getElementById(id).style.backgroundColor = "cyan";
	}

	// for translation in l(x,y)--->l'(x+2,y+1)
	 if((x+2)<=8 && (y+1)<=8){
		let id = "x"+(x+2)+"_y"+(y+1);
		document.getElementById(id).style.backgroundColor = "cyan";
	}
	// for translation in l(x,y)--->l'(x-2,y-1)
	 if((x-2)>=1 && (y-1)>=1){
		let id = "x"+(x-2)+"_y"+(y-1);
		document.getElementById(id).style.backgroundColor = "cyan";
	}
	// for translation in l(x,y)--->l'(x-2,y+1)
	 if((x-2)>=1 && (y+1)<=8){
		let id = "x"+(x-2)+"_y"+(y+1);
		document.getElementById(id).style.backgroundColor = "cyan";
	}
	// for translation in l(x,y)--->l'(x+2,y-1)
	 if((x+2)<=8 && (y-1)>=1){
		let id = "x"+(x+2)+"_y"+(y-1);
		document.getElementById(id).style.backgroundColor = "cyan";
	}
}