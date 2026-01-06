import { requestClient } from '#/api/request';

export async function loadAllEnabledRoleApi() {
  return requestClient.get('/role/enabled');
}

export async function loadRoleByUserIdApi(userId: string) {
  return requestClient.get(`/user/${userId}/role`);
}

export async function saveRoleByUserIdApi(userId: string, roleIds: string[]) {
  return requestClient.post(`/user/${userId}/role`, roleIds);
}
