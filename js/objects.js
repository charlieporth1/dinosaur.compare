
// enum Diet = {
//     herbavor = 'Herbavor',
//     omnivor = 'Omnivor',
//     carnivor = 'Carnivor'
// },
const HumanObject = {
    name: "Charlie Porth",
    fact: "Is a Full Stack Developer",
    weight: 200,
    height: 200,
    diet:'meat',
};
const AnimalObject  = {
    name : "Charlie Porth",
    fact :"Is a software developer",
    when: "2020",
    diet: "meat",
    where: "USA",
    weight: 200,
    height: 200,
    imgUrl: function () {
      return `../images/${encodeURI(this.name)}.png`;
    },
    populate: function(data) {
        this.name = data.species;
        this.fact = data.fact;
        this.height = data.height;
        this.weight = data.weight;
        this.where = data.where;
        this.when = data.when;
        this.diet = data.diet;
    }
};
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

function getAnimal(animalName) { //Get JSON data
    const data = Array.from(getData()).filter((animal) => animal.name === animalName).shift();
    return data;
}

function getData() { //Array of JSON Data
    const animalsJSON = this.getJSON().Dinos;
    const animals = Array.from(animalsJSON).map((data) => {
        const animal = new AnimalObject.populate(data);
        return animal;
    });
    return animals;
}