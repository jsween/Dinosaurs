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
