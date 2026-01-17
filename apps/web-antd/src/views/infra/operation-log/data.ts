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
      fieldName: 'operationType',
      label: $t('infra.operationLog.field.operationType'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'operationTime',
      label: $t('infra.operationLog.field.operationTime'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'operationIp',
      label: $t('infra.operationLog.field.operationIp'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'userId',
      label: $t('infra.operationLog.field.userId'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'details',
      label: $t('infra.operationLog.field.details'),
      rules: '',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'affectedResource',
      label: $t('infra.operationLog.field.affectedResource'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'requestUrl',
      label: $t('infra.operationLog.field.requestUrl'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'requestMethod',
      label: $t('infra.operationLog.field.requestMethod'),
      rules: '',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'inputValues',
      label: $t('infra.operationLog.field.inputValues'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'bizType',
      label: $t('infra.operationLog.field.bizType'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'bizId',
      label: $t('infra.operationLog.field.bizId'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'status',
      label: $t('infra.operationLog.field.status'),
      rules: '',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'outputContent',
      label: $t('infra.operationLog.field.outputContent'),
      rules: '',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'details',
      label: $t('infra.operationLog.field.details'),
    },
    {
      component: 'Input',
      fieldName: 'userId',
      label: $t('infra.operationLog.field.userId'),
    },
    {
      component: 'Input',
      fieldName: 'affectedResource',
      label: $t('infra.operationLog.field.affectedResource'),
    },
    {
      component: 'DatePicker',
      fieldName: 'operationTimeStart',
      label: $t('common.timeStart'),
    },
    {
      component: 'DatePicker',
      fieldName: 'operationTimeEnd',
      label: $t('common.timeEnd'),
    },
  ];
}

export function useColumns(
  onActionClick: OnActionClickFn,
): VxeTableGridOptions['columns'] {
  return [
    { title: $t('common.sequence'), type: 'seq', width: 40 },
    {
      field: 'details',
      title: $t('infra.operationLog.field.details'),
      cellRender: {
        attrs: {
          onClick: onActionClick,
        },
        name: 'CellValueLink',
      },
    },
    { field: 'userId', title: $t('infra.operationLog.field.userId') },
    {
      field: 'operationTime',
      title: $t('infra.operationLog.field.operationTime'),
      formatter: 'formatDateTime',
      width: 160,
    },
    {
      field: 'operationIp',
      title: $t('infra.operationLog.field.operationIp'),
      width: 120,
    },
    {
      field: 'affectedResource',
      title: $t('infra.operationLog.field.affectedResource'),
    },
    {
      field: 'bizType',
      title: $t('infra.operationLog.field.bizType'),
      width: 100,
    },
    { field: 'bizId', title: $t('infra.operationLog.field.bizId'), width: 120 },
    {
      field: 'status',
      title: $t('infra.operationLog.field.status'),
      width: 100,
    },
  ];
}
