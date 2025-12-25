import { requestClient } from '#/api/request';

export async function loadUserCredentialByUserIdApi(userId: string) {
  return requestClient.get(`/user/credential/query-by-user-id/${userId}`);
}

export async function registerUserCredentialByUserIdApi(
  userId: string,
  param: any,
) {
  return requestClient.post(`/user/credential/register/${userId}`, param);
}

export async function configUserCredentialByUserIdApi(
  userId: string,
  param: any,
) {
  return requestClient.post(`/user/credential/config/${userId}`, param);
}
