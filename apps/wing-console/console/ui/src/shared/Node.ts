export type Node<T = undefined> = {
  id: string;
  children?: Node<T>[];
  data?: T;
};
