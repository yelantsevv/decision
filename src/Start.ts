import { Data } from './db';
import { Dialog } from './Dialog';
import { renderPage } from './main';

export function Start(element: HTMLButtonElement, ul: HTMLUListElement) {
  element.addEventListener('click', () => {
    const data: Data[] = [];

    for (const item of ul.children) {
      if (!(item instanceof HTMLLIElement)) continue;

      const label = item.children[0];
      const titleInput = item.children.namedItem('title');
      const weightInput = item.children.namedItem('weight');

      if (!(label instanceof HTMLLabelElement)) continue;
      if (!(titleInput instanceof HTMLInputElement)) continue;
      if (!(weightInput instanceof HTMLInputElement)) continue;

      data.push({
        id: label.textContent || '',
        title: titleInput.value,
        weight: weightInput.value,
      });
    }

    const sortedData = data.filter(item => +item.weight > 0 && item.title.trim().length > 0)

    if (sortedData.length < 2) return Dialog(sortedData.length);

    localStorage.setItem('data', JSON.stringify(sortedData));
    history.pushState(null, '', '/circle');
    renderPage();
  });
}
