var program = "";
var memory = [];

var miliseconds = 20;

var pointer = 0;
var ni = 0;

memory[pointer] = 0;

var numberOfSteps = 0;
var petla = 1;

step = function() {

  var instruction = program[ni];

  if (instruction === ">") {
    pointer++;
    ni++;
    if (typeof memory[pointer] === 'undefined') {memory[pointer] = 0};
  } else if (instruction === "<") {
    pointer--;
    ni++;
  } else if (instruction === "+") {
    incrementCell(); 
    ni++;
  } else if (instruction === "-") {
    decrementCell();
    ni++;
  } else if (instruction === ".") {
    putout();
    putChars();
    ni++;
  } else if (instruction === ",") {
    ;
  } else if (instruction === "[") {
    conditional();
    petla++;
  } else if (instruction === "]") {
    conditionalBack();
  } else if (instruction === "&") {
    pause();
    ni++;
  };

  numberOfSteps++;
  if (ni >= program.length) {
    pause();
  };
 
  printPointer();
  printValues();
};

String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}

printPosition = function() {
  document.getElementsByTagName('code')[3].innerHTML = (numberofsteps + ": instruction: " + program[ni] + " memory@" + pointer + " : " + memory[pointer]);
  document.getElementsByTagName('code')[2].innerHTML = ("&nbsp".repeat(ni) + "^");
};

incrementCell = function() {
  memory[pointer] = typeof memory[pointer] !== 'undefined' ? memory[pointer] + 1 : 0;
};

decrementCell = function() {
  memory[pointer]--; 
};

conditional = function() {
  if (memory[pointer] == 0) {
    jumpForward();
  } else { 
    ni++
  };
};

jumpForward = function() {
  var place = ni;
  ni++;
  var counter = 0;
  while (ni < program.length) {
    if (program[ni] === "[") {counter++}
    else if (program[ni] === "]" && counter == 0) {return;}
    else if (program[ni] === "]") {counter--};
    ni++; 
  };
  console.log("Syntax error: no closing ] found: at " + place);
  syntaxError();
};

conditionalBack = function() {
  if (memory[pointer] != 0) {
    jumpBackward();
  } else {
    ni++;
  };
};

jumpBackward = function() {
  var place = ni;
  ni--;
  var counter = 0;
  while (ni > 0) {
    if (program[ni] === "]") {counter++}
    else if (program[ni] === "[" && counter == 0) {return;}
    else if (program[ni] === "[") {counter--};
    ni--; 
  };
  syntaxError();
  console.log("Syntax error: no closing [ found: at " + place);
};

var intervalID;

start = function() {
  intervalID = window.setInterval(step, miliseconds);
  step();
  iao.programInput.readOnly = true;
};

pause = function() {
  window.clearInterval(intervalID);
  iao.programInput.readOnly = false;
};

reset = function() {
  pause();
  ni = 0;
  numberOfSteps = 0;
  memory = [0];
  pointer = 0;
  printValues();
  printPointer();
  clearOutputs();
}

putout = function() {
  iao.outputNum.value = iao.outputNum.value + memory[pointer] + ":";
};

putChars = function() {
  iao.outputASCII.value = iao.outputASCII.value + String.fromCharCode(memory[pointer]);
};

syntaxError = function() {
  iao.outputASCII.value = "Syntax error;";
  iao.outputNum.value = "Syntax error;";
};
  

clearOutputs = function() {
  iao.outputNum.value = "";
  iao.outputASCII.value = "";
};

