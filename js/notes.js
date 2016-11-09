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
