<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { saveDataDictItemApi } from '#/api';

import { useFormSchema } from './item-data';

defineOptions({
  name: 'DataDictItemDrawer',
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
  title: $t('infra.dataDictItem.title'),
});

async function onSubmit(values: any) {
  const formData = drawerApi.getData().values;
  values.dictItemId = formData.dictItemId;
  values.dictCode = formData.dictCode;
  values.dataDictId = formData.dataDictId;
  await saveDataDictItemApi(values);
  drawerApi.setData({ success: true });
}
</script>
<template>
  <Drawer class="w-[600px]">
    <Form />
  </Drawer>
</template>
