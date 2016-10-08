//CAN I FIRST DO THIS IN J QUERY AND THEN TRY IN VANILLA JS?

//Instructions

//Create and link a JavaScript file to index.html
    //Create a JavaScript file inside the "js" folder and link it to index.html
    //If you're using jQuery, link index.html to the latest version of jQuery

//DONE - //Set focus on the first text field:
    //When the page loads, give focus to the first text field

//DONE - //"Job Role" section of the form: reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
    //Make sure you add an text input field
    //Use the id of "other-title" for the field
    //Add placeholder text of "Your Title" for the field



//"T-Shirt Info" section of the form: for the T-Shirt color menu, only display the options that match the design selected in the "Design" menu.
    //If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    //If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
// IF DESIGN = X, DISPLAY/HIDE Y. IF ELSE CLAUSE FOR THIS.
    //EXTRA CREDIT: Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
//HOPEFULLY NOT TOO DIFFICULT. AN IF / HIDE SCENARIO.


//"Register for Activities" section of the form:
    //Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
//UNSURE HOW TO GO ABOUT THIS. CSS SELECTORS VID MAY HELP. but this is a js course...
//NEED TO KNOW WHAT I'M LISTENING OUT FOR.
    //When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
    //As a user selects activities to register for, a running total is listed below the list of checkboxes. For example, if the user selects "Main conference" then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
//NEED TO FIND() THE DOLLAR SIGN FROM WITHIN THE TEXT? STORE THIS NUMBER AND CONVERT TO INTEGER. DOESN'T SEEM TO BE ANYTHING ELSE TO GO ON. THEN ADD UP ACCORDINGLY WITH A FUNCTION.


//Payment Info section of the form: display payment sections based on chosen payment option
    //The "Credit Card" payment option should be selected by default and result in the display of the #credit-card div, and hide the "Paypal" and "Bitcoin information.
    //When a user selects the "PayPal" payment option, display the Paypal information, and hide the credit card information and the "Bitcoin" information.
    //When a user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the credit card information.
//HOW TO DO THIS WILL PROBABLY BECOME CLEARER ONCE I'VE TACKLED THE TASKS ABOVE


//Form validation: display error messages and don't let the user submit the form if any of these validation errors exist:
    //Name field can't be empty
    //Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example. You'll need to use a regular expression to get this requirement. See the list of Resources for links to learn about regular expressions.
    //At least one activity must be checked from the list under "Register for Actitivities."
    //Payment option must be selected.
    //If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip code, and a 3 number CVV value.
//SOME ELONGATED SERIES OF IFs HERE? ONE IF FOR EACH VALIDATION ABOVE.
//THEN CAN YOU DO IF...AND...IF...? IS THAT A THING? OR IS THERE A BETTER WAY?




//Make sure your program is free of syntax errors.
    //You can monitor any errors by looking at the Developer Tools console in your browser.
    //Use jsHint (see Resources links) to check your code for syntax and formatting problems.

//Make sure you add code comments to explain how your programming works.

//When JavaScript is switched off or unavailable, all information required to be filled out should be visible. For example, the “Your Job Role” text field should already be available if someone selects “Other."

//////////////////////////////////
//Extra Credit
//////////////////////////////////

//Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
//HOPEFULLY NOT TOO DIFFICULT. AN IF / HIDE SCENARIO.

//Style the "select" menus (drop down menus) on the form, so they match the styling of the text fields (see Resources links for an article on how to improve the look of select menus using CSS and JavaScript).
//PLAY WITH THIS AT THE END.

//Validate the credit card number so that it's a validly formatted credit card number. (see the Resources links for information on how to do this.)
//PLAY WITH THIS AT THE END.
