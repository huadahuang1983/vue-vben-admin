import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'dictCode',
      label: $t('infra.dataDict.field.dictCode'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'dictName',
      label: $t('infra.dataDict.field.dictName'),
      rules: 'required',
      description: '',
    },
    {
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'GenericStatus',
      },
      fieldName: 'status',
      label: $t('infra.dataDict.field.status'),
      rules: 'required',
      description: '',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'orderNo',
      label: $t('infra.dataDict.field.orderNo'),
      rules: '',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'remark',
      label: $t('infra.dataDict.field.remark'),
      rules: '',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'dictCode',
      label: $t('infra.dataDict.field.dictCode'),
    },
    {
      component: 'Input',
      fieldName: 'dictName',
      label: $t('infra.dataDict.field.dictName'),
    },
  ];
}

export function useColumns(
  onActionClick: OnActionClickFn,
): VxeTableGridOptions['columns'] {
  return [
    { title: $t('common.sequence'), type: 'seq', width: 50 },
    { align: 'left', type: 'checkbox', width: 50 },
    {
      field: 'dictCode',
      title: $t('infra.dataDict.field.dictCode'),
      cellRender: { name: 'CellValueLink', attrs: { onClick: onActionClick } },
    },
    { field: 'dictName', title: $t('infra.dataDict.field.dictName') },
    {
      field: 'status',
      title: $t('infra.dataDict.field.status'),
      cellRender: {
        name: 'CellDataDictTag',
        attrs: { dictType: 'GenericStatus' },
      },
    },
    { field: 'orderNo', title: $t('infra.dataDict.field.orderNo') },
    {
      align: 'center',
      cellRender: {
        options: ['data', 'edit', 'delete'],
        attrs: {
          nameField: 'dictName',
          nameTitle: $t('infra.dataDict.name'),
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
