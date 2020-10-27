import * as dinoData from "./dino.json"
function getDino(dinoName) {
    return dinoData.Dinos.filter((dinoData)=> dinoData.species === dinoName).shift();
}

function replaceDino(dinoName) {
    const dinoData = getDino(dinoName);
    window.document.getElementById("dino-info-title").innerHTML = dinoData.species;
    window.document.getElementById("dino-info-img").src = `images/${dinoData.species}.png`;
    window.document.getElementById("dino-info-fact").innerHTML = dinoData.fact;
    window.document.getElementById("dino-info-fact").innerHTML = dinoData.fact;
}
    // Create Dino Constructor


    // Create Dino Objects


    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
