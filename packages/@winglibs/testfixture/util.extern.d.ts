export default interface extern {
  makeKey: (name: string) => string,
  makeKeyInflight: (name: string) => Promise<string>,
}
