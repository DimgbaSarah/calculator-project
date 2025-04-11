'use strict;'
  
  document.querySelector('.btn-AC').addEventListener('click', function() {
    document.querySelector('.display').value='ON';
      document.querySelector('.temp').value='28°C';

      
});

document.querySelector('.clear-btn').addEventListener('click', function(){
    document.querySelector('.display').value = '';
})

document.querySelector('.delete-btn').addEventListener('click', function(){
    document.querySelector('.display').value = '';
})

document.querySelector('.power-btn').addEventListener('click', function(){
    document.querySelector('.display').value = '';
    document.querySelector('.temp').value='';
})
 
document.querySelector('.square-btn').addEventListener('click', function (){
    document.querySelector('.display').value= '√'
 })
// square
  document.querySelector('.square-btn').addEventListener('click', function (){
    document.querySelector('.display').value= ''

  })

// div
  document.querySelector('.btn-div').addEventListener('click', function (){
    document.querySelector('.display').value='÷'
  })

  // percent

  document.querySelector('.btn-percent').addEventListener('click', function(){
    document.querySelector('.display').value= "%" 
  })


  // 7

  document.querySelector('.btn-7').addEventListener('click', function(){
    document.querySelector('.display').value= "7" ;
    clickCounter++;
    
    
  })
  
  document.querySelector('.btn-7').addEventListener('click', function(){
    document.querySelector('.display').value= "7" ;
    
    
    
  })

  //8
  document.querySelector('.btn-8').addEventListener('click', function(){
    document.querySelector('.display').value= "8" 
  })

  // 9

  document.querySelector('.btn-9').addEventListener('click', function(){
    document.querySelector('.display').value= "9" 
  })

  // minus
  document.querySelector('.btn-minus').addEventListener('click', function(){
    document.querySelector('.display').value= "-" 
  })

  //btn +/- yet to work??

 document.querySelector('.btn-sign').addEventListener('click', function(){
    document.querySelector('.display').value= "+" ||"-" 
  })


  // btn 4
   document.querySelector('.btn-4').addEventListener('click', function(){
    document.querySelector('.display').value= "4" 
  })

  // btn 5
   document.querySelector('.btn-5').addEventListener('click', function(){
    document.querySelector('.display').value= "5" 
  })

  // btn 6
   document.querySelector('.btn-6').addEventListener('click', function(){
    document.querySelector('.display').value= "6" 
  })
  // btn cuberoot
   document.querySelector('.btn-cuberoot').addEventListener('click', function(){
    document.querySelector('.display').value= "∛" 
  })

   // btn C
   document.querySelector('.btn-multiply').addEventListener('click', function(){
    document.querySelector('.display').value= "*" 
  })

   // btn 1
   document.querySelector('.btn-1').addEventListener('click', function(){
    document.querySelector('.display').value= "1" 
  })
   // btn 2
   document.querySelector('.btn-2').addEventListener('click', function(){
    document.querySelector('.display').value= "2" 
  })
// btn 3
   document.querySelector('.btn-3').addEventListener('click', function(){
    document.querySelector('.display').value= "3" 
  })
  
 //btn Ac
   document.querySelector('.btn-AC').addEventListener('click', function(){
    document.querySelector('.display').value= "" 
  })

  
