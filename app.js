/*
    @desc Creature Constructor
    @param string $species - the creature's species
    @param int $wt - the creature's weight
    @param int $ht - the creature's height
    @param string $diet - the creature's diet
*/
function Creature(species, wt, ht, diet) {
    this.species = species;
    this.weight = wt;
    this.height = ht;
    this.diet = diet;
}

/*
    @desc Dino Constructor
    @param string $where - Dinosaur's habitat
    @param string $period - The period the dinosaur lived in
    @param string $fact - A fact about the dinosaur
*/

function Dino(species, wt, ht, where, period, fact, diet) {
    Creature.call(this, species, wt, ht, diet);
    this.where = where;
    this.period = period;
    this.fact = fact;
}

/*
    @desc Human Constructor
    @param string $name - Human's name
*/
function Human(species, wt, ht, diet, name) {
    Creature.call(this, species, wt, ht, diet);
    this.name = name;
}

let human = null;
let dinos = []

const compareBtn = document.getElementById('btn');

/*
    @desc Read the dinos.json file
*/
fetch("./dino.json")
    .then((res) => res.json())
    .then((data) => {
        let dinoData = data.Dinos;
        getDinos(dinoData);
    });

function getDinos(dinoData) {
    dinoArray = Array();
    dinoData.forEach((dino) => {
        dinos.push(new Dino(dino.species, dino.weight, dino.height, dino.where, dino.when, dino.fact, dino.diet));
    });
}

/*
    @desc Get Human data with IIFE
*/

compareBtn.addEventListener('click', (function() {
    return function () {
        const formData = new FormData(document.querySelector('#dino-compare'));
        const name = formData.get('name');
        const inches = Number(formData.get('feet')) * 12 + Number(formData.get('inches'));
        const weight = formData.get('weight');
        const diet = formData.get('diet');

        human = new Human("Human",weight, inches, diet, name);
        dinos.splice(4, 0, human);
        // addTilesToDOM();]
        configureUI();
    };
})());

/*
    @desc Configure UI
*/
function configureUI() {
    let form = document.getElementById('dino-compare');
    form.style.display = 'none';
    addTilesToDOM();
}

/*
    @desc Compare dinosaur's weight to user's
    @param Dino $dino - An instance of a Dinosaur
*/

function compareWeight(dino) {
    const dinoWt = Number(dino.weight);

    if (dinoWt > human.weight) {
        return `${dino.species} is ${Math.round(dinoWt / human.weight)} times heavier than you!`;
    } else if (dinoWt < human.weight) {
        return `You weigh more than a ${dino.species} by ${human.weight - dinoWt} lbs!`;
    } else {
        return `You are as heavy as a ${dino.species}!`;
    }
}

/*
    @desc Compare dinosaur's height to user's
    @param Dino $dino - An instance of a Dinosaur
*/

function compareHeight(dino) {
    const dinoHt = Number(dino.height);

    if (dinoHt > human.height) {
        return `${dino.species} is ${dinoHt - human.weight} inches taller than you!`;
    } else if (dinoHt < human.height) {
        return `You are ${human.height - dinoHt} inches taller than a ${dino.species}!`;
    } else {
        return `You are as tall as a ${dino.species}`
    }
}

/*
    @desc Compare dinosaur's diet to user's
    @param Dino $dino - An instance of a Dinosaur
*/

function compareDiet(dino) {
    const dinoDiet = dino.diet;
    const msg = `yourself, the ${dino.species} dinosaur was a ${dinoDiet}`;

    return dinoDiet.toLowerCase() != human.diet.toLowerCase() ? "Unlike " + msg : "Like " + msg;
}

/*
    @desc Create a Tile to display dinosaur or human stats
    @param {creature} A dinosaur or human
*/

function createTile(creature) {
    const tile = document.createElement('div');
    tile.classList.add('grid-item');
    tile.innerHTML = `
        <h3>${creature.species}</h3>
        <img src="images/${creature.species}.png">
        <p>${getFact(creature)}</p>
    `;

    document.getElementById('grid').appendChild(tile);
}

/*
    @desc Get the fact for the tile
    @param {creature} A dinosaur or human
*/

function getFact(creature) {
    if (creature instanceof Dino && creature.species != "Pigeon") {
        return getRandomFact(creature);
    } else if (creature instanceof Human) {
        return creature.name;
    } else {
        return creature.fact;
    }
}

/*
    @desc Get a random fact
    @param {creature} A dinosaur or human
*/
function getRandomFact(creature) {
    switch(Math.floor((Math.random() * 5))) {
        case 0:
            return creature.fact;
        case 1:
            return compareHeight(creature);
        case 2:
            return compareWeight(creature);
        case 3:
            return compareDiet(creature);
        case 4:
            return `The ${creature.species} roamed the lands in ${creature.where}`;
        case 5:
            return `The ${creature.species} lived during the ${creature.period} era.`;
    }
}

/*
    @desc Add tiles to DOM
*/

function addTilesToDOM() {
    dinos.forEach(dino => createTile(dino))
}
