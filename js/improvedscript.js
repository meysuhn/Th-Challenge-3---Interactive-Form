
//PROBLEMS:
//(1) Validation
    //Scenario 1
    //after loading if all details are correctly entered then form will submit fine.

    //Scenario 2 (Bug 1)
    //after loading if 'register' is pressed right away without any data input then error messages will show however once the user adds in correct details and presses 'register' again then the form will fail to submit.

    //Scenario 3 (Bug 2)
    //after loading if a name is put in the name input but all other fields are left blank then the form will still incorrectly submit on pressing register. This only happens on the name field (i.e. if something is placed in the email field and everything else left black then the form does not submit)

//(2) Firefox Select Menu Error
    // the code works fine (in Chrome, Safari and Opera but on Firefox there is a problem with the dropdown menus. Once a drop down menu is clicked all the text turns to dashes (----------). I wonder if this has something to do with the webkit changes in css, but if it is I've not been able to find any info on it.

//(3) tShirt and Activities error message.
    //At present the error messages are inserted by accessing the legend elements and using insertAdjacentHTML. The problem with this is that it leaves a large gap between the error message and the legend text.

    //I've tried inserting some error text as a child node of the legend element (see lines 21 - 26), but other than changing the colour I've been unable to alter the style of the inserted element (it's inheriting everything from the parent and I can't seem to change that)

    //var node = document.createElement("p");
    //var textnode = document.createTextNode("error message");
    //node.appendChild(textnode);
    //node.style.color= '#8B0000';
    //var list = document.getElementById("legend");
    //list.insertBefore(node, list.childNodes[1]);




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

var nameSubmittable = false;
var emailSubmittable = false;
var tShirtSubmittable = false;
var activitySubmittable = false;
var paymentTypeSubmittable = false;
var creditcardSubmittable = false;
var cvvSubmittable = false;
var zipSubmittable = false;

///////////////////
// FUNCTIONS
///////////////////

function ids () { //adds in all the IDs and attribute for the script below

var shirtErrorId = document.getElementsByTagName("fieldset")[1].childNodes[1];
shirtErrorId.id = "shirtError";

var actErrorId = document.getElementsByTagName("fieldset")[2].childNodes[1];
actErrorId.id = "actError";

document.getElementById("name").required = true; //adds required attribute for name input field

}

function nameFocus () {
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
        var runningTotalText = ("Total: $" + newTotal); // create text string with current number value
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
    }
    }


function disableBubbles() { //this function disables the browser's automatic error bubbles
    document.querySelector( "input" ).addEventListener( "invalid", // //get all inputs and checks if invalid (using the required attribute)
            function( x ) { //prevent default method is run on any invalid inputs
                x.preventDefault();
            });
}


function nameValidator() { //NAME INPUT VALIDATOR
var nameInput = document.getElementById("name"); //get the name input
var nameError = document.getElementsByTagName("fieldset")[0].childNodes[3]; //Access name label (3rd childnode of 1st fieldset)
if(nameInput.validity.valid === false) { //if input is empty (not valid)
    nameError.style.color= '#8B0000'; //set error colour
    nameError.textContent= "Name: (please provide your name)"; //set error message
    nameSubmittable = false;
    //preventSubmission(); //prevent 'Register' button from submitting form data
} else {
    nameError.style.color= '#000000'; //set error colour
    nameError.textContent= "Name:"; //set error message
    nameSubmittable = true; //set submittable variable to true if a a name is input
}
console.log("Name Submittable =" + nameSubmittable);
}


function emailValidator() { //EMAIL INPUT VALIDATOR
    var emailInput = document.getElementById("mail"); //get email input
    var newEmail = document.getElementsByTagName("fieldset")[0].childNodes[7]; //access email label
    var validEmail = /[^@]+@[^@]+/.test(emailInput.value); //Regex test for correct email format
    if(!validEmail) { //if email is not valid...(returns 'false')
        newEmail.style.color= '#8B0000'; //set error colour
        newEmail.textContent= "Email: (please provide a valid email address)"; //set error message
        emailSubmittable = false;
        //preventSubmission(); //prevent 'Register' button from submitting form data
    } else {
        newEmail.style.color= '#000000'; //set error colour
        newEmail.textContent= "Email:"; //set error message
        emailSubmittable = true; //set submittable variable to true if email input
    }
    console.log("Email Submittable =" + emailSubmittable);
}

