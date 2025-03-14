export type Data = {
  id: string;
  title: string;
  weight: string;
};

export function db() {
  const list: Data[] = localStorage.getItem('data')
    ? JSON.parse(localStorage.getItem('data') || '')
    : [];
  return list;
}
