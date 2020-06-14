class BattleGod {
  
  // Constructor is called automatically when the object is created
  constructor(name, level, strength, int, stamina, health, isAlive, cries){
    this.name = name;
    this.level = level;
    this.strength = strength;
    this.int = int;
    this.stamina = stamina;
    this.health = health;
    this.isAlive = isAlive;
    this.randomCries = cries;
  }
  
  // This sets the object's isAlive status 
  checkAlive() {
    if( this.health > 0 ) {
      this.isAlive = true;
    } else {
      this.isAlive = false;
    }
  }
  
  // Target should be a god object
  attackGod(target){
      target.health = target.health - this.strength;
  }
  
  battleCry(){ //this should console log a random cry
    let index = Math.floor( Math.random() * this.randomCries.length );
    console.log(this.randomCries[index]);
  }
}

class GodGame {  
  constructor() {
    this.critterGod = new BattleGod( "Critter", 100, 50, 0.8, 45, 100, true, ["ouch", " please! :D", 'hello'] );
    this.danskGod = new BattleGod( "Zues", 2, 25, 20, 45, 189, true, ["Fy fan", "aj"] );    
    this.junGod = new BattleGod( "Kitsune", 65, 23, 250, 415, 1289, true, ["Baka", "Ohao"] );
  }
  
  startGame() {  
    this.showBattleBegin();
    
    // Loops while the condition in parens is true
    while( this.critterGod.isAlive && this.danskGod.isAlive ) {
      // -> some number 1,0 
      
      if(this.getRandomBinary() == 0){
        this.danskGod.attackGod(this.critterGod);
        this.danskGod.battleCry();
        this.danskGod.checkAlive();
      } else {
        this.critterGod.attackGod(this.danskGod);
        this.critterGod.battleCry();
        this.critterGod.checkAlive();
      }
    }
    
    this.endGame();
  }
  
  endGame() {
    let winner;    
    if(this.critterGod.isAlive){
      winner = this.critterGod;
    } else {
      winner = this.danskGod;
    }
    console.log('THE WINNER IS: ' + winner.name);
  }
  
  getRandomBinary() {
    return Math.floor( Math.random() * 2 );
  }
  
  showBattleBegin() {
    console.log();
    console.log('#############################');
    console.log('### LET THE BATTLE BEGIN ####');
    console.log('#############################');
    console.log();
    console.log(); 
  }
}

let godOfWar = new GodGame();
godOfWar.startGame();

//binary operators
// !  NOT
// ==
// && AND
// || OR
// >
// >=
// <
// <=


console.log( true != false );








