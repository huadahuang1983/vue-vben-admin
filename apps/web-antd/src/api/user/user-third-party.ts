import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadUserThirdPartyPageApi(param: any) {
  return requestClient.post<any>('user/third/party/page', param);
}

/**
 * 保存
 */
export async function saveUserThirdPartyApi(param: any) {
  return requestClient.post<any>('user/third/party/save', param);
}

/**
 * 删除
 */
export async function removeUserThirdPartyApi(param: any) {
  return requestClient.post<any>('user/third/party/remove-by-ids', param);
}
