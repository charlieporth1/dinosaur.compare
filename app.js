function onClick() {
            createData();
            removeFormFromDom()
}
function removeFormFromDom() {
    document.getElementById("dino-compare").hidden = true;
    document.getElementById("retry-btn").hidden = false;
    document.getElementById("grid").hidden = false;
}
function onRetry() {
    document.getElementById("dino-compare").hidden = false;
    document.getElementById("retry-btn").hidden = true;
    document.getElementById("grid").hidden = true;
}

($.getScript("/js/utils.js", function (script) {
})());
($.getScript("/js/objects.js", function (script) {
})());

function createData() {
    const animalData = Array.from(this.getData());
    console.log(animalData)
    const pigeon = animalData.filter((data) => data.name.toString().toLowerCase() === "pigeon").shift();
    const name = this.getInputValue("name");
    const rootHeight = parseFloat(this.getInputValue("feet")) * 12 + parseFloat(this.getInputValue("inches"));
    const rootWeight = parseFloat(this.getInputValue("weight"));
    const diet = this.getInputValue("diet");

    let human = new HumanObject;
    const json = {
        name: `${name}`,
        diet: `${diet}`,
        height: `${rootHeight}`,
        weight: `${rootWeight}`
    };
    human = human.populate(json);
    this.setHuman(human);

    function generateMultiplier(min, max) {
        return Math.floor((Math.random() * (max - min)) + min) * 10;
    }

    function generateResults() {
        const animalDataFiltered = (diet.toLowerCase() !== "unselected" ? animalData.filter((animal) => animal.diet === diet) : animalData);

        function query(height, weight) {
            const range = generateMultiplier(48, 100);
            const weightMx = generateMultiplier(1, 300);
            const heightFiltered = animalDataFiltered.filter((animal) => height <= animal.height + range * 2 && height >= animal.height - (range / 2) + 9);
            const weightFiltered = animalDataFiltered.filter((animal) => weight * weightMx <= animal.weight + range * (weightMx / 2) && height * weightMx >= animal.weight - (range / 2) + 1);
            if (weightFiltered.length <= 0 && heightFiltered.length <= 0) {
                (!!height && !!weight) && query(height, weight); //Rerun if not found without a infinite loop if  0
                return;
            }

            const top = [heightFiltered.shift(), pigeon, weightFiltered.shift()];
            const middle = [heightFiltered[2], human, weightFiltered[2]];
            const bottom = animalData.map((data) => [...top, ...middle].filter((item) => item.name === data.name).length === 0 ? data : undefined).filter((data) => !!data);
            const root = [...top, ...middle, ...bottom];
            console.log(root);
            return root; //result
        }

        function addToDom() {
            const animalResults = query(rootHeight, rootWeight);
            Array.from(animalResults).forEach((data) => {
                const html = `<div class="grid-item"  id="${data.name}" w3-include-html="view/dinoInfo.html"></div>`;
                window.document.getElementById("grid").innerHTML += html;
                const name = data.isHuman ? "human" : data.name;
                const userProg = document.createElement('script');
                userProg.text = [`\nreplaceAnimal("${name}", "${name}");`, "includeHTML();\n"].join('\n');
                document.head.appendChild(userProg);
            });

        }

        addToDom();
    }

    if (!rootHeight && !rootWeight) {
        alert("Height and Weight required");
    } else {
        generateResults();
    }

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
