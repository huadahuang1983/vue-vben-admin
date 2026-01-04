<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { saveConfigParamApi } from '#/api';

import { useFormSchema } from '../data';

defineOptions({
  name: 'ConfigParamDrawer',
});

const [Form, formApi] = useVbenForm({
  schema: useFormSchema(),
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
    }
  },
  title: $t('infra.configParam.title'),
});

async function onSubmit(values: any) {
  const formData = drawerApi.getData().values;
  values.configParamId = formData.configParamId;
  await saveConfigParamApi(values);
}
</script>
<template>
  <Drawer class="w-[600px]">
    <Form />
  </Drawer>
</template>
