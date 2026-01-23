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
      fieldName: 'uuid',
      label: $t('user.userThirdParty.field.uuid'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'username',
      label: $t('user.userThirdParty.field.username'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'nickname',
      label: $t('user.userThirdParty.field.nickname'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'avatar',
      label: $t('user.userThirdParty.field.avatar'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'blog',
      label: $t('user.userThirdParty.field.blog'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'company',
      label: $t('user.userThirdParty.field.company'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'location',
      label: $t('user.userThirdParty.field.location'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'email',
      label: $t('user.userThirdParty.field.email'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'remark',
      label: $t('user.userThirdParty.field.remark'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'gender',
      label: $t('user.userThirdParty.field.gender'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'source',
      label: $t('user.userThirdParty.field.source'),
      rules: '',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'uuid',
      label: $t('user.userThirdParty.field.uuid'),
    },
    {
      component: 'Input',
      fieldName: 'username',
      label: $t('user.userThirdParty.field.username'),
    },
  ];
}

export function useColumns(
  onActionClick: OnActionClickFn,
): VxeTableGridOptions['columns'] {
  return [
    { title: $t('common.sequence'), type: 'seq', width: 40 },
    {
      field: 'userId',
      title: $t('user.userThirdParty.field.userId'),
      width: 200,
    },
    {
      field: 'source',
      title: $t('user.userThirdParty.field.source'),
      width: 120,
    },
    {
      field: 'uuid',
      title: $t('user.userThirdParty.field.uuid'),
      cellRender: {
        name: 'CellValueLink',
        attrs: {
          onClick: onActionClick,
        },
      },
    },
    { field: 'username', title: $t('user.userThirdParty.field.username') },
    { field: 'nickname', title: $t('user.userThirdParty.field.nickname') },
    { field: 'email', title: $t('user.userThirdParty.field.email') },
    {
      field: 'gender',
      title: $t('user.userThirdParty.field.gender'),
      width: 100,
    },
  ];
}
