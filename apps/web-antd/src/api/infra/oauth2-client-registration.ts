import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadClientRegistrationPageApi(param: any) {
  return requestClient.post<any>('oauth2/client-registration/page', param);
}

/**
 * 保存
 */
export async function saveClientRegistrationApi(param: any) {
  return requestClient.post<any>('oauth2/client-registration/save', param);
}

/**
 * 删除
 */
export async function removeClientRegistrationApi(param: any) {
  return requestClient.post<any>(
    'oauth2/client-registration/remove-by-ids',
    param,
  );
}
