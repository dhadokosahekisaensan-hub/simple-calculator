const display = document.querySelector('#display');
let expression = '';

function render() {
  display.textContent = expression || '0';
}

function calculate() {
  if (!expression || !/^[0-9+*/%. -]+$/.test(expression)) return;

  try {
    const result = Function(`"use strict"; return (${expression})`)();
    expression = Number.isFinite(result) ? String(result) : 'エラー';
  } catch {
    expression = 'エラー';
  }
  render();
}

function input(value) {
  if (expression === 'エラー') expression = '';
  if (value === '.' && /(?:^|[+*/% -])[^+*/% -]*\.[^+*/% -]*$/.test(expression)) return;
  if ('+*/%-'.includes(value) && (!expression || '+*/%-'.includes(expression.at(-1)))) {
    if (expression) expression = expression.slice(0, -1) + value;
  } else {
    expression += value;
  }
  render();
}

document.querySelector('.keypad').addEventListener('click', ({ target }) => {
  const button = target.closest('button');
  if (!button) return;
  if (button.dataset.action === 'clear') expression = '';
  else if (button.dataset.action === 'delete') expression = expression === 'エラー' ? '' : expression.slice(0, -1);
  else if (button.dataset.action === 'equals') return calculate();
  else input(button.dataset.value);
  render();
});

document.addEventListener('keydown', ({ key }) => {
  if (/^[0-9.+*/%-]$/.test(key)) input(key);
  else if (key === 'Enter' || key === '=') calculate();
  else if (key === 'Backspace') { expression = expression.slice(0, -1); render(); }
  else if (key === 'Escape') { expression = ''; render(); }
});
