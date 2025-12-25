import { $t } from '@vben/locales';

import { requestClient } from '#/api/request';

export interface TreeSelectNodeModel {
  label: string;
  value: string;
  children: TreeSelectNodeModel[];
  isLeaf: boolean;
}

export async function loadMenuByParentIdApi(parentId: string = '0') {
  return requestClient.post('/menu/page', {
    parentId,
    searchCount: false,
    current: 1,
    size: 50,
    orders: [{ column: 'order_no' }],
  });
}

export async function loadMenuByParentId(
  parentId?: string,
): Promise<TreeSelectNodeModel[]> {
  const nodes: TreeSelectNodeModel[] = [];
  const result = await loadMenuByParentIdApi(parentId);
  result.records.forEach((element: any) => {
    nodes.push({
      label: $t(element.title),
      value: element.menuId,
      isLeaf: element.isLeaf,
      children: [],
    });
  });
  return nodes;
}
