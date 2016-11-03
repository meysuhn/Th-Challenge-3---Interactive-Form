var punsOptions = document.getElementById("color").options; //this seems to be storing the options in an array? how to individually access them?
var heartOptions = document.getElementById("color").options[4];
console.log("punsOptions:" + punsOptions);
console.log("heartOptions:" + heartOptions);

punsOptions1 = punsOptions[0]; //this HAS accessed the 1 options element. Look at the change in the console.
console.log("punsOptions 1:" + punsOptions1);
///// Leave the above alone for now.


//aim to get all six in for now. then figure out how to get just 3 later.

var optionsObject = document.getElementById("color").options;

var select = document.getElementById("color"); //not sure what this refers to?
//select.options[select.options.length] = new Option('Text 1', 'Value1');

// could you then just adapt this? select.options[select.options.length] = new Option(myobject[index], index) to work like the above? and do it three times? avoiding the for loop...
optionsObject.ValueA = new Option(select[0], 0); //is this first picking the object from the array, and the second index saying where to put it in the new thing?
console.log(optionsObject.ValueA);
//ask community again. Explain what I'm doing and leave until later.

var f = document.getElementById("color");
var test = f.options; //[f.selectedIndex];
var test2 = test[1].text; //this is working in terms if getting text info out of the options.
console.log("test2:" +" "+test2);
