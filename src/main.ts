import './style.css';
import { App } from './App.ts';
import { Circle } from './Circle.ts';
import { createElement } from './createElement.ts';

export const app = createElement({
  parent: document.body,
  teg: 'div',
  className: 'app',
});

type Routes = Record<string, () => void>;
const routes: Routes = {
  '/': () => App(),
  '/circle': () => Circle(),
};

export function renderPage() {
  const page = routes[window.location.pathname];
  app.replaceChildren();
  if (page) {
    page();
  } else {
    createElement({ parent: app, teg: 'h1', content: '404 - Page not found' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('popstate', renderPage);
  renderPage();
});
