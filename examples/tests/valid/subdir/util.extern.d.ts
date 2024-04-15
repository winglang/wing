export default interface extern {
  greet: (name: string) => Promise<string>,
  preflightGreet: (name: string) => string,
}
