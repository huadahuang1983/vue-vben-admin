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
      fieldName: 'paramCode',
      label: $t('infra.configParam.field.paramCode'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'paramName',
      label: $t('infra.configParam.field.paramName'),
      rules: 'required',
      description: '',
    },
    {
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'ConfigParamType',
      },
      fieldName: 'paramType',
      label: $t('infra.configParam.field.paramType'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'paramValue',
      label: $t('infra.configParam.field.paramValue'),
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
      label: $t('infra.configParam.field.status'),
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
      label: $t('infra.configParam.field.remark'),
      rules: '',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'paramCode',
      label: $t('infra.configParam.field.paramCode'),
    },
    {
      component: 'Input',
      fieldName: 'paramName',
      label: $t('infra.configParam.field.paramName'),
    },
    {
      component: 'Input',
      fieldName: 'paramValue',
      label: $t('infra.configParam.field.paramValue'),
    },
  ];
}

export function useColumns(onActionClick: OnActionClickFn): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', type: 'checkbox', width: 50 },
    {
      field: 'paramCode',
      title: $t('infra.configParam.field.paramCode'),
      cellRender: {
        name: 'CellValueLink',
        attrs: { onClick: onActionClick },
      },
    },
    { field: 'paramName', title: $t('infra.configParam.field.paramName') },
    {
      field: 'paramType',
      title: $t('infra.configParam.field.paramType'),
      cellRender: {
        name: 'CellDataDictTag',
        attrs: { dictType: 'ConfigParamType' },
      },
    },
    { field: 'paramValue', title: $t('infra.configParam.field.paramValue') },
    {
      field: 'status',
      title: $t('infra.configParam.field.status'),
      cellRender: {
        name: 'CellDataDictTag',
        attrs: { dictType: 'GenericStatus' },
      },
    },
    { field: 'remark', title: $t('infra.configParam.field.remark') },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'paramName',
          nameTitle: $t('infra.configParam.title'),
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
