import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadSerialNumberPageApi(param: any) {
  return requestClient.post<any>('serial/number/page', param);
}

/**
 * 保存
 */
export async function saveSerialNumberApi(param: any) {
  return requestClient.post<any>('serial/number/save', param);
}

/**
 * 删除
 */
export async function removeSerialNumberApi(param: any) {
  return requestClient.post<any>('serial/number/remove-by-ids', param);
}
