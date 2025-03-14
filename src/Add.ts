import createList from './createList';
import { db } from './db';

export function Add(element: HTMLButtonElement) {
  element.addEventListener('click', () => {
    const data = db();
    const id = ((+data[data.length - 1]?.id.slice(1) || 0) + 1)?.toString();
    data.push({ id: '#' + id, title: '', weight: '' });
    createList({ id: '#' + id, title: '', weight: '' });
    localStorage.setItem('data', JSON.stringify(data));
  });
}
