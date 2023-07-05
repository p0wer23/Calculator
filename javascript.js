const btns = Array.from(document.querySelectorAll('button'));
const expression_display = document.querySelector('.small_display');
const result_display = document.querySelector('.large_display');

let result;
let expression = '';

btns.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        press = e.target.textContent;
        newEvent(press);
    });
});


function newEvent(b){
    switch (b){
        case '=':
            calculateResult();
            break;
        case 'AC':
            clearAll();
            break;
        case 'C':
            expression = expression.slice(0,-1);
            break;
        case '/':
        case '*':
        case '+':
        case '-':
            addOperator(b)
            break;
        case '.':
            addDecimal();
            break;
        default:
            expression += b;
            break;
    }
    expression_display.innerHTML = expression;
}


function addDecimal(){
    let last_num = lastNumber(expression);
    if (!last_num.includes('.')){
        expression += '.'
    }
}

/* Find last number in expression */
function lastNumber(ex){
    let last_num = ''
    for (i=ex.length; i--; i>=0){
        if ('+-/*'.includes(ex[i]))
            break;
        last_num = ex[i]+last_num
    }
    return last_num;
}

function clearAll(){
    expression = '';
    result = '';
    result_display.innerHTML = '';
}

function addOperator(op){
    if ('*/'.includes(op)){
        if ('*/+-'.includes(expression[expression.length-1])){
            expression = expression.slice(0,-1)
            if ('*/+-'.includes(expression[expression.length-1])){
                expression = expression.slice(0,-1)
            }
        }
        if (expression != ''){
            expression += op
        }
    }
    else{
        if ('+-'.includes(expression[expression.length-1])){
            expression = expression.slice(0,-1)
        }
        expression += op
    }
}

function calculateResult(){
    // Operate multiplication and division first (left to right)
    operator_position = operatorPos('*', '/', 0)
    while (operator_position != -1){

        operator_position = operatorPos('*', '/', 0)
    }

    // Operate addition and subtraction (left to right)
    operator_position = operatorPos('+', '-', 1)
    while (operator_position != -1){
        next_operator_position = operatorPos('+', '-', operator_position+1);
        first_num = parseInt(expression.slice(0, operator_position))
        if (next_operator_position == -1){
            next_operator_position  = expression.length
        }
        next_num = parseInt(expression.slice(operator_position, next_operator_position))
        current_result = first_num + next_num
        expression = current_result.toString() + expression.slice(next_operator_position)

        operator_position = operatorPos('+', '-', 1)
    }
   
    result = expression;
    result_display.innerHTML = result;
}

function operatorPos(a, b, i){
    pos1 = expression.indexOf(a,i)
    pos2 = expression.indexOf(b,i)
    if (pos1*pos2 > 0){
        return Math.min(pos1, pos2)
    }
    return Math.max(pos1, pos2)
}