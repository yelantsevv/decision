import { createElement } from "./createElement";

export function Dialog(x: number) {
  const dialog = createElement({ parent: document.body, teg: 'div', className: 'dialog' });

  const box = createElement({ parent: dialog, teg: 'div', className: 'box' });
  createElement({ parent: box, teg: 'h3', content: 'Warning' });
  createElement({ parent: box, teg: 'p', content: 'Please add at least 2 valid options.' });
  createElement({ parent: box, teg: 'p', content: 'An option is considered valid if its title is not empty and its weight is greater than 0' });
  createElement({ parent: box, teg: 'p', content: `You have filled in ${x} option` });
  createElement({ parent: box, teg: 'button', content: 'Close' }).addEventListener('click', () => dialog.remove())

  return dialog;
}
