import { ul } from './App.ts';
import { createElement, createElementInput } from './createElement.ts';
type PropsList = {
  id: string;
  title: string;
  weight: string;
};

export default function createList({ id, title, weight }: PropsList) {
  const li = createElement({ parent: ul, teg: 'li', className: '' });
  createElement({ parent: li, teg: 'label', content: id });
  createElementInput({ parent: li, type: 'text', content: title });
  createElementInput({ parent: li, type: 'number', content: weight });
  const button = createElement({
    parent: li,
    teg: 'button',
    content: 'Delete',
  });
  Delete(button, li, id);
  return li;
}

function Delete(element: HTMLButtonElement, parent: HTMLLIElement, id: string) {
  element.addEventListener('click', () => {
    const storedData = localStorage.getItem('data');
    if (!storedData) return;

    const data = JSON.parse(storedData).filter(
      (item: { id: string }) => item.id !== id,
    );

    localStorage.setItem('data', JSON.stringify(data));
    parent.remove();
  });
}
