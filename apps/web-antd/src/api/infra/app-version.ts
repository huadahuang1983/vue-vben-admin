import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadAppVersionPageApi(param: any) {
  return requestClient.post<any>('app/version/page', param);
}

/**
 * 保存
 */
export async function saveAppVersionApi(param: any) {
  return requestClient.post<any>('app/version/save', param);
}

/**
 * 删除
 */
export async function removeAppVersionApi(param: any) {
  return requestClient.post<any>('app/version/remove-by-ids', param);
}
