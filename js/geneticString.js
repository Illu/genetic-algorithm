var TARGET = 'hello';
var POPULATION = 100;
var MAX_LENGTH = 15; //max length of each individual. Must be greater than TARGET's length
var MUTATION_CHANCE = 30; //in percent
var MUTATION_FORCE = 10; // how much the mutation will impact an individual
var SIM_SPEED = 10;

var gen = 0;
var arr = [];

function startSimulation(){
  var interval = setInterval(generateGen, SIM_SPEED);
  //  generateGen();//for tests. uncomment above for loop.
}

function generateGen(){
  $('#cont').html('');
  write('[GEN ' + gen + ']');

  if (gen === 0)
    arr = firstGeneration();

  //assign a score to every element.
  for (var i = 0; i < POPULATION; i++){
    arr[i].score = fitness(arr[i].str, TARGET);
  }

  //the array is sorted from the best to the worst individual.
  arr.sort(function(a, b) {
      var scoreA = a.score
      var scoreB = b.score
      return (scoreA < scoreB) ? -1 : (scoreA > scoreB) ? 1 : 0;
    });

  //display the gen
  for (var i = 0; i < POPULATION; i++){
    write(arr[i].str + ' (' + arr[i].score + ')');
  }

  //get rid of the weak ones (highest scores)
  for (var i = 0; i < POPULATION / 2; i++)
    arr.pop();

    //get all characters in survivors
    var charBank = '';
    for (var i = 0; i < arr.length; i++){
      charBank += arr[i].str;
    }

  //create children
  for (var i = 0; i < POPULATION / 2; i++){

    //the string is generated at a random length, with characters from the survivors

    //if a mutation occurs, some characters in the charBank are replaced by random ones.
    var rng = Math.floor((Math.random() * 100) + 1);
    if (rng <= MUTATION_CHANCE)
      charBank += getRandomChar(Math.floor((Math.random() * 10) + 1));

    var str = generateBabyStr(charBank);

    var baby = new individual(str, 0);
    arr.push(baby);

  }
  gen++;
}

function fitness(strA, strB) {
    //Points attribution:
    //for each additional / fewer character, add 3 Points
    //for every character not in common with the TARGET, add 5 points.
    //for every misplaced character, add 1 point.

    //a is the individual's string
    //b is the target.

    //TODO: Check for duplicates. (if target has 3 'L' and ind has 4, the score needs to be increased)

    if (strA === strB)
      return 0;

    //check string's length
    var score = 0;
    var a = strA.split('');
    var b = strB.split('');
    var diff = a.length - b.length;
    if (diff < 0)
      diff *= -1;
    score += diff * 3;

    //check for characters not in common
    for (var i = 0; i < a.length; i++){
      if (b.indexOf(a[i]) < 0)
        score += 5;
    }

    // check for incorrectly placed characters.
    for (var i = 0; i < a.length; i++){
      if (b.indexOf(a[i]) >= 0){
        var placeInTarget = b.indexOf(a[i]);
        var placeInInd = i;
        if (placeInTarget != placeInInd){
          score += 1;
        }
      }
    }
    return score;
}
