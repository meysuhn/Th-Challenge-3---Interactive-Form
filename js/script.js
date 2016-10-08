window.onload = function() {
  focus();
};


function focus () {
    document.getElementById("name").focus();

}
document.getElementById("title").addEventListener("change", titleOther);



//var other; //could this hold any text from the other value, that I would pass in with session storage?
//var input =









function titleOther() {
    var e = document.getElementById("title");
    var strUser = e.options[e.selectedIndex].value;
//don't forget to delete / hide other element here.
    console.log(strUser);
    console.log("working");
    if (strUser === "other") {
        console.log("hello!");
        addinputFields();
    }
}


function addinputFields(){
    var form = document.getElementsByTagName("fieldset")[0];
    var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Your Title...";
        input.id = "other-title";
        form.appendChild(input);

        //Chris Extra Credit - this could be complete nonsense but an interesting experiment:
        //and if user clicks off the other thing but then reselcts later, they lose their input? sessionstorage?
        //would a pseudo element fit here?
            //you'd need a variable to update everything a key is pressed (see old challenge). This variable is then logged, via a function?, to the session storage.
            //on load this variable is accessed and passed to the input element.
}
