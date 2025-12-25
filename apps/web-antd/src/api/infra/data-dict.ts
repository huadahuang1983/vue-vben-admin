import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadDataDictPageApi(param: any) {
  return requestClient.post<any>('data/dict/page', param);
}

/**
 * 保存
 */
export async function saveDataDictApi(param: any) {
  return requestClient.post<any>('data/dict/save', param);
}

/**
 * 删除
 */
export async function removeDataDictApi(param: any) {
  return requestClient.post<any>('data/dict/remove-by-ids', param);
}

export async function loadAllDictionaryItemApi() {
  return requestClient.get<OptionItemTreeModel[]>('/data/dict/all-tree');
}
