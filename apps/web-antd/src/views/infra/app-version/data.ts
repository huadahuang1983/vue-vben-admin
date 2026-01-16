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
      fieldName: 'title',
      label: $t('infra.appVersion.field.title'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'appName',
      label: $t('infra.appVersion.field.appName'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'appCode',
      label: $t('infra.appVersion.field.appCode'),
      rules: 'required',
      description: '',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'versionNo',
      label: $t('infra.appVersion.field.versionNo'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'version',
      label: $t('infra.appVersion.field.version'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'downloadUrl',
      label: $t('infra.appVersion.field.downloadUrl'),
      rules: '',
      description: '',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'isForceUpdate',
      label: $t('infra.appVersion.field.isForceUpdate'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'minVersion',
      label: $t('infra.appVersion.field.minVersion'),
      rules: '',
      description: '',
    },
    {
      component: 'DatePicker',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'releaseTime',
      label: $t('infra.appVersion.field.releaseTime'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        cols: 4,
      },
      fieldName: 'releaseDesc',
      label: $t('infra.appVersion.field.releaseDesc'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 8,
      },
      fieldName: 'changeLog',
      label: $t('infra.appVersion.field.changeLog'),
      rules: 'required',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'title',
      label: $t('infra.appVersion.field.title'),
    },
    {
      component: 'Input',
      fieldName: 'appName',
      label: $t('infra.appVersion.field.appName'),
    },
    {
      component: 'Input',
      fieldName: 'version',
      label: $t('infra.appVersion.field.version'),
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
      field: 'title',
      title: $t('infra.appVersion.field.title'),
      cellRender: {
        name: 'CellValueLink',
        attrs: { onClick: onActionClick },
      },
    },
    {
      field: 'appName',
      title: $t('infra.appVersion.field.appName'),
      width: 100,
    },
    {
      field: 'version',
      title: $t('infra.appVersion.field.version'),
      width: 100,
    },
    {
      field: 'releaseTime',
      title: $t('infra.appVersion.field.releaseTime'),
      formatter: 'formatDate',
      width: 110,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'title',
          nameTitle: $t('infra.appVersion.name'),
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
