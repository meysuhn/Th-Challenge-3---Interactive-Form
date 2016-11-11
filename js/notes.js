var ssssss = document.getElementsByTagName("fieldset")[2].childNodes[1];
var pppppp = ssssss.textContent;
//pppppp.style.color= '#8B0000';
pppppp.textContent = "Please select an activity";
console.log(pppppp);
break;

/*
var activityErrorElement = document.createElement("");
activityErrorElement.id = "errorColour";
activityErrorElement.style = 'initial';
var textnode = document.createTextNode("Please select an activity");
activityErrorElement.appendChild(textnode);



activityError.insertBefore(activityErrorElement, activityError.firstChild);
//document.getElementById("errorColour").style.color= 'black';

//var messageColour = document.getElementsByTagName("fieldset")[2].childNodes[1];
//messageColour.style.color= '#8B0000';
//document.getElementById("errorColour").style.color = "#ff0000";
break; //stops one message for each empty checkbox being generated...
*/
//need to remove message once something is selected...


// CC validation

//CREDIT CARD VALIDATOR


var e = document.getElementById("payment");
var paymentType = e.options[e.selectedIndex].text;
    if (paymentType === "Credit Card") {
        //console.log("Val val val");
        var cardInput = document.getElementById("cc-numInput");
            if(cardInput.validity.valid === false) {
            var cardMessage = document.getElementById("cc-num"); //THIS ID HAS BEEN HARDCODED IN. FIX.
            //document.getElementsByTagName("fieldset")[3].childNodes[9];
            cardMessage.style.color= '#8B0000';
    }
}



//Step 1
    //check is paymentType = credit card

//Step 2
    //if cedit card selected, test validity on the required attribute.
        //if not valid (no text) then throw error
            //Step 2 could be probably picked up by the luhn test so may be unneccesary.
//Step 3
    //if credit card selected, take the input vale
        //test if contains only digits, dashes or spaces
            //if so, then run remainder of luhn formula
        //else throw error message


// takes the form field value and returns true on valid number
function valid_credit_card() { //used to be valid_credit_card(value). I avoided using arguments here but need to understand this better to improve my code.
    //disableBubbles(); //disable the broswer's default error bubbles
    if (document.getElementById("credit-card")) {
    var cardInput1 = document.getElementById("cc-numInput");
    var ccValue = cardInput1.value;
    var ccMessage = document.getElementById("cc-num"); //THIS ID HAS BEEN HARDCODED IN. FIX.
    //console.log(ccValue);
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(ccValue)) { // || (cardInput1.validity.valid === false)){
        console.log("Invalid Card Number");
        ccMessage.textContent= "Invalid Card Number:";
        ccMessage.style.color= '#8B0000';
        // return false;
    }
	//Luhn Algorithm.
	var nCheck = 0, nDigit = 0, bEven = false; //a series of storage variables
	ccValue = ccValue.replace(/\D/g, "");

    for (var n = ccValue.length - 1; n >= 0; n--) {
		var cDigit = ccValue.charAt(n),
			  nDigit = parseInt(cDigit, 10);
              //TESTING / REVERSE ENGINEERING
              console.log(n);
              console.log(cDigit);
              console.log(nDigit);


          if (bEven) {
              console.log(bEven);
  			if ((nDigit *= 2) > 9) nDigit -= 9;
            console.log(nDigit);
  		}

        nCheck += nDigit;
		bEven = !bEven;
	}
    var luhnResult = (nCheck % 10) === 0; //return
    if (luhnResult === false) {
        ccMessage.textContent= "Invalid Card Number:";
        ccMessage.style.color= '#8B0000';
    } else {
        ccMessage.textContent= "Card Number:";
        ccMessage.style.color= '#000000';
    }

}
}
