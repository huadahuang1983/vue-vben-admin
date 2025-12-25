import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadUserLoginPageApi(param: any) {
  return requestClient.post<any>('user/login/page', param);
}

/**
 * 保存
 */
export async function saveUserLoginApi(param: any) {
  return requestClient.post<any>('user/login/save', param);
}

/**
 * 删除
 */
export async function removeUserLoginApi(param: any) {
  return requestClient.post<any>('user/login/remove-by-ids', param);
}
