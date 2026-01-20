<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { saveRegisteredClientApi } from '#/api';

import { useFormSchema } from '../data';

defineOptions({
  name: 'RegisteredClientDrawer',
});

function attributeNameToFieldName(attributeName: string) {
  return camelCase(attributeName.replaceAll('.', '_'));
}
function fieldNameToAttributeName(fieldName: string) {
  return camelToKebab(fieldName.replaceAll('_', '.'));
}

function camelCase(str: string) {
  return str.replaceAll(/-([a-z])/g, (g) => g[1]?.toUpperCase() || '');
}
function camelToKebab(str: string): string {
  return str.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const [Form, formApi] = useVbenForm({
  commonConfig: {
    labelWidth: 180,
  },
  schema: useFormSchema(),
  showDefaultActions: false,
  handleSubmit: onSubmit,
});

const [Drawer, drawerApi] = useVbenDrawer({
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    await formApi.submitForm();
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values, disabled } = drawerApi.getData<Record<string, any>>();
      if (values) {
        const scopes = values.scopes || 'openid,profile';
        const clientSettings =
          values.clientSettings ||
          '{"@class":"java.util.Collections$UnmodifiableMap","settings.client.require-authorization-consent":true,"settings.client.require-proof-key":false}';
        const clientSettingsObj = JSON.parse(clientSettings);
        for (const [key, value] of Object.entries(clientSettingsObj)) {
          values[attributeNameToFieldName(key)] = Array.isArray(value)
            ? value[1]
            : value;
        }
        const tokenSettings =
          values.tokenSettings ||
          '{"@class":"java.util.Collections$UnmodifiableMap","settings.token.access-token-time-to-live":["java.time.Duration",7200.000000000],"settings.token.refresh-token-time-to-live":["java.time.Duration",3600.000000000],"settings.token.authorization-code-time-to-live":["java.time.Duration",300.000000000],"settings.token.device-code-time-to-live":["java.time.Duration",300.000000000]}';
        const tokenSettingsObj = JSON.parse(tokenSettings);
        for (const [key, value] of Object.entries(tokenSettingsObj)) {
          values[attributeNameToFieldName(key)] = Array.isArray(value)
            ? value[1]
            : value;
        }

        formApi.setValues({
          ...values,
          clientAuthenticationMethods: values.clientAuthenticationMethods
            ? values.clientAuthenticationMethods.split(',')
            : ['client_secret_basic'],
          authorizationGrantTypes: values.authorizationGrantTypes
            ? values.authorizationGrantTypes.split(',')
            : ['authorization_code'],
          clientSettings,
          tokenSettings,
          scopes,
        });
      }
      const enableEdit = !!disabled;
      formApi.setState({ commonConfig: { disabled: enableEdit } });
      formApi.setState((prev) => {
        return {
          schema: prev.schema?.map((item) => {
            if (item.fieldName === 'clientId') {
              return {
                ...item,
                disabled: !!values.id,
              };
            }
            if (item.fieldName === 'clientSecret') {
              return {
                ...item,
                dependencies: {
                  show: () => !values.id,
                  triggerFields: ['clientSecret'],
                },
              };
            }
            if (
              item.fieldName ===
              attributeNameToFieldName(
                'settings.client.require-authorization-consent',
              )
            ) {
              return {
                ...item,
                componentProps: {
                  onChange: async (val: boolean) => {
                    const { clientSettings } = await formApi.getValues();
                    const settings = JSON.parse(clientSettings);
                    settings[fieldNameToAttributeName(item.fieldName)] = val;
                    formApi.setFieldValue(
                      'clientSettings',
                      JSON.stringify(settings),
                    );
                  },
                },
              };
            }
            if (
              item.fieldName ===
                attributeNameToFieldName(
                  'settings.token.access-token-time-to-live',
                ) ||
              item.fieldName ===
                attributeNameToFieldName(
                  'settings.token.refresh-token-time-to-live',
                ) ||
              item.fieldName ===
                attributeNameToFieldName(
                  'settings.token.authorization-code-time-to-live',
                ) ||
              item.fieldName ===
                attributeNameToFieldName(
                  'settings.token.device-code-time-to-live',
                )
            ) {
              return {
                ...item,
                componentProps: {
                  onChange: async (val: number) => {
                    const { tokenSettings } = await formApi.getValues();
                    const settings = JSON.parse(tokenSettings);
                    settings[fieldNameToAttributeName(item.fieldName)][1] = val;
                    formApi.setFieldValue(
                      'tokenSettings',
                      JSON.stringify(settings),
                    );
                  },
                },
              };
            }
            return item;
          }),
        };
      });
    }
  },
  title: $t('oauth2.registeredClient.title'),
});

async function onSubmit(values: any) {
  const formData = drawerApi.getData().values;
  values.id = formData.id;
  values.clientAuthenticationMethods =
    values.clientAuthenticationMethods.join(',');
  values.authorizationGrantTypes = values.authorizationGrantTypes.join(',');
  for (const [key, value] of Object.entries(values)) {
    if (key.startsWith('settings.')) {
      values[fieldNameToAttributeName(key)] = value;
      delete values[key];
    }
  }
  await saveRegisteredClientApi(values);
}
</script>
<template>
  <Drawer class="w-[700px]">
    <Form />
  </Drawer>
</template>
