

///////////////////
// VARIABLES
///////////////////

var newTotal = 0; //for runningTotal function. Holds the HTML string to display to page.

//below variables belong to payment function
var cc = document.getElementById("credit-card");
var paypal = document.getElementById("credit-card").nextElementSibling;
var bitcoin = paypal.nextElementSibling; //this seems brittle, but it works so leave for the time being
var paymentFieldset = document.getElementsByTagName("fieldset")[3]; //stores fieldset of payment section

///////////////////
// FUNCTIONS
///////////////////
function focus () { //Sets focus on the first text field on page load.
    document.getElementById("name").focus();
}


function titleOther() { //
    var e = document.getElementById("title");
    var titleSelection = e.options[e.selectedIndex].value; //get the value of selected index

    if(document.getElementById("other-title")) //if other input is present then remove
        //this works onload to remove for those who have javascript enabled
        { var elem = document.getElementById("other-title");
        elem.remove(); //remove 'other' input if present
        }

    if (titleSelection === "other") { //if 'other' is selected then provide text input for user.
        (function (){ //nested anonymous function. This adds in input element.
                    var form = document.getElementsByTagName("fieldset")[0]; //Getting the first fieldset (index 0)
                    var input = document.createElement("input"); //create input element
                        input.type = "text"; //set input attribute
                        input.placeholder = "Your Title..."; //add placeholder attribute
                        input.id = "other-title"; //add id to input element
                        form.appendChild(input); //append the newly formed input variable to the form variable holding the first fieldset.
                    }
)();
}
}


//need to add comments to this function

function tShirt() { //T-shirt info tasks

    var e = document.getElementById("design");
    var theme = e.options[e.selectedIndex].text;

    document.getElementById("color").options[0].hidden = false;
    document.getElementById("color").options[1].hidden = false;
    document.getElementById("color").options[2].hidden = false;
    document.getElementById("color").options[3].hidden = false;
    document.getElementById("color").options[4].hidden = false;
    document.getElementById("color").options[5].hidden = false;

        if (theme === "Select Theme")
            {
            document.getElementById("colors-js-puns").style.visibility = "hidden";
            }
        else if (theme === "Theme - JS Puns") {
            console.log("Puns has fired");
            document.getElementById("colors-js-puns").style.visibility = "visible";
            document.getElementById("color").options[3].hidden = true;
            document.getElementById("color").options[4].hidden = true;
            document.getElementById("color").options[5].hidden = true;

        } else if (theme === "Theme - I ♥ JS"){
            console.log("Heart has fired");
            document.getElementById("colors-js-puns").style.visibility = "visible";
            document.getElementById("color").options[3].selected = true;
            document.getElementById("color").options[0].hidden = true;
            document.getElementById("color").options[1].hidden = true;
            document.getElementById("color").options[2].hidden = true;

        }

}

//add more comments to this function
function activities (){ //this function disables and greys out clashing workshops
    var activities = document.querySelector('.activities').getElementsByTagName('label');
    var length = activities.length;
    for (var i =0; i<length; i+=1) { //add an id to each of the workshops
        activities[i].id = "boxId" + i;
        }

    var clash1a = document.getElementById('boxId1').firstChild;
        if (clash1a.checked) {
        document.getElementById('boxId3').style.color= "grey";
        document.getElementById('boxId3').firstChild.disabled = true;
        console.log("please!");
        } else {
        document.getElementById('boxId3').firstChild.disabled = false;
        document.getElementById('boxId3').style.color= "black";
        }

    var clash1b = document.getElementById('boxId3').firstChild;
        if (clash1b.checked) {
        document.getElementById('boxId1').style.color= "grey";
        document.getElementById('boxId1').firstChild.disabled = true;
        console.log("please!");
        } else {
        document.getElementById('boxId1').firstChild.disabled = false;
        document.getElementById('boxId1').style.color= "black";
        }

    var clash2a = document.getElementById('boxId2').firstChild;
         if (clash2a.checked) {
         document.getElementById('boxId4').style.color= "grey";
         document.getElementById('boxId4').firstChild.disabled = true;
         console.log("please2!");
        } else {
        document.getElementById('boxId4').firstChild.disabled = false;
        document.getElementById('boxId4').style.color= "black";
        }

    var clash2b = document.getElementById('boxId4').firstChild;
        if (clash2b.checked) {
        document.getElementById('boxId2').style.color= "grey";
        document.getElementById('boxId2').firstChild.disabled = true;
        console.log("please2!");
        } else {
        document.getElementById('boxId2').firstChild.disabled = false;
        document.getElementById('boxId2').style.color= "black";
        }
}

