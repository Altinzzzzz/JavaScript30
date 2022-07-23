var theFirstNumber = [];
var theSecondNumber = [];
var operator = null;

var show = document.querySelector('.field');
var clear = document.querySelector('.clear');
var numbers = document.querySelectorAll('.numbers');
var operators = document.querySelectorAll('.operators');
var point = document.querySelector('.point');
var count = 0;

clear.addEventListener('click', clearText);

function clearText(){
    theFirstNumber = [];
    theSecondNumber = [];
    console.log(theFirstNumber);
    console.log(theSecondNumber);
    operator = null;
    show.textContent = '';
}

for(var i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('click', checkOccupation);
}


for(var i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', checkOperator);
}

point.addEventListener('click', () => {
    if(operator != null){
        if(theFirstNumber.length == 0){
            theFirstNumber.push('0');
            checkOccupation();
        }
    }

    checkOccupation();
});

function checkOccupation(){
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
    
    if(count == 0){
            show.textContent = theFirstNumber.join('');
        if(this.textContent == '='){
            operator = null; // if new operator is '=', then don't add it
        } else {
            operator = this.textContent; // if new operator is + = * /, then add it
            show.textContent += operator;
        }
    } else{
        show.textContent = "Holup, that don't make sense";
        show.style.color = 'red';
        operator = null;
        count = 0;
    }
}

function operate(sign){

    if(theFirstNumber[0] == '.'){
        theFirstNumber.unshift('0');
    }

    if(theSecondNumber[0] == '.'){
        theFirstNumber.unshift('0');
    }

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
    console.log(count);

} // could to this.textContent instead of sign, but this is more readable