function tShirtValidator() { //T-SHIRT VALIDATOR
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
         tShirtSubmittable = false;
         //preventSubmission(); //prevent 'Register' button from submitting form data
     } else {
         tShirtSubmittable = true;
         if (document.getElementById("tshirtErrorMessage")) { //checks to see if id/element exists
                 var elem4 = document.getElementById("tshirtErrorMessage"); //if it does exist, get it and...
                 elem4.remove(); //... remove it
                 tShirtSubmittable = true; //set submittable variable to true if a design selected
         }
     }
     console.log("TShirt Submittable =" + tShirtSubmittable);
 }

function activityValidator() { //ACTIVITY VALIDITOR
    if (document.getElementById("activityErrorMessage")) { //checks to see if id/element exists
        var elem5 = document.getElementById("activityErrorMessage"); //if it does exist, get it and...
        elem5.remove(); } //... remove it

     for (var i =0; i<activityLength; i+=1) { //for each of the checkboxes do the following:
     var checkbox = document.getElementById('boxId' + i).firstChild; // access checkbox of each element
     var checkboxResult = checkbox.checked; //stored the boolean value
     //console.log(i);
     if (checkboxResult === true) { //if any checkbox is checked (true) then break the loop
         activitySubmittable = true;  //set submittable variable to true if at least one activity selected
         break;
     }
     }
     if (i === 7) { //if i = 7 it means all checkboxes are unchecked, in which case insert error


         var activityLegend = document.getElementById("actError"); //select activity legend
         activityLegend.insertAdjacentHTML('beforebegin', '<p id="activityErrorMessage">Please select an Activity</p>'); //insert error message
         var newcolour = document.getElementById("activityErrorMessage"); //access newly created error element
         newcolour.style.color = '#8B0000'; //set error colour
         activitySubmittable = false;



     } else { //if i is not 7 then at least one checkbox is checked. Remove any existing error message.
         if (document.getElementById("activityErrorMessage")) { //checks to see if id/element exists
             var elem6 = document.getElementById("activityErrorMessage"); //if it does exist, get it and...
             elem6.remove(); } //... remove it
             activitySubmittable = true;  //set submittable variable to true if at least one activity selected
             }
             console.log("Activity Submittable =" + activitySubmittable);
}


function paymentTypeValidator() { //PAYMENT TYPE VALIDATOR
     var paymentSelectMenu = document.getElementById("payment"); //get payment method select menu
     var paymentMethodValue = paymentSelectMenu.options[paymentSelectMenu.selectedIndex].value; //get value of selected method
     if (paymentMethodValue == "select_method") //test to see if matches "select_method"
     {
     var paymentError = document.getElementsByTagName("fieldset")[3].childNodes[3]; //access ui (user interface) text
     paymentError.style.color= '#8B0000'; //set error colour
     paymentError.textContent= "Payment (please select a payment method:)"; //alter ui text
     paymentTypeSubmittable = false;
     //preventSubmission(); //prevent 'Register' button from submitting form data
    } else { //return to original ui text
     var paymentMessage = document.getElementsByTagName("fieldset")[3].childNodes[3]; //access ui text
     paymentMessage.style.color= 'black'; //return colour to black
     paymentMessage.textContent= "I'm going to pay with:"; //return ui text to original
     paymentTypeSubmittable = true; //set submittable variable to true if payment type selected
    }
    console.log("Payment Type Submittable =" + paymentTypeSubmittable);
}

