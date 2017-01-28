var table = document.getElementById("table");
var zero = document.getElementById("zero");
table.innerHTML = "playing cards table";

//Events fired when the user dbl clicks on a cards
document.addEventListener('dblclick', changeFace);



//change side function

function changeFace(event) {
    if (event.target.className == 'card') {
        event.target.className +=' downcard';
    }
    else if (event.target.className == 'card downcard') {
        event.target.className = 'card';
    }

}

/* Events fired on the drag target */

document.addEventListener("dragstart", function(event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    event.dataTransfer.setData("Text", event.target.id);
    console.log(event.target);
    // Change the opacity of the draggable element
    event.target.style.opacity = "0.4";
});

// While dragging the p element, change the color of the output text
document.addEventListener("drag", function(event) {
    table.style.color = "red";
});

//Reset the opacity when finished dragging the p element and also change the face;
document.addEventListener("dragend", function(event) {
	console.log(event.target);
    event.target.style.opacity = "1";
    changeFace(event);
});



/* Events fired on the drop target */
// When the draggable p element enters the droptarget, change the DIVS's border style
document.addEventListener("dragenter", function(event) {
    if ( event.target.className == "droptarget" ) {
        event.target.style.border = "3px dotted red";
    }
});

// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

// When the draggable p element leaves the droptarget, reset the DIVS's border style
document.addEventListener("dragleave", function(event) {
    if ( event.target.className == "droptarget" ) {
        event.target.style.border = "";
    }
});


/* On drop - Prevent the browser default handling of the data (default is open as link on drop)
   Reset the color of the output text and DIV's border color
   Get the dragged data with the dataTransfer.getData() method
   Append the dragged element into the drop element
*/
document.addEventListener("drop", append);

function append(event) {
    event.preventDefault();
    if ( event.target.className == "droptarget" ) {
        table.style.color = "";
        event.target.style.border = "";
        var data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));
    }
}