import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';

import { shallowRef } from 'vue';

import { RandomInput } from '#/components';
import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'phoneNumber',
      label: $t('user.userInfo.field.phoneNumber'),
      rules: '',
      description: '',
    },
    {
      component: shallowRef(RandomInput),
      componentProps: {
        class: 'mr-2',
        count: 10,
        initValue: true,
      },
      fieldName: 'nickname',
      label: $t('user.userInfo.field.nickname'),
      rules: 'required',
      description: '',
    },
    {
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'Gender',
      },
      fieldName: 'gender',
      label: $t('user.userInfo.field.gender'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'email',
      label: $t('user.userInfo.field.email'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'avatar',
      label: $t('user.userInfo.field.avatar'),
      rules: '',
      description: '',
    },
    {
      component: 'DataDictSelect',
      componentProps: {
        class: 'mr-2',
        dictType: 'Language',
      },
      fieldName: 'locale',
      label: $t('user.userInfo.field.locale'),
      rules: '',
      description: '',
    },
    {
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'UserStatus',
      },
      fieldName: 'userStatus',
      label: $t('user.userInfo.field.userStatus'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'description',
      label: $t('user.userInfo.field.description'),
      rules: '',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'phoneNumber',
      label: $t('user.userInfo.field.phoneNumber'),
    },
    {
      component: 'Input',
      fieldName: 'nickname',
      label: $t('user.userInfo.field.nickname'),
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
      field: 'nickname',
      title: $t('user.userInfo.field.nickname'),
      cellRender: { name: 'CellValueLink', attrs: { onClick: onActionClick } },
    },
    {
      field: 'phoneNumber',
      title: $t('user.userInfo.field.phoneNumber'),
    },
    { field: 'email', title: $t('user.userInfo.field.email') },
    {
      field: 'gender',
      title: $t('user.userInfo.field.gender'),
      cellRender: { name: 'CellDataDictTag', attrs: { dictType: 'Gender' } },
      width: 40,
    },
    {
      field: 'registerTime',
      title: $t('user.userInfo.field.registerTime'),
      formatter: 'formatDateTime',
      width: 160,
    },
    {
      field: 'userStatus',
      title: $t('user.userInfo.field.userStatus'),
      cellRender: {
        name: 'CellDataDictTag',
        attrs: { dictType: 'UserStatus' },
      },
      width: 80,
    },
    {
      align: 'center',
      cellRender: {
        options: [
          { code: 'configRole', text: $t('user.configRole') },
          'edit',
          'delete',
        ],
        attrs: {
          nameField: 'nickname',
          nameTitle: $t('user.userInfo.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('common.operation'),
      width: 160,
    },
  ];
}
