function HumanObject() {
    this.name = "Charlie Porth";
    this.species = "Homo Sapien";
    this.fact = "Is a Full Stack Developer";
    this.weight = 200;
    this.height = 200;
    this.diet = 'meat';
    this.isHuman = true;

    this.imgUrl = function () {
        return "../images/human.png";
    };
    this.populate = function (json) {
        this.name = json.name;
        this.weight = json.weight;
        this.height = json.height;
        this.diet = json.diet;
        return this;
    };
}

function AnimalObject() {
    this.name = "Charlie Porth";
    this.species = `${this.name}`;
    this.fact = "Is a software developer";
    this.when = "2020";
    this.diet = "meat";
    this.where = "USA";
    this.weight = 200;
    this.height = 200;
    this.isHuman = false;

    this.imgUrl = function () {
        return `../images/${encodeURI(this.name)}.png`;
    };
    this.populate = function (data) {
        this.name = data.species;
        this.fact = data.fact;
        this.height = data.height;
        this.weight = data.weight;
        this.where = data.where;
        this.when = data.when;
        this.diet = data.diet;
        return this;
    };
}

function getJSON() {
    return (function () {
        let json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "../dino.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();
}
let homoSapien = new HumanObject;
function setHuman(humanObject) {
    homoSapien = humanObject;
}
function getAnimal(animalName) { //Get JSON data
        const data = Array.from(getAnimalData()).filter((animal) => animal.name === animalName).shift();
        return (animalName.toString().toLowerCase() === "human"  && homoSapien) ?  homoSapien : data;
}

function getAnimalData() { //Array of JSON Data
    const animalsJSON = this.getJSON().Dinos;
    const animals = Array.from(animalsJSON).map((data) => {
        const animal = new AnimalObject;
        return animal.populate(data);
    });
    return animals;
}