import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadUserInfoPageApi(param: any) {
  return requestClient.post<any>('user/info/page', param);
}

/**
 * 保存
 */
export async function saveUserInfoApi(param: any) {
  return requestClient.post<any>('user/info/save', param);
}

/**
 * 删除
 */
export async function removeUserInfoApi(param: any) {
  return requestClient.post<any>('user/info/remove-by-ids', param);
}
