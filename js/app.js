var table = document.getElementById("table");
var timer = document.getElementById("timer");
var timeString = timer.innerHTML;
var availableCards = document.getElementById('availablecards');
table.innerHTML = "playing cards table";

//Events fired when the user dbl clicks on a cards
availableCards.addEventListener('dblclick', changeFace);


function animate(event) {
    if ((event.target.className == 'card') || (event.target.className == 'card downcard')) {
        event.target.style.transform = "rotate(4deg)";
    }
}

function animateReset(event) {
    if ((event.target.className == 'card') || (event.target.className == 'card downcard')) {
        event.target.style.transform = "rotate(0deg)";
    }
}

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
    event.target.style.transform = 'rotate(4deg)';
});

document.addEventListener("drag", function(event) {
    event.target.style.transform = 'rotate(4deg)';
});

//Reset the rotation when finished dragging the p element and also change the face;
document.addEventListener("dragend", function(event) {
	console.log(event.target);
    event.target.style.transform = 'rotate(0deg)';
   
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
    
    if (event.target.className == "droptarget" ) {
        table.style.color = "";
        event.target.style.border = "";
        var data = event.dataTransfer.getData("Text");
        var card = document.getElementById(data);
        event.target.appendChild(card);
        if (( card.className== 'card') && (event.target.id == 'table')) {
            card.className +=' downcard';
        }
        else if (( card.className== 'card downcard') && (event.target.id == 'availablecards')) {
            card.className ='card';
        }
    }

         
}