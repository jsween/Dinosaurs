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
    @param string $habitat - Dinosaur's habitat
    @param string $period - The period the dinosaur lived in
    @param string $fact - A fact about the dinosaur
*/

function Dino(species, wt, ht, habitat, period, fact, diet) {
    Creature.call(this, species, wt, ht, diet);
    this.habitat = habitat;
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

/*
    @desc Get Human data with IIFE
*/
let human = null;
const compareBtn = document.getElementById('btn');

compareBtn.addEventListener('click', (function() {
    return function () {
        const formData = new FormData(document.querySelector('#dino-compare'));
        const name = formData.get('name');
        const inches = Number(formData.get('feet')) * 12 + Number(formData.get('inches'));
        const weight = formData.get('weight');
        const diet = formData.get('diet');

        human = new Human("homo sapien", name, weight, inches, diet);
        compareWeight(dino);
    };
})());

/*
    @desc Compare dinosaur's weight to user's
    @param Dino $dino - An instance of a Dinosaur
*/

function compareWeight(dino) {
    const dinoWt = Number(dino.weight);

    if (dinoWt > human.weight) {
        console.log("Dino is heavier");
        return `${dino.species} is ${Math.round(dinoWt / human.weight)} times heavier than you!`;
    } else if (dinoWt < human.weight) {
        console.log("User is heavier");
        return `You weigh more than a ${dino.species} by ${human.weight - dinoWt} lbs!`;
    } else {
        console.log(`tie in weight`);
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
        console.log("Dino is taller");
        return `${dino.species} is ${dinoHt - human.weight} inches taller than you!`;
    } else if (dinoHt < human.height) {
        console.log("User is taller");
        return `You are ${human.height - dinoHt)} inches taller than a ${dino.species}!`;
    } else {
        console.log(`You are as heavy as a ${dino.species}!`);
        return `You are as tall as a ${dino.species}`
    }
}

/*
    @desc Compare dinosaur's diet to user's
    @param Dino $dino - An instance of a Dinosaur
*/

function compareDiet(dino) {
    const dinodiet = dino.diet;
    const msg = `yourself, the ${dino.species} dinosaur was a ${dinoDiet}`;

    return `${dinodiet.toLowerCase() != human.diet.toLowerCase() : "Unlike " ? "Like "}` + msg;
}
