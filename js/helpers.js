/*jshint esversion: 6 */

const ps = document.querySelectorAll("p");
// I wanted a function that will remove one or more classes from one or more elements - a node or a node list.
function removeClasses(theElements, ...theClasses){
    // Test to see if "theElements" is a single node or a node list. Credit to Tim Pietrusky https://twitter.com/jackrugile/status/435539724774547456. NodeList has a method called item() that node does not. If the type of something.item is undefined, then you're not dealing with a NodeList.
    if( typeof theElements.item === 'undefined' ) {
        // Iterate over the "theClasses" rest parameter
        for(const theClass of theClasses){
            // Use classList.remove() to remove each class
            theElements.classList.remove(theClass);
        }  
    } else {
        // When dealing with a node list, iterate over each node
        for(const theElement of theElements){
            // Iterate over the "theClasses" rest parameter
            for(const theClass of theClasses){
                // Use classList.remove() to remove each class
                theElement.classList.remove(theClass);
            }
        }
    }
}
//Now I need one to add one or more classes to one or more elements
function addClasses(theElements, ...theClasses){
    // Test to see if "theElements" is a single node or a node list.
    // Credit to Tim Pietrusky https://twitter.com/jackrugile/status/435539724774547456.
    // NodeList has a method called item() that node does not. If the type of something.item is undefined, then you're not dealing with a NodeList.
    if( typeof theElements.item === 'undefined' && !Array.isArray(theElements)) { // If true, the left side of the condition will tell me whether I'm dealing with a node list, but not whether that leaves me with a single node, a single element, or an array of elements. If true, the right side of the AND tells me that I'm not dealing with an array.
        // Iterate over the "theClasses" rest parameter
        for(const theClass of theClasses){
            // Use classList.add() to add each class
            theElements.classList.add(theClass);
        }  
    } else {
        // When dealing with a node list, iterate over each node
        for(const theElement of theElements){
            // Iterate over the "theClasses" rest parameter
            for(const theClass of theClasses){
                // Use classList.add() to add each class
                theElement.classList.add(theClass);
            }
        }
    }
}

// so what was happening is that i was checking for a single node in the function and then in every other case i was using a syntax that will only actually work on arrays of elements and not on nodes lists.




p1 = document.getElementById("p1");



function AddRemove(e){
    console.log(e.target)
    addClasses(e.target, "class1", "class2", "class3");
    removeClasses(e.target, "class4", "class5");
    console.log(e.target.id);
    if(e.target.id === "p1"){
        // Test using getElementById to grab an element
        p1.removeEventListener("click", AddRemove, false);
        p1.addEventListener("click", function(e){addClasses(p1, "class1");}, false);
    }
}

// Test using event.target to grab an element
for(const para of ps){
    para.addEventListener("click", AddRemove, false);
}


