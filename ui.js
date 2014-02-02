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
  this.outputASCII = document.getElementById('outputASCII');
  this.body = document.body;

  this.plus = document.getElementById('plus');
};

iao = new createIAO();

addCharacter = function(character) {
  iao.programInput.value += character;
  printProgram();
};

clearProgram = function() {
  iao.programInput.value = "";
  printProgram();
};

printProgram = function() {
  program = sterilizeProgram(iao.programInput.value);
  iao.programString.innerHTML = program;
  printPointer();
  printValues();
};

printPointer = function() {
  var frontString;
  if (ni != 0) {
    frontString = "&nbsp".repeat(ni) + "^";
  } else {
    frontString = "^";
  };
  var backString = "&nbsp".repeat(program.length - ni - 1);
  iao.pointerString.innerHTML = frontString + backString;
};

sterilizeProgram = function(str) {
  var sterilizedString = ""
    for (var i = 0; i < str.length; i++) {
      c = str[i];
      if (c=='.'||c==','||c=='+'||c=='-'||c=='<'||c=='>'||c=='['||c==']'||c=='&') {
        sterilizedString = sterilizedString + c;
      };
    };
  return sterilizedString;
};

exampleHelloWorld = function() {
  program = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.";
  iao.programInput.value = program;
  printProgram();
  reset();
};

exampleList = function() {
  program = "++.>+++.>++++.";
  iao.programInput.value = program;
  printProgram();
  reset();
};

printValues = function() {
  iao.step.innerHTML = numberOfSteps;
  iao.instruction.innerHTML = program[ni];
  iao.address.innerHTML = pointer;
  iao.content.innerHTML = memory[pointer];
};

//POPOVERS
popovers = function() {

  var a = document.querySelectorAll(".btnChar");

  console.log(a.length);
  for (var i = 0; i < a.length; i++) {
    a[i].setAttribute('data-container', 'body');
    a[i].setAttribute('data-placement', 'bottom');
    a[i].setAttribute('rel', 'popover');
    a[i].setAttribute('data-placement', 'bottom');
    a[i].setAttribute('data-trigger', 'hover');
    
    var description;
    switch (a[i].id) {
      case "plus":
        description = strplus;
        break;
      case "minus":
        description = strminus;
        break;
      case "left":
        description = strleft;
        break;
      case "right":
        description = strright;
        break;
      case "if":
        description = strif;
        break;
      case "fi":
        description = strfi;
        break;
      case "output":
        description = stroutput;
        break;
      case "input":
        description = strinput;
        break;
      case "breakpoint":
        description = strbreakpoint;
        break;
      case "clear":
        description = strclear;
        break;
    };

    a[i].setAttribute('data-content', description);
  };

  $("button[rel=popover]").popover(); //activate popovers
};

iao.body.onload = function() {
  iao.programInput.focus();
  popovers();
};
