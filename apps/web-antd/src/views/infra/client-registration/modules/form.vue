<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { saveClientRegistrationApi } from '#/api';

import { useFormSchema } from '../data';

defineOptions({
  name: 'ClientRegistrationDrawer',
});
const [Form, formApi] = useVbenForm({
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
        const configurationMetadata =
          values.configurationMetadata ??
          '{"@class":"java.util.Collections$UnmodifiableMap"}';

        const configurationExtension = values.configurationExtension ?? '{}';

        formApi.setValues({
          ...values,
          configurationMetadata,
          configurationExtension,
        });
      }
      const enableEdit = !!disabled;
      formApi.setState({ commonConfig: { disabled: enableEdit } });
    }
  },
  title: $t('oauth2.clientRegistration.title'),
});

async function onSubmit(values: any) {
  await saveClientRegistrationApi(values);
}
</script>
<template>
  <Drawer class="w-[600px]">
    <Form />
  </Drawer>
</template>
