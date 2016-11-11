

///////////////////
// VARIABLES
///////////////////

var newTotal = 0; //for runningTotal function. Holds the HTML string to display to page.

//The below 4 variables belong to payment function
var cc = document.getElementById("credit-card"); //holds the credit-card div
var paypal = document.getElementById("credit-card").nextElementSibling; //holds the paypal div
var bitcoin = paypal.nextElementSibling; //holds the bitcoin div.
    //above two variables are perhaps brittle, but they works so leave for the time being.
var paymentFieldset = document.getElementsByTagName("fieldset")[3]; //stores whole fieldset of payment section

//the below 2 variables belong to the activity, runningTotal & activity validity functions
var activityLabels = document.querySelector('.activities').getElementsByTagName('label'); //get labels of activity class.
var activityLength = activityLabels.length; //length of activities (how many labels/workshops)


///////////////////
// FUNCTIONS
///////////////////

function focus () {
    document.getElementById("name").focus(); //Sets focus on the first text field on page load.
}


function titleOther() { // Job Role. If user selects 'other' insert input element
    var titleSelect = document.getElementById("title"); //get title select element
    var titleValue = titleSelect.options[titleSelect.selectedIndex].value; //get the value of selected index

    if(document.getElementById("other-title")) { //test if 'other' input already present
        //this works onload to remove for those who have javascript enabled (element already hard-coded into HTML)
        var otherInput = document.getElementById("other-title");
        otherInput.remove(); //if 'other' element is present then remove.
        }

    if (titleValue === "other") { //if 'other' is selected then provide text input for user.
        var titleFieldset = document.getElementsByTagName("fieldset")[0]; //Get the first form fieldset (index 0)
        var otherInputEl = document.createElement("input"); //create input element
        otherInputEl.type = "text"; //set input type attribute
        otherInputEl.placeholder = "Your Title..."; //add placeholder attribute
        otherInputEl.id = "other-title"; //add id to input element
        titleFieldset.appendChild(otherInputEl); //append the newly formed input variable to the form variable holding the first fieldset.
        }
}



//(function (){ //nested anonymous function.
    //executable content goes here
//)();
//}

//need to add comments to this function

function tShirt() { //hides and displays colours and colour menu depending on design selection.

    var designMenu = document.getElementById("design"); //select design menu
    var designTheme = designMenu.options[designMenu.selectedIndex].text; //get text of whichever design option is selected

    //6 lines below reset all colour options to displayed (not hidden) in order for following code to work.
    document.getElementById("color").options[0].hidden = false;
    document.getElementById("color").options[1].hidden = false;
    document.getElementById("color").options[2].hidden = false;
    document.getElementById("color").options[3].hidden = false;
    document.getElementById("color").options[4].hidden = false;
    document.getElementById("color").options[5].hidden = false;
        if (designTheme === "Select Theme") //hides colours menu if no theme is selected. Runs on load too.
            {
            document.getElementById("colors-js-puns").style.visibility = "hidden"; //hides colour menu
            }
        else if (designTheme === "Theme - JS Puns") { //if puns theme selected then display eligible colours
            document.getElementById("colors-js-puns").style.visibility = "visible"; //displays colours menu
            document.getElementById("color").options[0].selected = true; //overwrites default to prevent cornflower colour being displayed on heart design selection.
            document.getElementById("color").options[3].hidden = true; //disable ineligible colour for this design
            document.getElementById("color").options[4].hidden = true; //disable ineligible colour for this design
            document.getElementById("color").options[5].hidden = true; //disable ineligible colour for this design
        } else if (designTheme === "Theme - I ♥ JS"){ //if heart theme selected then display eligible colours
            document.getElementById("colors-js-puns").style.visibility = "visible"; //displays colours menu

            document.getElementById("color").options[3].selected = true; //overwrites default to prevent cornflower colour being displayed on heart design selection.
            document.getElementById("color").options[0].hidden = true; //disable ineligible colour for this design
            document.getElementById("color").options[1].hidden = true; //disable ineligible colour for this design
            document.getElementById("color").options[2].hidden = true; //disable ineligible colour for this design

        }

}


