/*
Functions in this document are used to display numbers are up to four digits in MAB, standard partition and word forms.
Version History:

*/


function resetPage(){
//	window.location.reload();
	document.getElementById("numEntered").value = "";
	document.getElementById("block").innerHTML = "";
	document.getElementById("flat").innerHTML = "";
	document.getElementById("long").innerHTML = "";
	document.getElementById("unit").innerHTML = "";
	document.getElementById("message").innerHTML = "";
	document.getElementById("stdPartition").innerHTML = "";
	document.getElementById("wordDesc").innerHTML = "";
}

function getNumber(pnumLength){	
	switch (pnumLength){
		case 1:
			return document.getElementById("unit").childElementCount;
			break;
		case 2:
			return document.getElementById("long").childElementCount*10 + document.getElementById("unit").childElementCount;
			break;
		case 3:
			return document.getElementById("flat").childElementCount*100 +
document.getElementById("long").childElementCount*10 + document.getElementById("unit").childElementCount;
			break;
		case 4:
			return document.getElementById("block").childElementCount*1000 + document.getElementById("flat").childElementCount*100 +
document.getElementById("long").childElementCount*10 + document.getElementById("unit").childElementCount;
	}
}

function getPartitions(pnumLength){
	switch (pnumLength){
		case 1:
			return document.getElementById("unit").childElementCount;
			break;
		case 2:
			return document.getElementById("long").childElementCount*10  + " + " + document.getElementById("unit").childElementCount;
			break;
		case 3:
			return document.getElementById("flat").childElementCount*100  + " + " + 
document.getElementById("long").childElementCount*10  + " + " + document.getElementById("unit").childElementCount;
			break;
		case 4:
			return document.getElementById("block").childElementCount*1000 + " + " + document.getElementById("flat").childElementCount*100  + " + " + 
document.getElementById("long").childElementCount*10  + " + " + document.getElementById("unit").childElementCount;

	}

}

function makestdPartition(){

	if (document.getElementById("numEntered").value === "" || document.getElementById("numEntered").value === null) {
		vnumEntered = document.getElementById("block").childElementCount*1000 + document.getElementById("flat").childElementCount*100 + document.getElementById("long").childElementCount*10 + document.getElementById("unit").childElementCount;
		vtotalDigits = String(vnumEntered).length;
	} else {
		vtotalDigits = String(document.getElementById("numEntered").value).length;
	}

	return getNumber(vtotalDigits) + " = " + getPartitions(vtotalDigits); 
}

