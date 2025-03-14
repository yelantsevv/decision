import { AudioEL } from './AudioEL.ts';
import { Back } from './Back.ts';
import {
  createCanvasElement,
  createElement,
  // createElementInput,
} from './createElement.ts';
import { drawWheel, spinWheelBtn } from './drawWheel.ts';

function Circle() {
  createElement({ teg: 'div', content: 'Decision Making Tool' });
  Back(createElement({ teg: 'button', content: 'Back' }));
  AudioEL(createElement({ teg: 'button', content: 'Sound' }));
  // createElement({ teg: 'button', content: 'Duration' });
  // createElementInput({ type: 'number', content: '5' });
  spinWheelBtn(createElement({ teg: 'button', content: 'Play' }));

  drawWheel(createCanvasElement({}));
}

export { Circle };
