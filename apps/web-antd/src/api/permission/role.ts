import { requestClient } from '#/api/request';

export async function loadAllEnabledRoleApi() {
  return requestClient.get('/system/role/enabled');
}
