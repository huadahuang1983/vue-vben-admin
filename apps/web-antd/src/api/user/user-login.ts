import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadUserLoginPageApi(param: any) {
  return requestClient.post<any>('user/login/page', param);
}
