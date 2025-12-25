import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadMenuPageApi(param: any) {
  return requestClient.post<any>('menu/page', param);
}

/**
 * 保存
 */
export async function saveMenuApi(param: any) {
  return requestClient.post<any>('menu/save', param);
}

/**
 * 删除
 */
export async function removeMenuApi(param: any) {
  return requestClient.post<any>('menu/remove-by-ids', param);
}
