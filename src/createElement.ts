import { db } from './db';
import { PropsCanvasElement } from './drawWheel';
import { app } from './main';

type Props<T> = {
  parent?: HTMLElement;
  teg: T;
  className?: string;
  content?: string;
};

export function createElement<T extends keyof HTMLElementTagNameMap>({
  parent = app,
  teg,
  className,
  content,
}: Props<T>): HTMLElementTagNameMap[T] {
  const el = document.createElement(teg || 'button');
  className ? (el.className = className) : null;
  if (content) el.textContent = content;
  return parent.appendChild(el);
}

type PropsInput = {
  parent?: HTMLElement;
  type: string;
  content?: string;
  className?: string;
};
export function createElementInput({
  parent = app,
  className,
  content,
  type,
}: PropsInput): HTMLInputElement {
  const el = document.createElement('input');
  className ? (el.className = className) : null;
  if (content) el.value = content;
  el.type = type;
  el.name = type == 'text' ? 'title' : 'weight';
  el.placeholder = type == 'text' ? 'Enter title' : 'Enter weight';
  return parent.appendChild(el);
}

type PropsCanvas = {
  parent?: HTMLElement;
  className?: string;
};
export function createCanvasElement({
  parent = app,
  className,
}: PropsCanvas): PropsCanvasElement {
  const segments: PropsCanvasElement['segments'] = [];
  db().forEach(item =>
    segments.push({
      id: item.id,
      title: item.title,
      weight: Number(item.weight),
      color: '#' + Math.floor(Math.random() * 16777222).toString(16),
    }),
  );

  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  className ? (canvas.className = className) : null;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  parent.appendChild(canvas);
  return { canvas, ctx, segments };
}
