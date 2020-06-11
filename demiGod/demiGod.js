var greekDemiGod = { name: "Critter",  level: 100, strength: 50,int: 0.8, stamina: 45, health: 100 };
var greekGod = {
  name: "Zeus",
  lvl: 2,
  str: 0.2,
  int: 20,
  sta: 45,
  hp: 189,
  agi: 69,
  crit: 48,
  randomCries: [ "jävla fittskum", "rövhol", "ha kan du inte bättre?", "fy fan kunde nästa känna det",
 "men kom igen nu", "det där gjorde jo lite ont Ha not", "hahaha", "aj", "lägg av", "va fan vill du?" ]
};

console.log();
console.log('#############################');
console.log('### LET THE BATTLE BEGIN ####');
console.log('#############################');
console.log();
console.log();
console.log();

var cryIndex = 0;

while( greekGod.hp > 0 ) {
  cryIndex = Math.floor(Math.random() * 10);
  
  console.log();
  console.log( greekDemiGod.name + " takes ANOTHER swing!" );
  
  greekGod.hp = greekGod.hp - greekDemiGod.strength;
  console.log( greekGod.randomCries[cryIndex] );
  
  if ( greekGod.hp > 0 ) {
    console.log( greekGod.name + " only has " + greekGod.hp + "hp left!!!" );
    console.log("I SURVIVED YOU JÄVLA FAN!");
  } else if ( greekGod.hp <= 0 ) {
    console.log("IM DEAAAAAD!!!!!!");
  }
  
  console.log();
}

console.log( greekDemiGod.name + " WINS AGAIN!!!!");


