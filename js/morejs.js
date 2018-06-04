//Now I need one to add one or more classes to one or more elements
function addClasses(theElements, ...theClasses){
    // Test to see if "theElements" is a single node or a node list or a single element or array of elements. 
    // Credit to Tim Pietrusky https://twitter.com/jackrugile/status/435539724774547456. 
    // NodeList has a method called item() that node does not. If the type of something.item is undefined, then you're not dealing with a NodeList.
    if( typeof theElements.item === 'undefined' ) {
        // When dealing with a single node. iterate over the "theClasses" rest parameter
        for(const theClass of theClasses){
            // Use classList.add() to add each class
            theElements.innerHtml.classList.add(theClass);
        }  
    } else if ( typeof theElements.item ){
        // When dealing with a node list, iterate over each node
                for(const theElement of theElements){
                    // Iterate over the "theClasses" rest parameter
                    for(const theClass of theClasses){
                        // Use classList.add() to add each class
                        theElement.innerHtml.classList.add(theClass);
                    }
                } 
    } else {
        // When dealing with an array of elements, iterate over each element
        for(const theElement of theElements){
            // Iterate over the "theClasses" rest parameter
            for(const theClass of theClasses){
                // Use classList.add() to add each class
                theElement.classList.add(theClass);
            }
        }
    }
}

if (1vh > 1vw) {
    
}
