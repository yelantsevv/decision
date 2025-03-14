export function Clear(element: HTMLButtonElement, parent: HTMLUListElement) {
  element.addEventListener('click', () => {
    localStorage.setItem('data', JSON.stringify([]));
    parent.replaceChildren();
  });
}
