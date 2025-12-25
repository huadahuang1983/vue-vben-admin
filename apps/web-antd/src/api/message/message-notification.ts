import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadMessageNotificationPageApi(param: any) {
  return requestClient.post<any>('message/notification/page', param);
}

/**
 * 保存
 */
export async function saveMessageNotificationApi(param: any) {
  return requestClient.post<any>('message/notification/save', param);
}

/**
 * 删除
 */
export async function removeMessageNotificationApi(param: any) {
  return requestClient.post<any>('message/notification/remove-by-ids', param);
}
