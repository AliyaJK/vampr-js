class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return this;
    }
  
    const pathToRoot = this.getPathToRoot();
    const vampirePathToRoot = vampire.getPathToRoot();
    if (!pathToRoot || !vampirePathToRoot) {
      return null;
    }
  
    let commonAncestor = null;
    let i = 0;
    while (pathToRoot[i] && vampirePathToRoot[i] && pathToRoot[i] === vampirePathToRoot[i]) {
      commonAncestor = pathToRoot[i];
      i++;
    }
    return commonAncestor || null;
  }
  
  getPathToRoot() {
    const path = [];
    let currentVampire = this;
    while (currentVampire) {
      path.unshift(currentVampire);
      currentVampire = currentVampire.creator;
    }
    return path.length > 0 ? path : null;
  }
  
}

module.exports = Vampire;