function activities (){ //this function disables and greys out clashing workshops

    for (var i =0; i<activityLength; i+=1) { //add an id to each of the labels/workshops
        activityLabels[i].id = "boxId" + i;
        }

    var clash1a = document.getElementById('boxId1').firstChild; //get the first child (the checkbox itself)
        if (clash1a.checked) { //test if checked
        document.getElementById('boxId3').style.color= "grey"; //grey out clashing workshop
        document.getElementById('boxId3').firstChild.disabled = true; //disable checkbox of clashing workshop
    } else { //if 1a not checked then re-enable clashing workshop
        document.getElementById('boxId3').firstChild.disabled = false; //enable checkbox
        document.getElementById('boxId3').style.color= "black"; //return text to black
        }

    var clash1b = document.getElementById('boxId3').firstChild; //get the first child (the checkbox itself)
        if (clash1b.checked) { //test if checked
        document.getElementById('boxId1').style.color= "grey"; //grey out clashing workshop
        document.getElementById('boxId1').firstChild.disabled = true; //disable checkbox of clashing workshop
    } else { //if 1b not checked then re-enable clashing workshop
        document.getElementById('boxId1').firstChild.disabled = false; //enable checkbox
        document.getElementById('boxId1').style.color= "black"; //return text to black
        }

    var clash2a = document.getElementById('boxId2').firstChild; //get the first child (the checkbox itself)
         if (clash2a.checked) { //test if checked
         document.getElementById('boxId4').style.color= "grey"; //grey out clashing workshop
         document.getElementById('boxId4').firstChild.disabled = true; //disable checkbox of clashing workshop
     } else { //if 2a not checked then re-enable clashing workshop
        document.getElementById('boxId4').firstChild.disabled = false; //enable checkbox
        document.getElementById('boxId4').style.color= "black"; //return text to black
        }

    var clash2b = document.getElementById('boxId4').firstChild; //get the first child (the checkbox itself)
        if (clash2b.checked) { //test if checked
        document.getElementById('boxId2').style.color= "grey"; //grey out clashing workshop
        document.getElementById('boxId2').firstChild.disabled = true; //disable checkbox of clashing workshop
    } else { //if 2b not checked then re-enable clashing workshop
        document.getElementById('boxId2').firstChild.disabled = false; //enable checkbox
        document.getElementById('boxId2').style.color= "black"; //return text to black
        }
}


function runningTotal() { //calculates the running total based on activity workshop selections
    newTotal = 0; //this empties the global variable's value to stop it storing each new string one on top of the other as the code repeats.
    if(document.getElementById("total")) //checks to see if total id/element exists
        { var elem = document.getElementById("total"); //if it does exist, get it and...
        elem.remove(); //... remove it
        }

    for (var i =0; i<activityLength; i+=1) { //This runs each time a there is a button press, so resets totally each time. So, for each activity...
        var temp = document.getElementById("boxId" + i).firstChild; //store the checkbox in a temporary variable
        if (temp.checked) { //if checkbox is checked do the following:
            var a = document.getElementById("boxId" + i).textContent; //take the text value
            var numb = a.match(/\$(\d+)/); //access the number (Regex) after the dollar sign in the string. Stored as an array.
            var numb1 = (numb[1]); //Get the item at index 1 (the number value)
            var newNumber = parseInt(numb1, 10); //converts string to number at base 10.
            newTotal = newTotal + newNumber; //adds newNumber to the overall total
        }
    }

    if (newTotal !== 0) {  //only if newTotal is not zero (i.e. if at least one activity is selected) do the following:
        runningTotalText = ("Total: $" + newTotal); // create text string with current number value
        var newPara = document.createElement("p"); //create new p element
        newPara.id = "total"; //asign id
        var newNode = document.createTextNode(runningTotalText); //add string to newNode
        newPara.appendChild(newNode); //add newNode to new p element
        var newElement = document.getElementsByTagName("fieldset")[2]; //get the activity fieldset
        newElement.appendChild(newPara); //asign new element as child of activity fieldset
    }
}



paymentFieldset.removeChild(cc); //onload remove cc div (stored as global variable)
paymentFieldset.removeChild(paypal); //onload remove paypal div (stored as global variable)
paymentFieldset.removeChild(bitcoin); //onload remove bitcoin div (stored as global variable)

function payment() { //inserts either cc, paypal or bitcoin divs depending on user payment selection
    if (paymentFieldset.childNodes[9]) { //checks to see if a 9th childNode is present (there won't be if a user has selected 'Select Payment Method')
        paymentFieldset.removeChild(paymentFieldset.childNodes[9]); //removes either bitcoin, paypal or cc, whichever has been previously selected.
        }
    var paymentMenu = document.getElementById("payment"); //get payment menu by id
    var paymentType = paymentMenu.options[paymentMenu.selectedIndex].text; //get and store text of selected method
    if (paymentType === "Credit Card") { //adds in cc section if selected
        paymentFieldset.appendChild(cc);
    } else if (paymentType === "PayPal") { //adds in paypal section if selected
        paymentFieldset.appendChild(paypal);
    } else if (paymentType === "Bitcoin") { //adds in bitcoin section if selected
        paymentFieldset.appendChild(bitcoin);
    } /* else {
        document.getElementById("payment").options[1].selected = true;
        paymentFieldset.appendChild(cc); //this sets cc option as default if nothing else selected (for onload, essentially) */
            //not used as was preventing "select payment method" ever being displayed and so impacting on validation.
    }


