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
      fieldName: 'url',
      label: $t('storage.fileDetail.field.url'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'originalFilename',
      label: $t('storage.fileDetail.field.originalFilename'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'filename',
      label: $t('storage.fileDetail.field.filename'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'basePath',
      label: $t('storage.fileDetail.field.basePath'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'path',
      label: $t('storage.fileDetail.field.path'),
      rules: '',
      description: '',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'size',
      label: $t('storage.fileDetail.field.size'),
      rules: '',
      description: $t('storage.fileDetail.comment.size'),
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'ext',
      label: $t('storage.fileDetail.field.ext'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'contentType',
      label: $t('storage.fileDetail.field.contentType'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'platform',
      label: $t('storage.fileDetail.field.platform'),
      rules: '',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'originalFilename',
      label: $t('storage.fileDetail.field.originalFilename'),
    },
    {
      component: 'Input',
      fieldName: 'filename',
      label: $t('storage.fileDetail.field.filename'),
    },
    {
      component: 'Input',
      fieldName: 'path',
      label: $t('storage.fileDetail.field.path'),
    },
  ];
}

export function useColumns(
  onActionClick: OnActionClickFn,
): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', type: 'checkbox', width: 50 },
    {
      field: 'originalFilename',
      title: $t('storage.fileDetail.field.originalFilename'),
    },
    { field: 'filename', title: $t('storage.fileDetail.field.filename') },
    { field: 'path', title: $t('storage.fileDetail.field.path') },
    {
      field: 'size',
      title: $t('storage.fileDetail.field.size'),
      formatter: 'dataStorageUnit',
    },
    { field: 'contentType', title: $t('storage.fileDetail.field.contentType') },
    { field: 'platform', title: $t('storage.fileDetail.field.platform') },
    {
      field: 'createTime',
      title: $t('storage.fileDetail.field.uploadTime'),
      formatter: 'formatDateTime',
    },
    {
      align: 'center',
      cellRender: {
        options: ['replace', 'download', 'edit', 'delete'],
        attrs: {
          nameField: 'originalFilename',
          nameTitle: $t('storage.fileDetail.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('common.operation'),
      width: 180,
    },
  ];
}
