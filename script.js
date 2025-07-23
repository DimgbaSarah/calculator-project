'use strict';

// ======================
// 🧹 REMOVE DUPLICATES
// ======================
// Removed duplicate event listeners for .btn-AC, .square-btn, .btn-7, etc.

// ======================
// 📦 CLASS-BASED HANDLING
// ======================
class Calculator {
  constructor() {
    this.currentInput = '0';
    this.previousInput = '';
    this.operator = null;
    this.resetScreen = false;
    this.memory = 0;
    this.display = document.querySelector('.display');
    this.tempDisplay = document.querySelector('.temp');

    this.initializeButtons();
    this.updateDisplay();
  }

  initializeButtons() {
    const buttonActions = {
      '.btn-AC': () => this.clearAll(),
      '.clear-btn': () => this.clearAll(),
      '.delete-btn': () => this.deleteLastChar(),
      '.power-btn': () => this.powerOff(),
      '.btn-plus': () => this.setOperator('+'),
      '.btn-minus': () => this.setOperator('-'),
      '.btn-div': () => this.setOperator('÷'),
      '.btn-multiply': () => this.setOperator('×'),
      '.btn-equal': () => this.calculate(),
      '.btn-dot': () => this.addDecimal(),
      '.btn-sign': () => this.toggleSign(),
      '.btn-percent': () => this.handlePercentage(),
      '.square-btn': () => this.handleSquareRoot(),
      '.btn-cuberoot': () => this.handleCubeRoot(),
      '.btn-mc': () => this.memoryClear(),
      '.btn-mr': () => this.memoryRecall(),
      '.btn-mplus': () => this.memoryAdd(),
      '.btn-m-': () => this.memorySubtract(),
    };

    Object.entries(buttonActions).forEach(([selector, handler]) => {
      this.addButtonListener(selector, handler);
    });

    for (let i = 0; i <= 9; i++) {
      this.addButtonListener(`.btn-${i}`, () => this.appendNumber(i.toString()));
    }
  }

  addButtonListener(selector, callback) {
    const btn = document.querySelector(selector);
    if (btn) btn.addEventListener('click', callback);
  }

  updateDisplay() {
    this.display.value = this.currentInput;
  }

  clearAll() {
    this.currentInput = '0';
    this.previousInput = '';
    this.operator = null;
    this.resetScreen = false;
    if (this.tempDisplay) this.tempDisplay.value = '';
    this.updateDisplay();
  }

  powerOff() {
    this.currentInput = 'OFF';
    if (this.tempDisplay) this.tempDisplay.value = '';
    this.updateDisplay();
    setTimeout(() => this.clearAll(), 1000);
  }

  deleteLastChar() {
    this.currentInput = this.currentInput.length === 1 ? '0' : this.currentInput.slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(num) {
    this.currentInput = this.currentInput === '0' || this.resetScreen ? num : this.currentInput + num;
    this.resetScreen = false;
    this.updateDisplay();
  }

  setOperator(op) {
    if (!this.currentInput && !this.previousInput) return;
    if (this.operator && !this.resetScreen) this.calculate();
    this.previousInput = this.currentInput;
    this.operator = op;
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
    } else if (!this.currentInput.includes('.')) {
      this.currentInput += '.';
    }
    this.updateDisplay();
  }

  calculate() {
    if (!this.operator || this.resetScreen) return;

    const prev = parseFloat(this.previousInput);
    const curr = parseFloat(this.currentInput);

    if (isNaN(prev) || isNaN(curr)) {
      this.currentInput = 'Error';
    } else {
      switch (this.operator) {
        case '+': this.currentInput = (prev + curr).toString(); break;
        case '-': this.currentInput = (prev - curr).toString(); break;
        case '×': this.currentInput = (prev * curr).toString(); break;
        case '÷': this.currentInput = curr === 0 ? 'Error' : (prev / curr).toString(); break;
      }
    }

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

// Initialize calculator
window.addEventListener('DOMContentLoaded', () => new Calculator());