//the error here could be fixed by dong querySelectorAll? You'd need to alter the text a bit.
    //Finish up credit card validator first
function disableBubbles() { //this function disables the browser's automatic error bubbles
    document.querySelector( "input" ).addEventListener( "invalid", //
            function( event ) {
                event.preventDefault();
            });
}


//MAKE EACH OF THESE SELF EXECUTING WITHIN THE VALIDATE FUNCTION?

//run this / these on key press.

function validate() {
    disableBubbles(); //disable the broswer's default error bubbles

    //NAME INPUT VALIDATOR
    var nameInput = document.getElementById("name"); //get the name input
    var nameError = document.getElementsByTagName("fieldset")[0].childNodes[3]; //Access name label (3rd childnode of 1st fieldset)
    if(nameInput.validity.valid === false) { //if input is empty (not valid)
        nameError.style.color= '#8B0000'; //set error colour
        nameError.textContent= "Name: (please provide your name)"; //set error message
    } else {
        nameError.style.color= '#000000'; //set error colour
        nameError.textContent= "Name:"; //set error message

    }


    //EMAIL INPUT VALIDATOR
    var emailInput = document.getElementById("mail"); //get email input
    var newEmail = document.getElementsByTagName("fieldset")[0].childNodes[9]; //access email label
    var validEmail = /[^@]+@[^@]+/.test(emailInput.value); //Regex test for correct email format
    if(!validEmail) { //if email is not valid...(returns 'false')
        newEmail.style.color= '#8B0000'; //set error colour
        newEmail.textContent= "Email: (please provide a valid email address)"; //set error message
    } else {
        newEmail.style.color= '#000000'; //set error colour
        newEmail.textContent= "Email:"; //set error message
    }

    //T-SHIRT VALIDATOR
    var designSelectMenu = document.getElementById("design"); //get design select element
    var designValue = designSelectMenu.options[designSelectMenu.selectedIndex].value; //get selected value
    var tshirtLegend = document.getElementById("shirtError"); //access t-shirt fieldset legend
    if (document.getElementById("tshirtErrorMessage")) { //checks to see if id/element exists
            var elem1 = document.getElementById("tshirtErrorMessage"); //if it does exist, get it and...
            elem1.remove(); } //... remove it
    if (designValue == "Select Theme") { // test to see if matches "Select Theme" i.e. no design selected, and if so, inserts t-shirt error message:
         tshirtLegend.insertAdjacentHTML('beforebegin', '<p id="tshirtErrorMessage">Don\'t forget to pick a T-Shirt</p>'); //insert error message
         var tshirtErrorColour = document.getElementById("tshirtErrorMessage"); //access newly created error element
         tshirtErrorColour.style.color = '#8B0000'; //set error colour
     } else if (document.getElementById("tshirtErrorMessage")) { //checks to see if id/element exists
             var elem4 = document.getElementById("tshirtErrorMessage"); //if it does exist, get it and...
             elem4.remove(); //... remove it
     }


     //ACTIVITY VALIDITOR
    if (document.getElementById("activityErrorMessage")) { //checks to see if id/element exists
        var elem5 = document.getElementById("activityErrorMessage"); //if it does exist, get it and...
        elem5.remove(); } //... remove it

     for (var i =0; i<activityLength; i+=1) { //for each of the checkboxes do the following:
     var checkbox = document.getElementById('boxId' + i).firstChild; // access checkbox of each element
     var checkboxResult = checkbox.checked; //stored the boolean value
     //console.log(i);
     if (checkboxResult === true) { //if any checkbox is checked (true) then break the loop
         break;
     }
     }
     if (i === 7) { //if i = 7 it means all checkboxes are unchecked, in which case insert error
         var activityLegend = document.getElementById("actError"); //select activity legend
         activityLegend.insertAdjacentHTML('beforebegin', '<p id="activityErrorMessage">Please select an Activity</p>'); //insert error message
         var newcolour = document.getElementById("activityErrorMessage"); //access newly created error element
         newcolour.style.color = '#8B0000'; //set error colour

     } else { //if i is not 7 then at least one checkbox is checked. Remove any existing error message.
         if (document.getElementById("activityErrorMessage")) { //checks to see if id/element exists
             var elem6 = document.getElementById("activityErrorMessage"); //if it does exist, get it and...
             elem6.remove(); } //... remove it
             }




    //PAYMENT TYPE VALIDATOR
     var paymentSelectMenu = document.getElementById("payment"); //get payment method select menu
     var paymentMethodValue = paymentSelectMenu.options[paymentSelectMenu.selectedIndex].value; //get value of selected method
     if (paymentMethodValue == "select_method") //test to see if matches "select_method"
     {
     var paymentError = document.getElementsByTagName("fieldset")[3].childNodes[3]; //access ui (user interface) text
     paymentError.style.color= '#8B0000'; //set error colour
     paymentError.textContent= "Payment (please select a payment method:)"; //alter ui text
 } else { //return to original ui text
     var paymentMessage = document.getElementsByTagName("fieldset")[3].childNodes[3]; //access ui text
     paymentMessage.style.color= 'black'; //return colour to black
     paymentMessage.textContent= "I'm going to pay with:"; //return ui text to original
    }


//DO THIS
//add an onchange to above so that message returns to black after user selects credit card?




    //ZIP CODE VALIDATOR
    if (document.getElementById("zip")) {
    var zipCodeInput = document.getElementById("zip");
    var zipMessage = document.getElementById("zipCodeLabel"); //THIS ID HAS BEEN HARDCODED IN. FIX.
        if ((document.getElementById("cvv")) && (zipCodeInput.validity.valid === false)) {
        zipMessage.style.color= '#8B0000';
    }  else {
        zipMessage.style.color= '#000000'; //resets colour to black if zip code entered.
    }
}
    //CVV VALIDATOR
    if (document.getElementById("cvv")) {
    var cvvInput = document.getElementById("cvv");
    var cvvMessage = document.getElementById("cvvLabel"); //THIS ID HAS BEEN HARDCODED IN. FIX.
    var validCvv = /[0-9]{3}/.test(cvvInput.value); //regex test checks to see if content is made up of numbers of length 3.

    if ((document.getElementById("cvv")) && (cvvInput.validity.valid === false)) {
        cvvMessage.textContent= "Enter CVV:";
        cvvMessage.style.color= '#8B0000';
        //console.log("No text entered");
    } else if (!validCvv) {
        cvvMessage.textContent= "CVV (3 digits):";
        //console.log("not a valid cvv");
        cvvMessage.style.color= '#8B0000';
    } else {
        cvvMessage.textContent= "CVV:";
        //console.log("Valid CVV");
        cvvMessage.style.color= '#000000'; //resets colour to black if zip code entered.
    }
}

valid_credit_card();
} //end of function

