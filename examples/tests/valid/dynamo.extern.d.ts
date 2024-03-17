export default interface extern {
  _putItem: (tableName: string, item: Readonly<any>) => Promise<void>,
}
