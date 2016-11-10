

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

//the below 2 variables belong to the activity & runningTotal functions
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
            var numb = a.match(/\$(\d+)/); //access the number (Regex) after the dollar sign in the string
            var numb1 = (numb[1]); //WHAT DOES THIS DO AGAIN?
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


function disableBubbles() {
    document.querySelector( "input" ).addEventListener( "invalid",
            function( event ) {
                event.preventDefault();
            });
}


//MAKE EACH OF THESE SELF EXECUTING WITHIN THE VALIDATE FUNCTION?

function validate() {
    disableBubbles(); //disable the broswer's default error bubbles

    //NAME INPUT VALIDATOR
    var nameInput = document.getElementById("name"); //get the name input
    if(nameInput.validity.valid === false) { //if input is empty (not valid)
        var nameError = document.getElementsByTagName("fieldset")[0].childNodes[3]; //Access name label (3rd childnode of 1st fieldset)
        nameError.style.color= '#8B0000'; //set error colour
        nameError.textContent= "Name: (please provide your name)"; //set error message
    }


    //EMAIL INPUT VALIDATOR
    var emailInput = document.getElementById("mail"); //get email input
    var validEmail = /[^@]+@[^@]+/.test(emailInput.value); //Regex test ofr correct email format
    if(!validEmail) { //if email is not valid...(returns 'false')
        var newEmail = document.getElementsByTagName("fieldset")[0].childNodes[9]; //access email label
        newEmail.style.color= '#8B0000'; //set error colour
        newEmail.textContent= "Email: (please provide a valid email address)"; //set error message
    }

    //T-SHIRT VALIDATOR
    var designSelectMenu = document.getElementById("design"); //get design select element
    var designValue = designSelectMenu.options[designSelectMenu.selectedIndex].value; //get selected value
    if (designValue == "Select Theme") { // test to see if matches "Select Theme" i.e. no design selected, and if so, inserts t-shirt error message:
         var tshirtLegend = document.getElementById("shirtError"); //access t-shirt fieldset legend
         tshirtLegend.insertAdjacentHTML('beforebegin', '<p id="one">Don\'t forget to pick a T-Shirt</p>'); //insert error message
         var tshirtErrorColour = document.getElementById("one"); //access newly created error element
         tshirtErrorColour.style.color = '#8B0000'; //set error colour

    }

    var d1 = document.getElementById("actError");
    d1.insertAdjacentHTML('beforebegin', '<p id="two">Please select an Activity</p>');
    var newcolour = document.getElementById("two");
    newcolour.style.color = '#8B0000';

    //ACTIVITY VALIDITOR
    var activities = document.querySelector('.activities').getElementsByTagName('label');
    var length = activities.length;
    var okay=false;

    for (var i =0; i<length; i+=1) { //add an id to each of the workshops
    var checkbox = document.getElementById('boxId' + i).firstChild;
        if (checkbox.checked) {
            okay=true;
            break;
        }
    else {
        console.log("Please check a checkbox");
        var d1 = document.getElementById("actError");
        d1.insertAdjacentHTML('beforebegin', '<p id="two">Please select an Activity</p>');
        var newcolour = document.getElementById("two");
        newcolour.style.color = '#8B0000';
        break;
}
}

//PAYMENT TYPE VALIDATOR
 var payment = document.getElementById("payment");
 var selectedValue = payment.options[payment.selectedIndex].value;
 if (selectedValue == "select_method")
 {
 var paymentError = document.getElementsByTagName("fieldset")[3].childNodes[3];
 paymentError.style.color= '#8B0000';
 paymentError.textContent= "Payment (please select a payment method:)";
} else {
 var paymentMessage = document.getElementsByTagName("fieldset")[3].childNodes[3];
 paymentMessage.style.color= 'black';
 paymentMessage.textContent= "I'm going to pay with:";
}


//add an onchange to above so that message returns to black after user selects credit card?


    //CREDIT CARD VALIDATOR
//to test if credit card option elected see the method somewhere above. there is a test for presence of html somewhere there.
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




    //ZIP CODE VALIDATOR
    var zipCodeInput = document.getElementById("zip");
    var zipMessage = document.getElementById("zipCodeLabel"); //THIS ID HAS BEEN HARDCODED IN. FIX.
        if(zipCodeInput.validity.valid === false) {
        zipMessage.style.color= '#8B0000';
    }  else {
        zipMessage.style.color= '#000000'; //resets colour to black if zip code entered.
    }
    //CVV VALIDATOR
    var cvvInput = document.getElementById("cvv");
    var cvvMessage = document.getElementById("cvvLabel"); //THIS ID HAS BEEN HARDCODED IN. FIX.
    var validCvv = /[0-9]{3}/.test(cvvInput.value); //regex test checks to see if content is made up of numbers of length 3.

    if(cvvInput.validity.valid === false) {
        cvvMessage.textContent= "Enter CVV:";
        cvvMessage.style.color= '#8B0000';
        console.log("No text entered");
    } else if (!validCvv) {
        cvvMessage.textContent= "CVV (3 digits):";
        console.log("not a valid cvv");
        cvvMessage.style.color= '#8B0000';
    } else {
        cvvMessage.textContent= "CVV:";
        console.log("Valid CVV");
        cvvMessage.style.color= '#000000'; //resets colour to black if zip code entered.
    }

}
valid_credit_card();
} //end of function

// takes the form field value and returns true on valid number
function valid_credit_card() { //used to be valid_credit_card(value). I avoided using arguments here but need to understand this better to improve my code.

    var cardInput1 = document.getElementById("cc-numInput");
    var ccValue = cardInput1.value;
    var ccMessage = document.getElementById("cc-num"); //THIS ID HAS BEEN HARDCODED IN. FIX.
    console.log(ccValue);
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(ccValue)) {
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

          if (bEven) {
  			if ((nDigit *= 2) > 9) nDigit -= 9;
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
    console.log("Register!");
    validate();
}