//CREDIT CARD VALIDATOR





function valid_credit_card() {

    var oddIndexNumbers =[];
    var evenIndexNumbers =[];
    var evenIndexNumbers2 = [];
    var oddSum = 0;
    var evenSum = 0;

    var paymentMenu = document.getElementById("payment"); //select payment menu options
    var paymentType = paymentMenu.options[paymentMenu.selectedIndex].text; //get selected option
        if (paymentType === "Credit Card") { // if selection = "Credit Card" run the Luhn test below.
            console.log("cc selected");

                    //if credit card selected, take the input value and perform initial validity check
                    var cardInput = document.getElementById("cc-numInput"); //get the input element
                    var cardInputValue = cardInput.value; //get and store the value (the user input)
                    var ccMessage = document.getElementById("cc-num"); //get ui text
                    console.log(cardInputValue);
                    console.log(cardInputValue.length);
                	if ((/[^0-9-\s]+/.test(cardInputValue)) || (cardInputValue.length === 0)) { //test if contains only digits, dashes or spaces OR if input is empty (if length is zero)
                        //this regex is actually testing if the card contains INVALID characters. This if clause will run if there IS an invalid character.
                        console.log("Number has FAILED initial validity test");
                        ccMessage.textContent= "Not a valid card number:";
                        ccMessage.style.color= '#8B0000';

                        //BUG the above lets through a card length of 1...after luhn is written rewrite the above.
                    } else {
                        console.log("PASSED initial validity test");

                        var reversedInput =  cardInputValue.split("").reverse().join(""); // takes user input and reverses the digits
                        console.log(reversedInput);


                        //access oddly indexed numbers
                        for(var iOdd = 0; iOdd < reversedInput.length; iOdd += 2) {  // take every second element
                        oddIndexNumbers.push(reversedInput[iOdd]); //push each oddly indexed number to the new variable array
                        }
                        console.log(oddIndexNumbers);

                        //access evenly indexed numbers
                        for(var iEven = 1; iEven < reversedInput.length; iEven += 2) {  // take every second element
                        evenIndexNumbers.push(reversedInput[iEven]); //push each evenly indexed number to the new variable array
                        }
                        console.log("Complicated array: " +evenIndexNumbers);


                        //Sum the odd indexed digits:
                         for(var i1 = 0; i1 < oddIndexNumbers.length; i1 += 1) {  //loop through oddIndexNumbers
                              var convertOdd = parseInt(oddIndexNumbers[i1]); //convert each item to an integer
                              oddSum += convertOdd; // tota each array item
                          }
                          //s1 = oddsum in your work

                        // Take the even indexed digits & multiply each by two
                        for (var i2=0; i2<evenIndexNumbers.length; i2++) { //loop through evenIndexNumbers
                            evenIndexNumbers[i2] *= 2; // multiply each value times 2
                        }
                        console.log(evenIndexNumbers);

                        //Sum the digits of each multiplication. (if a digit is made up of two numbers, add these together)
                        for (var i3=0; i3<evenIndexNumbers.length; i3++) { //loop through evenIndexNumbers
                            var num = evenIndexNumbers[i3].toString(); //convert each item back to a string
                            //console.log(num);
                            var digitSplit = (num + '').split(''); //split each item
                            //console.log("Digit Split 1: " + digitSplit);

                            if (digitSplit.length === 2) { //if there are two digits (i.e. if was greater than 10)
                                addSplits = parseInt(digitSplit[0]) + parseInt(digitSplit[1]);
                                evenIndexNumbers2.push(addSplits);
                            } else {
                                singleCharToConvert = parseInt(digitSplit); //convert single characters/digits back to a number
                            evenIndexNumbers2.push(singleCharToConvert); //push onto array
                            }
                        }
                        console.log(evenIndexNumbers2);

                        //Sum the even indexed digits:
                         for(var i4 = 0; i4 < evenIndexNumbers2.length; i4 += 1) {  //loop through oddIndexNumbers
                              var convertEven = parseInt(evenIndexNumbers2[i4]); //convert each item to an integer
                              evenSum += convertEven; // total each array item
                          }
                          console.log(evenSum);
                          console.log(oddSum);
                          var luhnResult = evenSum + oddSum;
                          console.log(luhnResult);
                          var test=107;
                         var isEndsWithZero =luhnResult%10;
                         if(isEndsWithZero!==0) {
                             console.log("Fail!");
                         } else {
                             console.log("Pass!");
                         }



                    } // this closes the huge luhn else condition

                        //if so, then run remainder of luhn formula
                    //else throw error message

        } //else {
            //remove any error message here if present.



}


