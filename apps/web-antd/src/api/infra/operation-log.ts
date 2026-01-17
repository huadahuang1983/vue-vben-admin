import { requestClient } from '#/api/request';

/**
 * 分页查询
 */
export async function loadOperationLogPageApi(param: any) {
  return requestClient.post<any>('operation/log/page', param);
}
