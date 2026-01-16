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
      fieldName: 'dataCode',
      label: $t('infra.dataDictItem.field.dataCode'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'dataName',
      label: $t('infra.dataDictItem.field.dataName'),
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
      label: $t('infra.dataDictItem.field.status'),
      rules: 'required',
      description: '',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'orderNo',
      label: $t('infra.dataDictItem.field.orderNo'),
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
      label: $t('infra.dataDictItem.field.remark'),
      rules: '',
      description: '',
    },
  ];
}
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'dataCode',
      label: $t('infra.dataDictItem.field.dataCode'),
    },
    {
      component: 'Input',
      fieldName: 'dataName',
      label: $t('infra.dataDictItem.field.dataName'),
    },
  ];
}

export function useColumns(
  onActionClick: OnActionClickFn,
): VxeTableGridOptions['columns'] {
  return [
    { title: $t('common.sequence'), type: 'seq', width: 40 },
    { align: 'left', type: 'checkbox', width: 40 },
    {
      field: 'dictCode',
      title: $t('infra.dataDictItem.field.dictCode'),
    },
    {
      field: 'dataName',
      title: $t('infra.dataDictItem.field.dataName'),
      cellRender: { name: 'CellValueLink', attrs: { onClick: onActionClick } },
    },
    { field: 'dataCode', title: $t('infra.dataDictItem.field.dataCode') },
    {
      field: 'status',
      title: $t('infra.dataDictItem.field.status'),
      cellRender: {
        name: 'CellDataDictTag',
        attrs: {
          dictType: 'GenericStatus',
        },
      },
      width: 60,
    },
    {
      field: 'orderNo',
      title: $t('infra.dataDictItem.field.orderNo'),
      width: 40,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'dataName',
          nameTitle: $t('infra.dataDictItem.name'),
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
