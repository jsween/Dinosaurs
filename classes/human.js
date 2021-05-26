/*
    @desc Human Constructor
    @param string $name - Human's name
*/

function Human(species, wt, ht, diet, name) {
    Creature.call(this, species, wt, ht, diet);
    this.name = name;
}
