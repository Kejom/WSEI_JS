var inputContainer;
var sumInput;
var avgInput;
var minInput;
var maxInput;

document.addEventListener("DOMContentLoaded", init)
function init(){
     template = document.querySelector("#templateInput");
    inputContainer = document.querySelector(".user-inputs-container");
    sumInput = document.querySelector("#sum");
    avgInput = document.querySelector("#avg");
    minInput = document.querySelector("#min");
    maxInput = document.querySelector("#max");

    let addButton = document.querySelector("#addInput");
    addButton.addEventListener("click", addInput)
    for (let i = 0; i < 3; i++) {
        addInput();
    }

}

function addInput(){
    let newInput = template.cloneNode(true);
    newInput.style.display = "block";
    newInput.children[0],addEventListener("input", calculate);
    newInput.children[1].addEventListener("click", removeInput);
    inputContainer.appendChild(newInput);
    calculate();
}

function removeInput(){
    console.log(this.parentElement);
    this.removeEventListener("click", removeInput);
    this.parentElement.children[0].removeEventListener("input", calculate);
    this.parentElement.remove();
    calculate();
}

function calculate(){


    sumInput.value = "";
    avgInput.value = "";
    minInput.value = "";
    maxInput.value = "";

    let inputs = inputContainer.querySelectorAll("input");
    var values = [];
    for(let i = 0; i < inputs.length; i++){
        var input = inputs[i];
        let value = input.value;
        if(!isInt(value))
            return;
        
        values.push(Number.parseInt(value))
    }
    console.log(values)

    var sum = values.reduce((psum, a) => psum + a, 0 );
    sumInput.value = sum;

    var avg = sum/values.length;
    avgInput.value = avg;

    var min = Math.min(...values);
    minInput.value = min;

    var max = Math.max(...values);
    maxInput.value = max;
}

function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }