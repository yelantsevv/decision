import { renderPage } from './main';

export function Back(element: HTMLButtonElement) {
  element.addEventListener('click', () => {
    history.pushState(null, '', '/');
    renderPage();
  });
}
