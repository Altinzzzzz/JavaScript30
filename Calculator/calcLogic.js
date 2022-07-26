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

var count = false;
var secondCount = false;
var minusActive = false;

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

    numbers[i].style.color = "#b21900";
    numbers[i].addEventListener('mouseout', () => { this.style.color = '#b21900'; });
    numbers[i].addEventListener('mouseover', () => { this.style.color = '#ff3e1e'; });
}


for(var i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', checkOperator);
}

for(var i = 0; i < specials.length; i++){
    specials[i].addEventListener('click', checkSpecial);
}

point.addEventListener('click', checkOccupation);

point.style.color = "#b21900";
point.addEventListener('mouseout', () => { this.style.color = '#b21900';});
point.addEventListener('mouseover', () => { this.style.color = '#ff3e1e';});

function checkPoint(){
    if(operator == null){
        
        if(theFirstNumber.length == 0){
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

        if(theSecondNumber.includes('.')){
            return false;
        }
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
    if(theFirstNumber.length != 0){
        minusActive = false;
    }

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


function checkSpecial(){
    if(theFirstNumber.length == 0 || operator != null && theSecondNumber.length != 0){
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
            show.textContent = this.textContent;
            minusActive = true;
        }
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