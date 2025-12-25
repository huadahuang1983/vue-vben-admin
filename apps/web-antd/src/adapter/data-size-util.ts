function convertSize(size: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let convertedSize = size;
  let unitIndex = 0;

  while (convertedSize > 1024) {
    convertedSize /= 1024;
    unitIndex++;
  }

  return `${Math.round(convertedSize * 100) / 100}${units[unitIndex]}`;
}

export const DataSizeUtil = {
  format(size: number): string {
    return convertSize(size);
  },
};
