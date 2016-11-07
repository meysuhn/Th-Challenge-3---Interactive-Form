

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


function titleOther() {
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
            console.log("Select Theme has fired");
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
    paymentFieldset.removeChild(paymentFieldset.childNodes[9]); //removes either bitcoin, paypal or cc, whichever has been previously selected.
    var e = document.getElementById("payment");
    var paymentType = e.options[e.selectedIndex].text;
    if (paymentType === "Credit Card") { //adds in cc section if selected
        paymentFieldset.appendChild(cc);

//jQuery Plugin starts here
        var result = $('#cc_num').validateCreditCard(valid);
        alert('CC type: ' + result.card_type.name + '\nLength validation: ' + result.length_valid+ '\nLuhn validation: ' + result.luhn_valid);
//jQuery Plugin ends

    } else if (paymentType === "PayPal") { //adds in paypal section if selected
        paymentFieldset.appendChild(paypal);
    } else if (paymentType === "Bitcoin") {
        paymentFieldset.appendChild(bitcoin); //adds in bitcoin section if selected
    } else {
        document.getElementById("payment").options[1].selected = true;
        paymentFieldset.appendChild(cc); //this sets cc option as default if nother else selected (for onload, essentially)
    }

}


//Validation function
// onload need to add 'required' etc to various elements
//Form Validation
    //has to only run once submit button is clicked (see video)

    //check elements to see if required returns false/true
        //if info needed add error message
//use HTML form validation? or use javascript? The former being inserted with javascript
//Name: (please provide you name)
//Email: (please provide a valid email address)
//Don't forget to pick a T-Shirt
//Please select an activity
//to test if credit card option elected see the method somewhere above. there is a test for presence of html somewhere there.


function style() { //This function styles the select drop-down menus
document.getElementById("title").classList.toggle("styled-select");
document.getElementById("size").classList.toggle("styled-select");
document.getElementById("design").classList.toggle("styled-select");
document.getElementById("color").classList.toggle("styled-select");
document.getElementById("payment").classList.toggle("styled-select");
document.getElementById("exp-month").classList.toggle("styled-select");
document.getElementById("exp-year").classList.toggle("styled-select");

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
}

//getElementsByTagName needs array notation to access elements.
//getElementById does not.
// research this.
