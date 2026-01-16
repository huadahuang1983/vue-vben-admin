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
      fieldName: 'loginName',
      label: $t('user.userLogin.field.loginName'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'deviceId',
      label: $t('user.userLogin.field.deviceId'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'loginIp',
      label: $t('user.userLogin.field.loginIp'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'loginTime',
      label: $t('user.userLogin.field.loginTime'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'loginLocation',
      label: $t('user.userLogin.field.loginLocation'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'source',
      label: $t('user.userLogin.field.source'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'browserName',
      label: $t('user.userLogin.field.browserName'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'browserVersion',
      label: $t('user.userLogin.field.browserVersion'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'osName',
      label: $t('user.userLogin.field.osName'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'osVersion',
      label: $t('user.userLogin.field.osVersion'),
      rules: '',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'loginName',
      label: $t('user.userLogin.field.loginName'),
    },
  ];
}

export function useColumns(
  onActionClick: OnActionClickFn,
): VxeTableGridOptions['columns'] {
  return [
    { title: $t('common.sequence'), type: 'seq', width: 40 },
    {
      field: 'loginName',
      title: $t('user.userLogin.field.loginName'),
      cellRender: {
        attrs: {
          onClick: onActionClick,
        },
        name: 'CellValueLink',
      },
    },
    { field: 'loginIp', title: $t('user.userLogin.field.loginIp') },
    {
      field: 'loginTime',
      title: $t('user.userLogin.field.loginTime'),
      formatter: 'formatDateTime',
      width: 160,
    },
    { field: 'source', title: $t('user.userLogin.field.source') },
    {
      field: 'browserName',
      title: $t('user.userLogin.field.browserName'),
      width: 120,
    },
    {
      field: 'browserVersion',
      title: $t('user.userLogin.field.browserVersion'),
      width: 100,
    },
    { field: 'osName', title: $t('user.userLogin.field.osName'), width: 120 },
    {
      field: 'osVersion',
      title: $t('user.userLogin.field.osVersion'),
      width: 100,
    },
  ];
}
