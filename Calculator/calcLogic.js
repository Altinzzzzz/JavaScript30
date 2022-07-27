var theFirstNumber = [];
var theSecondNumber = [];
var operator = null;
const MAXNUM = 1000000000;
const MINNUM = -1000000000;

var show = document.querySelector('.field');
var clear = document.querySelector('.clear');
var numbers = document.querySelectorAll('.numbers');
var operators = document.querySelectorAll('.operators');
var point = document.querySelector('.point');
var specials = document.querySelectorAll('.special');
var backspace = document.querySelector('.backspace');

var count = false;
var secondCount = false;

clear.addEventListener('click', clearText);

backspace.addEventListener('click', function(){
    if(theSecondNumber.length != 0){
        if(theSecondNumber.length == 2 && theSecondNumber[1] == '.' && theSecondNumber[0] == '0'){
            theSecondNumber = [];
            show.textContent = theFirstNumber.join('') + operator;
        } else {
            theSecondNumber.pop();
            show.textContent = theFirstNumber.join('') + operator + theSecondNumber.join('');
        }
    } else if(operator != null){
        operator = null;
        show.textContent = theFirstNumber.join('');
    } else {
        if(theFirstNumber[0] > 9 || theFirstNumber[0] < -9){
            theFirstNumber[0] = Math.floor(theFirstNumber[0] / 10);
            console.log('arriti ktu');
            show.textContent = theFirstNumber[0];
            return;
        } // will remove only the first number even if the firstNumber[0] after a calculation is something like 304, it onlyremoves the 4 not the whole number.

        if(theFirstNumber.length == 2 && theFirstNumber[1] == '.' && theFirstNumber[0] == '0'){
            theFirstNumber = [];
            show.textContent = '';
            console.log('arriti ktu222');
        } else {
            theFirstNumber.pop();
            show.textContent = theFirstNumber.join('');
            console.log('arriti ktu3333');
        }
    }
});

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

    numbers[i].style.color = "#b21900";
    numbers[i].addEventListener('mouseout', function(){ this.style.color = '#b21900'; });
    numbers[i].addEventListener('mouseover', function(){ this.style.color = '#ff3e1e'; });
}


for(var i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', checkOperator);
}

for(var i = 0; i < specials.length; i++){
    specials[i].addEventListener('click', checkSpecial);
}

point.addEventListener('click', checkOccupation);

point.style.color = "#b21900";
point.addEventListener('mouseout', function(){ this.style.color = '#b21900'; });
point.addEventListener('mouseover', function(){ this.style.color = '#ff3e1e'; });

function checkPoint(){
    if(operator == null){
        
        if(theFirstNumber.length == 0 || (theFirstNumber.length == 1 && theFirstNumber[0] == '-')){
            theFirstNumber.push('0');
            return true;
        }

        if(theFirstNumber.includes('.')){
            console.log('jo se ka gjet asni pik 111');
            return false;
        }

        if((typeof theFirstNumber[0] === 'string' && theFirstNumber[0].includes('.')) || (typeof theFirstNumber[0] === 'number' && theFirstNumber[0].toString().includes('.'))){
            console.log('jo se ka gjet asni pik 222');
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
    }

    if(theSecondNumber.includes('.')){
        return false;
    }
}

function checkNull(){
    if(operator == null){
        if(theFirstNumber.length >= 8){
            console.log('111 string a o ' + typeof theFirstNumber[0]);
            return false;
        }

        if(theFirstNumber[0] > MAXNUM || theFirstNumber[0] < MINNUM){
            console.log('222 string a o ' + typeof theFirstNumber[0]);
            return false;
        }

    } else {
        if(theSecondNumber.length >= 8){
            console.log('333 string a o ' + typeof theFirstNumber[0]);
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
        if(this.textContent == '0'){
            if(theFirstNumber.length == 0){
                show.textContent = '';
            } else if (theFirstNumber.length == 1 && theFirstNumber[0] == '-'){
                show.textContent = theFirstNumber.join('');
            }

            return;
        }

        theFirstNumber.push(this.textContent);
        show.textContent = theFirstNumber.join('');
    } else {
        if(this.textContent == '0'){
            if(theSecondNumber.length == 0){
                show.textContent = theFirstNumber.join('') + operator;
                return;
            }
        }
        theSecondNumber.push(this.textContent);
        show.textContent = theFirstNumber.join('') + operator + theSecondNumber.join('');
    }
}


function checkSpecial(){
    if((theFirstNumber.length == 0) || (operator != null && theSecondNumber.length != 0) || (theFirstNumber.length == 1 && theFirstNumber[0] == '-')){
        return;
    }

    var element = theFirstNumber.join('');
    clearText();

    switch(this.textContent){
        case 'ABS':
            element = Math.abs(element);
            break;
        case 'x2':
            element = Math.pow(element, 2);
            break; 
        case '1/x':
            element = 1 / element;
            break;
        default:
            if(element >= 0){
                element = Math.sqrt(element);
            } else {
                show.textContent = 'No negative numbers allowed here';
                return;
            }
    }

    if(element % 1 != 0){
        element = element.toFixed(2);
    }

    theFirstNumber.push(element);
    
    if(element < 1000000000 && element > -1000000000){
        show.textContent = element;
    } else {
        show.textContent = 'The number is too big';
    }

    // we check if its a number because if it is then theFirstNumber[0].length gives an error because .length is a string methodelse {
}

function checkOperator(){
    if(theFirstNumber.length == 0){
        if(this.textContent == '-'){
            theFirstNumber.push('-');
            show.textContent = this.textContent;
        }
        return;
    }
     // won't show an operator first
    if(theFirstNumber.length == 1 && theFirstNumber[0] == '-'){
        return;
    }

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
        case 'x':
            operate('x');
            break;
        case '/':
            operate('/');
            break;
    }

    if (count == true){
        show.textContent = "This operation is not allowed";
        operator = null;
        count = false;
        return;

    } else if (secondCount == true) {
        show.textContent = 'The numbers are too big';
        operator = null;
        secondCount = false;
        return;
    }
    
    show.textContent = theFirstNumber.join('');
    if(this.textContent == '='){
        operator = null; // if new operator is '=', then don't add it
    } else {
        operator = this.textContent; // if new operator is + - * /, then add it
        show.textContent += operator;
    }

    console.log(typeof theFirstNumber[0]);
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
    } else if(sign == 'x'){
        theFirstNumber.push(tempArray * secTempArray);
    } else {
        if(secTempArray == 0){
            count = true;
        } else {
            theFirstNumber.push(tempArray / secTempArray);
        }
    }

    if(theFirstNumber[0] % 1 != 0){
        theFirstNumber[0] = theFirstNumber[0].toFixed(2);
    } // if it has numbers after point '.', then only show 2 of them

    if((theFirstNumber[0] > MAXNUM || theFirstNumber[0] < MINNUM)){
        theFirstNumber = [];
        secondCount = true;
    } // we check if its a number because if it is then theFirstNumber[0].length gives an error because .length is a string method

} // could to this.textContent instead of sign, but this is more readable


/* still some problems left
    : NO BACKSPACE IMPLEMENTED YET
    : NO KEYBOARD SUPPORT IMPLEMENTED YET
*/