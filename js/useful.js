function shuffle(str) {
  var a = str.split('');
  var n = a.length;

  for(var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("").substring(0, n);
}

function generateBabyStr(possible){
  var text = "";
  for (var j = 0; j < MAX_LENGTH; j++){
    if (Math.floor((Math.random() * 10) + 1) < 5)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  return text;
}

function getRandomChar(n){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!? ";
  for (var j = 0; j < n; j++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function firstGeneration(){
  var res = [];
  var i = 0;
  while (i < POPULATION){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!? ";
    for (var j = 0; j < MAX_LENGTH; j++){
      if (Math.floor((Math.random() * 10) + 1) < 5)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    var s = new individual(text, 0);
    res.push(s);
    i++;
  }
  return res;
}

function write(str){
  $('#cont').append("<p>"+str+'</p>');
}
