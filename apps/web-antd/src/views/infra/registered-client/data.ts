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
      fieldName: 'clientName',
      label: $t('oauth2.registeredClient.field.clientName'),
      rules: 'required',
      description: '',
    },
    {
      component: shallowRef(RandomInput),
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'clientId',
      label: $t('oauth2.registeredClient.field.clientId'),
      rules: 'required',
      description: '',
    },
    {
      component: shallowRef(RandomInput),
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'clientSecret',
      label: $t('oauth2.registeredClient.field.clientSecret'),
      rules: '',
      description: '',
      dependencies: {
        required(values) {
          return !values.id;
        },
        triggerFields: ['clientId'],
      },
    },
    {
      component: 'DatePicker',
      componentProps: {
        class: 'mr-2',
        valueFormat: 'yyyy-MM-dd',
      },
      fieldName: 'clientSecretExpiresAt',
      label: $t('oauth2.registeredClient.field.clientSecretExpiresAt'),
      rules: '',
      description: '',
    },
    {
      component: 'CheckboxGroup',
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
      fieldName: 'clientAuthenticationMethods',
      label: $t('oauth2.registeredClient.field.clientAuthenticationMethods'),
      rules: 'required',
      description: '',
    },
    {
      component: 'CheckboxGroup',
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
      fieldName: 'authorizationGrantTypes',
      label: $t('oauth2.registeredClient.field.authorizationGrantTypes'),
      rules: '',
      description: '',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'settings_token_accessTokenTimeToLive',
      label: $t('oauth2.registeredClient.field.accessTokenTimeToLive'),
      rules: 'required',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'settings_token_deviceCodeTimeToLive',
      label: $t('oauth2.registeredClient.field.deviceCodeTimeToLive'),
      dependencies: {
        required(values) {
          const { authorizationGrantTypes } = values;
          if (!authorizationGrantTypes) {
            return false;
          }
          return authorizationGrantTypes.includes('device_code');
        },
        show(values) {
          const { authorizationGrantTypes } = values;
          if (!authorizationGrantTypes) {
            return false;
          }
          return authorizationGrantTypes.includes('device_code');
        },
        triggerFields: ['authorizationGrantTypes'],
      },
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'settings_client_requireAuthorizationConsent',
      label: $t('oauth2.registeredClient.field.requireAuthorizationConsent'),
      dependencies: {
        required(values) {
          const { authorizationGrantTypes } = values;
          if (!authorizationGrantTypes) {
            return false;
          }
          return authorizationGrantTypes.includes('authorization_code');
        },
        show(values) {
          const { authorizationGrantTypes } = values;
          if (!authorizationGrantTypes) {
            return false;
          }
          return authorizationGrantTypes.includes('authorization_code');
        },
        triggerFields: ['authorizationGrantTypes'],
      },
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'settings_token_authorizationCodeTimeToLive',
      label: $t('oauth2.registeredClient.field.authorizationCodeTimeToLive'),
      dependencies: {
        required(values) {
          const { authorizationGrantTypes } = values;
          if (!authorizationGrantTypes) {
            return false;
          }
          return authorizationGrantTypes.includes('authorization_code');
        },
        show(values) {
          const { authorizationGrantTypes } = values;
          if (!authorizationGrantTypes) {
            return false;
          }
          return authorizationGrantTypes.includes('authorization_code');
        },
        triggerFields: ['authorizationGrantTypes'],
      },
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'settings_token_refreshTokenTimeToLive',
      label: $t('oauth2.registeredClient.field.refreshTokenTimeToLive'),
      dependencies: {
        required(values) {
          const { authorizationGrantTypes } = values;
          if (!authorizationGrantTypes) {
            return false;
          }
          return authorizationGrantTypes.includes('authorization_code');
        },
        show(values) {
          const { authorizationGrantTypes } = values;
          if (!authorizationGrantTypes) {
            return false;
          }
          return authorizationGrantTypes.includes('authorization_code');
        },
        triggerFields: ['authorizationGrantTypes'],
      },
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 2,
      },
      fieldName: 'redirectUris',
      label: $t('oauth2.registeredClient.field.redirectUris'),
      rules: 'required',
      description: '',
      dependencies: {
        required(values) {
          const { authorizationGrantTypes } = values;
          if (!authorizationGrantTypes) {
            return false;
          }
          return authorizationGrantTypes.includes('authorization_code');
        },
        show(values) {
          const { authorizationGrantTypes } = values;
          if (!authorizationGrantTypes) {
            return false;
          }
          return authorizationGrantTypes.includes('authorization_code');
        },
        triggerFields: ['authorizationGrantTypes'],
      },
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 2,
      },
      fieldName: 'postLogoutRedirectUris',
      label: $t('oauth2.registeredClient.field.postLogoutRedirectUris'),
      rules: '',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 2,
      },
      fieldName: 'scopes',
      label: $t('oauth2.registeredClient.field.scopes'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 2,
      },
      fieldName: 'clientSettings',
      label: $t('oauth2.registeredClient.field.clientSettings'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 2,
      },
      fieldName: 'tokenSettings',
      label: $t('oauth2.registeredClient.field.tokenSettings'),
      rules: 'required',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'clientId',
      label: $t('oauth2.registeredClient.field.clientId'),
    },
    {
      component: 'Input',
      fieldName: 'clientName',
      label: $t('oauth2.registeredClient.field.clientName'),
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
      field: 'clientName',
      title: $t('oauth2.registeredClient.field.clientName'),
      cellRender: {
        attrs: {
          onClick: onActionClick,
        },
        name: 'CellValueLink',
      },
      width: 200,
    },
    {
      field: 'clientId',
      title: $t('oauth2.registeredClient.field.clientId'),
    },
    {
      field: 'authorizationGrantTypes',
      title: $t('oauth2.registeredClient.field.authorizationGrantTypes'),
      width: 200,
    },
    {
      field: 'clientAuthenticationMethods',
      title: $t('oauth2.registeredClient.field.clientAuthenticationMethods'),
      width: 140,
    },
    {
      field: 'clientSecretExpiresAt',
      title: $t('oauth2.registeredClient.field.clientSecretExpiresAt'),
      formatter: ['formatDate', 'yyyy-MM-dd'],
      width: 110,
    },
    {
      field: 'scopes',
      title: $t('oauth2.registeredClient.field.scopes'),
      width: 200,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'clientName',
          nameTitle: $t('oauth2.registeredClient.name'),
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
