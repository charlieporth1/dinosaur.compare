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

(function () {
    $.getScript("/js/objects.js", function () {

    });
    $.getScript("/js/utils.js", function () {

    });
}());

function createData() {
    const animals = Array.from(this.getAnimalData());
    const pigeon = animals.filter((animal) => animal.name.toString().toLowerCase() === "pigeon").shift();
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

    function generateMultiplier(min, max, interval = 1) {
        const r = Math.random();
        const i = Math.floor(max / interval) - (interval === 1 ? min : 0);
        return Math.floor(((r * (i)) * interval) + min);
    }

    function generateResults() {
        const animalDataFiltered = diet.toLowerCase() !== "unselected" ? animals.filter((animal) => animal.diet.trim().toLowerCase() === diet.toLowerCase()) : animals;

        function query(height, weight) {
            const range = generateMultiplier(10, 100);
            const weightMx = generateMultiplier(1, 300, 25);
            let heightFiltered = animalDataFiltered.filter((animal) => height <= animal.height && height >= animal.height - (range) );
            let weightFiltered = animalDataFiltered.filter((animal) => weight * weightMx <= animal.weight + range * (weightMx / 2) && weight * weightMx >= animal.weight - (range / 2) + 1);
            if (weightFiltered.length === 0 && heightFiltered.length === 0) {
                (!!height && !!weight) && query(height, weight); //Rerun if not found without a infinite loop if  0
                return;
            }
            heightFiltered.length <= 2 && heightFiltered.push(animals[generateMultiplier(0, animals.length - 1)], animals[generateMultiplier(0, animals.length - 1)], animals[generateMultiplier(0, animals.length - 1)]); //random if null
            weightFiltered.length <= 2 && weightFiltered.push(animals[generateMultiplier(0, animals.length - 1)], animals[generateMultiplier(0, animals.length - 1)], animals[generateMultiplier(0, animals.length - 1)], animals[generateMultiplier(0, animals.length - 1)], animals[generateMultiplier(0, animals.length - 1)]);//random if null

            const top = [heightFiltered.shift(), pigeon, weightFiltered.shift()];
            const middle = [heightFiltered[1], human, weightFiltered[1]];
            const bottom = animals.map((data) => [...top, ...middle].filter((item) => item.name === data.name).length === 0 ? data : undefined).filter((data) => !!data);
            const root = [...top, ...middle, ...bottom].filter(onlyUnique);
            console.log(root);
            return root; //result
        }

        function addToDom() {
            const animalResults = query(rootHeight, rootWeight);
            const userProg = document.createElement('script');
            Array.from(animalResults).forEach((animal) => {
                const name = animal.isHuman ? "human" : animal.name.toString();
                const html = `<div class="grid-item"  id="${encodeId(name)}" w3-include-html="view/dinoInfo.html"></div>`;
                window.document.getElementById("grid").innerHTML += html;
                userProg.text += [`\n\t replaceAnimal("${encodeId(name)}", "${name}");`].join('\n');
            });
            userProg.text += [`\n\t includeHTML();\n`].join('\n');
            document.head.appendChild(userProg);

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
