import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取角色列表数据
 */
async function getRoleList(params: Recordable<any>) {
  return requestClient.get('/system/role/list', { params });
}

/**
 * 创建角色
 * @param data 角色数据
 */
async function createRole(data: Recordable<any>) {
  return requestClient.post('/system/role', data);
}

/**
 * 更新角色
 *
 * @param id 角色 ID
 * @param data 角色数据
 */
async function updateRole(id: string, data: Recordable<any>) {
  return requestClient.put(`/system/role/${id}`, data);
}

/**
 * 删除角色
 * @param id 角色 ID
 */
async function deleteRole(ids: string[]) {
  return requestClient.delete(`/system/role/${ids.join(',')}`);
}

export { createRole, deleteRole, getRoleList, updateRole };
