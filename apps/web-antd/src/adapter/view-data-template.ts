import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [];
}

export function useColumns(
  onActionClick: OnActionClickFn,
): VxeTableGridOptions['columns'] {
  return [
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'templateName',
          nameTitle: $t('message.messageTemplate.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('common.operation'),
      width: 130,
    },
  ];
}