//add comments to this function
function runningTotal() {
    newTotal = 0; //this empties the global variable's value to stop it storing each new string one on top of the other as the code repeats.
    if(document.getElementById("total"))
        { var elem = document.getElementById("total");
        elem.remove();
        }

    var activities = document.querySelector('.activities').getElementsByTagName('label');
    var length = activities.length;

    for (var i =0; i<length; i+=1) {
        var temp = document.getElementById("boxId" + i).firstChild;
        if (temp.checked) {
            var a = document.getElementById("boxId" + i).textContent;
            var numb = a.match(/\$(\d+)/);
            var numb1 = (numb[1]);
            var newNumber = parseInt(numb1, 10); //converts string to number at base 10.
            newTotal = newTotal + newNumber;
        }
    }

    if (newTotal !== 0) {
        myText = ("Total: $" + newTotal);
        var para = document.createElement("p");
        para.id = "total";
        var node = document.createTextNode(myText);
        para.appendChild(node);
        var element = document.getElementsByTagName("fieldset")[2];
        element.appendChild(para);
    }
}



paymentFieldset.removeChild(cc);
paymentFieldset.removeChild(paypal);
paymentFieldset.removeChild(bitcoin);

function payment() {
    if (paymentFieldset.childNodes[9]) { //checks to see if a 9th childNode is present (there won't be if a user has selected 'Select Payment Method')
        paymentFieldset.removeChild(paymentFieldset.childNodes[9]); //removes either bitcoin, paypal or cc, whichever has been previously selected.
        //document.getElementById("exp-month").classList.toggle("styled-select");
        //document.getElementById("exp-year").classList.toggle("styled-select");
        }
    var e = document.getElementById("payment");
    var paymentType = e.options[e.selectedIndex].text;
    if (paymentType === "Credit Card") { //adds in cc section if selected
        paymentFieldset.appendChild(cc);

    } else if (paymentType === "PayPal") { //adds in paypal section if selected
        paymentFieldset.appendChild(paypal);
    } else if (paymentType === "Bitcoin") {
        paymentFieldset.appendChild(bitcoin); //adds in bitcoin section if selected
    } /* else {
        document.getElementById("payment").options[1].selected = true;
        paymentFieldset.appendChild(cc); //this sets cc option as default if nother else selected (for onload, essentially) */
    }


function disableBubbles() {
    document.querySelector( "input" ).addEventListener( "invalid",
            function( event ) {
                event.preventDefault();
            });
}

function validate() {
    disableBubbles();

    //name input validator
    var x = document.getElementById("name");
    if(x.validity.valid === false) {
        var y = document.getElementsByTagName("fieldset")[0].childNodes[3];
        //console.log(y);
        y.style.color= '#8B0000';
        y.textContent= "Name: (please provide your name)";
    }
    //email input validator
    var email = document.getElementById("mail");
    var valid = /[^@]+@[^@]+/.test(email.value);
    if(!valid) {
        var newEmail = document.getElementsByTagName("fieldset")[0].childNodes[9];
        newEmail.style.color= '#8B0000';
        newEmail.textContent= "Email: (please provide a valid email address)";
    }

    //T-Shirt validator
    var b = document.getElementById("design");
    var selectedValue = b.options[b.selectedIndex].value;
    if (selectedValue == "Select Theme") {
        console.log("T Shirt Validation has fired");

         var d2 = document.getElementById("shirtError");
         d2.insertAdjacentHTML('beforebegin', '<p id="one">Don\'t forget to pick a T-Shirt</p>');
         var d2colour = document.getElementById("one");
         d2colour.style.color = '#8B0000';

    }

    var d1 = document.getElementById("actError");
    d1.insertAdjacentHTML('beforebegin', '<p id="two">Please select an Activity</p>');
    var newcolour = document.getElementById("two");
    newcolour.style.color = '#8B0000';

    //Activity validator
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

//Payment type validator
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


    //Credit Card Validator
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




    //zipcode validator
    var zipCodeInput = document.getElementById("zip");
    var zipMessage = document.getElementById("zipCodeLabel"); //THIS ID HAS BEEN HARDCODED IN. FIX.
        if(zipCodeInput.validity.valid === false) {
        zipMessage.style.color= '#8B0000';
    }  else {
        zipMessage.style.color= '#000000'; //resets colour to black if zip code entered.
    }
    //cvv validator
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


/////////////////////
// LUHN!!
/////////////////////




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
document.getElementById("title").classList.toggle("styled-select");
document.getElementById("size").classList.toggle("styled-select");
document.getElementById("design").classList.toggle("styled-select");
document.getElementById("color").classList.toggle("styled-select");
document.getElementById("payment").classList.toggle("styled-select");


//couldn't figure out how to add a class using getElementsByType or getElementsByTagName. Each time returned undefined?
}

///////////////////
// WIRING
///////////////////
window.onload = function() {
  focus();
  titleOther();
  tShirt();
  activities();
  payment();
  style();
  document.getElementById("payment").options[1].selected = true; //sets credit card as default payment method
  paymentFieldset.appendChild(cc); //this sets cc option as default if nother else selected (for onload,
      document.getElementById("exp-month").classList.toggle("styled-select");
      document.getElementById("exp-year").classList.toggle("styled-select");
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
    //email();
    //validateTshirt();
    //valActivity();
}

//getElementsByTagName needs array notation to access elements.
//getElementById does not.
// research this.
