/*
Functions in this document are used to create the number expander display, and process user initiated events, including hiding the word description of numbers and showing standard and non-standard partition of numbers. Only a sample of non-standard partition numbers are displayed. There is a known issue with the display of non-standard partitioning of numbers ending with the value 0. The value of 0 should not be shown.

Version History:

*/

function resetPage(){
	window.location.reload(); 
}

function checkValueEntered(){
	let vnumEntered = String(document.getElementById("numEntered").value);
	
	if (vnumEntered.substring(0,1)=="0") {
		document.getElementById("numEntered").value = vnumEntered.substring(1);
	}
	makeExpander();

}

function displayStdPartition() {
	let vPartition = "";

	for (i=0; i<varrUser.length; i++){	
		vPartition += varrUser[i]["Digit"] * varrUser[i]["Value"]; 
		if (i!=(varrUser.length-1)) {
			vPartition += " + ";
		}
	}	


	document.getElementById("display").innerHTML = document.getElementById("numEntered").value + " = " + vPartition ;
}

function getPartitionValue(pstartIndex,pendIndex,pAction,pDirection) {
	let vpartitionReturn = "";

	if (pAction == "sum") {
		let vpartitionSum = 0;
		for (i=pstartIndex; i<=pendIndex; i++){
			vpartitionSum += varrUser[i]["Digit"] * varrUser[i]["Value"]; 
		}
		vpartitionReturn += vpartitionSum;

	} else {
		for (i=pstartIndex;i<=pendIndex;i++) {
			vpartitionReturn += varrUser[i]["Digit"] * varrUser[i]["Value"]; 
			if (i<pendIndex) {
				vpartitionReturn += " + ";
			}
		}
	}	
	return vpartitionReturn;
}

function displayNonStdPartition(){
	let vPartition = "Some examples of non standard partition:<br>";
	let venteredValue = document.getElementById("numEntered").value;
	let vtotalDigits = varrUser.length;

	if (varrUser.length == 2) {
	// The standard and non standard partition for 2 digit numbers is exactly the same
		displayStdPartition();
		document.getElementById("display2").innerHTML = "An example of non standard partition:<br>"+document.getElementById("display").innerHTML;
	} else {
		let i=0;
		//create different example of non standard partition equations
		do {	
			if (i==0){
				vPartition += venteredValue;
				vPartition += " = " + (varrUser[i]["Digit"] * varrUser[i]["Value"]);
				vPartition += " + " + getPartitionValue(i+1,vtotalDigits-1,"sum","right");
				vPartition += "<br><br>";
		
			} else if (i==1){
				vPartition += venteredValue;
				vPartition += " = " + getPartitionValue(0,i,"sum","left");
				vPartition += " + " + getPartitionValue(i+1,vtotalDigits-1,"list","right");
				vPartition += "<br><br>";
				
			} else if (i==2 && vtotalDigits>3){
			
				vPartition += venteredValue;
				vPartition += " = " + getPartitionValue(0,i-2,"list","left");
				vPartition += " + " + getPartitionValue(i-1,i,"sum","left");
				vPartition += " + " + getPartitionValue(i+1,vtotalDigits-1,"list","right");
				vPartition += "<br><br>";

				vPartition += venteredValue;
				vPartition += " = " + getPartitionValue(0,i,"sum","left");
				vPartition += " + " + getPartitionValue(i+1,vtotalDigits-1,"list","right");
				vPartition += "<br><br>";
			
			} else if (i==3 && vtotalDigits>4){
				vPartition += venteredValue;
				vPartition += " = " + getPartitionValue(0,i-3,"list","left");
				vPartition += " + " + getPartitionValue(i-2,i,"sum","left");
				vPartition += " + " + getPartitionValue(i+1,vtotalDigits-1,"list","right");
				vPartition += "<br><br>";


				vPartition += venteredValue;
				vPartition += " = " + getPartitionValue(0,i,"sum","left");
				vPartition += " + " + getPartitionValue(i+1,vtotalDigits-1,"list","right");
				vPartition += "<br><br>";
			} else if (i==4 && vtotalDigits>5){
				vPartition += venteredValue;
				vPartition += " = " + getPartitionValue(0,i-3,"sum","left");
				vPartition += " + " + getPartitionValue(i-2,i,"sum","right");
				vPartition += " + " + getPartitionValue(i+1,vtotalDigits-1,"list","right");
				vPartition += "<br><br>";


				vPartition += venteredValue;
				vPartition += " = " + getPartitionValue(0,i,"sum","left");
				vPartition += " + " + getPartitionValue(i+1,vtotalDigits-1,"list","right");
				vPartition += "<br><br>";
			} else if (i==5 && vtotalDigits>6){
				vPartition += venteredValue;
				vPartition += " = " + getPartitionValue(0,i-4,"sum","left");
				vPartition += " + " + getPartitionValue(i-3,i,"sum","right");
				vPartition += " + " + getPartitionValue(i+1,vtotalDigits-1,"list","right");
				vPartition += "<br><br>";


				vPartition += venteredValue;
				vPartition += " = " + getPartitionValue(0,i,"sum","left");
				vPartition += " + " + getPartitionValue(i+1,vtotalDigits-1,"list","right");
				vPartition += "<br><br>";
			}

			i+=1;
		} while (i<vtotalDigits)
		document.getElementById("display2").innerHTML = vPartition;	
	}
		
		
}

