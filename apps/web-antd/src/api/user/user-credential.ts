import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadUserCredentialPageApi(param: any) {
  return requestClient.post<any>('user/credential/page', param);
}

/**
 * 保存
 */
export async function saveUserCredentialApi(param: any) {
  return requestClient.post<any>('user/credential/save', param);
}

/**
 * 删除
 */
export async function removeUserCredentialApi(param: any) {
  return requestClient.post<any>('user/credential/remove-by-ids', param);
}
