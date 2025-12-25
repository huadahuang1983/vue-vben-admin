import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadMessageHistoryPageApi(param: any) {
  return requestClient.post<any>('message/history/page', param);
}

/**
 * 保存
 */
export async function saveMessageHistoryApi(param: any) {
  return requestClient.post<any>('message/history/save', param);
}

/**
 * 删除
 */
export async function removeMessageHistoryApi(param: any) {
  return requestClient.post<any>('message/history/remove-by-ids', param);
}
