<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { saveAppVersionApi } from '#/api';

import { useFormSchema } from '../data';

defineOptions({
  name: 'AppVersionDrawer',
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
        formApi.setValues({
          ...values,
          releaseTime: dayjs(values.releaseTime),
        });
      }
      const enableEdit = !!disabled;
      formApi.setState({ commonConfig: { disabled: enableEdit } });
    }
  },
  title: $t('infra.appVersion.title'),
});

async function onSubmit(values: any) {
  const formData = drawerApi.getData().values;
  values.appVersionId = formData.appVersionId;
  await saveAppVersionApi(values);
}
</script>
<template>
  <Drawer class="w-[600px]">
    <Form />
  </Drawer>
</template>
