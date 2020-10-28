($.getScript("/js/utils.js", function (script) {
})());
($.getScript("/js/objects.js", function (script) {
})());

function createData() {
    const animalData = Array.from(this.getData());
    console.log(animalData)
    const pigeon = animalData.filter((data)=> data.name.toString().toLowerCase() === "pigeon").shift();
    const name = this.getInputValue("name");
    const rootWeight = parseFloat(this.getInputValue("feet")) * 12 + parseFloat(this.getInputValue("inches"));
    const rootHeight = parseFloat(this.getInputValue("weight"));
    const diet = this.getInputValue("diet");

    function generateMultiplier(min, max) {
        return Math.floor((Math.random() * (max - min)) + min) * 10;
    }

    function generateResults() {
        const animalDataFiltered = (diet.toLowerCase() !== "unselected" ? animalData.filter((animal) => animal.diet = diet) : animalData);

        function query(height, weight) {
            const range = generateMultiplier(1, 48);
            const weightMx = generateMultiplier(1, 300);
            const heightFiltered = animalDataFiltered.filter((animal) => height <= animal.height + range * 2 && height >= animal.height - (range / 2) + 9);
            const weightFiltered = animalDataFiltered.filter((animal) => weight * weightMx  <= animal.weight + range * (weightMx / 2) && height * weightMx >= animal.weight - (range / 2) + 1);
           console.log("heightFiltered, weightFiltered", heightFiltered, weightFiltered)
            if (weightFiltered.length <= 0 && heightFiltered.length <= 0) {
                (!!height && !!weight) && query(height, weight); //Rerun if not found without a infinite loop if  0
            }
            const human = new HumanObject;
            const top = [heightFiltered.shift(), pigeon, weightFiltered.shift()];
            const middle = [heightFiltered[2],human.populate(name, rootWeight, rootHeight, diet), weightFiltered[2]];
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
                const userProg = document.createElement('script');
                const isHuman = ((typeof data) === HumanObject);
                console.log(isHuman);
                const name = !!data.name ? data.name : "human";
                userProg.text = [`replaceAnimal("${name}", "${name}");`, "includeHTML();"].join('\n');
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
