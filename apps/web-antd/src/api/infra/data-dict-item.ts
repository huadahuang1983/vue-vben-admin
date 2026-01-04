import { requestClient } from '#/api/request';

export interface DataDictItemModel {
  dictCode: string;
  dataName: string;
  dataCode: string;
}

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

export async function loadDataDictItemByDictCodeApi(dictCode: string) {
  return requestClient.get<DataDictItemModel[]>(
    `/data/dict/item/dict-code/${dictCode}`,
  );
}
