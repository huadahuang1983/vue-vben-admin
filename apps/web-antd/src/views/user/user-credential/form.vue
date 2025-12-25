<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { configUserCredentialByUserIdApi } from '#/api';

defineOptions({
  name: 'UserCredentialDrawer',
});
const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'accountEnabled',
      label: $t('user.userCredential.field.accountEnabled'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'accountNonExpired',
      label: $t('user.userCredential.field.accountNonExpired'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'accountNonLocked',
      label: $t('user.userCredential.field.accountNonLocked'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'credentialsNonExpired',
      label: $t('user.userCredential.field.credentialsNonExpired'),
      rules: 'required',
      description: '',
    },
    {
      component: 'DatePicker',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'expireAt',
      label: $t('user.userCredential.field.expireAt'),
      rules: '',
      description: '',
    },
  ],
  showDefaultActions: false,
  handleSubmit: onSubmit,
});

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
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
        formApi.setValues(values);
      }
      const enableEdit = !!disabled;
      formApi.setState({ commonConfig: { disabled: enableEdit } });
      drawerApi.setState({ showConfirmButton: !enableEdit });
    }
  },
  title: $t('user.userCredential.title'),
});

async function onSubmit(values: any) {
  const rawData = drawerApi.getData().values;
  const { userId } = rawData;
  await configUserCredentialByUserIdApi(userId, values);
  drawerApi.setData({ success: true });
}
</script>
<template>
  <Drawer class="w-[600px]">
    <Form />
  </Drawer>
</template>
