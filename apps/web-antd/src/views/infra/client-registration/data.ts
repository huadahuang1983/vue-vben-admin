import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'registrationId',
      componentProps: {
        class: 'mr-2',
      },
      label: $t('oauth2.clientRegistration.field.registrationId'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'clientName',
      label: $t('oauth2.clientRegistration.field.clientName'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'clientId',
      label: $t('oauth2.clientRegistration.field.clientId'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'clientSecret',
      label: $t('oauth2.clientRegistration.field.clientSecret'),
      rules: 'required',
      description: '',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        class: 'mr-2',
        options: [
          { label: 'CLIENT_SECRET_BASIC', value: 'client_secret_basic' },
          { label: 'CLIENT_SECRET_POST', value: 'client_secret_post' },
          { label: 'CLIENT_SECRET_JWT', value: 'client_secret_jwt' },
          { label: 'PRIVATE_KEY_JWT', value: 'private_key_jwt' },
          { label: 'NONE', value: 'none' },
        ],
      },
      fieldName: 'clientAuthenticationMethod',
      label: $t('oauth2.clientRegistration.field.clientAuthenticationMethod'),
      rules: 'required',
      description: '',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        class: 'mr-2',
        options: [
          { label: 'AUTHORIZATION_CODE', value: 'authorization_code' },
          { label: 'REFRESH_TOKEN', value: 'refresh_token' },
          { label: 'CLIENT_CREDENTIALS', value: 'client_credentials' },
          { label: 'PASSWORD', value: 'password' },
          { label: 'JWT_BEARER', value: 'jwt_bearer' },
          { label: 'DEVICE_CODE', value: 'device_code' },
        ],
      },
      fieldName: 'authorizationGrantType',
      label: $t('oauth2.clientRegistration.field.authorizationGrantType'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'redirectUri',
      label: $t('oauth2.clientRegistration.field.redirectUri'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'scopes',
      label: $t('oauth2.clientRegistration.field.scopes'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'authorizationUri',
      label: $t('oauth2.clientRegistration.field.authorizationUri'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'tokenUri',
      label: $t('oauth2.clientRegistration.field.tokenUri'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'jwkSetUri',
      label: $t('oauth2.clientRegistration.field.jwkSetUri'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'issuerUri',
      label: $t('oauth2.clientRegistration.field.issuerUri'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'userInfoUri',
      label: $t('oauth2.clientRegistration.field.userInfoUri'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'userInfoAuthenticationMethod',
      label: $t('oauth2.clientRegistration.field.userInfoAuthenticationMethod'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'userNameAttributeName',
      label: $t('oauth2.clientRegistration.field.userNameAttributeName'),
      rules: '',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'configurationMetadata',
      label: $t('oauth2.clientRegistration.field.configurationMetadata'),
      rules: '',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'configurationExtension',
      label: $t('oauth2.clientRegistration.field.configurationExtension'),
      rules: '',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'clientId',
      label: $t('oauth2.clientRegistration.field.clientId'),
    },
    {
      component: 'Input',
      fieldName: 'clientName',
      label: $t('oauth2.clientRegistration.field.clientName'),
    },
  ];
}

export function useColumns(
  onActionClick: OnActionClickFn,
): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 40 },
    { align: 'left', type: 'checkbox', width: 40 },
    {
      field: 'registrationId',
      title: $t('oauth2.clientRegistration.field.registrationId'),
      width: 160,
    },
    {
      field: 'clientName',
      title: $t('oauth2.clientRegistration.field.clientName'),
      cellRender: {
        attrs: {
          onClick: onActionClick,
        },
        name: 'CellValueLink',
      },
      width: 160,
    },
    {
      field: 'clientId',
      title: $t('oauth2.clientRegistration.field.clientId'),
    },
    {
      field: 'clientSecret',
      title: $t('oauth2.clientRegistration.field.clientSecret'),
    },
    {
      field: 'scopes',
      title: $t('oauth2.clientRegistration.field.scopes'),
      width: 200,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'clientName',
          nameTitle: $t('oauth2.clientRegistration.name'),
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
