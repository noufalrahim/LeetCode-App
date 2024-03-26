export function convertToObjectArray(Data: object) {
  const result: any = [];
  for (const timestamp in Data) {
    if (Object.prototype.hasOwnProperty.call(Data, timestamp)) {
      const count = Data[timestamp];
      const date = new Date(parseInt(timestamp) * 1000)
        .toISOString()
        .split('T')[0];
      result.push({date, count});
    }
  }

  return result;
}
