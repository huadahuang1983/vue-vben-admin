import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadConfigParamPageApi(param: any) {
  return requestClient.post<any>('config/param/page', param);
}

/**
 * 保存
 */
export async function saveConfigParamApi(param: any) {
  return requestClient.post<any>('config/param/save', param);
}

/**
 * 删除
 */
export async function removeConfigParamApi(param: any) {
  return requestClient.post<any>('config/param/remove-by-ids', param);
}
