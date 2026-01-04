import { loadDataDictItemByDictCodeApi } from '#/api';
import { useDictionaryStore } from '#/store/dictionary';

const dictionaryStore = useDictionaryStore();

async function loadDataDictItems(dictType: string) {
  const dataDictItems = await loadDataDictItemByDictCodeApi(dictType);
  dictionaryStore.setDataDictItems(dictType, dataDictItems);
}

export function getDataDictLabel(dictType: string, dataCode: string) {
  if (!dictionaryStore.isLoaded(dictType)) {
    new Promise((resolve, reject) => {
      loadDataDictItems(dictType)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }).then(() => {});
    dictionaryStore.setLoaded(dictType, true);
  }
  return dictionaryStore.getDictItemLabel(dictType, dataCode);
}

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
