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
      fieldName: 'moduleCode',
      label: $t('infra.serialNumber.field.moduleCode'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'moduleName',
      label: $t('infra.serialNumber.field.moduleName'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'configTemplate',
      label: $t('infra.serialNumber.field.configTemplate'),
      rules: 'required',
      description: '',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'maxSerial',
      label: $t('infra.serialNumber.field.maxSerial'),
      rules: 'required',
      description: '',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'preMaxNum',
      label: $t('infra.serialNumber.field.preMaxNum'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'remark',
      label: $t('infra.serialNumber.field.remark'),
      rules: '',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'moduleCode',
      label: $t('infra.serialNumber.field.moduleCode'),
    },
    {
      component: 'Input',
      fieldName: 'moduleName',
      label: $t('infra.serialNumber.field.moduleName'),
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
      field: 'moduleCode',
      title: $t('infra.serialNumber.field.moduleCode'),
      cellRender: {
        name: 'CellValueLink',
        attrs: { onClick: onActionClick },
      },
    },
    { field: 'moduleName', title: $t('infra.serialNumber.field.moduleName') },
    {
      field: 'configTemplate',
      title: $t('infra.serialNumber.field.configTemplate'),
    },
    { field: 'maxSerial', title: $t('infra.serialNumber.field.maxSerial') },
    { field: 'remark', title: $t('infra.serialNumber.field.remark') },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'moduleName',
          nameTitle: $t('infra.serialNumber.name'),
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
