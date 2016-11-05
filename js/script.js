//use a query selector on all the select elements. Use this to add a class to each select element.
    //fixinf the activities function below should give some guidance on this.


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

var total =''; //holds the HTML string to display to page.

function runningTotal() {
    total = ''; //this empties the global variable's value to stop it storing each new string one on top of the other as the code repeats.
    console.log("Running Total has fired!");

    var a = document.getElementById('boxId0').textContent;
    //console.log(a);
    //var n = a.search("$");
    //console.log(n);
    var numb = a.match(/\$(\d+)/);
    console.log(numb[1]);

    var numberTotal = 300;
    //have to build us the node text
    myText = ("Total: $" + numberTotal);

    var para = document.createElement("p");
    var node = document.createTextNode(myText);
    para.appendChild(node);
    var element = document.getElementsByTagName("fieldset")[2];
    element.appendChild(para);
    //getElementsByTagName("fieldset")[2];
    //var element =

/*
 //OR document.getElementsByTagName("fieldset")[2]
    var content = document.getElementsByTagName("fieldset")[2];
    //document.getElementsByClassName("activities");
    var bonjour = "<p>hola</p>";
    content.appendChild(bonjour);
*/
    //adapt this:
    //var clash2a = document.getElementById('boxId2').firstChild;
         //if (clash2a.checked) {



    //total to oly diaply once a value is clicked (see vid)
    //class of activities
    //var total = ''; //this empties the variable's value to stop it storing each new string one on top of the other as the code repeats.

    //var e = document.getElementsByClassName("activities");

    //boxIDs!!!!

    //var str = "Visit W3Schools!";
    //var n = str.search("$");



}


    //As a user selects activities to register for, a running total is listed below the list of checkboxes. For example, if the user selects "Main conference" then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
//NEED TO FIND() THE DOLLAR SIGN FROM WITHIN THE TEXT? STORE THIS NUMBER AND CONVERT TO INTEGER. DOESN'T SEEM TO BE ANYTHING ELSE TO GO ON. THEN ADD UP ACCORDINGLY WITH A FUNCTION.

//or can I j

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

///////////////////
// WIRING
///////////////////
window.onload = function() {
  focus();
  tShirt();
  activities();
  payment();
};

document.getElementById("title").addEventListener("change", titleOther);
document.getElementById("design").addEventListener("change", tShirt);
//document.getElementsByClassName("activities").addEventListener("change", activities);
//document.getElementsByType("fieldset").addEventListener("change", activities);
document.getElementsByTagName("fieldset")[2].addEventListener("change", activities);
document.getElementsByTagName("fieldset")[2].addEventListener("change", runningTotal);
document.getElementById("payment").addEventListener("change", payment);
