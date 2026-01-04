import type { DataDictItemModel } from '#/api';

import { defineStore } from 'pinia';

interface DictionaryState {
  map: Map<string, DataDictItemModel[]>;
  loaded: Map<string, boolean>;
}

export const useDictionaryStore = defineStore('dictionary', {
  state: (): DictionaryState => ({
    map: new Map<string, DataDictItemModel[]>(),
    loaded: new Map<string, boolean>(),
  }),
  getters: {},
  actions: {
    isLoaded(dictType: string): boolean {
      return this.loaded.get(dictType) || false;
    },
    setLoaded(dictType: string, loaded: boolean) {
      this.loaded.set(dictType, loaded);
    },
    getDataDictItems(dictType: string): DataDictItemModel[] {
      return this.map.get(dictType) || [];
    },
    getDictItemLabel(dictType: string, dataCode: string) {
      const dataDictItems = this.getDataDictItems(dictType);
      return dataDictItems.find((it) => it.dataCode === dataCode)?.dataName;
    },
    setDataDictItems(dictType: string, dataDictItems: DataDictItemModel[]) {
      this.map.set(dictType, dataDictItems);
    },
  },
});
