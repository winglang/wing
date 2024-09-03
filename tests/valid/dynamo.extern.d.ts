export default interface extern {
  _getItem: (tableName: string, key: Readonly<any>) => Promise<Readonly<any>>,
  _putItem: (tableName: string, item: Readonly<any>) => Promise<void>,
}