/*
// takes the form field value and returns true on valid number
function valid_credit_card() {
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
*/


//Not required
/*

{ //used to be valid_credit_card(value). I avoided using arguments here but need to understand this better to improve my code.
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


//Step 2
//if cedit card selected, test validity on the required attribute.
//if not valid (no text) then throw error
//Step 2 could be probably picked up by the luhn test so may be unneccesary. I'm going to skip Step 2
*/

function style() { //This function styles the select drop-down menus
    document.getElementById("title").classList.toggle("styled-select"); //add "styled select"
    document.getElementById("size").classList.toggle("styled-select"); //add "styled select"
    document.getElementById("design").classList.toggle("styled-select"); //add "styled select"
    document.getElementById("color").classList.toggle("styled-select"); //add "styled select"
    document.getElementById("payment").classList.toggle("styled-select"); //add "styled select"
}

///////////////////
// WIRING
///////////////////

//this can be improved. Add event listener directly to each function as required and run on click.

window.onload = function() { //onload run the following functions:
  focus();
  titleOther();
  tShirt();
  activities();
  payment();
  style();
  document.getElementById("payment").options[1].selected = true; //sets credit card as default payment method
  paymentFieldset.appendChild(cc); //this sets cc option as default if nother else selected (for onload,
      document.getElementById("exp-month").classList.toggle("styled-select"); //add "styled select" for drop-down styling
      document.getElementById("exp-year").classList.toggle("styled-select"); //add "styled select" for drop-down styling
};

document.getElementById("title").addEventListener("change", titleOther);
document.getElementById("design").addEventListener("change", tShirt);
document.getElementsByTagName("fieldset")[2].addEventListener("change", activities);
document.getElementsByTagName("fieldset")[2].addEventListener("change", runningTotal);
document.getElementById("payment").addEventListener("change", payment);
document.getElementsByTagName("button")[0].addEventListener("click", register, false); //starts code off once button is clicked.

//this needs to be moved up once completed.
function register() { //this functions will start validation once button is pressed
    //console.log("Register!");
    validate();
}
