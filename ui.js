createIAO = function() { //Interface Access Object
  this.programInput = document.getElementById('programInput');
  this.programString = document.getElementById('programString');
  this.pointerString = document.getElementById('pointerString');
  
  this.startBtn = document.getElementById('startBtn');
  this.pauseBtn = document.getElementById('pauseBtn');
  this.resetBtn = document.getElementById('resetBtn');
  this.stepBtn = document.getElementById('stepBtn');
  
  this.step = document.getElementById('step');
  this.instruction = document.getElementById('instruction');
  this.address = document.getElementById('address');
  this.content = document.getElementById('content');

  this.outputNum = document.getElementById('outputNum');
};

iao = new createIAO();

printProgram = function() {
  program = sterilizeProgram(iao.programInput.value);
  iao.programString.innerHTML = program;
  printPointer();
};

printPointer = function() {
  var frontString = "&nbsp".repeat(ni) + "^";
  var backString = "&nbsp".repeat(program.length - ni - 1);
  iao.pointerString.innerHTML = frontString + backString;
};

sterilizeProgram = function(str) {
  var sterilizedString = ""
  for (var i = 0; i < str.length; i++) {
    c = str[i];
    if (c=='.'||c==','||c=='+'||c=='-'||c=='<'||c=='>'||c=='['||c==']') {
      sterilizedString = sterilizedString + c;
    };
  };
  return sterilizedString;
};