function resetExpander(){

/*
	//clear canvas if required
	let c = document.getElementById("myCanvas");
	let ctx = c.getContext("2d");

	ctx.clearRect(0,0, c.width, c.height);
*/
	//clear global array
	if (varrUser.length > 0) {
		varrUser.splice(0,varrUser.length)
	}

}


function makeExpander(){
	
	resetExpander();
	varrdescBoxSize = []; //array to store start and end coordinates for description shape

	//default settings used to support display of user provided numbers
	pBaseArray = [
	{"Digit": 7, "Place": "Millions", "Value":1000000}, 
	{"Digit": 6, "Place": "Hundred Thousands", "Value":100000}, 
	{"Digit": 5, "Place": "Ten Thousands", "Value":10000}, 
	{"Digit": 4, "Place": "Thousands",  "Value":1000}, 
	{"Digit": 3, "Place": "Hundreds",  "Value":100}, 
	{"Digit": 2, "Place": "Tens",  "Value":10}, 
	{"Digit": 1, "Place": "Ones",  "Value":1}
	];

	//identify the number of digits for the user provided number
	let vnumEntered = String(document.getElementById("numEntered").value);
	let vtotalDigits = vnumEntered.length;

	for (i=0; i<pBaseArray.length; i++){
		if (pBaseArray[i]["Digit"] == vtotalDigits) {
			vStartIndex = i;
		}
	}

	let j=0;
	for (i=vStartIndex; i<pBaseArray.length; i++){	
		varrUser[j] = [];
		varrUser[j]["Digit"] = vnumEntered.substring(j,j+1);
		varrUser[j]["Place"] = pBaseArray[i]["Place"];
		varrUser[j]["Value"] = pBaseArray[i]["Value"];
		j+=1;
	}	

	let vArrayItems = varrUser.length;

	document.getElementById("myCanvas").width = window.innerWidth * 0.9;
	document.getElementById("myCanvas").height = window.innerHeight * 0.3;	
	document.getElementById("myCanvas").style = "border:2px solid #000000;";

	let c = document.getElementById("myCanvas");

	let vcanvasWidth  = c.width;	//canvas width
	let vcanvasHeight = c.height;	//canvas height
	let gapfromCanvas = 2;		//total gap (left & right) away from canvas side

	let ctx = c.getContext("2d");

	//default settings that apply to digit and description shapes
	let vheightbox = 40;		//height of display shapes
	let vlineWidthbox = 2;		//size of line around display shapes
	let vctxheight = vcanvasHeight * 0.1;	//y-axis of display container

	//default settings for digit boxes
	let vdigitboxwidth = (vcanvasWidth / (vArrayItems*3))-gapfromCanvas; //width of digit shape
	let vdigitcolor = "red";		//default colour of digit shape

	//default settings for description boxes		
	let vdescboxwidth = vdigitboxwidth*2; //width of description shape
	let vdesccolor = "blue";		//default colour of description shape
	
	//starting x position for first digit and description box
	let vdigitboxx = (vcanvasWidth-(vArrayItems*(vdigitboxwidth+vdescboxwidth)))/2;
	let vdescboxx = vdigitboxx + vlineWidthbox + vdigitboxwidth;

	vdescboxspace = vdescboxwidth-vlineWidthbox-vlineWidthbox;	//internal display width of description box

	for (i=0;i<vArrayItems;i++){
		//draw digit box
		ctx.beginPath();	
		ctx.lineWidth = vlineWidthbox;
		ctx.strokeStyle = vdigitcolor;
		ctx.rect(vdigitboxx, vctxheight, vdigitboxwidth, vheightbox);
		ctx.font = "20px Arial";
		ctx.fillText(varrUser[i]["Digit"], vdigitboxx+((vdigitboxwidth+vlineWidthbox)*.45), vctxheight+((vheightbox+ vlineWidthbox)*.6));
		ctx.stroke();
			
		//draw description box
		ctx.beginPath();
		ctx.lineWidth = vlineWidthbox;
		ctx.strokeStyle = vdesccolor;
		ctx.rect(vdescboxx, vctxheight, vdescboxwidth, vheightbox);

		//populate array with description box sizes
		varrdescBoxSize[i] = [];
		varrdescBoxSize[i]["x1"] = vdescboxx;
		varrdescBoxSize[i]["y1"] = vctxheight;
		varrdescBoxSize[i]["x2"] = vdescboxx+vdescboxwidth;
		varrdescBoxSize[i]["y2"] = vctxheight+vheightbox;

		ctx.font = "14px Arial";
		ctx.fillStyle = "black";

		//reduce size of description text according
		if (ctx.measureText(varrUser[i]["Place"]).width>vdescboxspace){
			strDescText = varrUser[i]["Place"];
			vTextBreak = strDescText.indexOf(" ");
			ctx.font = "12px Arial";
			ctx.fillText(strDescText.substring(0,vTextBreak), vdescboxx+(vlineWidthbox*2), vctxheight+((vheightbox+ vlineWidthbox)*.4));
			ctx.fillText(strDescText.substring(vTextBreak), vdescboxx+(vlineWidthbox*2), vctxheight+((vheightbox+ vlineWidthbox)*.8));
		} else {
			ctx.fillText(varrUser[i]["Place"], vdescboxx+(vlineWidthbox*2), vctxheight+((vheightbox+ vlineWidthbox)*.6));
		}	
		
		ctx.stroke();

		vdigitboxx += vdigitboxwidth+vdescboxwidth;
		vdescboxx += vdigitboxwidth+vdescboxwidth;

	}
	c.addEventListener("click",function(argClick){suppressDescriptionBox(argClick,vArrayItems,varrdescBoxSize)});

	//enable other buttons
	document.getElementById("btnstdPartition").disabled = false;
	document.getElementById("btnnstdPartition").disabled = false;

}


function suppressDescriptionBox(pClick,pArrayItems,parrdescBoxSize){

	for (i=0; i<pArrayItems; i++) {
		if (pClick.offsetX >= parrdescBoxSize[i]["x1"] && pClick.offsetX <= parrdescBoxSize[i]["x2"] && pClick.offsetY >= parrdescBoxSize[i]["y1"] && pClick.offsetY <= parrdescBoxSize[i]["y2"]){

			c = document.getElementById("myCanvas");
			ctx = c.getContext("2d");

			if (ctx.fillStyle == "#000000"){
				ctx.clearRect(parrdescBoxSize[i]["x1"], parrdescBoxSize[i]["y1"], parrdescBoxSize[i]["x2"]-parrdescBoxSize[i]["x1"], parrdescBoxSize[i]["y2"]-parrdescBoxSize[i]["y1"]);
			} else {
				vDisplayText = "Re-enable" + getTime();
			}

			break;
		}
	}
}