// btn 0
   document.querySelector('.btn-0').addEventListener('click', function(){
    document.querySelector('.display').value= "0" 
  })

  // btn equal
   document.querySelector('.btn-equal').addEventListener('click', function(){
    document.querySelector('.display').value= "" 
  })

  // btn plus
   document.querySelector('.btn-plus').addEventListener('click', function(){
    document.querySelector('.display').value= "+" 
  })

  
  class Calculator {
  constructor() {
    this.currentInput = '0';
    this.previousInput = '';
    this.operator = null;
    this.resetScreen = false;
    this.memory = 0;
    
    this.display = document.querySelector('.display');
    //this.tempDisplay = document.querySelector('.temp');
    
    this.initializeButtons();
    this.updateDisplay();
  }

  initializeButtons() {
    // Clear buttons
    this.addButtonListener('.btn-AC', () => this.clearAll());
    this.addButtonListener('.clear-btn', () => this.clearAll());
    this.addButtonListener('.delete-btn', () => this.deleteLastChar());
    this.addButtonListener('.power-btn', () => this.powerOff());

    // Number buttons
    for (let i = 0; i <= 9; i++) {
      this.addButtonListener(`.btn-${i}`, () => this.appendNumber(i.toString()));
    }

    // Operator buttons
    this.addButtonListener('.btn-plus', () => this.setOperator('+'));
    this.addButtonListener('.btn-minus', () => this.setOperator('-'));
    this.addButtonListener('.btn-div', () => this.setOperator('÷'));
    this.addButtonListener('.btn-multiply', () => this.setOperator('×'));

    // Special functions
    this.addButtonListener('.btn-equal', () => this.calculate());
    this.addButtonListener('.btn-dot', () => this.addDecimal());
    this.addButtonListener('.btn-sign', () => this.toggleSign());
    this.addButtonListener('.btn-percent', () => this.handlePercentage());
    this.addButtonListener('.square-btn', () => this.handleSquareRoot());
    this.addButtonListener('.btn-cuberoot', () => this.handleCubeRoot());

    // Memory functions
    this.addButtonListener('.btn-mc', () => this.memoryClear());
    this.addButtonListener('.btn-mr', () => this.memoryRecall());
    this.addButtonListener('.btn-mplus', () => this.memoryAdd());
    this.addButtonListener('.btn-m-', () => this.memorySubtract());
  }

  addButtonListener(selector, callback) {
    const button = document.querySelector(selector);
    if (button) {
      button.addEventListener('click', callback);
    }
  }

  updateDisplay() {
    this.display.value = this.currentInput;
  }

  clearAll() {
    this.currentInput = '0';
    this.previousInput = '';
    this.operator = null;
    this.resetScreen = false;
    if (this.tempDisplay) this.tempDisplay.value = ''; // Removed the "28°C" display
    this.updateDisplay();
  }

  powerOff() {
    this.currentInput = 'OFF';
    if (this.tempDisplay) this.tempDisplay.value = '';
    this.updateDisplay();
    setTimeout(() => {
      this.clearAll();
    }, 1000);
  }

  deleteLastChar() {
    if (this.currentInput.length === 1) {
      this.currentInput = '0';
    } else {
      this.currentInput = this.currentInput.slice(0, -1);
    }
    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.currentInput === '0' || this.resetScreen) {
      this.currentInput = number;
      this.resetScreen = false;
    } else {
      this.currentInput += number;
    }
    this.updateDisplay();
  }

  setOperator(newOperator) {
    if (this.currentInput === '0' && this.previousInput === '') return;
    
    if (this.operator !== null && !this.resetScreen) {
      this.calculate();
    }
    
    this.previousInput = this.currentInput;
    this.operator = newOperator;
    this.resetScreen = true;
    if (this.tempDisplay) this.tempDisplay.value = `${this.previousInput} ${this.operator}`;
  }

  toggleSign() {
    this.currentInput = (parseFloat(this.currentInput) * -1).toString();
    this.updateDisplay();
  }

  addDecimal() {
    if (this.resetScreen) {
      this.currentInput = '0.';
      this.resetScreen = false;
      return;
    }
    if (!this.currentInput.includes('.')) {
      this.currentInput += '.';
    }
    this.updateDisplay();
  }

  calculate() {
    if (this.operator === null || this.resetScreen) return;
    
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);
    
    if (Number.isNaN(prev) || Number.isNaN(current)) {
      this.currentInput = 'Error';
      this.updateDisplay();
      return;
    }
    
    let result;
    switch (this.operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = current === 0 ? 'Error' : prev / current;
        break;
      default:
        return;
    }
    
    this.currentInput = result.toString();
    this.operator = null;
    this.resetScreen = true;
    if (this.tempDisplay) this.tempDisplay.value = '';
    this.updateDisplay();
  }

  handlePercentage() {
    this.currentInput = (parseFloat(this.currentInput) / 100).toString();
    this.updateDisplay();
  }

  handleSquareRoot() {
    const num = parseFloat(this.currentInput);
    this.currentInput = num < 0 ? 'Error' : Math.sqrt(num).toString();
    this.updateDisplay();
  }

  handleCubeRoot() {
    this.currentInput = Math.cbrt(parseFloat(this.currentInput)).toString();
    this.updateDisplay();
  }

  memoryClear() {
    this.memory = 0;
  }

  memoryRecall() {
    this.currentInput = this.memory.toString();
    this.updateDisplay();
  }

  memoryAdd() {
    this.memory += parseFloat(this.currentInput) || 0;
  }

  memorySubtract() {
    this.memory -= parseFloat(this.currentInput) || 0;
  }
}

// Initialize the calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
});