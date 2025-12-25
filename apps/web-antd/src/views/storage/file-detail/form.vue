<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { saveFileDetailApi } from '#/api';

defineOptions({
  name: 'FileDetailDrawer',
});
const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'url',
      label: $t('storage.fileDetail.field.url'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'originalFilename',
      label: $t('storage.fileDetail.field.originalFilename'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'filename',
      label: $t('storage.fileDetail.field.filename'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'basePath',
      label: $t('storage.fileDetail.field.basePath'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'path',
      label: $t('storage.fileDetail.field.path'),
      rules: '',
      description: '',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'size',
      label: $t('storage.fileDetail.field.size'),
      rules: '',
      description: $t('storage.fileDetail.comment.size'),
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'ext',
      label: $t('storage.fileDetail.field.ext'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'contentType',
      label: $t('storage.fileDetail.field.contentType'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'platform',
      label: $t('storage.fileDetail.field.platform'),
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
    }
  },
  title: $t('storage.fileDetail.title'),
});

async function onSubmit(values: any) {
  const formData = drawerApi.getData().values;
  values.fileDetailId = formData.fileDetailId;
  await saveFileDetailApi(values);
  drawerApi.setData({ success: true });
}
</script>
<template>
  <Drawer class="w-[600px]">
    <Form />
  </Drawer>
</template>
