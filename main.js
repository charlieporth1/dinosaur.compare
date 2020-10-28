($.getScript("/js/utils.js", function(script) {
})());
($.getScript("/js/objects.js",function (script)  {
})());

function createData() {
    console.log("createData");
    const animalData = Array.from(this.getData());
    console.log("createData: animalData", animalData);
    const name = this.getInputValue("name");
    const height = parseFloat(this.getInputValue("feet")) * 12 + parseFloat(this.getInputValue("inches"));
    const weight = parseFloat(this.getInputValue("weight"));
    const diet = this.getInputValue("diet");

    function generateMultiplier(min, max) {
        return Math.floor((Math.random() * (max - min)) + min)
    }

    function generateResults() {
        // const multiplier = generateMultiplier();
        const animalDataFilteredByDiet = animalData.filter((animal) => animal.diet = diet);

        function query(height, weight) {
            const range = generateMultiplier(1, 100);
            console.log(range);
            // const heightFiltered = animalDataFilteredByDiet.filter((animal) => height * multiplier <= animal.height + range && height * multiplier >= animal.height - range);
            // const weightFiltered = animalDataFilteredByDiet.filter((animal) => weight * multiplier <= animal.weight + range && height * multiplier >= animal.weight - range);
            const heightFiltered = animalDataFilteredByDiet.filter((animal) => height <= animal.height + range && height >= animal.height - range);
            const weightFiltered = animalDataFilteredByDiet.filter((animal) => weight <= animal.weight + range && height >= animal.weight - range);
            if (weightFiltered.length <= 0 && heightFiltered.length <= 0) {
                (!!height && !!weight) && query(height, weight); //Rerun if not found without a infinite loop if  0
            }
            return [...heightFiltered, ...weightFiltered]; //result
        }

        function addToDom() {
            const animalResults = query(height, weight);
            console.log("addToDom: animalResults ", animalResults);
            const mapNodes = Array.from(animalResults).map((data) => {
                const html = `<div style="width: 100%">
                                <div style="width: 100%" id="${data.name}" w3-include-html="view/dinoInfo.html">
                             
                            </div>
                    </div>`;
                const node = window.document.createTextNode(html);
                window.document.getElementById("grid").innerHTML += html;
                $('#grid').hide().show(0);
                const userProg = document.createElement('script');
                userProg.text = [`replaceDino("${data.name}", "${data.name}");`, "includeHTML();"].join('\n');
                document.head.appendChild(userProg);
                return node;
            });

        }

        addToDom();
    }

    if (!height && !weight) {
        alert("Height and Weight required");
    } else {
        generateResults();
    }

}
