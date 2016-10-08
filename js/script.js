


///////////////////
// FUNCTIONS
///////////////////
function focus () { //Sets focus on the first text field on page load.
    document.getElementById("name").focus();
}



function titleOther() {
    var e = document.getElementById("title");
    var titleSelection = e.options[e.selectedIndex].value;
    if(document.getElementById("other-title"))
        { var elem = document.getElementById("other-title");
        elem.remove();
        }
    console.log(titleSelection);
    console.log("working");
    if (titleSelection === "other") { //of 'other' is selected, provide text input for user.
        console.log("hello!"); //test.
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


///////////////////
// WIRING
///////////////////
window.onload = function() {
  focus();
};

document.getElementById("title").addEventListener("change", titleOther);
