var theFirstNumber = [];
var theSecondNumber = [];
var operator = null;

var show = document.querySelector('.field');
var clear = document.querySelector('.clear');
var numbers = document.querySelectorAll('.numbers');
var operators = document.querySelectorAll('.operators');
var point = document.querySelector('.point');
var count = 0;
var secondCount = 0;

clear.addEventListener('click', clearText);

function clearText(){
    theFirstNumber = [];
    theSecondNumber = [];
    operator = null;
    show.textContent = '';
    count = 0;
    secondCount = 0;
}

for(var i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('click', checkOccupation);
}


for(var i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', checkOperator);
}

point.addEventListener('click', checkOccupation);

function checkPoint(){
    if(operator == null){
        
        if(theFirstNumber.length == 0){
            theFirstNumber.push('0');
            return true;
        }

        if(theFirstNumber.includes('.')){
            return false;
        }

        if((typeof theFirstNumber === 'string' && theFirstNumber[0].includes('.')) || (typeof theFirstNumber === 'number' && theFirstNumber[0].toString().includes('.'))){
                return false;
        }//after an opertion is done, the whole number is put on theFirstNumber[0]
        // so the if above this one can't find a '.'
        // we do this one do see whether that element in the array has a point '.'
        //we include typeof to see whether thefirstnumber[0] exists because it throws an error if theres no element inside 
    } else {
        if(theSecondNumber.length == 0){
            theSecondNumber.push('0');
            return true;
        }

        if(theSecondNumber.includes('.')){
            return false;
        }
    }
}

function checkNull(){
    if(operator == null){
        if(theFirstNumber.length >= 8){
            return false;
        }

        if((typeof theFirstNumber[0] === 'string' && theFirstNumber[0].length >= 8) || (typeof theFirstNumber[0] === 'number' && theFirstNumber[0].toString().length >= 8)){
            return false;
        }

    } else {
        if(theSecondNumber.length >= 8){
            return false;
        }
    }
}


function checkOccupation(){

    if(checkNull() == false){
        return;
    }

    if(this.textContent == '.'){
        if(checkPoint() == false){
            return;
        }
    }

    if(operator == null){
        theFirstNumber.push(this.textContent);
        show.textContent = theFirstNumber.join('');
    } else {
        theSecondNumber.push(this.textContent);
        show.textContent = theFirstNumber.join('') + operator + theSecondNumber.join('');
    }
}

function checkOperator(){
    if(theFirstNumber.length == 0){
        return;
    } // won't show an operator first

    if(operator == null){
        if(this.textContent == '='){
            show.textContent = theFirstNumber.join('');
        } else {
            operator = this.textContent;
            show.textContent = theFirstNumber.join('') + operator;
        }
        return;
    } else {
        if(this.textContent == '=' && theSecondNumber.length == 0){
            operator = null;
            show.textContent = theFirstNumber.join('');
        }
    } 

/*  if operator is null, then check new operator
    if new operator is '=' don't show (no second number yet), else show and operator == new operator 
    if operator isn't null (for example '+') and we click '=', then we get rid of + and operator becomes null */
    
    if(theSecondNumber.length == 0){
        if(this.textContent != '='){
            operator = this.textContent;
            show.textContent = theFirstNumber.join('') + operator;
        }
        return;
    } // if theres no second number and there is an operator, then operator is new operator

    switch(operator){
        case '+':
            operate('+');
            break;
        case '-':
            operate('-');
            break;
        case '*':
            operate('*');
            break;
        case '/':
            operate('/');
            break;
    }

    if (count == 1){
        show.textContent = "Holup, that don't make sense";
        operator = null;
        count = 0;
        return;

    } else if (secondCount == 1) {
        show.textContent = 'The numbers are too big';
        operator = null;
        secondCount = 0;
        return;
    }
    
    show.textContent = theFirstNumber.join('');
    if(this.textContent == '='){
        operator = null; // if new operator is '=', then don't add it
    } else {
        operator = this.textContent; // if new operator is + - * /, then add it
        show.textContent += operator;
    }
}

function operate(sign){

    var tempArray = +theFirstNumber.join('');
    var secTempArray = +theSecondNumber.join('');
    
    theFirstNumber = [];
    theSecondNumber = [];

    if(sign == '+'){
        theFirstNumber.push(tempArray + secTempArray);
    } else if(sign == '-'){
        theFirstNumber.push(tempArray - secTempArray);
    } else if(sign == '*'){
        theFirstNumber.push(tempArray * secTempArray);
    } else {
        if(secTempArray == 0){
            count++;
        } else {
            theFirstNumber.push(tempArray / secTempArray);
        }
    }

    if(theFirstNumber[0] % 1 != 0){
        theFirstNumber[0] = theFirstNumber[0].toFixed(2);
    } // if it has numbers after point '.', then only show 2 of them

    if((typeof theFirstNumber[0] === 'number' && theFirstNumber[0].toString().length > 9) || (typeof theFirstNumber[0] === 'string' && theFirstNumber[0].length > 11)){
        theFirstNumber = [];
        secondCount++;
    } // we check if its a number because if it is then theFirstNumber[0].length gives an error because .length is a string method

} // could to this.textContent instead of sign, but this is more readable


/* still some problems left
    : NO BACKSPACE IMPLEMENTED YET
    : NO KEYBOARD SUPPORT IMPLEMENTED YET
*/