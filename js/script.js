
///////////////////
// FUNCTIONS
///////////////////
function focus () { //Sets focus on the first text field on page load.
    document.getElementById("name").focus();
}



function titleOther() {
    var e = document.getElementById("title");
    var titleSelection = e.options[e.selectedIndex].value; //I THINK THESE TWO VARS CAN BE COMBINED INTO ONE.
    if(document.getElementById("other-title"))
        { var elem = document.getElementById("other-title");
        elem.remove();
        }
    //console.log(titleSelection);
    //console.log("working");
    if (titleSelection === "other") { //of 'other' is selected, provide text input for user.
        //console.log("hello!"); //test.
        (function (){ //nested anonymous function. This adds in input element.
                    var form = document.getElementsByTagName("fieldset")[0]; //Getting the first fieldset (index 0) as their are others in this form.
                    //originally tried to get the 'select' tag via its id, but this wouldn't work. Select tag seemed only able to display its options, but nothing else.

                    var input = document.createElement("input");
                        input.type = "text"; //set input attribute
                        input.placeholder = "Your Title..."; //add placeholder attribute
                        input.id = "other-title";
                        form.appendChild(input); //append the newly formed input variable to the form variable holding the first fieldset.
                    }
)();
}
}


//T-shirt info tasks

function tShirt() {

    var e = document.getElementById("design");
    var theme = e.options[e.selectedIndex].text;
    console.log("tShirt function has fired");

    document.getElementById("color").options[0].hidden = false;
    document.getElementById("color").options[1].hidden = false;
    document.getElementById("color").options[2].hidden = false;
    document.getElementById("color").options[3].hidden = false;
    document.getElementById("color").options[4].hidden = false;
    document.getElementById("color").options[5].hidden = false;

    //console.log(theme);
        if (theme === "Select Theme")
            {
            console.log("Select Theme has fired");
            document.getElementById("colors-js-puns").style.visibility = "hidden";
            }
        else if (theme === "Theme - JS Puns") {
            console.log("Puns has fired");
            document.getElementById("colors-js-puns").style.visibility = "visible";
            //document.getElementById("color").innerHTML = f;
            document.getElementById("color").options[3].hidden = true;
            document.getElementById("color").options[4].hidden = true;
            document.getElementById("color").options[5].hidden = true;

        } else if (theme === "Theme - I ♥ JS"){
            console.log("Heart has fired");
            document.getElementById("colors-js-puns").style.visibility = "visible";
            //document.getElementById("color").innerHTML = heartOptions;
            document.getElementById("color").options[3].selected = true;
            document.getElementById("color").options[0].hidden = true;
            document.getElementById("color").options[1].hidden = true;
            document.getElementById("color").options[2].hidden = true;

        }

}



//CONFERENCE FUNCTION
//THE CLASHES ARE:
    //INDEX 1 CLASHES WITH INDEX 3
    //INDEX 2 CLASHES WITH INDEX 4

    //is the problem here that undisable is fired when no disable property has yet been set? maybe put this function in an iffy? not on load...
function activities (){
    //undisable();
    var activities = document.querySelector('.activities').getElementsByTagName('label');
    var length = activities.length;
    for (var i =0; i<length; i+=1) {
        activities[i].id = "boxId" + i;
        }
    console.log("activities has fired");
//Is there a way to make the following 4 blocks of code shorter?

//no longer goes disabled? why?
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






//var paymentFieldset = document.getElementsByTagName("fieldset")[3];
var newTotal = 0; //holds the HTML string to display to page.

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



var cc = document.getElementById("credit-card");
var paypal = document.getElementById("credit-card").nextElementSibling;
var bitcoin = paypal.nextElementSibling; //this seems brittle, but it works so leave for the time being
var paymentFieldset = document.getElementsByTagName("fieldset")[3];
paymentFieldset.removeChild(cc);
paymentFieldset.removeChild(paypal);
paymentFieldset.removeChild(bitcoin);


function payment() {
    paymentFieldset.removeChild(paymentFieldset.childNodes[9]);
    var e = document.getElementById("payment");
    var paymentType = e.options[e.selectedIndex].text;
    if (paymentType === "Credit Card") {
        paymentFieldset.appendChild(cc);
        console.log("Credit Card!");
    } else if (paymentType === "PayPal") {
        paymentFieldset.appendChild(paypal);
        console.log("PayPal!");
    } else if (paymentType === "Bitcoin") {
        paymentFieldset.appendChild(bitcoin);
        console.log("Bitcoin!");
    } else {
        document.getElementById("payment").options[1].selected = true;
        paymentFieldset.appendChild(cc);
    }

}


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




//Form validation: display error messages and don't let the user submit the form if any of these validation errors exist:
    //Name field can't be empty
    //Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example. You'll need to use a regular expression to get this requirement. See the list of Resources for links to learn about regular expressions.
    //At least one activity must be checked from the list under "Register for Actitivities."
    //Payment option must be selected.
    //If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip code, and a 3 number CVV value.


//styling

function style() {
console.log("Style has fired!");
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
//document.getElementsByClassName("activities").addEventListener("change", activities);
//document.getElementsByType("fieldset").addEventListener("change", activities);
document.getElementsByTagName("fieldset")[2].addEventListener("change", activities);
document.getElementsByTagName("fieldset")[2].addEventListener("change", runningTotal);
document.getElementById("payment").addEventListener("change", payment);


document.getElementsByTagName("button")[0].addEventListener("click", register, false); //starts code off once button is clicked.
function register() {
    console.log("Register!");
}

//getElementsByTagName needs array notation to access elements.
//getElementById does not.
// research this.