function toWords(){
	const arrOne = ['','one','two','three','four','five','six','seven','eight','nine'];
	const arrTeen = ['','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
	const arrTen = ['','ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
	const arrPlace = ['hundred','thousand'];
	let	vstrWord = "";

	if (document.getElementById("numEntered").value === "" || document.getElementById("numEntered").value === null) {
		vnumEntered = document.getElementById("block").childElementCount*1000 + document.getElementById("flat").childElementCount*100 + document.getElementById("long").childElementCount*10 + document.getElementById("unit").childElementCount;
		vtotalDigits = String(vnumEntered).length;
	} else {
		vnumEntered = document.getElementById("numEntered").value
		vtotalDigits = String(vnumEntered).length;
	}

	vstrnumEntered = vnumEntered.toString();

	//process numbers greater than 2 digits
	switch (vtotalDigits){ 
		case 3:
			vstrWord = arrOne[parseInt(vstrnumEntered.substring(0,1))] + " " + arrPlace[0];
			break;
			
		case 4:
			vstrWord = arrOne[parseInt(vstrnumEntered.substring(0,1))] + " " + arrPlace[1] + " ";

			if (vstrnumEntered.substring(1,2)!="0") {
				vstrWord += arrOne[parseInt(vstrnumEntered.substring(1,2))] + " " + arrPlace[0];
			}
			break;
	}

	//include "and" if the last two digits are not zeroes
	if (vtotalDigits > 2 && (vstrnumEntered.substring(vtotalDigits-2, vtotalDigits) != "00" && vstrnumEntered.substring(vtotalDigits-3, vtotalDigits) != "000" )) {
		vstrWord += " and ";
	}

	//Process one digit numbers and digits in the tens/ones place

	if (vtotalDigits == 1){
		vstrWord = arrOne[parseInt(vstrnumEntered)];
	} else {
		vtens = parseInt(vstrnumEntered.substring(vtotalDigits-2, vtotalDigits));
		switch (true){
			case vtens==00:
				break;
			case vtens>= 1 && vtens <=9:
				vstrWord += arrOne[parseInt(vstrnumEntered.substring(vtotalDigits-1))];
				break;
			case vtens>= 11 && vtens <=19:			
				//alert(vtens + "-" + (vtens-10)+"-"+arrTeen[(vtens-10)]);
				vstrWord += arrTeen[(vtens-10)];
				//alert(vstrWord);
				break;
			case vtens==10:
			case vtens==20:
			case vtens==30:
			case vtens==40:
			case vtens==50:
			case vtens==60:
			case vtens==70:
			case vtens==80:
			case vtens==90:
				vstrWord += arrTen[parseInt(vstrnumEntered.substring(vtotalDigits-2, vtotalDigits-1))];
				break;
			default:	
				vstrWord += arrTen[parseInt(vstrnumEntered.substring(vtotalDigits-2, vtotalDigits-1))] + "-" + arrOne[parseInt(vstrnumEntered.substring(vtotalDigits-1))] ;	

		}
	}
	return vstrWord.charAt(0).toUpperCase()+vstrWord.substring(1);;
}

function expandNumber(){
	vnumEntered = String(document.getElementById("numEntered").value);
	
	//Remove leading zero
	if (vnumEntered.substring(0,1)=="0") {
		document.getElementById("numEntered").value = vnumEntered.substring(1);
	}

	vtotalDigits = vnumEntered.length;

	switch (vtotalDigits){
		case 1:
			arrImg = ["u"];
			break;
		case 2:
			arrImg = ["l","u"];
			break;
		case 3:
			arrImg = ["f","l","u"];			
			break;
		case 4:
			arrImg = ["b","f","l","u"];
			break;
	}	
	
	vdigitIndex = 0;
	do {
		vDigit = vnumEntered.toString();
		vDigit = parseInt(vDigit.substring(vdigitIndex, vdigitIndex+1));
		
		for (i=0; i<vDigit; i++){
			addimage(arrImg[vdigitIndex],"system");
		}
			
		vdigitIndex +=1;
	} while (vdigitIndex < vtotalDigits);		
}


function addimage(pImg,pInitiator) { 
	if (pInitiator === "system" || (pInitiator === "user" && (document.getElementById("numEntered").value === "" || document.getElementById("numEntered").value === null))){		
		var img = document.createElement("img");
		switch (pImg){
			case "b":
				vobjectSel = "blocks";
				img.src = "../images/block.png"; 
				img.height = 50; 
				img.width = 50;
				vdisplayArea = document.getElementById("block");
				break;
			case "f":
				vobjectSel = "flats";
				img.src = "../images/flat.png"; 
				img.height = 50; 
				img.width = 50;
				vdisplayArea = document.getElementById("flat");
				break;
			case "l":
				vobjectSel = "longs"
				img.src = "../images/long.png"; 
				img.height = 50; 
				img.width = 12.5;
				vdisplayArea = document.getElementById("long");
				break; 	
			case "u":
				vobjectSel = "ones"
				img.src = "../images/unit.png"; 
				img.height = 10; 
				img.width = 10;
				vdisplayArea = document.getElementById("unit");
				break;
		}

		switch (vdisplayArea.childElementCount){
			case 0:
				vdisplayArea.appendChild(img);
				break;
			case 9:	
				document.getElementById("message").innerText = "You can only add 9 " + vobjectSel;
				break;
			default:
				vdisplayArea.appendChild(img);
				break;
		}
	        
	document.getElementById("stdPartition").innerHTML = makestdPartition();

	document.getElementById("wordDesc").innerHTML = toWords();
	}

}

