import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadMessageTemplatePageApi(param: any) {
  return requestClient.post<any>('message/template/page', param);
}

/**
 * 保存
 */
export async function saveMessageTemplateApi(param: any) {
  return requestClient.post<any>('message/template/save', param);
}

/**
 * 删除
 */
export async function removeMessageTemplateApi(param: any) {
  return requestClient.post<any>('message/template/remove-by-ids', param);
}
