//var program = "++.[-.].";
var program = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.";
var memory = [];

var miliseconds = 0;

var pointer = 0;
var ni = 0;

memory[pointer] = 0;

var numberofsteps = 0;
var petla = 1;

document.getElementsByTagName('code')[1].innerHTML = program;

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
  } else if (instruction === "[") {
    conditional();
    petla++;
  } else if (instruction === "]") {
    conditionalBack();
  };

  numberofsteps++;
  if (ni >= program.length) {
    window.clearInterval(intervalID);
    console.dir(memory);
    };
 
  printPosition();
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

putout = function() {
  var p = document.getElementsByTagName("code")[0];
  p.innerHTML = p.innerHTML + memory[pointer] + ":";
};

putChars = function() {
  var p = document.getElementsByTagName("code")[4];
  p.innerHTML = p.innerHTML + String.fromCharCode(memory[pointer]);
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
  console.log("Syntax error: no closing [ found: at " + place);
};

var intervalID = window.setInterval(step, miliseconds);



