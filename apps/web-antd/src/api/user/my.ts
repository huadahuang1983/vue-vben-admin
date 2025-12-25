import { requestClient } from '#/api/request';

export async function loadMyUserInfoApi() {
  return requestClient.get('/user/my/info');
}

export async function updateMyUserInfoApi(param: any) {
  return requestClient.post('/user/my/info', param);
}
