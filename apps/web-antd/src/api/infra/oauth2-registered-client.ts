import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadRegisteredClientPageApi(param: any) {
  return requestClient.post<any>('oauth2/registered-client/page', param);
}

/**
 * 保存
 */
export async function saveRegisteredClientApi(param: any) {
  return requestClient.post<any>('oauth2/registered-client/save', param);
}

/**
 * 删除
 */
export async function removeRegisteredClientApi(param: any) {
  return requestClient.post<any>(
    'oauth2/registered-client/remove-by-ids',
    param,
  );
}

export async function loadRegisteredClientSecretApi(id: string) {
  return requestClient.get(`oauth2/registered-client/client-secret/${id}`);
}
