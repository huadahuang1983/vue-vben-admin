import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadFileDetailPageApi(param: any) {
  return requestClient.post<any>('file/detail/page', param);
}

/**
 * 保存
 */
export async function saveFileDetailApi(param: any) {
  return requestClient.post<any>('file/detail/save', param);
}

/**
 * 删除
 */
export async function removeFileDetailApi(param: any) {
  return requestClient.post<any>('file/detail/remove-by-ids', param);
}
