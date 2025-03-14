import { createElement } from './createElement.ts';
import createList from './createList.ts';
import { Start } from './Start.ts';
import { Clear } from './Clear.ts';
import { Add } from './Add.ts';
import { db } from './db.ts';
import { JSONLoad, JSONSave } from './JSON.ts';

let ul: HTMLUListElement;
function App() {
  createElement({ teg: 'div', content: 'Decision Making Tool' });
  ul = createElement({ teg: 'ul' });

  Add(createElement({ teg: 'button', content: 'Add Option' }));
  // createElement({ teg: 'button', content: 'Paste list' });
  Clear(createElement({ teg: 'button', content: 'Clear list' }), ul);
  JSONSave(createElement({ teg: 'button', content: 'Save list to file' }));
  JSONLoad(createElement({ teg: 'button', content: 'Load list from file' }));
  Start(createElement({ teg: 'button', content: 'Start' }), ul);

  db().forEach(item => {
    createList(item);
  });
}

export { App, ul };
