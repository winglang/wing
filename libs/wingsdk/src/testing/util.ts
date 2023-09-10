export const replaceNullWithUndefined = (json: any): any =>
  JSON.parse(JSON.stringify(json), (_key, value) => {
    return value === null ? undefined : value;
  });
