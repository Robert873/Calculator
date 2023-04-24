
let active_opperator = false;
let is_second_number = false;
let is_first_number = false;
let first_number_dot = false;
let second_number_dot = false;
let divided_by_zero = false;
let first_number = "";
let second_number = "";
let operator = "";

const digit_limit = 12

const key = document.querySelector(".calculator-layout")

// Registers the number the user entered
function number_key_entered(e)
{

        if(divided_by_zero === true)
            clear();


        // First number
        if(active_opperator === false)
        {
            if(first_number.length <= digit_limit)
            {
                document.getElementById("display_text").innerHTML += e.target.innerText;
                first_number += e.target.innerText;
                is_first_number = true;
            }
        }

        // Second number
        else
        {
            if(second_number.length <= digit_limit)
            {
                document.getElementById("display_text").innerHTML += e.target.innerText;
                second_number += e.target.innerText;
                is_second_number = true;
            }
        }
}


// Adds a decimal point to either of the numbers, based on the active number
function add_dot(e)
{

    if(divided_by_zero === true)
            clear();

    if(active_opperator === false && first_number_dot === false && first_number.length <= digit_limit)
    {
        first_number_dot = true;
        document.getElementById("display_text").innerHTML += e.target.innerText;
        first_number += e.target.innerText;
        is_first_number = true;
    }

    else if (active_opperator === true && second_number_dot === false && second_number.length <= digit_limit)
    {
        second_number_dot = true;
        document.getElementById("display_text").innerHTML += e.target.innerText;
        second_number += e.target.innerText;
        is_second_number = true;
    }
}

// Adds the operator the user selected
function add_operator(e)
{
    if(active_opperator === true && is_second_number === true)
        {
            result();
            if(divided_by_zero != true)
            {
                operator = e.target.innerText;
                active_opperator = true;
                document.getElementById("display_text").innerHTML +=  operator;
            }
        }

    else if(active_opperator != true && is_first_number === true)
        {
            operator = e.target.innerText;
            active_opperator = true;
            document.getElementById("display_text").innerHTML +=  operator;
        }
}

// Deletes the end character of the equation
function deleteCharacter()
{
    let expression = document.getElementById("display_text").innerHTML;

    if(expression != "")
    {   

        if(is_first_number === true && active_opperator === false)
        {

            if(expression[expression.length-1] === ".")
                first_number_dot = false;

            expression = expression.slice(0,-1)
            first_number = first_number.slice(0,-1);

            if(expression === "")
                is_first_number = false;
        }

        else if(active_opperator === true && is_second_number === false)
        {
            expression = expression.slice(0,-1);
            active_opperator = false;
            operator = "";
        }

        else if(is_second_number === true)
        {
            if(expression[expression.length-1] === ".")
                second_number_dot = false;

            expression = expression.slice(0,-1);
            second_number = second_number.slice(0,-1);

            if(expression[expression.length-1] === "+" || expression[expression.length-1] === "-" ||  expression[expression.length-1] === "x" ||  expression[expression.length-1] === "÷")
                is_second_number = false;
        }


        document.getElementById("display_text").innerHTML = expression;
    }
}

// Clears the screen and resets the variables
function clear()
{
    active_opperator = false;
    is_second_number = false;
    is_first_number = false;
    secound_number = false;
    first_number_dot = false;
    second_number_dot = false;
    divided_by_zero = false;
    first_number = "";
    second_number = "";
    operator = "";

    document.getElementById("display_text").innerHTML = "";
}

// Calculates the result of the equation
function result()
{
    let val_1 = parseFloat(first_number);
    let val_2 = parseFloat(second_number);
    let answer = 0;

    switch(operator)
    {
        case '+':
            answer = val_1 + val_2;
            break;
        case '-':
            answer = val_1 - val_2;
            break;
        case 'x':
            answer = val_1 * val_2;
            break;
        case '÷':

            if(val_2 === 0)
            {
                document.getElementById("display_text").innerHTML = "Cannot divide by zero";
                divided_by_zero = true
                return;
            }

            answer = val_1 / val_2;
            break;
    }
    clear();

    first_number = answer.toString();
    is_first_number = true;
    
    if(first_number.includes(".") === true)
        first_number_dot = true;

    document.getElementById("display_text").innerHTML = answer;
}

// Listens for the user clicking buttons
key.addEventListener("click", e => {
    if(e.target.matches("button"))
    { 

        if(e.target.innerText < 10)
            number_key_entered(e);
        
        if(e.target.innerText === '.')
            add_dot(e);

        if(e.target.innerText === 'x' || e.target.innerText === '÷' || e.target.innerText === '+' || e.target.innerText === '-')
            if(divided_by_zero != true)
                add_operator(e);
        
        if(e.target.innerText === '=' && divided_by_zero != true)
            result();
        
        if(e.target.innerText === 'C')
            clear();
        
        if(e.target.innerText === 'Del' && divided_by_zero != true)
            deleteCharacter();
    }
})