//CREDIT CARD VALIDATOR
function valid_credit_card() { //fires when register clicked
    var oddIndexNumbers =[]; //holds the oddly indexed numbers from card number
    var evenIndexNumbers =[]; //holds the evenly indexed numbers from card number
    var evenIndexNumbers2 = [];  //holds the altered even indexed numbers from card
    var oddSum = 0; //holds sum value of all odd numbers
    var evenSum = 0; //holds sum value of all even numbers

    var paymentMenu = document.getElementById("payment"); //select payment menu options
    var paymentType = paymentMenu.options[paymentMenu.selectedIndex].text; //get selected option
        if (paymentType === "Credit Card") { // if selection = "Credit Card" run the Luhn test below.
            //console.log("cc selected");

                    //if credit card selected, take the input value and perform initial validity check
                    var cardInput = document.getElementById("cc-num"); //get the input element
                    var cardInputValue = cardInput.value; //get and store the value (the user input)
                    var ccMessage = document.getElementById("cc-numLabel"); //get ui text
                    //console.log(cardInputValue);
                    //console.log(cardInputValue.length);
                	if ((/[^0-9-\s]+/.test(cardInputValue)) || (cardInputValue.length ===0)) { //test if contains only digits, dashes or spaces OR if input is empty (if empty zero is returned and Luhn test below sees this as passing...)
                        //this regex is actually testing if the card contains INVALID characters. This if clause will run if there IS an invalid character.
                        //console.log("Number has FAILED initial validity test");
                        ccMessage.textContent= "Not a valid card number:"; //insert error message
                        ccMessage.style.color= '#8B0000'; //set error colour
                        creditcardSubmittable = false;
                        //preventSubmission(); //prevent 'Register' button from submitting form data

                    } else {
                        console.log("PASSED initial validity test");

                        var reversedInput =  cardInputValue.split("").reverse().join(""); // take user input and reverses the digits
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
                              oddSum += convertOdd; // total each array item
                          }

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

                            if (digitSplit.length === 2) { //if there are two digits (i.e. if was greater than 10)
                                var addSplits = parseInt(digitSplit[0]) + parseInt(digitSplit[1]); //convert each number to integer then add together
                                evenIndexNumbers2.push(addSplits); //push to altered even array
                            } else {
                                var singleCharToConvert = parseInt(digitSplit); //convert single characters/digits back to a number
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
                          var luhnResult = evenSum + oddSum; //altered even index numbers total plus odd index numbers total
                          console.log(luhnResult);
                          var isEndsWithZero =luhnResult%10; //check is luhnResult ends in zero
                          if(isEndsWithZero!==0) { //if doesn't end in zero, throw error message
                             console.log("Fail!");
                             ccMessage.textContent= "Not a valid card number:"; //insert error message
                             ccMessage.style.color= '#8B0000'; // //insert error colour
                             submittable = false;
                             //preventSubmission(); //prevent 'Register' button from submitting form data
                         } else {
                             console.log("Pass!");
                             ccMessage.textContent= "Card Number:"; //correct message
                             ccMessage.style.color= '#000000'; //correct message colour to OK
                             creditcardSubmittable = true;
                         }
                    } // this closes the huge luhn else condition
                    console.log("Credit Card Submittable =" + creditcardSubmittable);
        } else {
            creditcardSubmittable = true; //set submittable variable to true if credit card not selected
            console.log("Credit Card Submittable =" + creditcardSubmittable);
        }




    //CVV VALIDATOR
    if (document.getElementById("cvv")) {
    var cvvMessage = document.getElementById("cvvLabel");
    var cvvInput = document.getElementById("cvv");
    var cvvInputValue = cvvInput.value; // get the content of the input element
    var numbersOnly = /^\d+$/.test(cvvInputValue); //regex test checks to see if content is made up of numbers only. Returns TRUE or FALSE

    if (cvvInputValue.length === 0) {
        cvvMessage.textContent= "Enter CVV:"; //advise user to insert a CVV
        cvvMessage.style.color= '#8B0000'; //change text to red to indicate error
        cvvSubmittable = false;


    } else if ((cvvInputValue.length < 3) || (cvvInputValue.length > 3)) {
        cvvMessage.textContent= "CVV (3 Digits):"; //error to indicate invalid cv
        cvvMessage.style.color= '#8B0000'; //change text to red to indicate error
        cvvSubmittable = false;

    } else if (!numbersOnly) {
        //console.log("else if fired!");
        cvvMessage.textContent= "CVV (0-9 only):"; //error to indicate invalid cv
        cvvMessage.style.color= '#8B0000'; //change text to red to indicate error
        cvvSubmittable = false;
        //preventSubmission(); //prevent 'Register' button from submitting form data

    } else {
        cvvMessage.textContent= "CVV:"; //reset message to original
        cvvMessage.style.color= '#000000'; //resets colour to black if zip code entered.
        cvvSubmittable = true;
    }
    console.log("CVV Submittable =" + cvvSubmittable);
} else {
    cvvSubmittable = true; //set submittable variable to true if credit card not selected
    console.log("CVV Submittable =" + cvvSubmittable);
}

    //ZIP CODE VALIDATOR
    if (document.getElementById("zip")) {
    var zipCodeInput = document.getElementById("zip"); //get zip input element
    var zipCodeInputValue = zipCodeInput.value; // get the content of the input element
    var zipMessage = document.getElementById("zipCodeLabel"); //for altering the text
    //console.log(zipCodeInputValue.length);
        if (zipCodeInputValue.length === 0) { // if length is zero it means there is no text
        zipMessage.style.color= '#8B0000'; //change text to red to indicate error
        //console.log("zip error");
        zipSubmittable = false;
        //preventSubmission(); //prevent 'Register' button from submitting form data
    }  else {
        zipMessage.style.color= '#000000'; //resets colour to black if zip code entered.
        zipSubmittable = true;
        //console.log("zip OK");
    }
    console.log("Zip Code Submittable =" + zipSubmittable);
} else {
    zipSubmittable = true; //set submittable variable to true if credit card not selected
    console.log("Zip Code Submittable =" + zipSubmittable);
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

window.onload = function() { //onload run the following functions:
  ids(); //adds required ids.
  nameFocus();
  titleOther();
  tShirt();
  activities();
  payment();
  style();
  document.getElementById("payment").options[1].selected = true; //sets credit card as default payment method
  paymentFieldset.appendChild(cc); //this sets cc option as default if nother else selected (for onload,
      document.getElementById("exp-month").classList.toggle("styled-select"); //add "styled select" for drop-down styling
      document.getElementById("exp-year").classList.toggle("styled-select"); //add "styled select" for drop-down styling
      var b = document.querySelector("button"); //must
      if (b.type === "submit") {
         b.removeAttribute("submit");
      }


};


//Event Handlers
document.getElementById("title").addEventListener("change", titleOther);  //runs titleOther function on change
document.getElementById("design").addEventListener("change", tShirt); //runs tShirt function on change
document.getElementsByTagName("fieldset")[2].addEventListener("change", activities); //runs activities function on change
document.getElementsByTagName("fieldset")[2].addEventListener("change", runningTotal); //runs runningTotal function on hange
document.getElementById("payment").addEventListener("change", payment); //runs payment function on change


//Validation event handlers
document.getElementById("name").addEventListener("change", nameValidator); //validate name input on change
document.getElementById("mail").addEventListener("change", emailValidator); //validate email input on change
document.getElementById("design").addEventListener("change", tShirtValidator); //validate design section on change
document.getElementsByTagName("fieldset")[2].addEventListener("change", activityValidator); //validate activities section on change
document.getElementById("payment").addEventListener("change", paymentTypeValidator); //validate payment section on change


document.getElementsByTagName("button")[0].addEventListener("click", register); //Runs register function once register button is pressed.



function register() { //this functions will start validation once register button is pressed
    disableBubbles();
    nameValidator();
    emailValidator();
    tShirtValidator();
    activityValidator();
    valid_credit_card();
    if (nameSubmittable || emailSubmittable || tShirtSubmittable || activitySubmittable || paymentTypeSubmittable || creditcardSubmittable || cvvSubmittable || zipSubmittable === false) { //if any of the variables are false then prevent form submitting
        console.log("At least one condition is false");
        document.getElementById("button").addEventListener("click", function(event){
        event.preventDefault();
    }
);} else {
    console.log("All true, can submit to server");
}
}
