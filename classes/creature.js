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
