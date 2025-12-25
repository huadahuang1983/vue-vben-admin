import type {
  OptionItemBasicModel,
  OptionItemTreeModel,
} from '#/components/type';

import { defineStore } from 'pinia';

import { loadAllDictionaryItemApi } from '#/api';

interface DictionaryState {
  map: Map<string, Map<string, string>>;
  rawData: OptionItemTreeModel[];
  loaded: boolean;
}

export const useDictionaryStore = defineStore('dictionary', {
  state: (): DictionaryState => ({
    map: new Map<string, Map<string, string>>(),
    rawData: [],
    loaded: false,
  }),
  getters: {},
  actions: {
    async loadData() {
      if (this.loaded) {
        return;
      }
      const loadData = await loadAllDictionaryItemApi();
      this.rawData = loadData;
      this.loaded = true;

      this.rawData.forEach((element) => {
        const childMap = new Map<string, string>();
        element.children.forEach((it) => {
          childMap.set(it.value, it.label);
        });
        this.map.set(element.value, childMap);
      });
    },
    async getDictMap(dictType: string): Promise<Map<string, string>> {
      await this.loadData();
      return this.map.get(dictType) || new Map<string, string>();
    },
    async getDictItemLabel(dictType: string, dictValue: string) {
      const dict = await this.getDictMap(dictType);
      return dict.get(dictValue);
    },
    async getAllDictMap() {
      await this.loadData();
      return this.map;
    },
    async getDictList(dictType: string): Promise<OptionItemBasicModel[]> {
      let result = new Array<OptionItemBasicModel>();
      this.rawData.forEach((element) => {
        if (element.value === dictType) {
          result = element.children;
        }
      });
      return result;
    },
  },
});
