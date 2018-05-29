/*jshint esversion: 6 */


//const star = document.createElement("li");
//star.innerHTML = '<i class="fa fa-star"></i>';
//document.getElementById('stars').appendChild(star);


const ps = document.querySelectorAll("p");
// I wanted a function that will remove one or more classes from one or more elements - a node or a node list.
function removeClasses(theElements, ...theClasses){
    // Test to see if "theElements" is a single node or a node list. Credit to Tim Pietrusky https://twitter.com/jackrugile/status/435539724774547456. NodeList has a method called item() that node does not. If the type of something.item is undefined, then you're not dealing with a NodeList.
    if( typeof theElements.item === 'undefined' ) {
        // Iterate over the "theClasses" rest parameter
        for(theClass of theClasses){
            // Use classList.remove() to remove each class
            theElements.classList.remove(theClass);
        }  
    } else {
        // When dealing with a node list, iterate over each node
        for(theElement of theElements){
            // Iterate over the "theClasses" rest parameter
            for(theClass of theClasses){
                // Use classList.remove() to remove each class
                theElement.classList.remove(theClass);
            }
        }
    }
}

removeClasses(ps, "class4", "class5");

//Now I need one to add one or more classes to one or more elements
function addClasses(theElements, ...theClasses){
    // Test to see if "theElements" is a single node or a node list. Credit to Tim Pietrusky https://twitter.com/jackrugile/status/435539724774547456. NodeList has a method called item() that node does not. If the type of something.item is undefined, then you're not dealing with a NodeList.
    if( typeof theElements.item === 'undefined' ) {
        // Iterate over the "theClasses" rest parameter
        for(theClass of theClasses){
            // Use classList.add() to add each class
            theElements.classList.add(theClass);
        }  
    } else {
        // When dealing with a node list, iterate over each node
        for(theElement of theElements){
            // Iterate over the "theClasses" rest parameter
            for(theClass of theClasses){
                // Use classList.add() to add each class
                theElement.classList.add(theClass);
            }
        }
    }
}

addClasses(ps, "class1", "class2", "class3");

// Some stop watch structures
var clear; 
function stopWatch( ) { 
    // javascript statement here 
    clear = setTimeout( "stopWatch( )", 1000 ); 
} 
// Or 
function stopWatch( ) { 
    // javascript statement here 
    clear = setTimeout( function ( ) { 
        // javascript statement here 
    }, 1000 ); 
}
// Or 
var stopWatch = function ( ) { 
    // javascript statement here 
    clear = setTimeout( "stopWatch( )", 1000 ); 
} 