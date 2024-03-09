export function convertToObjectArray(data: any) {
  const result = [];

  for (const timestamp in data) {
    if (Object.prototype.hasOwnProperty.call(data, timestamp)) {
      const count = data[timestamp];
      const date = new Date(parseInt(timestamp) * 1000)
        .toISOString()
        .split('T')[0];
      result.push({date, count});
    }
  }

  return result;
}
