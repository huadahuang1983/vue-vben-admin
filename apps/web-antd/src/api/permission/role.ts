import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadRolePageApi(param: any) {
  return requestClient.post<any>('role/page', param);
}

/**
 * 保存
 */
export async function saveRoleApi(param: any) {
  return requestClient.post<any>('role/save', param);
}

/**
 * 删除
 */
export async function removeRoleApi(param: any) {
  return requestClient.post<any>('role/remove-by-ids', param);
}

export async function loadMenuKeyByRoleApi(roleId: string) {
  return requestClient.get(`/menu/role/keys/${roleId}`);
}

export async function saveRoleMenuByRoleApi(
  roleId: string,
  menuIds: Array<string>,
) {
  return requestClient.post(`/menu/role/${roleId}`, menuIds);
}

export async function loadMenuByMenuTypeApi(menuType: string = 'menu') {
  return requestClient.get(`/menu/${menuType}/all`);
}

export async function saveUserRoleByUserApi(
  userId: string,
  roleIds: Array<string>,
) {
  return requestClient.post(`/role/user/${userId}`, roleIds);
}

export async function loadRoleIdsByUserApi(userId: string) {
  return requestClient.get(`/role/user/${userId}`);
}

export async function loadAllEnabledRoleApi() {
  return requestClient.get('/role/list/enabled');
}
