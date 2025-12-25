import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadDataDictItemPageApi(param: any) {
  return requestClient.post<any>('data/dict/item/page', param);
}

/**
 * 保存
 */
export async function saveDataDictItemApi(param: any) {
  return requestClient.post<any>('data/dict/item/save', param);
}

/**
 * 删除
 */
export async function removeDataDictItemApi(param: any) {
  return requestClient.post<any>('data/dict/item/remove-by-ids', param);
}
