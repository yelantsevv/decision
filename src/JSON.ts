import createList from './createList';
import { Data, db } from './db';

export function JSONSave(element: HTMLButtonElement) {
  element.addEventListener('click', () => {
    const data = db();
    const jsonStr = JSON.stringify(data, null, 2);
    saveJsonToFile(jsonStr);
  });
}
export function JSONLoad(element: HTMLButtonElement) {
  element.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', event => {
      loadJsonFile(event, (data: Data[]) => {
        localStorage.setItem('data', JSON.stringify(data));
        db().forEach(item => {
          createList(item);
        });
      });
    });
    input.click();
  });
}

function saveJsonToFile(jsonStr: string, fileName = 'data.json') {
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function loadJsonFile(event: Event, callback: (data: Data[]) => void) {
  const inputElement = event.currentTarget;
  if (!(inputElement instanceof HTMLInputElement)) return;

  const fileList = inputElement.files;
  if (!fileList || fileList.length === 0) return;

  const file = fileList[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const result = e.target?.result;
    if (typeof result !== 'string') return;

    try {
      const data: Data[] = JSON.parse(result);
      callback(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  reader.readAsText(file);
}
