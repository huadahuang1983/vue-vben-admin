import type { NotificationItem } from '@vben/layouts';

import { requestClient } from '#/api/request';

export async function loadLatestNotificationApi(param: number) {
  return requestClient.get<NotificationItem[]>(
    `/message/notification/my/latest?pageSize=${param}`,
  );
}

export async function clearNotificationApi() {
  return requestClient.post('/message/notification/my/clear');
}

export async function markAllNotificationApi() {
  return requestClient.post('/message/notification/my/mark-all');
}

/**
 * 分页查询
 */
export async function loadMyNotificationPageApi(param: any) {
  return requestClient.post<any>('message/notification/my/page', param);
}

/**
 * 删除
 */
export async function removeMyNotificationApi(param: any) {
  return requestClient.post<any>(
    'message/notification/my/remove-by-ids',
    param,
  );
}

export async function markMyNotificationApi(param: any) {
  return requestClient.post<any>('message/notification/my/mark-by-ids', param);
}
